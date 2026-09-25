const User = require("../models/user.model");
const cloudinary = require("../config/cloudinaryConfig");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Otp = require("../models/otp.model");
const httpStatusCode = require('../utils/httpStatusCode')
const SendEmail = require("../utils/sendEmail");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const registerService = async ({ name, email, password, phone, file }) => {
  try {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      const error = new Error("Email already exist");
      error.statusCode = httpStatusCode.BAD_REQUEST;
      throw error;
    }
    const salt = 10;
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
    });
    if (file) {
      ((newUser.avatar_image = file.path),
        (newUser.avatar_public_id = file.filename));
    }
    const user = await newUser.save();
    await SendEmail.verifyEmail(user);
    return user;
  } catch (error) {
    if (file) {
      await cloudinary.uploader.destroy(file.filename);
    }
    throw error;
  }
};

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

module.exports = { registerService, loginService, mailVerifyService, refreshTokenService,logoutService };
