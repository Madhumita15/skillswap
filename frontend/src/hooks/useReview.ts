"use client"

import { createReview, getGivenReviews, getReceivedReviews } from "@/services/helper/api-function/review.function"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreteReview = ()=>{
    const queryClient = useQueryClient()
   return useMutation({
    mutationKey: ["create-review"],
    mutationFn: (data)=> createReview(data),
    onSuccess: (res)=>{
        toast.success(res?.message)
        queryClient.invalidateQueries({queryKey: ["get-received-review"]})
        queryClient.invalidateQueries({queryKey: ["get-given-review"]})
        
    },
    onError: (err: string)=>{
        console.log(err)
        toast.error(err)
    }
   })
}


export const useGetReceivedReview = ()=>{
    return useQuery({
        queryKey: ["get-received-review"],
        queryFn: getReceivedReviews
    })
}


export const useGetGivenReview = ()=>{
    return useQuery({
        queryKey: ["get-given-review"],
        queryFn: getGivenReviews
    })
}