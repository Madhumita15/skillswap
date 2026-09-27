import { getProfile } from "@/services/helper/api-function/profile.function"
import { useQuery } from "@tanstack/react-query"

export const useProfile = ()=>{
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile
    })
}