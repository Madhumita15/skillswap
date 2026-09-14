const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Name is required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },

    skill_logo: {
      type: String,
    },

    skill_logo_public_id: {
      type: String,
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

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
