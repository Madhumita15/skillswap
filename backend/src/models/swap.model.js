const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swapSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    teachingSkill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
    learningSkill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
    startDate: {
      type: Date,
      default: null,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);
const swapModel = mongoose.model("swap", swapSchema);
module.exports = swapModel;
