const express = require("express");
const router = express.Router();
const validation = require("../validations/index");
const userSchemaValidation = require("../validations/userSchema.validation");
const userController = require("../controller/user.controller");
const upload = require("../utils/cloudinary");
const httpStatusCode = require("../utils/httpStatusCode");
const authMiddleware = require("../middleware/auth.middleware");
const asyncHandler = require('../middleware/asyncHandeler.middleware')

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

router.get(
    "/profile",
    authMiddleware.verifyToken,
    userController.getProfile
);
router.patch(
  "/onboarding",
  authMiddleware.verifyToken,
  uploadImageMiddleware,
  validation.validate(userSchemaValidation.completeOnboardingSchema),
  asyncHandler(userController.completeOnBoarding)
);


router.put(
  "/profile",
  authMiddleware,
  upload.single("avatar_image"),
  validation.validate(updateProfileSchema),
  asyncHandler(userController.updateProfile)
  
);




module.exports = router;