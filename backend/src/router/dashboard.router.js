
const express = require("express");

const router = express.Router();

const dashboardController = require("../controller/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const asyncHandler = require("../middleware/asyncHandler");

// User dashboard
router.get(
  "/user",
  authMiddleware,
  roleMiddleware("user"),
  asyncHandler(dashboardController.getUserDashboard)
);

// Admin dashboard
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  asyncHandler(dashboardController.getAdminDashboard)
);

module.exports = router;

