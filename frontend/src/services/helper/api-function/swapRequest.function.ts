import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getSentRequest = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.swapRequest.sent}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }

}



export const getReceivedRequest = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.swapRequest.received}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }

}