import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getActiveAllSkill = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.skills.get}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }

}