const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const swapController = require("../controller/swap.controller");
const asyncHandeler = require("../middleware/asyncHandeler.middleware");

router.get(
  "/swaps/history",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapController.getHistorySwap),
);

router.get(
  "/swaps/active",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapController.getActiveSwap),
);


router.get(
  "/admin/swaps",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandeler(swapController.getAllSwap),
);

router.patch(
  "/swaps/:id/cancel",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapController.cancelSwap),
);

router.patch(
  "/swaps/:id/complete",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user"),
  asyncHandeler(swapController.completeSwap),
);
module.exports = router;
