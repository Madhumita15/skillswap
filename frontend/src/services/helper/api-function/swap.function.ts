import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getSwapHistory = async({page, limit, signal}: {page: number, limit: number, signal: AbortSignal})=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.swaps.history}`, {params: {page: page, limit: limit}, signal})
        return response.data
        
    } catch (error) {
        return getErrorMessage(error)
        
    }
}


export const getActiveSwap = async()=> {
    try {
        const response = await axiosInstance.get(`${ENDPOINT.swaps.active}`)
        return response.data
        
    } catch (error) {
        return getErrorMessage(error)
        
    }
}



export const completeSwap = async(id: string)=>{
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.swaps.post}/${id}/complete`)
        return response.data
        
    } catch (error) {
         return getErrorMessage(error)
        
    }
}



export const cancelSwap = async(id: string)=>{
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.swaps.post}/${id}/cancel`)
        return response.data
        
    } catch (error) {
         return getErrorMessage(error)
        
    }
}