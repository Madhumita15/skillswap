const Skill = require("../models/skill.model");
const cloudinary = require("../config/cloudinaryConfig");
const httpstatusCode = require("../utils/httpStatusCode");

class SkillController {
  // CREATE SKILL
  async createSkill(req, res) {
    try {
      const { name, description } = req.body;
      // Check duplicate skill
      const existingSkill = await Skill.findOne({
        name: name,
      });

      if (existingSkill) {
        if (req.file) {
          await cloudinary.uploader.destroy(existingSkill.skill_logo_public_id);
        }
        return res.status(httpstatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill already exists",
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
        name: name,
        description: description,
        skill_logo,
        skill_logo_public_id,
      });

      if (!skill) {
        return res.status(httpstatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill not created",
          data: null,
        });
      } else {
        return res.status(httpstatusCode.CREATED).json({
          success: true,
          message: "Skill created successfully",
          data: skill,
        });
      }
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET ALL SKILLS
  async getAllSkills(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const skip = (page - 1) * limit;
      const skills = await Skill.find()
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

      const totalSkills = await Skill.countDocuments();
      if (!skills) {
        return res.status(httpstatusCode.OK).json({
          success: false,
          message: "skills not found",
          data: [],
        });
      } else {
        return res.status(httpstatusCode.OK).json({
          status: true,
          message: "Skill fetched successfully!",
          data: skills,
          totalSkills: totalSkills,
          totalPages: Math.ceil(totalSkills / limit),
          currentPage: page,
        });
      }
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET SKILL BY ID
  async getSkillById(req, res) {
    try {
      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(httpstatusCode.NOT_FOUND).json({
          success: false,
          message: "Skill not found",
          data: null,
        });
      } else {
        return res.status(httpstatusCode.OK).json({
          success: true,
          message: "skill gets successfully!",
          data: skill,
        });
      }
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // UPDATE SKILL
  async updateSkill(req, res) {
    try {
      const { name, description } = req.body;

      // Find skill
      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(httpstatusCode.NOT_FOUND).json({
          success: false,
          message: "Skill not found",
        });
      }

      // Check duplicate name
      if (name) {
        const existingSkill = await Skill.findOne({
          name: name,
          _id: { $ne: req.params.id },
        });

        if (existingSkill) {
          if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
          }
          return res.status(httpstatusCode.BAD_REQUEST).json({
            success: false,
            message: "Skill already exists",
          });
        }

        skill.name = name;
      }

      // Update fields
      if (description) {
        skill.description = description;
      }

      // If new logo is uploaded
      if (req.file) {
        // Delete old image from Cloudinary
        if (skill.skill_logo_public_id) {
          await cloudinary.uploader.destroy(skill.skill_logo_public_id);
        }
        skill.skill_logo = req.file.path;
        skill.skill_logo_public_id = req.file.filename;
      }

      await skill.save();

      return res.status(httpstatusCode.OK).json({
        success: true,
        message: "Skill updated successfully",
        data: skill,
      });
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE SKILL
  async inactiveSkill(req, res) {
    try {
      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(httpstatusCode.NOT_FOUND).json({
          success: false,
          message: "Skill not found",
        });
      }

      // Soft delete
      skill.status = "inactive";

      await skill.save();

      return res.status(httpstatusCode.OK).json({
        success: true,
        message: "Skill marked as inactive",
        data: skill,
      });
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET ACTIVE SKILLS
  async getActiveSkills(req, res) {
    try {
      const skills = await Skill.find({
        status: "active",
      }).sort({
        name: 1,
      });

      return res.status(httpstatusCode.OK).json({
        success: true,
        data: skills,
      });
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new SkillController();
