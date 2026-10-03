export interface UserSkill {
  _id: string;
  name: string;
  skill_logo?: string;
  description?: string;
}

export type UserStatus = "active" | "blocked";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  experience?: string | number;

  avatar_image?: string;

  role?: string;

  status: UserStatus;

  isEmailVerified?: boolean;
  isOnboardingComplete?: boolean;

  teachingSkills?: UserSkill[];
  learningSkills?: UserSkill[];

  createdAt?: string;
  updatedAt?: string;
}

export interface UserPagination {
  currentPage: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: UserPagination;
  stats: UserStats;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User | User[];
}

export interface ChangeUserStatusPayload {
  status: UserStatus;
}