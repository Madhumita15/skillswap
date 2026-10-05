const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const dashboardController = require("../controller/dashboard.controller");
const asyncHandeler = require("../middleware/asyncHandeler.middleware");

// Admin dashboard
router.get(
  "/admin/dashboard",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandeler(dashboardController.getAdminDashboard),
);

router.get(
  "/user/dashboard/dashboard",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(dashboardController.getUserDashboard),
);

module.exports = router;
