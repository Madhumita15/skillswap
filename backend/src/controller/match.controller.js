const { getAllUserService } = require("../services/match.service")
const httpStatusCode = require("../utils/httpStatusCode")

class MatchController{

    async getAllUser(req, res){
        const users = await getAllUserService()
        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "All users fetched successfully!",
            data: users
        })
        
        
    }

}

module.exports = new MatchController()