const Skill = require("../../models/skill.model");
const cloudinary = require("../../config/cloudinary");
const StatusCode = require("../../utils/statusCode")

class SkillController {

    // CREATE SKILL
    async createSkill(req, res) {
        try {

            const { name, description, status } = req.body;

            // Validation
            if (!name || !description) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Name and description are required"
                });
            }

            // Check duplicate skill
            const existingSkill = await Skill.findOne({
                name: name.trim()
            });

            if (existingSkill) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Skill already exists"
                });
            }

            let skill_logo = "";
            let skill_logo_public_id = "";

            // Image is already uploaded to Cloudinary
            // by multer-storage-cloudinary
            if (req.file) {
                skill_logo = req.file.path;
                skill_logo_public_id = req.file.filename;
            }

            // Create skill
            const skill = await Skill.create({
                name: name.trim(),
                description: description.trim(),
                skill_logo,
                skill_logo_public_id,
                status: status || "active"
            });

            res.status(StatusCode.CREATED).json({
                success: true,
                message: "Skill created successfully",
                data: skill
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }


    // GET ALL SKILLS
    async getAllSkills(req, res) {
        try {

            const skills = await Skill.find().sort({
                createdAt: -1
            });

            res.status(StatusCode.OK).json({
                success: true,
                count: skills.length,
                data: skills
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }


    // GET SKILL BY ID
    async getSkillById(req, res) {
        try {

            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            res.status(StatusCode.OK).json({
                success: true,
                data: skill
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }


    // UPDATE SKILL
    async updateSkill(req, res) {
        try {

            const { name, description, status } = req.body;

            // Find skill
            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            // Check duplicate name
            if (name) {

                const existingSkill = await Skill.findOne({
                    name: name.trim(),
                    _id: { $ne: req.params.id }
                });

                if (existingSkill) {
                    return res.status(StatusCode.BAD_REQUEST).json({
                        success: false,
                        message: "Skill already exists"
                    });
                }

                skill.name = name.trim();
            }

            // Update fields
            if (description) {
                skill.description = description.trim();
            }

            if (status) {
                skill.status = status;
            }


            // If new logo is uploaded
            if (req.file) {

                // Delete old image from Cloudinary
                if (skill.skill_logo_public_id) {

                    await cloudinary.uploader.destroy(
                        skill.skill_logo_public_id
                    );
                }

                // New image is already uploaded
                // by multer-storage-cloudinary
                skill.skill_logo = req.file.path;
                skill.skill_logo_public_id = req.file.filename;
            }


            await skill.save();

            res.status(StatusCode.OK).json({
                success: true,
                message: "Skill updated successfully",
                data: skill
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }


    // DELETE SKILL
    async deleteSkill(req, res) {
        try {

            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            // Soft delete
            skill.status = "inactive";

            await skill.save();

            res.status(StatusCode.OK).json({
                success: true,
                message: "Skill marked as inactive",
                data: skill
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }


    // GET ACTIVE SKILLS
    async getActiveSkills(req, res) {
        try {

            const skills = await Skill.find({
                status: "active"
            }).sort({
                name: 1
            });

            res.status(StatusCode.OK).json({
                success: true,
                count: skills.length,
                data: skills
            });

        } catch (error) {

            res.status(StatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }

}


module.exports = new SkillController();