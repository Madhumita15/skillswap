import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"
import { ReportType } from "@/typescript/type/report.type"

export const createReport = async(data: ReportType)=>{
    try {

        const response = await axiosInstance.post(`${ENDPOINT.report.post}`, data)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const getAllReport = async()=>{
    try {

        const response = await axiosInstance.post(`${ENDPOINT.report.post}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const getReportById = async(id: string)=>{
    try {

        const response = await axiosInstance.post(`${ENDPOINT.report.post}/${id}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}


export const updateReport = async({id, status}: {id: string, status: string})=>{
    try {

        const response = await axiosInstance.post(`${ENDPOINT.report.post}/${id}`, status)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}