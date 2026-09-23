const express = require("express");
const router = express.Router();
const validation = require("../validations/index");
const authMiddleware = require("../middleware/auth.middleware");
const swapRequestController = require('../controller/swapRequest.controller')
const asyncHandeler = require('../middleware/asyncHandeler.middleware')

router.post("/swap-request", authMiddleware.verifyToken, authMiddleware.roleCheck("user"), asyncHandeler(swapRequestController.createRequest))


module.exports = router