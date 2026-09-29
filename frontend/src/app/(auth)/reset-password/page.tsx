"use client";

import { ResetPasswordType } from "@/typescript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/services/validation/auth.validation";
import { resetPasswordInputData } from "@/services/json/inputsData/auth.input";
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
import { resetPassword } from "@/store/slices/auth.slice";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { loading, error } = useAppSeletor((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordType) => {
  if (!token) {
    toast.error("Invalid or missing password reset token.");
    return;
  }

  try {
    const response = await dispatch(
      resetPassword({
        token,
        password: data.password,
      })
    ).unwrap();

    console.log("RESET PASSWORD RESPONSE:", response);

    if (response?.success === true) {
      toast.success(
        response?.message || "Password reset successfully!"
      );

      reset();
      router.push("/login");
    }
  } catch (err) {
    console.error("Error resetting password:", err);

    toast.error(
      typeof err === "string"
        ? err
        : "Invalid or expired password reset token."
    );
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
              Create a new secure password and access your account.
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
                Reset Your Password
              </CardTitle>

              <CardDescription className="mt-2 text-center text-[#A8A29E]">
                Enter your new password below to update your account details.
              </CardDescription>

              <div className="mt-3 text-center text-sm text-[#A8A29E]">
                Back to{" "}
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
                  {resetPasswordInputData.map((input) => (
                    <div key={input.name}>
                      <DynamicInput<ResetPasswordType>
                        label={input.label}
                        register={register}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        loading={loading.resetPassword}
                        error={errors[input.name]?.message}
                        required={input.required}
                        Icon={input.icon}
                      />
                    </div>
                  ))}
                </div>

                {error?.resetPassword && (
                  <p className="text-center text-orange-200 text-md">
                    {error.resetPassword}
                  </p>
                )}

                <Button
                  type="submit"
                  className="mt-2 h-12 w-full cursor-pointer bg-[#E59A0B] font-semibold text-white transition-all duration-200 hover:bg-[#C77D05]"
                >
                  {loading.resetPassword ? <Spinner /> : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;