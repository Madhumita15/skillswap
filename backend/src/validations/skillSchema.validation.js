const joi = require("joi");

class SkillSchemaValidation {
  static skiiOperation = joi.object({
    name: joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    description: joi.string().trim().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
  });
}
module.exports = SkillSchemaValidation;
