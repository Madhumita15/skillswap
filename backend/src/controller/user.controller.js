const User = require("../models/user.model");
const httpStatusCode = require("../utils/httpStatusCode");
const cloudinary = require("../config/cloudinaryConfig");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SendEmail = require("../utils/sendEMail");
const Otp = require("../models/otp.model");

class UserController {
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        if (req.file) {
          await cloudinary.uploader.destroy(existingEmail.avatar_public_id);
        }
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Email already exist",
        });
      }

      const salt = 10;
      const hashPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
      });

      if (req.file) {
        ((newUser.avatar_image = req.file.path),
          (newUser.avatar_public_id = req.file.filename));
      }

      const user = await newUser.save();
      await SendEmail.verifyEmail(req, user);
      if (!user) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "User not registered",
        });
      } else {
        return res.status(httpStatusCode.CREATED).json({
          status: true,
          message: "User Registered successfully! and otp send to your email",
        });
      }
    } catch (error) {
      await cloudinary.uploader.destroy(req.file.filename);
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async mailVerify(req, res) {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "User not found",
        });
      }

      if (user.isEmailVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Email already verified",
        });
      }

      const emailVerification = await Otp.findOne({
        userId: user._id,
        otp: otp,
      });

      if (!emailVerification) {
        // await SendEmail.verifyEmail(req, user);
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Invalid otp, try again",
        });
      }

      const currentTime = Date.now();
      const expirationTime =
        emailVerification.createdAt.getTime() + 15 * 60 * 1000;

      if (currentTime > expirationTime) {
        await SendEmail.verifyEmail(req, user);
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Otp expired, new otp send to your mail",
        });
      }

      user.isEmailVerified = true;
      await Otp.deleteMany({ userId: user._id });

      const accessToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "1d" },
      );

      const refreshToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "30d" },
      );

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

      user.refreshToken = refreshToken;
      await user.save();
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Email verified successfully!",
        accessToken: accessToken,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar_image: user.avatar_image,
          isEmailVerified: user.isEmailVerified,
          isOnboardingComplete: user.isOnboardingComplete,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: "unable to verify email otp, try again later",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "User not found",
        });
      }

      if (user.status === "blocked") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          status: false,
          message: "You are blocked by admin, contact with administrator",
        });
      }

      if (!user.isEmailVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Email not verified",
        });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "1d" },
      );

      const refreshToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "30d" },
      );

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

      user.refreshToken = refreshToken;
      const data = await user.save();

      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Login successfully!",
        accessToken: accessToken,
        data: {
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatar_image: data.avatar_image,
          isEmailVerified: data.isEmailVerified,
          isOnboardingComplete: data.isOnboardingComplete,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "User not exist",
        });
      }

      user.refreshToken = null;
      await user.save();
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Logout successfully!",
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
