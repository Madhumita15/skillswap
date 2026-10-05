
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      enum: [
        "spam",
        "harassment",
        "inappropriate_content",
        "fake_profile",
        "others"
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "resolved",
        "rejected",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ status: 1 });
reportSchema.index({reason: 1})
reportSchema.index({reporterId: 1, reportedUserId: 1}, {unique: true})


const Report = mongoose.model("report", reportSchema);

module.exports = Report;
