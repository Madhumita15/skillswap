import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"
import { swapRequestType } from "@/typescript/type/swapRequest.type"

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




export const sendSwapRequest = async({data}:{data: swapRequestType})=>{
    try {
        const response = await axiosInstance.post(`${ENDPOINT.swapRequest.post}`, data)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}



export const cancelSwapRequest = async(id: string)=>{
    try {

        const response = await axiosInstance.patch(`${ENDPOINT.swapRequest.post}/${id}/cancel`)
        return response.data
        
    } catch (error) {
           throw getErrorMessage(error)
        
    }
}



export const acceptSwapRequest = async(id: string)=>{
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.swapRequest.post}/${id}/accept`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const rejectSwapRequest = async(id: string)=>{
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.swapRequest.post}/${id}/reject`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}