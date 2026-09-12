const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    otp: {
        type: String,
        trim: true,
        required: [true, "OTP is required"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "15m"

    }

})

const otpModel = mongoose.model("otp", otpSchema)
module.exports = otpModel