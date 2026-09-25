const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    teachingSkills: {
      type: [Schema.Types.ObjectId],
      ref: "Skill",
    },
    learningSkills: {
      type: [Schema.Types.ObjectId],
      ref: "Skill",
    },
    experience: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    avatar_image: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwY2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D",
    },

    avatar_public_id: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isOnboardingComplete: {
      type: Boolean,
      default: false
    },

    refreshToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
