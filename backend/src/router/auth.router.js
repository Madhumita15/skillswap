const express = require('express')
const router = express.Router()
const validation = require('../validations/index')
const userSchemaValidation = require("../validations/userSchema.validation")
const userController = require("../controller/auth.controller")
const upload = require('../utils/cloudinary')
const httpStatusCode = require('../utils/httpStatusCode')
const authMiddleware = require("../middleware/auth.middleware")
const asyncHandeler = require('../middleware/asyncHandeler.middleware')


const uploadImageMiddleware = (req, res, next)=>{
    upload.single("avatar_image")(req, res, (err)=>{
        if(err){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: err.message
            })
        }
        next()
    })
}

router.post("/register",uploadImageMiddleware, validation.validate(userSchemaValidation.register), asyncHandeler(userController.register))
router.post("/verify-email", validation.validate(userSchemaValidation.verifyEmail),asyncHandeler(userController.mailVerify))
router.post("/login", validation.validate(userSchemaValidation.login), asyncHandeler(userController.login))
router.post("/logout", (req, res, next)=> {
   console.log("🔥 LOGOUT ROUTE HIT");
    next();

}, authMiddleware.verifyToken, (req, res, next)=> {
   console.log("🔥 LOGOUT ROUTE HIT2");
    next();
}, asyncHandeler(userController.logout))


module.exports = router