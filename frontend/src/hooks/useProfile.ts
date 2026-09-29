import { getProfile, getUserById } from "@/services/helper/api-function/profile.function"
import { useQuery } from "@tanstack/react-query"

export const useProfile = ()=>{
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile
    })
}


export const useUserGetById = ({id}: {id: string | undefined})=> {
    return useQuery({
        queryKey: ["userById", id],
        queryFn: ()=> getUserById(id),
        enabled: !!id

    })
}