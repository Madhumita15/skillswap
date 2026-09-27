
const httpStatusCode = require("../utils/httpStatusCode");

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = httpStatusCode.UNAUTHORIZED;
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("You are not authorized to access this resource");
      error.statusCode = httpStatusCode.FORBIDDEN;
      return next(error);
    }

    next();
  };
};

module.exports = roleMiddleware;
