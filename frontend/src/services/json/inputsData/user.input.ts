import { OnBoardingStep1Type, OnBoardingStep4Type, OnboardingFieldConfig } from "@/typescript/type/user.type";
import { UserRound, Phone, Briefcase, FileText } from "lucide-react";

export const step1InputData: OnboardingFieldConfig<OnBoardingStep1Type>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your full name",
    Icon: UserRound,
  },
  {
    name: "phone",
    label: "Phone No",
    type: "text",
    required: false,
    placeholder: "e.g. +1234567890",
    Icon: Phone,
  },
];

export const step4InputData: OnboardingFieldConfig<OnBoardingStep4Type>[] = [
  {
    name: "experience",
    label: "Experience",
    type: "text",
    required: true,
    placeholder: "e.g. 2 years of web development",
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