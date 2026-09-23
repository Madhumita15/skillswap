const httpStatusCode = require("../utils/httpStatusCode");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    try {
      const {accessToken} = req.cookies;
      if (!accessToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          status: false,
          message: "Token not provided",
        });
      }
      const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

      const user = await User.findById(decode._id);
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "User not found",
        });
      }

      req.user = {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar_image: user.avatar_image,
      };

      next();
    } catch (error) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Invalid or expire token",
      });
    }
  }

  static roleCheck(...roles) {
    return async (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(httpStatusCode.FORBIDDEN).json({
          status: false,
          message: "Access Denied",
        });
      }
      next();
    };
  }
}
module.exports = AuthMiddleware;
