const Joi = require("joi");

class SkillCategoryValidation {
  static create = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Category name is required",
      "any.required": "Category name is required",
    }),

    description: Joi.string().trim().required().messages({
      "string.empty": "Category description is required",
      "any.required": "Category description is required",
    }),

    
  });
 

  static update = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Category name is required",
      "any.required": "Category name is required",
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "Category description is required",
      "any.required": "Category description is required",
    }),
    
    status: Joi.string()
      .valid("active", "inactive")
      .messages({
        "any.only": "Status must be either active or inactive",
      }),
  });

  static status = Joi.object({
    status: Joi.string()
      .valid("active", "inactive")
      .required()
      .messages({
        "string.empty": "Status is required",
        "any.only": "Status must be either active or inactive",
        "any.required": "Status is required",
      }),
  });
}

module.exports = SkillCategoryValidation;