const joi = require("joi");

class UserSchemaValidation {
  static register = joi.object({
    name: joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    password: joi.string().trim().min(6).max(15).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 character",
      "string.max": "Password cannot exceed 15 character",
      "any.required": "Password is required",
    }),
    phone: joi
      .string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": "Phone No is required",
        "string.pattern.base": "Phone Number must be 10 digit",
        "any.required": "Phone No required",
      }),
    role: joi.string().valid("user", "admin").optional().messages({
      "any.only": "Role must be one of - user, admin",
    }),
  });

  static login = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    password: joi.string().trim().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });

  static verifyEmail = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    otp: joi.string().min(4).max(4).required().messages({
      "string.required": "OTP is required",
      "any.required": "OTP is required",
    }),
  });
}
module.exports = UserSchemaValidation;
