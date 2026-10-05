import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"
import { UpdateProfileInputType } from "@/typescript/type/user.type"

export const getProfile= async()=>{
    try {
        const profile = await axiosInstance.get(`${ENDPOINT.user.profile}`)
        return profile.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const getUserById = async(id: string | undefined)=>{
    try {
        const user = await axiosInstance.get(`${ENDPOINT.user.userById}/${id}`)
        return user
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}



export const updateUserProfile = async(data: FormData)=>{
    try {
        const response = await axiosInstance.put(`${ENDPOINT.user.profile}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}