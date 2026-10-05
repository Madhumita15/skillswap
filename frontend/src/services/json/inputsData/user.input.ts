import { InputType } from "@/typescript/type/input.type";
import {  OnBoardingStep4Type, OnboardingFieldConfig, UpdateProfileInputDataType } from "@/typescript/type/user.type";
import {  Briefcase, FileText, Mail, Phone, UserRound } from "lucide-react";



export const step4InputData: OnboardingFieldConfig<OnBoardingStep4Type>[] = [
  {
    name: "experience",
    label: "Experience",
    type: "text",
    required: true,
    placeholder: "e.g. Beginner, Intermediate",
    Icon: Briefcase,
  },
  {
    name: "bio",
    label: "About You",
    type: "textarea",
    required: true,
    placeholder: "Tell the community about yourself, your interests, and what you hope to achieve...",
    Icon: FileText,
  },
];







export const updateProfileInputData:InputType<UpdateProfileInputDataType>[] = [
   {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter your name",
    icon: UserRound
  },
  
  {
    name: "phone",
    label: "Phone No",
    type: "text",
    required: true,
    placeholder: "Enter your valid Phone no",
    icon: Phone
  }

]