const User = require("../models/user.model");
const cloudinary = require("../config/cloudinaryConfig");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Otp = require("../models/otp.model");
const httpStatusCode = require('../utils/httpStatusCode')
const SendEmail = require("../utils/sendEmail");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const ResetPassword = require("../models/resetPassword.model");
const crypto = require('crypto')

//===========================================================================
//RegisterService
//===========================================================================
const registerService = async ({ name, email, password, phone }) => {
  try {
 

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const error = new Error("Email already exist");
      error.statusCode = httpStatusCode.BAD_REQUEST;
      throw error;
    }

  

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone,
    });

 

    const user = await newUser.save();

   

    await SendEmail.verifyEmail(user);


    return user;
  } catch (error) {

    throw error;
  }
};

//=====================================================
//LoginService
//=====================================================
const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (user.status === "blocked") {
    const error = new Error(
      "You are blocked by admin, contact with administrator",
    );
    error.statusCode = httpStatusCode.FORBIDDEN;
    throw error;
  }

  if (!user.isEmailVerified) {
    const error = new Error("Email not verified");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  user.refreshToken = refreshToken;
  await user.save();
  return {
    user,
    accessToken,
    refreshToken
};
};

//=======================================================
//mailVerifyService
//=======================================================
const mailVerifyService = async ({ email, otp }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (user.isEmailVerified) {
    const error = new Error("Email already verified");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const emailVerification = await Otp.findOne({
    userId: user._id,
    otp: otp,
  });

  if (!emailVerification) {
    const error = new Error("Invalid otp, try again");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const currentTime = Date.now();
  const expirationTime = emailVerification.createdAt.getTime() + 15 * 60 * 1000;

  if (currentTime > expirationTime) {
    await SendEmail.verifyEmail(user);
    const error = new Error("Otp expired, new otp send to your mail");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  user.isEmailVerified = true;
  await Otp.deleteMany({ userId: user._id });

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  user.refreshToken = refreshToken;
  await user.save();
   return {
    user,
    accessToken,
    refreshToken
};
};

//==========================================================
//refreshToken
//==========================================================
const refreshTokenService = async ({ refreshToken }) => {
 
  // check refreshToken present or not
  if (!refreshToken) {
    const error = new Error("Refresh token not provided");
    error.statusCode = httpStatusCode.UNAUTHORIZED;
    throw error;
  }

  // 2. Verify refresh token
  let decoded;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );
  } catch (error) {
    const newError = new Error("Invalid or expired refresh token");
    newError.statusCode = httpStatusCode.UNAUTHORIZED;
    throw newError;
  }

  // 3. Find user
  const user = await User.findById(decoded._id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  // 4. Check whether refresh token matches stored token
  if (user.refreshToken !== refreshToken) {
    const error = new Error("Invalid refresh token");
    error.statusCode = httpStatusCode.UNAUTHORIZED;
    throw error;
  }

  // 5. Check account status
  if (user.status === "blocked") {
    const error = new Error("Your account is blocked");
    error.statusCode = httpStatusCode.FORBIDDEN;
    throw error;
  }

  // 6. Generate new access token
  const newAccessToken = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  // 7. Generate new refresh token
  const newRefreshToken = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  // 8. Save new refresh token
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    newAccessToken,
    newRefreshToken,
    user,
  };
};

//=====================================================
//forgotPasswordService
//=====================================================
const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  // Don't reveal whether the email exists
  if (!user) {
    return {
      success: true,
      message:
        "If that email address is in our database, we sent a password reset link to it.",
    };
  }

  // Generate plain reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before storing in DB
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires after 15 minutes
  await ResetPassword.create({
  userId: user._id,
  tokenHash: tokenHash,
});
  try {
    // Use the method from your SendEmail class
    await SendEmail.forgotPasswordLink(user, resetToken);

    return {
      success: true,
      message: "Password reset link has been sent to your email.",
    };
  } catch (error) {
    console.error("FORGOT PASSWORD EMAIL ERROR:", error);

    // Remove reset token if email failed
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpires = undefined;

    // await user.save();

    throw new Error("Email could not be sent. Please try again later.");
  }
};

//===============================================================
//resetPasswordService
//===============================================================
 const resetPasswordService = async (token, password) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const resetData = await ResetPassword.findOne({
    tokenHash,
  });

  if (!resetData) {
    throw new Error("Invalid or expired password reset token.");
  }

  const user = await User.findById(resetData.userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const salt = await bcryptjs.genSalt(10);

  user.password = await bcryptjs.hash(password, salt);

  await user.save();

  // Delete the token after successful password reset
  await ResetPassword.deleteOne({
    _id: resetData._id,
  });

  return {
    success: true,
    message:
      "Password reset successfully. You can now login with your new password.",
  };
};


//=========================================
//LogoutService
//=========================================
const logoutService = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not exist");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  user.refreshToken = null;
  await user.save();
  return user
};

module.exports = { registerService, loginService, mailVerifyService, refreshTokenService, logoutService, forgotPasswordService, resetPasswordService };
