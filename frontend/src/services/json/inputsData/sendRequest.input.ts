import { InputType } from "@/typescript/type/input.type";
import { swapRequestType } from "@/typescript/type/swapRequest.type";
import {  Send } from "lucide-react";



export const SwapRequestInput: InputType<swapRequestType>[] = [
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Enter your message here",
    icon: Send,
  }
];