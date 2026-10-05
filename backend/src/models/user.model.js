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
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    avatar_image: {
      type: String,
    },

    avatar_public_id: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
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
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);



userSchema.index({experience: 1})//single indexing
userSchema.index({name: "text"})//text indexing
userSchema.index({teachingSkills: 1})//multikey indexing
userSchema.index({learningSkills: 1})//multikey indexing


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
