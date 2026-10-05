import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSkill,
  deactivateSkill,
  getSkillById,
  getSkills,
  updateSkill,
} from "@/services/helper/api-function/skills.function";

/* =====================================================
   QUERY KEYS
===================================================== */

export const skillKeys = {
  all: ["skills"] as const,

  list: (page: number, limit: number,  search: string = "",) =>
    ["skills", "list", page, limit, search] as const,

  detail: (id: string) =>
    ["skills", "detail", id] as const,
};

/* =====================================================
   GET ALL SKILLS
===================================================== */

export const useSkills = (
  page: number,
  limit: number,
  search: string = "",
) => {
  return useQuery({
    queryKey: skillKeys.list(page, limit, search),

    queryFn: () =>
      getSkills(page, limit, search),

    placeholderData: (previousData) =>
      previousData,
  });
};

/* =====================================================
   GET SINGLE SKILL
===================================================== */

export const useSkill = (id: string) => {
  return useQuery({
    queryKey: skillKeys.detail(id),

    queryFn: () => getSkillById(id),

    enabled: !!id,
  });
};

/* =====================================================
   CREATE SKILL
===================================================== */

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: skillKeys.all,
      });
    },
  });
};

/* =====================================================
   UPDATE SKILL
===================================================== */

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => updateSkill(id, formData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: skillKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: skillKeys.detail(variables.id),
      });
    },
  });
};

/* =====================================================
   DEACTIVATE SKILL
===================================================== */

export const useDeactivateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: skillKeys.all,
      });
    },
  });
};