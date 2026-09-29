"use client";

import { verifyEmailSchema } from "@/services/validation/auth.validation";
import { VerifyEmailType } from "@/typescript/type/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

import { verifyEmailData } from "@/services/json/inputsData/auth.input";
import DynamicInput from "@/components/DynamicInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import {
  useAppDispatch,
  useAppSeletor,
} from "@/services/helper/redux";

import { verifyEmailUser } from "@/store/slices/auth.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const { loading, error } = useAppSeletor((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerifyEmailType>({
    resolver: yupResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyEmailType) => {
      console.log("1. FORM DATA:", data);

    try {
      const response = await dispatch(verifyEmailUser(data)).unwrap();

      console.log("2. RESPONSE FROM VERIFY:", response);
    console.log("3. RESPONSE SUCCESS:", response?.success);
    console.log("4. SUCCESS TYPE:", typeof response?.success);


      if (response && response?.success === true) {
        console.log("5. SUCCESS CONDITION PASSED");

       toast.success(
        response?.message || "Email verified successfully!",
      );
      reset({
          email: "",
          otp: "",
      });

        console.log("REDIRECTING TO ONBOARDING...");
        router.push("/onBoarding");
      } else {
      console.log("4. SUCCESS CONDITION FAILED");
    }
    } catch (error) {
      console.log("error from catch", error);
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden bg-[#0B0804] px-4 py-4 md:py-6">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#6B3515] bg-[#140B05] shadow-2xl md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-[#1A0D04]">
            <div className="absolute left-10 h-40 w-40 rounded-full bg-[#F97316]/10 blur-3xl" />

            <div className="absolute right-10 h-40 w-40 rounded-full bg-[#D99A18]/10 blur-3xl" />

            <div className="relative h-full min-h-0 w-full overflow-hidden">
              <Image
                src="/images/watermarked_img_3844430203666026229 (1).png"
                alt="SkillSwap skill exchange"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex min-h-0 items-center justify-center overflow-hidden bg-[#0F0804] p-5 md:p-8 lg:p-10">
            <Card
              className="
                w-full
                max-w-md
                border-[#6B3515]
                bg-[#1C1008]
                p-5
                shadow-2xl
                [&_input]:h-12
              "
            >
              <CardHeader className="space-y-2">

                <CardTitle className="text-2xl font-semibold text-[#FFF7ED]">
                  Verify your email
                </CardTitle>

                <CardDescription className="text-[#A8A29E]">
                  Enter your email and OTP to verify your account
                </CardDescription>

                <CardAction>
                  <Link
                    href="/register"
                    className="text-sm font-medium text-[#F97316] transition-colors hover:text-[#FFB347]"
                  >
                    Go Back
                  </Link>
                </CardAction>

              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-5">

                    {verifyEmailData.map((input) => (
                      <DynamicInput<VerifyEmailType>
                        key={input.name}
                        label={input.label}
                        register={register}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        loading={loading.verifyEmail}
                        error={errors[input.name]?.message}
                        required={input.required}
                        Icon={input.icon}
                      />
                    ))}

                  </div>

                  {error.verifyEmail && (
                    <p className="text-center text-md text-orange-200">
                      {error.verifyEmail}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="
                      h-12
                      w-full
                      cursor-pointer
                      bg-[#E59A0B]
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[#C77D05]
                    "
                  >
                    {loading.verifyEmail ? <Spinner /> : "Verify"}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
};

export default VerifyEmail;