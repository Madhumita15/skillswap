export interface SkillCategory {
  _id: string;
  name: string;
  description?: string;
  status?: "active" | "inactive";
}

export interface Skill {
  _id: string;
  name: string;
  description: string;

  category: SkillCategory | string;

  skill_logo?: string;
  skill_logo_public_id?: string;

  status: "active" | "inactive";

  createdAt?: string;
  updatedAt?: string;
}

export interface SkillsResponse {
  success: boolean;
  message?: string;

  data: Skill[];

  totalSkills: number;

  activeSkills: number;

  inactiveSkills: number;

  totalPages: number;

  currentPage: number;
}

export interface SkillResponse {
  success: boolean;
  message: string;
  data: Skill;
}

export interface SkillFormData {
  name: string;
  description: string;
  category: string;
  skill_logo?: File | null;
}

export interface ActiveSkillsResponse {
  success: boolean;
  data: Skill[];
}