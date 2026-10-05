const express = require('express')
const router = express.Router()
const validation = require('../validations/index')
const userSchemaValidation = require("../validations/userSchema.validation")
const userController = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")
const asyncHandeler = require('../middleware/asyncHandeler.middleware')

router.post("/register", validation.validate(userSchemaValidation.register), asyncHandeler(userController.register))
router.post("/verify-email", validation.validate(userSchemaValidation.verifyEmail),asyncHandeler(userController.mailVerify))
router.post("/login", validation.validate(userSchemaValidation.login), asyncHandeler(userController.login))
router.post("/forgot-password", validation.validate(userSchemaValidation.forgotPasswordSchema), asyncHandeler(userController.forgotPassword));
router.post("/reset-password", validation.validate(userSchemaValidation.resetPasswordSchema), asyncHandeler(userController.resetPassword));
router.post("/logout", authMiddleware.verifyToken,asyncHandeler(userController.logout))


module.exports = router