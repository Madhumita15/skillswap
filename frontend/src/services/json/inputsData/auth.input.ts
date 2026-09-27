import { LoginType, RegisterType, VerifyEmailType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";
import { LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

export const registerInputData:InputType<RegisterType>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter your name",
    icon: UserRound
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    placeholder: "Enter your email",
    icon: Mail
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    icon: LockKeyhole
  },
  {
    name: "phone",
    label: "Phone No",
    type: "text",
    required: true,
    placeholder: "Enter your valid Phone no",
    icon: Phone
  },
];




export const loginInputData:InputType<LoginType>[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    placeholder: "Enter your email",
    icon: Mail
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    icon: LockKeyhole

  }
];




export const verifyEmailData:InputType<VerifyEmailType>[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    placeholder: "Enter your email",
    icon: Mail
  },
  {
    name: "otp",
    label: "OTP",
    type: "text",
    required: true,
    placeholder: "Enter OTP here",
    icon: ShieldCheck

  }
];