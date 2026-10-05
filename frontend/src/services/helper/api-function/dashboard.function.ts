import { axiosInstance } from "@/lib/axiosInstance";
import { getErrorMessage } from "../global.helper";
import { ENDPOINT } from "../endPoint";

export const getUserDashboard = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.dashboard.user}`)
        return response.data
        
    } catch (error) {
         throw getErrorMessage(error);
        
    }
}

export const getAdminDashboard = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.dashboard.admin}`)
        return response.data
        
    } catch (error) {
         throw getErrorMessage(error);
        
    }
}