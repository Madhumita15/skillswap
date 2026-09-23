const {
  createSwapRequestService,
} = require("../services/swapRequest.services");
const httpStatusCode = require("../utils/httpStatusCode");

class SwapRequestController {
  async createRequest(req, res) {
    const { message, senderId, receiverId, teachingSkill, learningSkill } =
      req.body;

    const data = await createSwapRequestService({
      message,
      senderId,
      receiverId,
      teachingSkill,
      learningSkill,
    });

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Swap request sends successfully!",
      data: data,
    });
  }
}

module.exports = new SwapRequestController();
