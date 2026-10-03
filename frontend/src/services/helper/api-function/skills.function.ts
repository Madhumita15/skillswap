import { axiosInstance } from "@/lib/axiosInstance";

import type {
  ActiveSkillsResponse,
  SkillResponse,
  SkillsResponse,
} from "@/typescript/interface/skillsAdmin.interface";

/* =====================================================
   GET ALL SKILLS
===================================================== */

export const getSkills = async (
  page: number = 1,
  limit: number = 6,
   search: string = "",
): Promise<SkillsResponse> => {
  const response = await axiosInstance.get("/skills", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

/* =====================================================
   GET SKILL BY ID
===================================================== */

export const getSkillById = async (
  id: string
): Promise<SkillResponse> => {
  const response = await axiosInstance.get(`/skills/${id}`);

  return response.data;
};

/* =====================================================
   CREATE SKILL
===================================================== */

export const createSkill = async (
  formData: FormData
): Promise<SkillResponse> => {
  const response = await axiosInstance.post(
    "/skills",
    formData
  );

  return response.data;
};

/* =====================================================
   UPDATE SKILL
===================================================== */

export const updateSkill = async (
  id: string,
  formData: FormData
): Promise<SkillResponse> => {
  const response = await axiosInstance.put(
    `/skills/${id}`,
    formData
  );

  return response.data;
};

/* =====================================================
   DEACTIVATE SKILL
===================================================== */

export const deactivateSkill = async (
  id: string
): Promise<SkillResponse> => {
  const response = await axiosInstance.patch(
    `/skills/${id}`
  );

  return response.data;
};

/* =====================================================
   GET ACTIVE SKILLS
===================================================== */

export const getActiveSkills =
  async (): Promise<ActiveSkillsResponse> => {
    const response = await axiosInstance.get(
      "/skills/active"
    );

    return response.data;
  };