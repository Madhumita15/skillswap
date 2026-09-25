const express = require('express')
const router = express.Router()
const userRouter = require('./auth.router')
const skillRouter = require('./skill.router')
const swapRequestRouter = require('./swapRequest.router')
const reviewRouter = require('./review.router')
const usersRouter = require('./user.router')

router.use("/api/auth", userRouter)
router.use("/api", skillRouter)
router.use("/api", swapRequestRouter)
router.use("/api/reviews", reviewRouter);
router.use("/api", usersRouter)


module.exports = router