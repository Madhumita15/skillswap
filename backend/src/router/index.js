const express = require('express')
const router = express.Router()
const userRouter = require('./auth.router')
const skillRouter = require('./skill.router')
const swapRequestRouter = require('./swapRequest.router')

router.use("/api/auth", userRouter)
router.use("/api", skillRouter)
router.use("/api", swapRequestRouter)


module.exports = router