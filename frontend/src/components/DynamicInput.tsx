
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
import { Textarea } from "./ui/textarea";
import { Eye, EyeOffIcon, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import {  FieldValues, Path, UseFormRegister } from "react-hook-form";


interface DynamicInputInterface<T extends FieldValues>{
  register: UseFormRegister<T>;
  error: string | undefined;
  label: string;
  name:  Path<T>;
  type: "text" | "email" | "password" | "number" | "textarea";
  required: boolean;
  loading: boolean;
  placeholder: string;
  Icon?: LucideIcon
}

const DynamicInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  required,
  loading,
  placeholder,
  Icon
}: DynamicInputInterface<T>) => {
  const [viewPassword, setViewPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <Label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
        {required ? (
          <>
            {label}
            <span className="text-pink-500 ml-1">*</span>
          </>
        ) : (
          label
        )}
      </Label>

      {type === "text" || type === "password" ? (
        <>
          <div className="relative">
  {Icon && (
    <Icon
      className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#6e6157]"
    />
  )}

  <Input
    disabled={loading}
    placeholder={placeholder}
    type={isPassword && !viewPassword ? "password" : "text"}
    {...register(name)}
    className={`h-12 bg-[#28130c] border-[#52291a] text-slate-100 placeholder:text-slate-500 transition-all duration-200 hover:border-[#756e6b] focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 ${
      Icon ? "pl-10" : ""
    } ${isPassword ? "pr-12" : ""}`}
  />

  {isPassword && (
    <Button
      type="button"
      className="absolute right-1 top-1.5 bg-transparent text-slate-400 hover:bg-[#221606] hover:text-[#d1841f] cursor-pointer"
      onClick={() => setViewPassword(!viewPassword)}
    >
      {viewPassword ? (
        <EyeOffIcon className="text-[#d1841f] hover:text-[#9e661d]" />
      ) : (
        <Eye className="text-[#e09d45] hover:text-[#d1841f]" />
      )}
    </Button>
  )}
</div>
        </>
      ) : (
        <Textarea
          disabled={loading}
          placeholder={placeholder}
          rows={3}
          {...register(name)}
          className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 transition-all duration-200 hover:border-slate-600 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500"
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// const MemoizedDynamicInput = memo(DynamicInput) as typeof DynamicInput;

export default DynamicInput;