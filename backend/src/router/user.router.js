const express = require("express");
const router = express.Router();
const validation = require("../validations/index");
const userSchemaValidation = require("../validations/userSchema.validation");
const userController = require("../controller/user.controller");
const upload = require("../utils/cloudinary");
const httpStatusCode = require("../utils/httpStatusCode");
const authMiddleware = require("../middleware/auth.middleware");
const asyncHandler = require("../middleware/asyncHandeler.middleware");

const uploadImageMiddleware = (req, res, next) => {
  upload.single("avatar_image")(req, res, (err) => {
    if (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
    next();
  });
};

// const arrayConvertMiddleware = (req, res, next) => {
//   if (typeof req.body.teachingSkills === "string") {
//     req.body.teachingSkills = JSON.parse(req.body.teachingSkills);
//   }

//   if (typeof req.body.learningSkills === "string") {
//     req.body.learningSkills = JSON.parse(req.body.learningSkills);
//   }
//   next();
// };

const normalizeSkillArrays = (req, res, next) => {
  if (req.body.teachingSkills) {
    req.body.teachingSkills = Array.isArray(req.body.teachingSkills)
      ? req.body.teachingSkills
      : [req.body.teachingSkills];
  }

  if (req.body.learningSkills) {
    req.body.learningSkills = Array.isArray(req.body.learningSkills)
      ? req.body.learningSkills
      : [req.body.learningSkills];
  }

  next();
};
router.get("/profile", authMiddleware.verifyToken, userController.getProfile);
router.get("/user/:id", authMiddleware.verifyToken, userController.getUserById);
router.patch(
  "/onboarding",
  authMiddleware.verifyToken, uploadImageMiddleware, normalizeSkillArrays,
  validation.validate(userSchemaValidation.completeOnboardingSchema),
  asyncHandler(userController.completeOnBoarding),
);

router.put(
  "/profile",
  authMiddleware.verifyToken,
  upload.single("avatar_image"),
  validation.validate(userSchemaValidation.updateProfileSchema),
  asyncHandler(userController.updateProfile),
);

// =====================================================
// ADMIN USER MANAGEMENT
// =====================================================

router.get(
  "/admin/users",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandler(userController.getAllUsers)
);

router.patch(
  "/admin/users/:id/status",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandler(userController.changeUserStatus)
);

module.exports = router;
