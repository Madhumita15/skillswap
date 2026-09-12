const express = require("express");

const router = express.Router();

const SkillController = require('../../controller/Apis/skillController')
const upload = require("../../middleware/upload");

router.post(
    "/skills",
    upload.single("skill_logo"),
    SkillController.createSkill
);

router.get(
    "/skills",
    SkillController.getAllSkills
);

router.get(
    "/skills/:id",
    SkillController.getSkillById
);

router.put(
    "/skills/update/:id",
    upload.single("skill_logo"),
    SkillController.updateSkill
);

router.delete(
    "/skills/delete/:id",
    SkillController.deleteSkill
);


module.exports = router;