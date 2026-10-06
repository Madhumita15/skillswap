const mongoose = require("mongoose");

const Skill = require("../models/skill.model");
const SkillCategory = require("../models/skillCategory.model");
const cloudinary = require("../config/cloudinaryConfig");
const httpstatusCode = require("../utils/httpStatusCode");


class SkillController {
  // ============================================================
  // CREATE SKILL
  // ============================================================

  async createSkill(req, res) {
    try {
      const { name, description, category } = req.body;

      // --------------------------------------------------------
      // Check duplicate skill
      // --------------------------------------------------------

      const existingSkill = await Skill.findOne({
        name: name,
      });

      if (existingSkill) {
        // Remove newly uploaded image if skill already exists
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }

        return res.status(httpstatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill already exists",
        });
      }

      // --------------------------------------------------------
      // Check category
      // --------------------------------------------------------

      const existingCategory = await SkillCategory.findOne({
        _id: category,
        status: "active",
      });

      if (!existingCategory) {
        // Remove uploaded image if category is invalid
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }

        return res.status(httpstatusCode.BAD_REQUEST).json({
          success: false,
          message: "Selected category is invalid or inactive",
        });
      }

      // --------------------------------------------------------
      // Cloudinary image
      // --------------------------------------------------------

      let skill_logo = "";
      let skill_logo_public_id = "";

      if (req.file) {
        skill_logo = req.file.path;
        skill_logo_public_id = req.file.filename;
      }

      // --------------------------------------------------------
      // Create skill
      // --------------------------------------------------------

      const skill = await Skill.create({
        name: name,
        description: description,
        category: category,
        skill_logo,
        skill_logo_public_id,
      });

      if (!skill) {
        return res.status(httpstatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill not created",
          data: null,
        });
      }

      return res.status(httpstatusCode.CREATED).json({
        success: true,
        message: "Skill created successfully",
        data: skill,
      });
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  
async getAllSkills(req, res) {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1,
    );

    const limit = Math.max(
      Number(req.query.limit) || 6,
      1,
    );

    const search = String(
      req.query.search || "",
    ).trim();

    const skip = (page - 1) * limit;

    // --------------------------------------------------------
    // ESCAPE SEARCH STRING
    // --------------------------------------------------------

    const escapedSearch = search.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    const searchRegex = new RegExp(
      escapedSearch,
      "i",
    );

    // --------------------------------------------------------
    // SEARCH CONDITION
    // --------------------------------------------------------

    const searchMatch = search
      ? {
          $or: [
            {
              name: {
                $regex: searchRegex,
              },
            },
            {
              description: {
                $regex: searchRegex,
              },
            },
            {
              "category.name": {
                $regex: searchRegex,
              },
            },
          ],
        }
      : {};

    // --------------------------------------------------------
    // AGGREGATION
    // --------------------------------------------------------

    const [result] = await Skill.aggregate([
      // ------------------------------------------------------
      // LOOKUP SKILL CATEGORY
      // ------------------------------------------------------

      {
        $lookup: {
          from: SkillCategory.collection.name,
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },

      // ------------------------------------------------------
      // CONVERT CATEGORY ARRAY TO OBJECT
      // ------------------------------------------------------

      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },

      // ------------------------------------------------------
      // FACET
      // ------------------------------------------------------

      {
        $facet: {
          // ==================================================
          // PAGINATED + SEARCHED SKILLS
          // ==================================================

          data: [
            {
              $match: searchMatch,
            },

            {
              $sort: {
                createdAt: -1,
              },
            },

            {
              $skip: skip,
            },

            {
              $limit: limit,
            },

            // ----------------------------------------------
            // RETURN ONLY REQUIRED CATEGORY FIELDS
            // ----------------------------------------------

            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                skill_logo: 1,
                skill_logo_public_id: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,

                category: {
                  _id: "$category._id",
                  name: "$category.name",
                  description:
                    "$category.description",
                  status: "$category.status",
                },
              },
            },
          ],

          // ==================================================
          // FILTERED TOTAL
          // Used for pagination
          // ==================================================

          filteredCount: [
            {
              $match: searchMatch,
            },

            {
              $count: "count",
            },
          ],

          // ==================================================
          // GLOBAL TOTAL
          // NOT AFFECTED BY SEARCH OR PAGINATION
          // ==================================================

          totalCount: [
            {
              $count: "count",
            },
          ],

          // ==================================================
          // GLOBAL ACTIVE COUNT
          // ==================================================

          activeCount: [
            {
              $match: {
                status: "active",
              },
            },

            {
              $count: "count",
            },
          ],

          // ==================================================
          // GLOBAL INACTIVE COUNT
          // ==================================================

          inactiveCount: [
            {
              $match: {
                status: "inactive",
              },
            },

            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    // --------------------------------------------------------
    // EXTRACT COUNTS
    // --------------------------------------------------------

    const totalSkills =
      result?.totalCount?.[0]?.count || 0;

    const activeSkills =
      result?.activeCount?.[0]?.count || 0;

    const inactiveSkills =
      result?.inactiveCount?.[0]?.count || 0;

    const filteredTotalSkills =
      result?.filteredCount?.[0]?.count || 0;

    // --------------------------------------------------------
    // TOTAL PAGES
    // --------------------------------------------------------

    const totalPages = Math.ceil(
      filteredTotalSkills / limit,
    );

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(httpstatusCode.OK).json({
      success: true,
      message: "Skill fetched successfully!",

      data: result?.data || [],

      // Global counts
      totalSkills,
      activeSkills,
      inactiveSkills,

      // Search-based pagination
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(
      httpstatusCode.SERVER_ERROR,
    ).json({
      success: false,
      message: error.message,
    });
  }
}

// ============================================================
// GET SKILL BY ID
// ============================================================

  async getSkillById(req, res) {
    try {
      const skill = await Skill.findById(req.params.id).populate(
        "category",
        "name description status",
      );

      if (!skill) {
        return res.status(httpstatusCode.NOT_FOUND).json({
          success: false,
          message: "Skill not found",
          data: null,
        });
      }

      return res.status(httpstatusCode.OK).json({
        success: true,
        message: "Skill gets successfully!",
        data: skill,
      });
    } catch (error) {
      return res.status(httpstatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================================
  // UPDATE SKILL
  // ============================================================

  async updateSkill(req, res) {
    try {
      const { name, description, category } = req.body;

      // --------------------------------------------------------
      // Find skill
      // --------------------------------------------------------

      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        // Remove uploaded image if skill doesn't exist
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }

        return res.status(httpstatusCode.NOT_FOUND).json({
          success: false,
          message: "Skill not found",
        });
      }

      // --------------------------------------------------------
      // Check duplicate name
      // --------------------------------------------------------

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

      // --------------------------------------------------------
      // Update description
      // --------------------------------------------------------

      if (description) {
        skill.description = description;
      }

      // --------------------------------------------------------
      // Update category
      // --------------------------------------------------------

      if (category) {
        const existingCategory = await SkillCategory.findOne({
          _id: category,
          status: "active",
        });

        if (!existingCategory) {
          if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
          }

          return res.status(httpstatusCode.BAD_REQUEST).json({
            success: false,
            message: "Selected category is invalid or inactive",
          });
        }

        skill.category = category;
      }

      // --------------------------------------------------------
      // Update skill logo
      // --------------------------------------------------------

      if (req.file) {
        // Delete old image from Cloudinary
        if (skill.skill_logo_public_id) {
          await cloudinary.uploader.destroy(
            skill.skill_logo_public_id,
          );
        }

        skill.skill_logo = req.file.path;
        skill.skill_logo_public_id = req.file.filename;
      }

      // --------------------------------------------------------
      // Save
      // --------------------------------------------------------

      await skill.save();

      // Populate category before sending response
      await skill.populate(
        "category",
        "name description status",
      );

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

// ============================================================
// DEACTIVATE SKILL
// ============================================================

async inactiveSkill(req, res) {
  try {
    const { id } = req.params;

    // --------------------------------------------------------
    // VALIDATE SKILL ID
    // --------------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpstatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid skill id",
      });
    }

    // --------------------------------------------------------
    // UPDATE STATUS
    // --------------------------------------------------------

    const updatedSkill =
      await Skill.findByIdAndUpdate(
        id,
        {
          $set: {
            status: "inactive",
          },
        },
        {
          new: true,
        },
      );

    // --------------------------------------------------------
    // SKILL NOT FOUND
    // --------------------------------------------------------

    if (!updatedSkill) {
      return res.status(httpstatusCode.NOT_FOUND).json({
        success: false,
        message: "Skill not found",
      });
    }

    // --------------------------------------------------------
    // GET UPDATED SKILL WITH CATEGORY USING $LOOKUP
    // --------------------------------------------------------

    const [skill] = await Skill.aggregate([
      // ------------------------------------------------------
      // FIND UPDATED SKILL
      // ------------------------------------------------------

      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },

      // ------------------------------------------------------
      // LOOKUP CATEGORY
      // ------------------------------------------------------

      {
        $lookup: {
          from: SkillCategory.collection.name,
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },

      // ------------------------------------------------------
      // CONVERT CATEGORY ARRAY TO OBJECT
      // ------------------------------------------------------

      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },

      // ------------------------------------------------------
      // SELECT REQUIRED FIELDS
      // ------------------------------------------------------

      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          skill_logo: 1,
          skill_logo_public_id: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,

          category: {
            _id: "$category._id",
            name: "$category.name",
            description: "$category.description",
            status: "$category.status",
          },
        },
      },
    ]);

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(httpstatusCode.OK).json({
      success: true,
      message: "Skill marked as inactive",
      data: skill,
    });
  } catch (error) {
    return res.status(
      httpstatusCode.SERVER_ERROR,
    ).json({
      success: false,
      message: error.message,
    });
  }
}

  // ============================================================
  // GET ACTIVE SKILLS
  // ============================================================

  async getActiveSkills(req, res) {
    try {
      const category = req.query.category
      
      let filter = {}
      if(category){
        filter.category = category

      }
      console.log("category", filter)
      const skills = await Skill.find({
        status: "active", ...filter
      })
        .populate("category", "name description status")
        .sort({
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