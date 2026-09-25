
const {
  getProfileService,
  completeOnBoardingService,
  updateProfileService,
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
      data: user,
    });
  }

  // =====================================================
  // COMPLETE ONBOARDING
  // PATCH /api/users/onboarding
  // =====================================================

  async completeOnBoarding(req, res) {
    const id = req.user._id;

    const {
      teachingSkills,
      learningSkills,
      experience,
      bio,
    } = req.body;

    const avatar_image = req.file
      ? req.file.path
      : undefined;

    const avatar_public_id = req.file
      ? req.file.filename
      : undefined;

    const user = await completeOnBoardingService({
      id,
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

    const {
      name,
      phone,
    } = req.body;

    const avatar_image = req.file
      ? req.file.path
      : undefined;

    const avatar_public_id = req.file
      ? req.file.filename
      : undefined;

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
}

module.exports = new UserController();
