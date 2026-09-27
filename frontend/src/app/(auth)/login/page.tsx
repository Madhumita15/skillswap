"use client";

import { LoginType } from "@/typescript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/services/validation/auth.validation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginInputData } from "@/services/json/inputsData/auth.input";
import DynamicInput from "@/components/DynamicInput";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useAppDispatch, useAppSeletor } from "@/services/helper/redux";
import { loginUser } from "@/store/slices/auth.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSeletor((state) => state.auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    try {
      const response = await dispatch(loginUser(data));
      console.log("response from register page", response);
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        if (response?.payload?.data?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
        reset({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("error from catch", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0B0804] px-4 py-4 md:py-6">
      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#6B3515] bg-[#140B05] shadow-2xl md:grid-cols-2">
        <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-[#1A0D04] ">
          <div className="absolute left-10  h-40 w-40 rounded-full bg-[#F97316]/10 blur-3xl" />

          <div className="absolute right-10 h-40 w-40 rounded-full bg-[#D99A18]/10 blur-3xl" />

          <div className="relative h-full min-h-0 w-full overflow-hidden">
            <Image
              src="/images/ChatGPT Image Sep 27, 2026, 01_03_32 PM (1) (1).png"
              alt="SkillSwap skill exchange"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

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
                Login to your account
              </CardTitle>

              <CardDescription className="text-[#A8A29E]">
                Enter your email below to login to your account
              </CardDescription>

              <CardAction>
                <Link
                  href="/register"
                  className="text-sm font-medium text-[#F97316] transition-colors hover:text-[#FFB347]"
                >
                  Sign Up
                </Link>
              </CardAction>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-5">
                  {loginInputData.map((input) => (
                    <DynamicInput<LoginType>
                      key={input.name}
                      label={input.label}
                      register={register}
                      name={input.name}
                      placeholder={input.placeholder}
                      type={input.type}
                      loading={loading.login}
                      error={errors[input.name]?.message}
                      required={input.required}
                      Icon={input.icon}
                    />
                  ))}
                </div>

                {error.login && (
                  <p className="text-center text-orange-200 text-md">
                    {error.login}
                  </p>
                )}

                <Button
                  type="submit"
                  className="h-12 w-full cursor-pointer bg-[#E59A0B] font-semibold text-white transition-all duration-200 hover:bg-[#C77D05] "
                >
                  {loading.verifyEmail ? <Spinner /> : "Login"}
                </Button>
              </form>

              <div className="mt-5 text-center">
                <Link
                  href="/forgotPasswordLink"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#D99A18]"
                >
                  Forgot your Password?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
