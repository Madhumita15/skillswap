const express = require('express')
const router = express.Router();
const SkillController = require("../controller/skill.controller");
const upload = require("../utils/cloudinary");
const validation = require("../validations/index");
const skillSchemaValidation = require("../validations/skillSchema.validation");
const authMiddleware = require("../middleware/auth.middleware");
const httpStatusCode = require('../utils/httpStatusCode')

const uploadImageMiddleware = (req, res, next) => {
  upload.single("skill_logo")(req, res, (err) => {
    if (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};

/* ============================================================
   GET ACTIVE SKILLS
============================================================ */

router.get(
  "/skills/active",
  SkillController.getActiveSkills,
);

/* ============================================================
   CREATE SKILL
============================================================ */

router.post(
  "/skills",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  uploadImageMiddleware,
  validation.validate(skillSchemaValidation.create),
  SkillController.createSkill,
);

/* ============================================================
   GET ALL SKILLS
============================================================ */

router.get(
  "/admin/skills",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  SkillController.getAllSkills,
);

/* ============================================================
   GET SKILL BY ID
============================================================ */

router.get(
  "/skills/:id",
  SkillController.getSkillById,
);

/* ============================================================
   UPDATE SKILL
============================================================ */

router.put(
  "/skills/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  uploadImageMiddleware,
  validation.validate(skillSchemaValidation.update),
  SkillController.updateSkill,
);

/* ============================================================
   INACTIVE SKILL
============================================================ */

router.patch(
  "/skills/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  SkillController.inactiveSkill,
);

module.exports = router;
