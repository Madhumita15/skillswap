const {
  getProfileService,
  completeOnBoardingService,
  updateProfileService,
  getUserByIdService,
  getAllUsersService,
  changeUserStatusService,
} = require("../services/user.service");

const httpStatusCode = require("../utils/httpStatusCode");

class UserController {
  // =====================================================
  // GET PROFILE
  // GET /api/users/profile
  // =====================================================

  async getProfile(req, res) {
    const id = req.user._id;

    const user = await getProfileService({
      id,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar_image: user.avatar_image,
        phone: user.phone,
        bio: user.bio,
        experience: user.experience,
        learningSkills: user.learningSkills,
        teachingSkills: user.teachingSkills,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
        isOnboardingComplete: user.isOnboardingComplete,
        role: user.role


      },
    });
  }

  // =====================================================
  // COMPLETE ONBOARDING
  // PATCH /api/users/onboarding
  // =====================================================

  async completeOnBoarding(req, res) {
    const id = req.user._id;

    const { name, phone, teachingSkills, learningSkills, experience, bio } =
      req.body;

    const avatar_image = req.file ? req.file.path : undefined;

    const avatar_public_id = req.file ? req.file.filename : undefined;

    const user = await completeOnBoardingService({
      id,
      name,
      phone,
      teachingSkills,
      learningSkills,
      experience,
      bio,
      avatar_image,
      avatar_public_id,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Onboarding completed successfully",
      data: user,
    });
  }

  // =====================================================
  // UPDATE PROFILE
  // PATCH /api/users/profile
  // =====================================================

  async updateProfile(req, res) {
    const id = req.user._id;

    const { name, phone } = req.body;

    const avatar_image = req.file ? req.file.path : undefined;

    const avatar_public_id = req.file ? req.file.filename : undefined;

    const user = await updateProfileService({
      id,
      name,
      phone,
      avatar_image,
      avatar_public_id,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  }

//========================================================
// FETCH SINGLE USER
// GET /api/user/:id
//========================================================
  async getUserById(req, res){
    const id = req.params.id
   const user =  await getUserByIdService(id)
   return res.status(httpStatusCode.OK).json({
    status: true,
    message: "User gets successfully!",
    data: user
   })

    

  }

  // =====================================================
// GET ALL USERS - ADMIN
// GET /api/admin/users?page=1&limit=10
// =====================================================

async getAllUsers(req, res) {
  try {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const limit = Number.parseInt(req.query.limit, 8) || 8;
    const search = String(req.query.search || "").trim();

    const result = await getAllUsersService({
      page,
      limit,
      search,
    });

    console.log("GET ALL USERS RESULT:", result);

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Users fetched successfully",
      data: result.users,
      pagination: result.pagination,
      stats: result.stats,
    });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    return res.status(
      error.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
}
// =====================================================
// CHANGE USER STATUS - ADMIN
// PATCH /api/admin/users/:id/status
// =====================================================

async changeUserStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const user = await changeUserStatusService({
    id,
    status,
  });

  return res.status(httpStatusCode.OK).json({
    success: true,
    message:
      status === "blocked"
        ? "User blocked successfully"
        : "User unblocked successfully",
    data: user,
  });
}

}

module.exports = new UserController();
