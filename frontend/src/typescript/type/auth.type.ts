export type RegisterType = {
    name: string,
    email: string,
    password: string,
    phone: string,
}


export type LoginType = {
    email: string,
    password: string,
    
}

export type VerifyEmailType = {
    email: string,
    otp: string,
    
}

export interface ForgotPasswordType {
  email: string;
}

export interface ResetPasswordType {
  password: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_image?: string;
  isEmailVerified?: boolean;
  isOnboardingComplete?: boolean;
  role?: "admin" | "user";
  status?: string;
}