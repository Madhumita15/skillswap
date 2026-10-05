import { createReport, getAllReport, getReportById, updateReport } from "@/services/helper/api-function/report.function"
import { ReportType } from "@/typescript/type/report.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreteReport = ()=>{
    const queryClient = useQueryClient()
   return useMutation({
    mutationKey: ["create-report"],
    mutationFn: (data: ReportType)=> createReport(data),
    onSuccess: (res)=>{
        toast.success(res?.message)
        queryClient.invalidateQueries({queryKey: ["get-all-report"]})
        queryClient.invalidateQueries({queryKey: ["users-discovery"]})
        queryClient.invalidateQueries({queryKey: ["user-my-match"]})
    },
    onError: (err: string)=>{
        console.log(err)
        toast.error(err)
    }
   })
}


export const useGetAllReport = ()=>{
    return useQuery({
        queryKey: ["get-all-report"],
        queryFn: getAllReport
    })
}


export const useGetReportById = (id: string)=>{
    return useQuery({
        queryKey: ["get-report"],
        queryFn: () => getReportById(id),
        enabled: !!id
    })
}


export const useUpdateReport = ()=>{
    const queryClient = useQueryClient()
   return useMutation({
    mutationKey: ["update-report"],
    mutationFn: ({id, status}: {id: string, status: string})=> updateReport({id, status}),
    onSuccess: (res)=>{
        toast.success(res?.message)
        queryClient.invalidateQueries({queryKey: ["get-all-report"]})
        queryClient.invalidateQueries({queryKey: ["users-discovery"]})
        queryClient.invalidateQueries({queryKey: ["user-my-match"]})
    },
    onError: (err: string)=>{
        console.log(err)
        toast.error(err)
    }
   })
}


