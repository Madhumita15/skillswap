export type SwapStatus = "active" | "completed" | "cancelled";

export interface SwapUser {
  _id?: string;
  name: string;
  email: string;
  experience?: string;
  bio?: string;
  avatar_image?: string;
}

export interface SwapSkill {
  _id: string;
  name: string;
  skill_logo?: string;
  description?: string;
}

export interface Swap {
  _id: string;

  status: SwapStatus;

  senderUser?: SwapUser;
  receiverUser?: SwapUser;

  teachingSkills?: SwapSkill;
  learningSkills?: SwapSkill;

  // Backend currently has a naming mismatch:
  // model: startDate / completedDate
  // admin aggregation: startAt / completedAt
  startDate?: string;
  completedDate?: string;
  cancelledDate?: string;

  startAt?: string;
  completedAt?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface SwapsResponse {
  success: boolean;
  message: string;
  data: Swap[];
  currentPage: number;
  totalPages: number;
  totalSwapRequest: number;
}

export interface SwapResponse {
  success: boolean;
  message: string;
  data: Swap;
}