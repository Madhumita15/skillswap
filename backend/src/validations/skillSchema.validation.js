const joi = require("joi");

class SkillSchemaValidation {
  /* =====================================================
     CREATE SKILL
  ===================================================== */

  static create = joi.object({
    name: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": "Skill name is required",
        "any.required": "Skill name is required",
      }),

    category: joi
      .string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.empty": "Skill category is required",
        "any.required": "Skill category is required",
        "string.pattern.base": "Invalid skill category id",
      }),

    description: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": "Skill description is required",
        "any.required": "Skill description is required",
      }),
  });

  /* =====================================================
     UPDATE SKILL
  ===================================================== */

  static update = joi.object({
    name: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": "Skill name is required",
        "any.required": "Skill name is required",
      }),

    category: joi
      .string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.empty": "Skill category is required",
        "any.required": "Skill category is required",
        "string.pattern.base": "Invalid skill category id",
      }),

    description: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": "Skill description is required",
        "any.required": "Skill description is required",
      }),
  });
}

module.exports = SkillSchemaValidation;