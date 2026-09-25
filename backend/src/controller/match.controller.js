const {
  getAllUserService,
  getMyMatchService,
} = require("../services/match.service");
const httpStatusCode = require("../utils/httpStatusCode");

class MatchController {
  async getAllUser(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const { data, totalUsers } = await getAllUserService({ page, limit });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "All users fetched successfully!",
      data: data,
      totalUsers: totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  }

  async getMyMatch(req, res) {
    const userId = req.user._id
    const matches = await getMyMatchService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "All matches users fetch successfully!",
      data: matches,
    });
  }
}

module.exports = new MatchController();
