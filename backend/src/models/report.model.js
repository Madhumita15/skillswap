const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    reason: {
      type: String,
      required: true,
      enum: ['spam', 'harassment', 'inappropriate_content', 'scam', 'other'], 
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'resolved', 'dismissed'], 
      default: 'pending',
    },
  },
  {
    timestamps: true, // Automatically generates and manages createdAt and updatedAt
  }
);

const Report = mongoose.model('report', reportSchema);

module.exports =Report;