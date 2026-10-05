
const express = require("express");

const router = express.Router();

const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
} = require("../controller/report.controller");
const authMiddleware = require("../middleware/auth.middleware");
const asyncHandler = require("../middleware/asyncHandeler.middleware");
const validation = require('../validations/index')
const {createReportSchema, updateReportStatusSchema} = require('../validations/reportSchema.validation')

// ======================================================
// USER - CREATE REPORT
// POST /api/reports
// ======================================================

router.post(
  "/reports",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  validation.validate(createReportSchema),
  asyncHandler(createReport)
);

// ======================================================
// ADMIN - GET ALL REPORTS
// GET /api/reports
// ======================================================

router.get(
  "/reports",
  authMiddleware.verifyToken,
 authMiddleware.roleCheck("admin"),
  asyncHandler(getReports)
);

// ======================================================
// ADMIN - GET ONE REPORT
// GET /api/reports/:id
// ======================================================

router.get(
  "/reports/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandler(getReportById)
);

// ======================================================
// ADMIN - UPDATE REPORT STATUS
// PUT /api/reports/:id
// ======================================================

router.put(
  "/reports/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  validation.validate(updateReportStatusSchema),
  asyncHandler(updateReportStatus)
);

module.exports = router;

