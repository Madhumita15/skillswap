const express = require('express')
const router = express.Router()
const matchController = require('../controller/match.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get("/users/discover", authMiddleware.verifyToken, matchController.getAllUser)
router.get("/users/match", authMiddleware.verifyToken, matchController.getMyMatch)


module.exports = router