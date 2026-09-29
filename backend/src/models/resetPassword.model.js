const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
  tokenHash: {
    type: String,
    required: [true, "Reset token is required"],
    trim: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "25m",
  },
});

const resetPasswordModel = mongoose.model(
  "resetPassword",
  resetPasswordSchema
);

module.exports = resetPasswordModel;