const SwapRequest = require("../models/swapRequest.model");
const httpStatusCode = require("../utils/httpStatusCode");

const createSwapRequestService = async ({
  message,
  senderId,
  receiverId,
  teachingSkill,
  learningSkill,
}) => {
  const exitingRequest = await SwapRequest.findOne({
    senderId: senderId,
    receiverId: receiverId,
  });
  if (exitingRequest) {
    const error = new Error("You already send swap request")
    error.statusCode = httpStatusCode.BAD_REQUEST
    throw error
  }

  const newRequest = new SwapRequest({
    message: message,
    senderId: senderId,
    receiverId: receiverId,
    teachingSkill: teachingSkill,
    learningSkill: learningSkill,
  });

  const swapRequest = await newRequest.save();

  return swapRequest;
};

module.exports = { createSwapRequestService };
