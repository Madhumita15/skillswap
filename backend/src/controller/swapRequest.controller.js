const {
  createSwapRequestService,
  getSendingRequestsService,
  getReceivedRequestsService,
  cancelSwappingRequestService,
  rejectSwapRequestService,
  acceptSwapRequestService,
  getAllSwapRequestService,
} = require("../services/swapRequest.service");
const httpStatusCode = require("../utils/httpStatusCode");

class SwapRequestController {
  async createRequest(req, res) {
    const { message, receiverId, teachingSkill, learningSkill } = req.body;
    const senderId = req.user._id;

    const swapRequest = await createSwapRequestService({
      message,
      senderId,
      receiverId,
      teachingSkill,
      learningSkill,
    });
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Swap request send successfully!",
      data: swapRequest,
    });
  }

  async getSendingRequests(req, res) {
    const userId = req.user._id;
    const sendingRequests = await getSendingRequestsService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Sending request fetched successfully!",
      data: sendingRequests,
    });
  }

  async getReceivedRequests(req, res) {
    const userId = req.user._id;
    const receiveRequests = await getReceivedRequestsService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Received requests fetched successfully!",
      data: receiveRequests,
    });
  }

  async cancelSwappingRequest(req, res) {
    const requestId = req.params.id;
    const senderId = req.user._id;

    const swapRequest = await cancelSwappingRequestService({
      requestId,
      senderId,
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap request cancelled successfully!",
      data: swapRequest,
    });
  }

  async rejectSwapRequest(req, res) {
    const requestId = req.params.id;
    const receiverId = req.user._id;
    const rejectRequest = await rejectSwapRequestService({
      requestId,
      receiverId,
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap request rejected successfully!",
      data: rejectRequest,
    });
  }

  async acceptSwapRequest(req, res) {
    const requestId = req.params.id;
    const receiverId = req.user._id;
    const swapData = await acceptSwapRequestService({ requestId, receiverId });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap request accepted successfully and swap started",
      data: swapData,
    });
  }

  async getAllSwapRequest(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const {totalSwapRequest, data} = await getAllSwapRequestService({ page, limit });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "All swap request fetched successfully!",
      data: data,
      currentPage: page,
      totalPages: Math.ceil(totalSwapRequest / limit),
      totalSwapRequest: totalSwapRequest
    });
  }
}

module.exports = new SwapRequestController();
