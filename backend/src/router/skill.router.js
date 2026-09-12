const express = require("express");
const router = express.Router();
const SkillController = require('../controller/skillController')
const upload = require("../utils/cloudinary");



const uploadImageMiddleware = (req, res, next)=>{
    upload.single("skill_logo")(req, res, (err)=>{
        if(err){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: err.message
            })
        }
        next()
    })
}

router.get(
    "/active/list",
    SkillController.getActiveSkills
);

router.post(
    "/skills",
    uploadImageMiddleware,
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
    uploadImageMiddleware,
    SkillController.updateSkill
);

router.delete(
    "/skills/delete/:id",
    SkillController.deleteSkill
);


module.exports = router;