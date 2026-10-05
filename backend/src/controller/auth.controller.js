const httpStatusCode = require("../utils/httpStatusCode");

const {
  registerService,
  mailVerifyService,
  loginService,
  refreshTokenService,
  logoutService,
  forgotPasswordService,
  resetPasswordService,
} = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    const { name, email, password, phone } = req.body;
    await registerService({ name, email, password, phone });
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User Registered successfully! and otp send to your email",
    });
  }

  async mailVerify(req, res) {
    const { email, otp } = req.body;
    const { user, accessToken, refreshToken } = await mailVerifyService({
      email,
      otp,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Email verified successfully!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar_image: user.avatar_image,
        isEmailVerified: user.isEmailVerified,
        isOnboardingComplete: user.isOnboardingComplete,
        accessToken: user.accessToken,
      },
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginService({
      email,
      password,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login successful !",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar_image: user.avatar_image,
        isEmailVerified: user.isEmailVerified,
        isOnboardingComplete: user.isOnboardingComplete,
      },
    });
  }


async refreshToken(req, res) {
  
    const refreshToken = req.cookies?.refreshToken;

    const {
      newAccessToken,
      newRefreshToken,
      user,
    } = await refreshTokenService({
      refreshToken,
    });

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // Set new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar_image: user.avatar_image,
        isEmailVerified: user.isEmailVerified,
        isOnboardingComplete: user.isOnboardingComplete,
        role: user.role,
        status: user.status,
      },
    });
  } 

  async forgotPassword (req, res) {
  const result = await forgotPasswordService(req.body.email);
  return res.status(httpStatusCode.OK).json(result);
};

async resetPassword (req, res) {
  const { token, password } = req.body;

  console.log("RESET PASSWORD BODY:", req.body);

  if (!token) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Reset token is required .",
    });
  }

  if (!password) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Password is required.",
    });
  }

  const result = await resetPasswordService(token, password);
  return res.status(httpStatusCode.OK).json(result);
};

  async logout(req, res) {
    const id = req.user._id;

    await logoutService(id);
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Logout successfully!",
    });
  }
}
module.exports = new AuthController();
