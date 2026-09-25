const joi = require("joi");

class UserSchemaValidation {
  static register = joi.object({
    name: joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    password: joi.string().trim().min(6).max(15).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 character",
      "string.max": "Password cannot exceed 15 character",
      "any.required": "Password is required",
    }),
    phone: joi
      .string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": "Phone No is required",
        "string.pattern.base": "Phone Number must be 10 digit",
        "any.required": "Phone No required",
      }),
    role: joi.string().valid("user", "admin").optional().messages({
      "any.only": "Role must be one of - user, admin",
    }),
  });

  static login = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    password: joi.string().trim().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });

  static verifyEmail = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),
    otp: joi.string().min(4).max(4).required().messages({
      "string.required": "OTP is required",
      "any.required": "OTP is required",
    }),
  });

 
  //Complete Onboarding Validation 
   static completeOnboardingSchema = joi.object({ 

    teachingSkills: joi.array() 
    .items( joi.string() 
    .trim() 
    .required() 
    .messages({ 
      "string.empty": "Teaching skill cannot be empty", 
      "any.required": "Teaching skill is required", 
    }) 
  ) 
  .min(1) 
  .required() 
  .messages({ "array.base": "Teaching skills must be an array", 
    "array.min": "Please select at least one teaching skill", 
    "any.required": "Teaching skills are required", }),

   learningSkills: joi.array() 
   .items( joi.string() 
   .trim() 
   .required() 
   .messages({ 
    "string.empty": "Learning skill cannot be empty", 
    "any.required": "Learning skill is required", 
  }) 
) 
.min(1) 
.required() 
.messages({ 
  "array.base": "Learning skills must be an array", 
  "array.min": "Please select at least one learning skill", 
  "any.required": "Learning skills are required",
 }), 

 experience: joi.string() 
 .trim() 
 .min(10) 
 .max(1000) 
 .required() 
 .messages({ 
  "string.empty": "Experience is required", 
  "string.min": "Experience must be at least 10 characters", 
  "string.max": "Experience cannot exceed 1000 characters", 
  "any.required": "Experience is required", }), 
  
  bio: joi.string() 
  .trim() 
  .min(10) 
  .max(1000) 
  .required() 
  .messages({ 
    "string.empty": "Bio is required", 
    "string.min": "Bio must be at least 10 characters", 
    "string.max": "Bio cannot exceed 1000 characters", 
    "any.required": "Bio is required", }), });

}


//updateProfileSchema
const updateProfileSchema = joi.object({
  name: joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),

  phone: joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base":
        "Phone number must contain exactly 10 digits",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the profile",
  });



module.exports = UserSchemaValidation;
