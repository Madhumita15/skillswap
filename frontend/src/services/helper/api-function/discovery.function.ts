import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getDiscovery =async ({page, limit, signal}: {page: number, limit: number, signal: AbortSignal})=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.user.discover}`, {params: {page:page, limit: limit}, signal})
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const getMyMatch = async ()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.user.match}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}