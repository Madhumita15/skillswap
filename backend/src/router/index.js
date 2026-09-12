const express = require('express')
const router = express.Router()
const userRouter = require('./user.router')
const skillRouter = require('./skill.router')

router.use("/api/auth", userRouter)
router.use("/api", skillRouter)


module.exports = router