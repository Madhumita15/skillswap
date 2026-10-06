import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  changeSkillCategoryStatus,
  createSkillCategory,
  deactivateSkillCategory,
  getAllCategoryByUser,
  getAllSkillCategories,
  getSkillCategoryById,
  updateSkillCategory,
} from "@/services/helper/api-function/skillCategory.function";

import {
  ChangeSkillCategoryStatusPayload,
  SkillCategoryFormData,
  UpdateSkillCategoryPayload,
} from "@/typescript/interface/skillCategory.interface";



export const useSkillCategoryByUser = ()=>{
  return useQuery({
    queryKey: ["skill-category-user"],
    queryFn: getAllCategoryByUser
  })
}

// ==========================================================
// QUERY KEYS
// ==========================================================

export const skillCategoryKeys = {
  all: ["skill-categories"] as const,

  lists: () =>
    [...skillCategoryKeys.all, "list"] as const,

  list: (page: number, limit: number) =>
    [
      ...skillCategoryKeys.lists(),
      { page, limit },
    ] as const,

  details: () =>
    [...skillCategoryKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...skillCategoryKeys.details(), id] as const,
};

// ==========================================================
// GET ALL CATEGORIES
// ==========================================================

export const useSkillCategories = (
  page = 1,
  limit = 10,
) => {
  return useQuery({
    queryKey: skillCategoryKeys.list(page, limit),

    queryFn: () =>
      getAllSkillCategories(page, limit),

    placeholderData: keepPreviousData,
  });
};

// ==========================================================
// GET SINGLE CATEGORY
// ==========================================================

export const useSkillCategory = (
  categoryId?: string,
) => {
  return useQuery({
    queryKey: skillCategoryKeys.detail(
      categoryId || "",
    ),

    queryFn: () =>
      getSkillCategoryById(categoryId as string),

    enabled: Boolean(categoryId),
  });
};

// ==========================================================
// CREATE CATEGORY
// ==========================================================

export const useCreateSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: SkillCategoryFormData,
    ) => createSkillCategory(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.lists(),
      });
      queryClient.invalidateQueries({queryKey: ["skill-category-user"]})
    },
  });
};

// ==========================================================
// UPDATE CATEGORY
// ==========================================================

export const useUpdateSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSkillCategoryPayload;
    }) =>
      updateSkillCategory(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.detail(
          variables.id,
        ),

      });
      queryClient.invalidateQueries({queryKey: ["skill-category-user"]})
    },
  });
};

// ==========================================================
// CHANGE STATUS
// ==========================================================

export const useChangeSkillCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ChangeSkillCategoryStatusPayload;
    }) =>
      changeSkillCategoryStatus(
        id,
        payload,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.detail(
          variables.id,
        ),
      });
      queryClient.invalidateQueries({queryKey: ["skill-category-user"]})
    },
  });
};

// ==========================================================
// DEACTIVATE CATEGORY
// ==========================================================

export const useDeactivateSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deactivateSkillCategory(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: skillCategoryKeys.detail(id),
      });
      queryClient.invalidateQueries({queryKey: ["skill-category-user"]})
    },
  });
};