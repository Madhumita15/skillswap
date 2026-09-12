const Skill = require("../../models/skill.model");
const cloudinary = require("../../config/cloudinary");

class SkillController {

    async createSkill(req, res) {
        try {

            const { name, description, status } = req.body;

            if (!name || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Name and description are required"
                });
            }

            const existingSkill = await Skill.findOne({
                name: name.trim()
            });

            if (existingSkill) {
                return res.status(400).json({
                    success: false,
                    message: "Skill already exists"
                });
            }

            let skill_logo = "";
            let skill_logo_public_id = "";

            // If image exists
            if (req.file) {

                const result = await new Promise((resolve, reject) => {

                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "skills"
                        },
                        (error, result) => {

                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }

                        }
                    );

                    uploadStream.end(req.file.buffer);

                });

                skill_logo = result.secure_url;
                skill_logo_public_id = result.public_id;
            }

            const skill = await Skill.create({
                name,
                description,
                skill_logo,
                skill_logo_public_id,
                status: status || "active"
            });

            res.status(201).json({
                success: true,
                message: "Skill created successfully",
                data: skill
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    async getAllSkills(req, res) {
        try {

            const skills = await Skill.find().sort({
                createdAt: -1
            });

            res.status(200).json({
                success: true,
                count: skills.length,
                data: skills
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    async getSkillById(req, res) {
        try {

            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(404).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            res.status(200).json({
                success: true,
                data: skill
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    async updateSkill(req, res) {
        try {

            const { name, description, status } = req.body;

            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(404).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            skill.name = name || skill.name;
            skill.description = description || skill.description;
            skill.status = status || skill.status;

            // If new logo uploaded
            if (req.file) {

                // Delete old logo from Cloudinary
                if (skill.skill_logo_public_id) {

                    await cloudinary.uploader.destroy(
                        skill.skill_logo_public_id
                    );
                }

                const result = await new Promise((resolve, reject) => {

                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "skills"
                        },
                        (error, result) => {

                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }

                        }
                    );

                    uploadStream.end(req.file.buffer);

                });

                skill.skill_logo = result.secure_url;
                skill.skill_logo_public_id = result.public_id;
            }

            await skill.save();

            res.status(200).json({
                success: true,
                message: "Skill updated successfully",
                data: skill
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    async deleteSkill(req, res) {
        try {

            const skill = await Skill.findById(req.params.id);

            if (!skill) {
                return res.status(404).json({
                    success: false,
                    message: "Skill not found"
                });
            }

            skill.status = "inactive";

            await skill.save();

            res.status(200).json({
                success: true,
                message: "Skill marked as inactive",
                data: skill
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    async getActiveSkills(req, res) {
        try {

            const skills = await Skill.find({
                status: "active"
            }).sort({
                name: 1
            });

            res.status(200).json({
                success: true,
                count: skills.length,
                data: skills
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

}

module.exports = new SkillController();