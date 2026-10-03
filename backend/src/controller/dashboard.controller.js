
const {
  getUserDashboardService,
  getAdminDashboardService,
} = require("../services/dashboard.service");

const httpStatusCode = require("../utils/httpStatusCode");

class DashboardController {
  async getUserDashboard(req, res) {
    const userId = req.user._id;

    const dashboard = await getUserDashboardService({
      userId,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User dashboard fetched successfully",
      data: dashboard,
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

