const express = require("express");
const router = express.Router();
const SkillController = require("../controller/skill.controller");
const upload = require("../utils/cloudinary");
const validation = require("../validations/index");
const skillSchemaValidation = require("../validations/skillSchema.validation");
const authMiddleware = require("../middleware/auth.middleware");

const uploadImageMiddleware = (req, res, next) => {
  upload.single("skill_logo")(req, res, (err) => {
    if (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
    next();
  });
};

router.get("/skills", SkillController.getActiveSkills);

router.post(
  "/skills",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  uploadImageMiddleware,
  validation.validate(skillSchemaValidation.skiiOperation),
  SkillController.createSkill,
);

router.get(
  "/skills",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  SkillController.getAllSkills,
);

router.get("/skills/:id", SkillController.getSkillById);

router.put(
  "/skills/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  uploadImageMiddleware,
  validation.validate(skillSchemaValidation.skiiOperation),
  SkillController.updateSkill,
);

router.patch(
  "/skills/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  SkillController.inactiveSkill,
);

module.exports = router;
