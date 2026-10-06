import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"
import { UpdatedDataType } from "@/typescript/type/user.type"

export const createReview = async(data:UpdatedDataType)=>{
    try {
        const response = await axiosInstance.post(`${ENDPOINT.reviews.create}`, data)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const getReceivedReviews = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.reviews.received}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}



export const getGivenReviews = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.reviews.given}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}