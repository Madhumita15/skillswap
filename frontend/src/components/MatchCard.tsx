import { ArrowRight, Brain, Flag, GraduationCap, Sparkles } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import SkillSection from "./SkillSection";
import ScoreBox from "./ScoreBox";
import { motion } from "framer-motion";
import { MatchedUser } from "@/typescript/interface/skill.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SendRequestDialog from "./SendRequestDialog";
import {
  useGetReceivedRequest,
  useGetSentRequest,
} from "@/hooks/useSwapRequest";
import { useProfile } from "@/hooks/useProfile";
import { useGetSwapHistory } from "@/hooks/useSwaps";
import { SwapInterface } from "@/typescript/interface/swap.interface";
import ReportDialog from "./ReportDialog";

interface MatchCardProps {
  user: MatchedUser;
  index: number;
}

const MatchCard = ({ user, index }: MatchCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false)
  const { data: sendRequestData } = useGetSentRequest();
  const { data: profileData } = useProfile();
  const { data: swapHistoryData } = useGetSwapHistory({ page: 0, limit: 0 });
  const { data: receivedRequestData } = useGetReceivedRequest();
  

  const relatedRequests = [
    ...(sendRequestData?.data ?? []),
    ...(receivedRequestData?.data ?? []),
  ];

  const userRequests = relatedRequests?.filter(
    (request) =>
      (String(request.senderId) === profileData?.data[0]._id &&
        request.receiverUser._id === user._id) ||
      (String(request.receiverId) === profileData?.data[0]._id &&
        request.senderUser._id === user._id),
  );

  const hasPendingRequest = userRequests.some(
    (request) => request.status === "pending",
  );

  const userSwaps = swapHistoryData?.data?.filter(
    (swap: SwapInterface) =>
      swap.senderUser._id === profileData?.data[0]._id &&
      swap.receiverUser._id === user._id,
  );

  const hasActiveSwap = userSwaps?.some(
    (swap: SwapInterface) => swap.status === "active",
  );

  const requestCheck = hasPendingRequest || hasActiveSwap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="group h-full overflow-hidden rounded-2xl border-[#52291A]/70 bg-[#1C1008] transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-950/20">
        <CardHeader className="relative pb-4">
          {/* top row */}

          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                {user.avatar_image ? (
                  <Image
                    src={user.avatar_image}
                    alt={user.name}
                    width={58}
                    height={58}
                    className="h-[58px] w-[58px] rounded-2xl border border-[#52291A] object-cover"
                  />
                ) : (
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl border border-[#52291A] bg-[#100905] text-xl font-bold text-[#F97316]">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#1C1008] bg-green-500" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-base font-bold text-[#FFF7ED]">
                    {user.name}
                  </h3>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setReportOpen(true)}
                    className=" cursor-pointer
        h-7
        w-7
        shrink-0
        rounded-full
        text-[#78716C]
        transition-all
        duration-200
        hover:bg-[#2A160B]
        hover:text-[#EF4444]
      "
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </Button>
                    <ReportDialog open={reportOpen} setOpen={setReportOpen} reportedUserId={user._id}/>
                  
                </div>

                <p className="truncate text-xs text-[#A8A29E]">{user.email}</p>
              </div>
            </div>

            {/* MATCH SCORE */}

            <div className="shrink-0 text-right">
              <div className="flex items-center justify-end gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#E59A0B]" />

                <span className="text-lg font-bold text-[#E59A0B]">
                  {user.matchingScore.toFixed(2)}%
                </span>
              </div>

              <span className="text-[10px] uppercase tracking-wider text-[#A8A29E]">
                Match
              </span>
            </div>
          </div>

          {/* MATCH PROGRESS */}

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#A8A29E]">Compatibility</span>

              <span className="font-semibold text-[#d1cfcb]">
                {user.matchingScore.toFixed(2)}%
              </span>
            </div>

            <Progress
              value={Number(user.matchingScore.toFixed(2))}
              className="h-2 "
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* TWO-WAY SCORE */}

          <div className="grid grid-cols-2 gap-3">
            <ScoreBox
              icon={<GraduationCap className="h-4 w-4" />}
              label="Learning Match"
              value={Number(user.learningScore.toFixed(2))}
            />

            <ScoreBox
              icon={<Brain className="h-4 w-4" />}
              label="Teaching Match"
              value={Number(user.teachingScore.toFixed(2))}
            />
          </div>

          {/* TEACHING SKILLS */}

          <SkillSection
            title="Can teach"
            icon={<GraduationCap className="h-4 w-4" />}
            skills={user.teachingSkills}
          />

          {/* LEARNING SKILLS */}

          <SkillSection
            title="Want to learn"
            icon={<Brain className="h-4 w-4" />}
            skills={user.learningSkills}
          />

          {/* ACTION */}
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => router.push(`/user/users/${user._id}`)}
              className="group/btn cursor-pointer w-37.5 gap-2 rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] transition-all duration-300 hover:opacity-90"
            >
              View Profile
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>

            <Button
              disabled={requestCheck}
              onClick={() => setOpen(true)}
              className="group/btn cursor-pointer w-37.5   gap-2 rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] transition-all duration-300 hover:opacity-90"
            >
              {requestCheck ? "Request Sent" : "Send Request"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>

            <SendRequestDialog
              open={open}
              setOpen={setOpen}
              receiverId={user._id}
              learningSkills={user.learningSkills}
              teachingSkills={user.teachingSkills}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchCard;
