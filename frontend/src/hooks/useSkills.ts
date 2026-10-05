import { getActiveAllSkill } from "@/services/helper/api-function/skill.function"
import { useQuery } from "@tanstack/react-query"


export const useGetActiveSkillByUser = ()=>{
    return useQuery({
        queryKey: ['get-active-skill'],
        queryFn: getActiveAllSkill

    })
}


