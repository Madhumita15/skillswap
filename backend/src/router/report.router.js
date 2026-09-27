
const express = require("express");

const router = express.Router();

const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
} = require("../controller/report.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const asyncHandler = require("../middleware/asyncHandler");

// ======================================================
// USER - CREATE REPORT
// POST /api/reports
// ======================================================

router.post(
  "/reports",
  authMiddleware,
  roleMiddleware("user"),
  asyncHandler(createReport)
);

// ======================================================
// ADMIN - GET ALL REPORTS
// GET /api/reports
// ======================================================

router.get(
  "/reports",
  authMiddleware,
  roleMiddleware("admin"),
  asyncHandler(getReports)
);

// ======================================================
// ADMIN - GET ONE REPORT
// GET /api/reports/:id
// ======================================================

router.get(
  "/reports/:id",
  authMiddleware,
  roleMiddleware("admin"),
  asyncHandler(getReportById)
);

// ======================================================
// ADMIN - UPDATE REPORT STATUS
// PUT /api/reports/:id
// ======================================================

router.put(
  "/reports/:id",
  authMiddleware,
  roleMiddleware("admin"),
  asyncHandler(updateReportStatus)
);

module.exports = router;

