const express = require('express')
const router = express.Router()
const authRouter = require('./auth.router')
const skillRouter = require('./skill.router')
const swapRequestRouter = require('./swapRequest.router')
const reviewRouter = require('./review.router')
const usersRouter = require('./user.router')
const swap = require("./swap.router")

router.use("/api/auth", authRouter)
router.use("/api", skillRouter)
router.use("/api", swapRequestRouter)
router.use("/api/reviews", reviewRouter);
router.use("/api", usersRouter)
router.use("/api", swap)


module.exports = router