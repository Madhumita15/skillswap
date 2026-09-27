import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getProfile= async()=>{
    try {
        const profile = await axiosInstance.get(`${ENDPOINT.user.profile}`)
        return profile.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}