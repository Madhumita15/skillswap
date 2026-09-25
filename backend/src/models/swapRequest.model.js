const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swapRequestSchema = new Schema(
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
      ref: "skill",
    },
    learningSkill: {
      type: Schema.Types.ObjectId,
      ref: "skill",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);
const swapRequestModel = mongoose.model("swapRequest", swapRequestSchema);
module.exports = swapRequestModel;
