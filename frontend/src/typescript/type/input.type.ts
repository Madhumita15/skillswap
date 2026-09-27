import { LucideIcon } from "lucide-react";
import { Path } from "react-hook-form"

export type InputType<T> = {
    label: string;
    required: boolean;
    type: "text" | "email" | "password" | "number" | "textarea";
    name: Path<T>;
    placeholder: string;
    icon: LucideIcon
}