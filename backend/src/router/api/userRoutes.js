const express = require("express");

const router = express.Router();

const SkillController = require('../../controller/Apis/skillController')

router.get(
    "/active/list",
    SkillController.getActiveSkills
);

module.exports = router;