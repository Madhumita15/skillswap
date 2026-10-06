export type SwapRequestStatus =
  | "pending"
  | "rejected"
  | "accepted"
  | "cancelled"
  | "completed";

// ==========================================================
// SKILL
// ==========================================================

export interface SwapRequestSkill {
  _id: string;
  name: string;
  skill_logo?: string;
  description?: string;
}

// ==========================================================
// USER
// ==========================================================

export interface SwapRequestUser {
  _id: string;
  name: string;
  email: string;
  status?: string;
  avatar_image?: string;
  avata_image?: string;
  bio?: string;
  experience?: string;
}

// ==========================================================
// SWAP REQUEST
// ==========================================================

export interface SwapRequest {
  _id: string;
  message: string;
  status: SwapRequestStatus;
  createdAt: string;

  senderUser: SwapRequestUser;
  receiverUser: SwapRequestUser;

  teachingSkills: SwapRequestSkill;
  learningSkills: SwapRequestSkill;
}

// ==========================================================
// PAGINATION
// ==========================================================

export interface SwapRequestPagination {
  currentPage: number;
  totalPages: number;
  totalSwapRequest: number;
}

// ==========================================================
// API RESPONSE
// ==========================================================

export interface SwapRequestListResponse {
  success: boolean;
  message: string;
  data: SwapRequest[];
  currentPage: number;
  totalPages: number;
  totalSwapRequest: number;
  totalAcceptedRequest: number;
  totalPendingRequest: number;
  totalRejectedRequest: number;
}