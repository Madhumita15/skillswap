import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      "Name can contain only letters and spaces",
    )
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter, one digit, and one special character",
    )
    .min(6, "Password must be at least 6 character")
    .max(15, "Password cannot exceed 15 character")
    .required("Password is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[6-9]\d{9}$/, "Please provide a 10 digit valid mobile number")
    .required("Phone Number is required"),
});




export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 character")
    .max(15, "Password cannot exceed 15 character")
    .required("Password is required"),
});


export const verifyEmailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  otp: yup.string().matches(/^\d{4}$/, "OTP must be 4 digit").required("OTP is required")  
});


export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});


export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter, one digit, and one special character"
    )
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password cannot exceed 15 characters")
    .required("Password is required"),
});
