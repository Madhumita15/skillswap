
const Joi = require("joi");

const createReportSchema = Joi.object({
  reportedUserId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "Reported user ID is required",
      "string.length": "Invalid reported user ID",
      "string.hex": "Invalid reported user ID",
      "any.required": "Reported user ID is required",
    }),

  reason: Joi.string()
    .valid(
      "spam",
      "harassment",
      "inappropriate_content",
      "scam",
      "other"
    )
    .required()
    .messages({
      "any.only": "Invalid report reason",
      "any.required": "Report reason is required",
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters",
      "string.max": "Description cannot exceed 1000 characters",
      "any.required": "Description is required",
    }),
});

const updateReportStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      "pending",
      "under_review",
      "resolved",
      "dismissed"
    )
    .required()
    .messages({
      "any.only": "Invalid report status",
      "any.required": "Report status is required",
    }),
});

module.exports = {
  createReportSchema,
  updateReportStatusSchema,
};
