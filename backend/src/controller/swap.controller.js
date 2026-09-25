const {
  getHistorySwapService,
  getActiveSwapService,
  cancelSwapService,
  completeSwapService,
  getAllSwapervice,
} = require("../services/swap.service");
const httpStatusCode = require("../utils/httpStatusCode");

class SwapController {
  async getHistorySwap(req, res) {
    const userId = req.user._id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const { data, totalSwap } = await getHistorySwapService({
      userId,
      page,
      limit,
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap fetched successfully!",
      data: data,
      currentPage: page,
      totalSwap: totalSwap,
      totalPages: Math.ceil(totalSwap / limit),
    });
  }

  async getActiveSwap(req, res) {
    const userId = req.user._id;
    const swapData = await getActiveSwapService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap fetched successfully!",
      data: swapData,
    });
  }

  async cancelSwap(req, res) {
    const userId = req.user._id;
    const swapId = req.params.id
    const swapData = await cancelSwapService({userId, swapId});
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap cancelled successfully!",
      data: swapData,
    });
  }

  async completeSwap(req, res) {
    const userId = req.user._id;
    const swapId = req.params.id
    const swapData = await completeSwapService({userId, swapId});
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Swap completed successfully!",
      data: swapData,
    });
  }


  async getAllSwap(req, res) {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
  
      const {totalSwap, data} = await getAllSwapervice({ page, limit });
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "All swaps fetched successfully!",
        data: data,
        currentPage: page,
        totalPages: Math.ceil(totalSwap / limit),
        totalSwapRequest: totalSwap
      });
    }
}

module.exports = new SwapController();
