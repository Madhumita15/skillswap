const mongoose = require("mongoose");

const SkillCategory = require("../models/skillCategory.model");
const Skill = require("../models/skill.model");

const httpStatusCode = require("../utils/httpStatusCode");

// ==========================================================
// CREATE SKILL CATEGORY
// ==========================================================

const createSkillCategoryService = async ({
  name,
  description,
}) => {
  const existingCategory = await SkillCategory.findOne({
    name: {
      $regex: `^${name.trim()}$`,
      $options: "i",
    },
  });

  if (existingCategory) {
    const error = new Error(
      "Skill category with this name already exists",
    );

    error.statusCode = httpStatusCode.CONFLICT;

    throw error;
  }

  const skillCategory = await SkillCategory.create({
    name: name.trim(),
    description: description.trim(),
  });

  return skillCategory;
};

// ==========================================================
// GET ALL SKILL CATEGORIES
// ==========================================================

const getAllSkillCategoriesService = async ({
  page = 1,
  limit = 10,
}) => {
  page = Math.max(Number(page) || 1, 1);

  limit = Math.max(Number(limit) || 10, 1);

  limit = Math.min(limit, 100);

  const skip = (page - 1) * limit;

  const [totalCategories, categories] = await Promise.all([
    SkillCategory.countDocuments(),

    SkillCategory.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  const totalPages = Math.ceil(totalCategories / limit);

  return {
    categories,

    pagination: {
      currentPage: page,
      limit,
      totalCategories,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

// ==========================================================
// GET SINGLE SKILL CATEGORY
// ==========================================================

const getSkillCategoryByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid skill category id");

    error.statusCode = httpStatusCode.BAD_REQUEST;

    throw error;
  }

  const category = await SkillCategory.findById(id);

  if (!category) {
    const error = new Error("Skill category not found");

    error.statusCode = httpStatusCode.NOT_FOUND;

    throw error;
  }

  return category;
};

// ==========================================================
// UPDATE SKILL CATEGORY
// ==========================================================

const updateSkillCategoryService = async ({
  id,
  name,
  description,
  status,
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid skill category id");

    error.statusCode = httpStatusCode.BAD_REQUEST;

    throw error;
  }

  const category = await SkillCategory.findById(id);

  if (!category) {
    const error = new Error("Skill category not found");

    error.statusCode = httpStatusCode.NOT_FOUND;

    throw error;
  }

  if (name !== undefined) {
    const existingCategory = await SkillCategory.findOne({
      _id: { $ne: id },

      name: {
        $regex: `^${name.trim()}$`,
        $options: "i",
      },
    });

    if (existingCategory) {
      const error = new Error(
        "Skill category with this name already exists",
      );

      error.statusCode = httpStatusCode.CONFLICT;

      throw error;
    }

    category.name = name.trim();
  }

  if (description !== undefined) {
    category.description = description.trim();
  }

  if (status !== undefined) {
    category.status = status;
  }

  await category.save();

  return category;
};

// ==========================================================
// CHANGE CATEGORY STATUS
// ==========================================================

const changeSkillCategoryStatusService = async ({
  id,
  status,
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid skill category id");

    error.statusCode = httpStatusCode.BAD_REQUEST;

    throw error;
  }

  if (!["active", "inactive"].includes(status)) {
    const error = new Error(
      "Status must be either active or inactive",
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;

    throw error;
  }

  const category = await SkillCategory.findById(id);

  if (!category) {
    const error = new Error("Skill category not found");

    error.statusCode = httpStatusCode.NOT_FOUND;

    throw error;
  }

  category.status = status;

  await category.save();

  return category;
};

// ==========================================================
// DELETE / DEACTIVATE CATEGORY
// ==========================================================

const deactivateSkillCategoryService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid skill category id");

    error.statusCode = httpStatusCode.BAD_REQUEST;

    throw error;
  }

  const category = await SkillCategory.findById(id);

  if (!category) {
    const error = new Error("Skill category not found");

    error.statusCode = httpStatusCode.NOT_FOUND;

    throw error;
  }

  // Check whether any skills are using this category
  const skillCount = await Skill.countDocuments({
    category: id,
  });

  if (skillCount > 0) {
    const error = new Error(
      "This category cannot be deactivated because skills are associated with it",
    );

    error.statusCode = httpStatusCode.CONFLICT;

    throw error;
  }

  category.status = "inactive";

  await category.save();

  return category;
};

module.exports = {
  createSkillCategoryService,
  getAllSkillCategoriesService,
  getSkillCategoryByIdService,
  updateSkillCategoryService,
  changeSkillCategoryStatusService,
  deactivateSkillCategoryService,
};