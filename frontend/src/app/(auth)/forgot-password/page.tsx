
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Spinner } from "@/components/ui/spinner";
// import DynamicInput from "@/components/DynamicInput";

// const ForgotPasswordLink = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   // =====================================================
//   // SUBMIT FORGOT PASSWORD
//   // =====================================================

//   const handleSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     // Basic frontend validation
//     if (!email.trim()) {
//       toast.error("Please enter your email address");
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             email: email.trim(),
//           }),
//         }
//       );

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Unable to process your request"
//         );
//       }

//       toast.success(
//         result.message ||
//           "Password reset instructions have been sent to your email"
//       );

//       /*
//        * If your backend sends an OTP, you can redirect
//        * to an OTP verification page here.
//        *
//        * Example:
//        *
//        * router.push(
//        *   `/verify-forgot-password?email=${encodeURIComponent(email)}`
//        * );
//        *
//        * For now we return to login.
//        */

//       router.push("/login");
//     } catch (error) {
//       console.error("Forgot password error:", error);

//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen overflow-hidden bg-[#0B0804] px-4 py-4 md:py-6">

//       <div
//         className="
//           mx-auto
//           grid
//           h-full
//           w-full
//           max-w-6xl
//           grid-cols-1
//           overflow-hidden
//           rounded-3xl
//           border
//           border-[#6B3515]
//           bg-[#140B05]
//           shadow-2xl
//           md:grid-cols-2
//         "
//       >

//         {/* =====================================================
//             LEFT IMAGE SECTION
//         ===================================================== */}

//         <div
//           className="
//             relative
//             flex
//             min-h-0
//             items-center
//             justify-center
//             overflow-hidden
//             bg-[#1A0D04]
//           "
//         >

//           {/* Decorative glow */}

//           <div
//             className="
//               absolute
//               left-10
//               h-40
//               w-40
//               rounded-full
//               bg-[#F97316]/10
//               blur-3xl
//             "
//           />

//           <div
//             className="
//               absolute
//               right-10
//               h-40
//               w-40
//               rounded-full
//               bg-[#D99A18]/10
//               blur-3xl
//             "
//           />

//           {/* Image */}

//           <div className="relative h-full min-h-0 w-full overflow-hidden">

//             <Image
//               src="/images/ChatGPT Image Sep 27, 2026, 01_03_32 PM (1) (1).png"
//               alt="SkillSwap"
//               fill
//               priority
//               className="object-cover"
//             />

//             {/* Image overlay */}

//             <div className="absolute inset-0 bg-[#040A03]/40" />

//             {/* Image text */}

//             <div
//               className="
//                 absolute
//                 inset-0
//                 z-10
//                 flex
//                 flex-col
//                 items-center
//                 justify-end
//                 px-8
//                 pb-12
//                 text-center
//               "
//             >

//               <h1 className="text-3xl font-bold text-[#FFF7ED] lg:text-4xl">
//                 Welcome back to{" "}
//                 <span className="text-[#F97316]">
//                   SkillSwap.
//                 </span>
//               </h1>

//               <p className="mt-3 max-w-md text-sm leading-6 text-[#A8A29E] lg:text-base">
//                 Don&apos;t worry, we&apos;ll help you get back
//                 <br />
//                 into your SkillSwap account.
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             RIGHT FORGOT PASSWORD SECTION
//         ===================================================== */}

//         <div
//           className="
//             flex
//             min-h-0
//             items-center
//             justify-center
//             overflow-hidden
//             bg-[#0F0804]
//             p-5
//             md:p-8
//             lg:p-10
//           "
//         >

//           <Card
//             className="
//               w-full
//               max-w-md
//               border-[#6B3515]
//               bg-[#1C1008]
//               p-5
//               shadow-2xl
//               [&_input]:h-12
//             "
//           >

//             {/* =================================================
//                 CARD HEADER
//             ================================================= */}

//             <CardHeader className="space-y-3">

//               {/* Mobile logo */}

//               <div className="mb-2 flex items-center justify-center md:hidden">

//                 <Image
//                   src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
//                   alt="SkillSwap logo"
//                   width={120}
//                   height={120}
//                   className="h-auto w-24"
//                 />

//               </div>

//               <CardTitle className="text-center text-2xl font-semibold text-[#FFF7ED]">
//                 Forgot your password?
//               </CardTitle>

//               <CardDescription className="text-center leading-6 text-[#A8A29E]">
//                 Enter your registered email address and
//                 we&apos;ll send you instructions to reset
//                 your password.
//               </CardDescription>

//             </CardHeader>

//             {/* =================================================
//                 FORM
//             ================================================= */}

//             <CardContent>

//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-6"
//               >

//                 {/* Email */}

//                 <div className="space-y-2">

//                   <label
//                     htmlFor="email"
//                     className="text-sm font-medium text-[#FFF7ED]"
//                   >
//                     Email address
//                   </label>

//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     disabled={loading}
//                     onChange={(event) =>
//                       setEmail(event.target.value)
//                     }
//                     placeholder="Enter your email"
//                     autoComplete="email"
//                     className="
//                       h-12
//                       border-[#6B3515]
//                       bg-[#28130C]
//                       text-[#FFF7ED]
//                       placeholder:text-[#78716C]
//                       focus:border-[#F97316]
//                       focus:ring-[#F97316]
//                     "
//                   />

//                 </div>

//                 {/* Submit */}

//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="
//                     h-12
//                     w-full
//                     cursor-pointer
//                     bg-[#E59A0B]
//                     font-semibold
//                     text-white
//                     transition-all
//                     duration-200
//                     hover:bg-[#C77D05]
//                     disabled:cursor-not-allowed
//                     disabled:opacity-60
//                   "
//                 >
//                   {loading ? (
//                     <Spinner />
//                   ) : (
//                     "Send Reset Link"
//                   )}
//                 </Button>

//               </form>

//               {/* =================================================
//                   BACK TO LOGIN
//               ================================================= */}

//               <div className="mt-6 text-center">

//                 <Link
//                   href="/login"
//                   className="
//                     text-sm
//                     font-medium
//                     text-[#F97316]
//                     transition-colors
//                     hover:text-[#FFB347]
//                   "
//                 >
//                   ← Back to Login
//                 </Link>

//               </div>

//               {/* =================================================
//                   HELP TEXT
//               ================================================= */}

//               <div
//                 className="
//                   mt-6
//                   rounded-lg
//                   border
//                   border-[#482613]
//                   bg-[#28130C]
//                   p-4
//                   text-center
//                 "
//               >

//                 <p className="text-xs leading-5 text-[#A8A29E]">
//                   Make sure you enter the email address
//                   associated with your SkillSwap account.
//                 </p>

//               </div>

//             </CardContent>

//           </Card>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ForgotPasswordLink;

"use client";

import { ForgotPasswordType } from "@/typescript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/services/validation/auth.validation";
import { forgotPasswordInputData } from "@/services/json/inputsData/auth.input";
import DynamicInput from "@/components/DynamicInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { useAppDispatch, useAppSeletor } from "@/services/helper/redux";
import { forgotPassword } from "@/store/slices/auth.slice";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSeletor((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      const response = await dispatch(forgotPassword(data));
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message || "Reset link sent successfully!");
        reset();
        router.push("/login");
      }
    } catch (err) {
      console.error("Error sending reset password email:", err);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0B0804] px-4 py-4 md:py-6">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#6B3515] bg-[#140B05] shadow-2xl md:grid-cols-2">
        {/* Left Visual Section */}
        <div className="relative hidden h-screen overflow-hidden bg-[#1A0D04] md:flex">
          <div className="absolute -left-25 -top-25 h-80 w-80 rounded-full bg-[#F97316]/10 blur-3xl" />
          <div className="absolute -bottom-25 -right-25 h-80 w-80 rounded-full bg-[#D99A18]/10 blur-3xl" />

          <Image
            src="/images/watermarked_img_10341982379477713932 (1).png"
            alt="SkillSwap skill exchange"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#040A03]/30" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-10 pb-14 text-center">
            <h1 className="text-3xl font-bold text-[#FFF7ED] lg:text-4xl">
              Learn. Share. <span className="text-[#F97316]">Swap.</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#A8A29E] lg:text-base">
              Recover your account and get back to connecting through skills.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex min-h-screen items-center justify-center bg-[#0B0804] px-6 py-8 md:px-8 lg:px-12 xl:px-16">
          <Card className="w-full max-w-md border-[#482613] bg-[#1C1008] p-5 shadow-2xl md:p-6 lg:p-7 xl:p-8 [&_input]:h-12">
            <CardHeader className="px-0 pb-5">
              <div className="mb-3 flex items-center justify-center md:hidden">
                <Image
                  src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
                  alt="SkillSwap logo"
                  width={120}
                  height={120}
                  className="h-auto w-24"
                />
              </div>

              <CardTitle className="text-center text-2xl font-semibold text-[#FFF7ED] lg:text-3xl">
                Forgot Password?
              </CardTitle>

              <CardDescription className="mt-2 text-center text-[#A8A29E]">
                Enter your registered email address to receive password reset instructions.
              </CardDescription>

              <div className="mt-3 text-center text-sm text-[#A8A29E]">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#F97316] transition-colors hover:text-[#FFB347]"
                >
                  Login
                </Link>
              </div>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                  {forgotPasswordInputData.map((input) => (
                    <div key={input.name}>
                      <DynamicInput<ForgotPasswordType>
                        label={input.label}
                        register={register}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        loading={loading.forgotPassword}
                        error={errors[input.name]?.message}
                        required={input.required}
                        Icon={input.icon}
                      />
                    </div>
                  ))}
                </div>

                {error?.forgotPassword && (
                  <p className="text-center text-orange-200 text-md">
                    {error.forgotPassword}
                  </p>
                )}

                <Button
                  type="submit"
                  className="mt-2 h-12 w-full cursor-pointer bg-[#E59A0B] font-semibold text-white transition-all duration-200 hover:bg-[#C77D05]"
                >
                  {loading.forgotPassword ? <Spinner /> : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
