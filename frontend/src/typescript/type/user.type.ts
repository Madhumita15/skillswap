import { LucideIcon } from "lucide-react";

// Skill Interface
export interface Skill {
  _id: string;
  name: string;
  skill_logo?: string,
  status?: string;
}

// Form Values Interface
export interface OnBoardingFormValues {
  learningSkills: string[];
  teachingSkills: string[];
  experience: string;
  bio: string;
  avatar_image: File;
}

// JSON Payload Interface for Backend API
export interface OnBoardingPayload {
  teachingSkills: string[];
  learningSkills: string[];
  experience: string;
  bio: string;
  avatar_image: File;
}

// Sub-step Interfaces for Data Configuration
export interface OnBoardingStep1Type {
  name: string;
  phone?: string;
}

export interface OnBoardingStep4Type {
  experience: string;
  bio: string;
}

// Generic Field Config Interface for DynamicInput Data
export interface OnboardingFieldConfig<T> {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  required: boolean;
  placeholder: string;
  Icon?: LucideIcon;
}


export type UpdateProfileInputDataType = {
  name: string;
  phone: string;
}



export type UpdateProfileInputType = {
  name: string;
  phone: string;
  bio: string;
  experience: string;
  teachingSkills: string[]
  learningSkills: string[]
  avatar_image?: File | null | undefined

}



export type UpdatedDataType ={
 swapId: string;
 reviewedUserId: string;
 rating: number;
 comment: string;
}