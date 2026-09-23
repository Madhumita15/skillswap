const httpStatusCode = require("../utils/httpStatusCode");

const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode || httpStatusCode.SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;