const  mongoose = require("mongoose")

const dbCon = async()=>{
    try {
        const connection = mongoose.connect(process.env.MONGO_URL)
        if(connection){
            console.log("MongoDB connected successfully!")
        }else{
            console.log("MongoDB not connected")
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = dbCon