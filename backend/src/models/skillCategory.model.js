const mongoose = require("mongoose");

const skillCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Category name is required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Category description is required"],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const SkillCategory = mongoose.model(
  "SkillCategory",
  skillCategorySchema,
);

module.exports = SkillCategory;