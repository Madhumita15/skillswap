const express = require("express");
const router = express.Router();
const validation = require("../validations/index");
const authMiddleware = require("../middleware/auth.middleware");
const swapRequestController = require("../controller/swapRequest.controller");
const asyncHandeler = require("../middleware/asyncHandeler.middleware");
const swapRequestSchema = require('../validations/swapRequestSchema.validation')

router.post(
  "/swap-requests",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  validation.validate(swapRequestSchema.swapOperation),
  asyncHandeler(swapRequestController.createRequest),
);

router.get(
  "/swap-requests/sent",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapRequestController.getSendingRequests),
);

router.get(
  "/swap-requests/received",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapRequestController.getReceivedRequests),
);

router.patch(
  "/swap-requests/:id/cancel",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapRequestController.cancelSwappingRequest),
);

router.patch(
  "/swap-requests/:id/reject",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapRequestController.rejectSwapRequest),
);

router.patch(
  "/swap-requests/:id/accept",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapRequestController.acceptSwapRequest),
);

router.get(
  "/admin/swap-requests",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandeler(swapRequestController.getAllSwapRequest),
);
module.exports = router;
