import {axiosInstance} from "@/lib/axiosInstance";

import {
  ChangeSkillCategoryStatusPayload,
  SkillCategoryFormData,
  UpdateSkillCategoryPayload,
} from "@/typescript/interface/skillCategory.interface";
import { getErrorMessage } from "../global.helper";
import { ENDPOINT } from "../endPoint";

// ==========================================================
// GET ALL SKILL CATEGORIES
// ==========================================================


export const getAllCategoryByUser = async()=>{
  try{
    const response = await axiosInstance.get("/skill-categories/user")
    return response.data

  }catch(error){
    return getErrorMessage(error)
  }
}

export const getAllSkillCategories = async (
  page = 1,
  limit = 10,
) => {
  const response = await axiosInstance.get(
    "/skill-categories",
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data;
};

// ==========================================================
// GET SINGLE SKILL CATEGORY
// ==========================================================

export const getSkillCategoryById = async (
  id: string,
) => {
  const response = await axiosInstance.get(
    `/skill-categories/${id}`,
  );

  return response.data;
};

// ==========================================================
// CREATE SKILL CATEGORY
// ==========================================================

export const createSkillCategory = async (
  payload: SkillCategoryFormData,
) => {
  const response = await axiosInstance.post(
    "/skill-categories",
    payload,
  );

  return response.data;
};

// ==========================================================
// UPDATE SKILL CATEGORY
// ==========================================================

export const updateSkillCategory = async (
  id: string,
  payload: UpdateSkillCategoryPayload,
) => {
  const response = await axiosInstance.put(
    `/skill-categories/${id}`,
    payload,
  );

  return response.data;
};

// ==========================================================
// CHANGE CATEGORY STATUS
// ==========================================================

export const changeSkillCategoryStatus = async (
  id: string,
  payload: ChangeSkillCategoryStatusPayload,
) => {
  const response = await axiosInstance.patch(
    `/skill-categories/${id}`,
    payload,
  );

  return response.data;
};

// ==========================================================
// DEACTIVATE CATEGORY
// ==========================================================

export const deactivateSkillCategory = async (
  id: string,
) => {
  const response = await axiosInstance.patch(
    `/skill-categories/${id}/deactivate`,
  );

  return response.data;
};