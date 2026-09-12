const httpStatusCode = require("../utils/httpStatusCode");
const cloudinary = require("../config/cloudinaryConfig");

class Validation {
  static validate(schema) {
    return async (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: true,
        stripUnknown: false,
      });

      if (error) {
        try {
          if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
          }
        } catch (error) {
          console.log(error);
        }

        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          errors: error.details.map((err) => ({
            field: err.path.join("."),
            error: err.message,
          })),
        });
      }
      req.body = value;
      next();
    };
  }
}
module.exports = Validation;
