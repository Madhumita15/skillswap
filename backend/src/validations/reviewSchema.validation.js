
const Joi = require("joi");

const createReviewSchema = Joi.object({ 
    swapId: Joi.string() 
    .hex() 
    .length(24) 
    .required() 
    .messages({ "string.empty": "Swap ID is required", 
        "string.length": "Invalid swap ID", 
        "string.hex": "Invalid swap ID", 
        "any.required": "Swap ID is required", }),

     reviewedUserId: Joi.string() 
     .hex() 
     .length(24) 
     .required() 
     .messages({ "string.empty": "Reviewed user ID is required", 
        "string.length": "Invalid user ID", 
        "string.hex": "Invalid user ID", 
        "any.required": "Reviewed user ID is required", 
    }), 
    
    rating: Joi.number() 
    .integer() 
    .min(1) 
    .max(5) 
    .required() 
    .messages({ "number.base": "Rating must be a number", 
        "number.integer": "Rating must be a whole number", 
        "number.min": "Rating must be at least 1", 
        "number.max": "Rating cannot be greater than 5", 
        "any.required": "Rating is required", }), 
        
    comment: Joi.string() 
        .trim() 
        .max(1000) 
        .allow("", null) 
        .messages({ "string.max": "Comment cannot exceed 1000 characters",

         }), 

});

module.exports = { createReviewSchema, };