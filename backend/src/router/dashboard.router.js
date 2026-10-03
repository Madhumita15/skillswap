
const express = require("express");

const router = express.Router();

const dashboardController = require("../controller/dashboard.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

const asyncHandler = require("../middleware/asyncHandeler.middleware");

// User dashboard
router.get(
  "/user",
  AuthMiddleware.verifyToken,
  AuthMiddleware.roleCheck("user"),
  asyncHandler(dashboardController.getUserDashboard)
);

//Admin dashboard
router.get(
  "/admin",
  AuthMiddleware.verifyToken,
  AuthMiddleware.roleCheck("admin"),
  asyncHandler(dashboardController.getAdminDashboard)
);

module.exports = router;

