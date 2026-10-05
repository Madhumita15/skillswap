const {
  getUserDashboardService,
  getAdminDashboardService,
} = require("../services/dashboard.service");

const httpStatusCode = require("../utils/httpStatusCode");

class DashboardController {
  async getUserDashboard(req, res) {
    const id = req.user._id;
    const {
      totalTeachingSkills,
      totalLearningSkills,
      pendingSentRequests,
      pendingReceivedRequests,
      totalCompletedSwap,
      totalActiveSwaps,
      totalAcceptRequest,
      totalRejectRequest,
      totalReports,
    } = await getUserDashboardService(id);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User Dashboard stats fetched successfully!",
      data: {
        totalTeachingSkills,
        totalLearningSkills,
        pendingSentRequests,
        pendingReceivedRequests,
        totalCompletedSwap,
        totalActiveSwaps,
        totalAcceptRequest,
        totalRejectRequest,
        totalReports,
      },
    });
  }

  async getAdminDashboard(req, res) {
    const dashboard = await getAdminDashboardService();

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      data: dashboard,
    });
  }
}

module.exports = new DashboardController();
