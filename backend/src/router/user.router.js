const express = require('express')
const router = express.Router()
const validation = require('../validations/index')
const userSchemaValidation = require("../validations/userSchema.validation")
const userController = require("../controller/user.controller")
const upload = require('../utils/cloudinary')
const httpStatusCode = require('../utils/httpStatusCode')
const authMiddleware = require("../middleware/auth.middleware")

const uploadImageMiddleware = (req, res, next)=>{
    upload.single("avatar_image")(req, res, (err)=>{
        if(err){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: err.message
            })
        }
        next()
    })
}

router.post("/register",uploadImageMiddleware, validation.validate(userSchemaValidation.register), userController.register)
router.post("/verify-email", validation.validate(userSchemaValidation.verifyEmail), userController.mailVerify)
router.post("/login", validation.validate(userSchemaValidation.login), userController.login)
router.post("/logout", authMiddleware.verifyToken, userController.logout)


module.exports = router