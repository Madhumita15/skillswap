const express = require("express");

const router = express.Router();

const skillCategoryController = require(
  "../controller/skillCategory.controller",
);

const AuthMiddleware = require(
  "../middleware/auth.middleware",
);

const asyncHandler = require(
  "../middleware/asyncHandeler.middleware",
);

const Validation = require(
  "../validations",
);

const SkillCategoryValidation = require(
  "../validations/skillCategorySchema.Validation",
);

// // ==========================================================
// // CREATE CATEGORY
// // ==========================================================

// router.post(
//   "/",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   Validation.validate(SkillCategoryValidation.create),
//   asyncHandler(
//     skillCategoryController.createSkillCategory,
//   ),
// );

// // ==========================================================
// // GET ALL CATEGORIES
// // ==========================================================

// router.get(
//   "/",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   asyncHandler(
//     skillCategoryController.getAllSkillCategories,
//   ),
// );

// // ==========================================================
// // GET CATEGORY BY ID
// // ==========================================================

// router.get(
//   "/:id",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   asyncHandler(
//     skillCategoryController.getSkillCategoryById,
//   ),
// );

// // ==========================================================
// // UPDATE CATEGORY
// // ==========================================================

// router.put(
//   "/:id",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   Validation.validate(SkillCategoryValidation.update),
//   asyncHandler(
//     skillCategoryController.updateSkillCategory,
//   ),
// );

// // ==========================================================
// // CHANGE STATUS
// // ==========================================================

// router.patch(
//   "/:id/status",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   Validation.validate(SkillCategoryValidation.status),
//   asyncHandler(
//     skillCategoryController.changeSkillCategoryStatus,
//   ),
// );

// // ==========================================================
// // DEACTIVATE
// // ==========================================================

// router.patch(
//   "/:id/deactivate",
//   AuthMiddleware.verifyToken,
//   AuthMiddleware.roleCheck("admin"),
//   asyncHandler(
//     skillCategoryController.deactivateSkillCategory,
//   ),
// );

router.get("/user", asyncHandler(skillCategoryController.skillCategory))


router.all(
  ["/", "/:id"],
  AuthMiddleware.verifyToken,
  AuthMiddleware.roleCheck("admin"),
  asyncHandler(skillCategoryController.skillCategory),
);

module.exports = router;