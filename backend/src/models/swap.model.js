const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swapSchema = new Schema({

})
const swapModel = mongoose.model("swap", swapSchema)
module.exports = swapModel