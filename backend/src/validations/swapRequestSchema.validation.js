const joi = require('joi')

class SwapRequestSchema{
    static swapOperation = joi.object({
        message: joi.string().required().messages({
            "string.required": "Message is required",
            "any.required": "Message is required"
        }),
        teachingSkill: joi.string().required().messages({
            "string.required": "Teaching skill is required",
            "any.required": "Teaching skill is required"
        }),
        learningSkill: joi.string().required().messages({
            "string.required": "Learning skill is required",
            "any.required": "Learning skill is required"
        }),
        receiverId: joi.string().required().messages({
            "string.required": "Receiver id is required",
            "any.required": "Receiver id is required"
        })
    })

}

module.exports =  SwapRequestSchema