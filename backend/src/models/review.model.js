
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    swapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "swap",
      required: true,
    },

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    reviewedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// One participant can submit only one review for one swap
reviewSchema.index(
  {
    swapId: 1,
    reviewerId: 1,
  },
  {
    unique: true,
  }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;

