const {
  createSkillCategoryService,
  getAllSkillCategoriesService,
  getSkillCategoryByIdService,
  updateSkillCategoryService,
  changeSkillCategoryStatusService,
  deactivateSkillCategoryService,
} = require("../services/skillCategory.service");

const httpStatusCode = require("../utils/httpStatusCode");

// class SkillCategoryController {
//   // ========================================================
//   // CREATE
//   // ========================================================

//   async createSkillCategory(req, res) {
//     const { name, description } = req.body;

//     const category = await createSkillCategoryService({
//       name,
//       description,
//     });

//     return res.status(httpStatusCode.CREATED).json({
//       success: true,
//       message: "Skill category created successfully",
//       data: category,
//     });
//   }

//   // ========================================================
//   // GET ALL
//   // ========================================================

//   async getAllSkillCategories(req, res) {
//     const page = Number.parseInt(req.query.page, 10) || 1;

//     const limit = Number.parseInt(req.query.limit, 10) || 10;

//     const result = await getAllSkillCategoriesService({
//       page,
//       limit,
//     });

//     return res.status(httpStatusCode.OK).json({
//       success: true,
//       message: "Skill categories fetched successfully",
//       data: result.categories,
//       pagination: result.pagination,
//     });
//   }

//   // ========================================================
//   // GET BY ID
//   // ========================================================

//   async getSkillCategoryById(req, res) {
//     const { id } = req.params;

//     const category = await getSkillCategoryByIdService(id);

//     return res.status(httpStatusCode.OK).json({
//       success: true,
//       message: "Skill category fetched successfully",
//       data: category,
//     });
//   }

//   // ========================================================
//   // UPDATE
//   // ========================================================

//   async updateSkillCategory(req, res) {
//     const { id } = req.params;

//     const { name, description, status } = req.body;

//     const category = await updateSkillCategoryService({
//       id,
//       name,
//       description,
//       status,
//     });

//     return res.status(httpStatusCode.OK).json({
//       success: true,
//       message: "Skill category updated successfully",
//       data: category,
//     });
//   }

//   // ========================================================
//   // CHANGE STATUS
//   // ========================================================

//   async changeSkillCategoryStatus(req, res) {
//     const { id } = req.params;

//     const { status } = req.body;

//     const category = await changeSkillCategoryStatusService({
//       id,
//       status,
//     });

//     return res.status(httpStatusCode.OK).json({
//       success: true,
//       message:
//         status === "active"
//           ? "Skill category activated successfully"
//           : "Skill category deactivated successfully",
//       data: category,
//     });
//   }

//   // ========================================================
//   // DEACTIVATE
//   // ========================================================

//   async deactivateSkillCategory(req, res) {
//     const { id } = req.params;

//     const category =
//       await deactivateSkillCategoryService(id);

//     return res.status(httpStatusCode.OK).json({
//       success: true,
//       message: "Skill category deactivated successfully",
//       data: category,
//     });
//   }
// }

class SkillCategoryController {
  async skillCategory(req, res) {
    const { method } = req;

    const { id } = req.params;

    // ======================================================
    // GET
    // ======================================================

    if (method === "GET") {
      // GET /skill-categories/:id
      if (id) {
        const category =
          await getSkillCategoryByIdService(id);

        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "Skill category fetched successfully",
          data: category,
        });
      }

      // GET /skill-categories
      const page =
        Number.parseInt(req.query.page, 10) || 1;

      const limit =
        Number.parseInt(req.query.limit, 10) || 10;

      const result =
        await getAllSkillCategoriesService({
          page,
          limit,
        });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Skill categories fetched successfully",
        data: result.categories,
        pagination: result.pagination,
      });
    }

    // ======================================================
    // POST - CREATE
    // ======================================================

    if (method === "POST") {
      const { name, description } = req.body;

      const category =
        await createSkillCategoryService({
          name,
          description,
        });

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Skill category created successfully",
        data: category,
      });
    }

    // ======================================================
    // PUT - UPDATE
    // ======================================================

    if (method === "PUT") {
      if (!id) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill category id is required",
        });
      }

      const {
        name,
        description,
        status,
      } = req.body;

      const category =
        await updateSkillCategoryService({
          id,
          name,
          description,
          status,
        });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Skill category updated successfully",
        data: category,
      });
    }

    // ======================================================
    // PATCH
    // ======================================================

    if (method === "PATCH") {
      if (!id) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Skill category id is required",
        });
      }

      const { status } = req.body;

      // ----------------------------------------------
      // PATCH /skill-categories/:id
      // status = active/inactive
      // ----------------------------------------------

      if (status) {
        const category =
          await changeSkillCategoryStatusService({
            id,
            status,
          });

        return res.status(httpStatusCode.OK).json({
          success: true,
          message:
            status === "active"
              ? "Skill category activated successfully"
              : "Skill category deactivated successfully",
          data: category,
        });
      }

      // ----------------------------------------------
      // PATCH /skill-categories/:id
      // without status
      // ----------------------------------------------

      const category =
        await deactivateSkillCategoryService(id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Skill category deactivated successfully",
        data: category,
      });
    }

    // ======================================================
    // METHOD NOT ALLOWED
    // ======================================================

    return res.status(
      httpStatusCode.METHOD_NOT_ALLOWED || 405,
    ).json({
      success: false,
      message: `Method ${method} is not allowed`,
    });
  }
}

module.exports = new SkillCategoryController();