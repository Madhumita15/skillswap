export type SkillCategoryStatus = "active" | "inactive";

export interface SkillCategory {
  _id: string;
  name: string;
  description: string;
  status: SkillCategoryStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillCategoryPagination {
  currentPage: number;
  limit: number;
  totalCategories: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SkillCategoriesResponse {
  success: boolean;
  message: string;
  data: SkillCategory[];
  pagination: SkillCategoryPagination;
}

export interface SkillCategoryResponse {
  success: boolean;
  message: string;
  data: SkillCategory;
}

export interface SkillCategoryFormData {
  name: string;
  description: string;
}

export interface UpdateSkillCategoryPayload {
  name: string;
  description: string;
  status?: SkillCategoryStatus;
}

export interface ChangeSkillCategoryStatusPayload {
  status: SkillCategoryStatus;
}