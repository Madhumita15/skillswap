"use client";

import { RegisterType } from "@/typescript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/services/validation/auth.validation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerInputData } from "@/services/json/inputsData/auth.input";
import DynamicInput from "@/components/DynamicInput";
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
import { registerUser } from "@/store/slices/auth.slice";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSeletor((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterType) => {
    console.log(data)
    try {
      const response = await dispatch(registerUser(data));
      console.log("response from register page", response);
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        reset({
          email: "",
          password: "",
          name: "",
          phone: "",
        });
        router.push("/verify-email");
      }
    } catch (error) {
      console.log("error from catch", error);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0B0804]">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[45%_55%]">
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
              Share what you know, learn what you love,
              <br />
              and connect with people through skills.
            </p>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center bg-[#0B0804] px-6 py-8 md:px-8 lg:px-12 xl:px-16">
          <Card
            className="
              w-full
              max-w-2xl
              border-[#482613]
              bg-[#1C1008]
              p-5
              shadow-2xl
              md:p-6
              lg:p-7
              xl:p-8
              [&_input]:h-12
            "
          >
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
                Create your account
              </CardTitle>

              <CardDescription className="mt-2 text-center text-[#A8A29E]">
                Join SkillSwap and start exchanging your skills with others.
              </CardDescription>

              <div className="mt-3 text-center text-sm text-[#A8A29E]">
                Already have an account?{" "}
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {registerInputData.map((input) => (
                    <div key={input.name}>
                      <DynamicInput<RegisterType>
                        label={input.label}
                        register={register}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        loading={loading.register}
                        error={errors[input.name]?.message}
                        required={input.required}
                        Icon={input.icon}
                      />
                    </div>
                  ))}
                </div>

               

                {error.register && (
                  <p className="text-center text-orange-200 text-md">
                    {error.register}
                  </p>
                )}

                <Button
                  type="submit"
                  className="
            mt-2
            h-12
            w-full
            cursor-pointer
            bg-[#E59A0B]
            font-semibold
            transition-all
            duration-200
            hover:bg-[#C77D05]
            text-white
          "
                >
                  {loading.register ? <Spinner /> : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
