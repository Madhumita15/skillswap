import { reportValidation } from "@/services/validation/report.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Flag } from "lucide-react";
import { ReportType } from "@/typescript/type/report.type";
import { ReportDialogInterface } from "@/typescript/interface/dialog.inteface";
import { useCreteReport } from "@/hooks/useReport";
import { Spinner } from "./ui/spinner";

const ReportDialog: React.FC<ReportDialogInterface> = ({
  open,
  setOpen,
  reportedUserId
}) => {

    const {mutateAsync, isPending} = useCreteReport()



  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ReportType>({
    resolver: yupResolver(reportValidation),
    defaultValues: {
      description: "",
      reason: "",
    },
  });

  const reasonList = [
    "spam",
    "harassment",
    "inappropriate_content",
    "fake_profile",
    "others",
  ];

  const onSubmit = async(data: ReportType) => {
    console.log(data);
    const updatedData = {...data, reportedUserId: reportedUserId}
    console.log(updatedData)

   try {
    await mutateAsync(updatedData)
    reset({
        description: "",
        reason: ""
    });
    setOpen(false)
    
   } catch (error) {
    console.log(error)
    
   }
    

    
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent
        className="
            w-[calc(100%-2rem)]
            max-w-md
            border
            border-[#4A3024]
            bg-[#1C1008]
            p-6
            text-[#F5F1EC]
            shadow-2xl
            shadow-black/40
            sm:rounded-xl
          "
      >
        {/* Header */}
        <DialogHeader className="space-y-3">
          <div
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
              "
          >
            <Flag className="h-5 w-5 text-red-400" />
          </div>

          <div className="space-y-1.5">
            <DialogTitle className="text-lg font-semibold text-[#F5F1EC]">
              Report User
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed text-[#A8A29E]">
              Help us keep SkillSwap safe. Select a reason and provide some
              details about the issue.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form */}
          <div className="space-y-5 py-2">
            {/* Reason */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D6CCC5]">
                Reason
              </label>

              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <Select disabled={isPending} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="
                        w-full
                        border-[#4A3024]
                        bg-[#211814]
                        text-[#F5F1EC]
                        shadow-none
                        transition-all
                        duration-200
                        hover:border-[#6B3A24]
                        focus:border-[#F97316]
                        focus:ring-1
                        focus:ring-[#F97316]/30
                        data-[placeholder]:text-[#746860]
                      "
                    >
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>

                    <SelectContent
                      className="
                        border-[#4A3024]
                        bg-[#211814]
                        text-[#dcdad8]
                      "
                    >
                      <SelectGroup>
                        <SelectLabel className="text-[#8F8178]">
                          Report reason
                        </SelectLabel>

                        {reasonList.map((reason) => (
                          <SelectItem
                            key={reason}
                            value={reason}
                            className="
                              cursor-pointer
                              text-[#E7DED7]
                              focus:bg-[#3A2115]
                              focus:text-[#F5F1EC]
                            "
                          >
                            {reason
                              .replaceAll("_", " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.reason && (
                <p className="text-xs text-red-400">{errors.reason.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D6CCC5]">
                Description
              </label>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                  disabled={isPending} 
                    {...field}
                    placeholder="Please describe what happened..."
                    className="
                      min-h-[120px]
                      resize-none
                      border-[#4A3024]
                      bg-[#211814]
                      text-[#F5F1EC]
                      placeholder:text-[#746860]
                      shadow-none
                      transition-all
                      duration-200
                      hover:border-[#6B3A24]
                      focus-visible:border-[#F97316]
                      focus-visible:ring-1
                      focus-visible:ring-[#F97316]/30
                    "
                  />
                )}
              />

              {errors.description && (
                <p className="text-xs text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="gap-2 border-t border-[#3A2115] pt-5 sm:justify-end">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="
                  cursor-pointer
                    border-[#4A3024]
                    bg-[#2e2420]
                    text-[#A8A29E]
                    hover:border-[#6B3A24]
                    hover:bg-[#211814]
                    hover:text-[#F5F1EC]
                  "
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              className="
              cursor-pointer
                bg-linear-to-r
                from-[#F97316]
                to-[#E59A0B]
                font-semibold
                text-[#1C1008]
                shadow-lg
                shadow-orange-950/20
                transition-all
                duration-200
                hover:scale-[1.01]
                hover:opacity-90
              "
            >
              <Flag className="mr-2 h-4 w-4" />
               {isPending ? <Spinner /> : " Submit Report"} 
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
