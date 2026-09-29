
import { ArrowRight, Brain, GraduationCap, Sparkles } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress"
import SkillSection from "./SkillSection";
import ScoreBox from "./ScoreBox";
import {motion} from 'framer-motion'
import { MatchedUser } from "@/typescript/interface/skill.interface";
import { useRouter } from "next/navigation";



interface MatchCardProps {
  user: MatchedUser;
  index: number;
}

const MatchCard = ({ user, index }: MatchCardProps) => {

  const router = useRouter()
  
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
                <h3 className="truncate text-base font-bold text-[#FFF7ED]">
                  {user.name}
                </h3>

                <p className="truncate text-xs text-[#A8A29E]">
                  {user.email}
                </p>
              </div>

            </div>

            {/* MATCH SCORE */}

            <div className="shrink-0 text-right">

              <div className="flex items-center justify-end gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#E59A0B]" />

                <span className="text-lg font-bold text-[#E59A0B]">
                  {user.matchingScore}%
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
              <span className="text-[#A8A29E]">
                Compatibility
              </span>

              <span className="font-semibold text-[#FFF7ED]">
                {user.matchingScore}%
              </span>
            </div>

            <Progress
              value={user.matchingScore}
              className="h-2 bg-[#d3d0ce]"
            />

          </div>

        </CardHeader>

        <CardContent className="space-y-5">

          {/* TWO-WAY SCORE */}

          <div className="grid grid-cols-2 gap-3">

            <ScoreBox
              icon={<GraduationCap className="h-4 w-4" />}
              label="Learning Match"
              value={user.learningScore}
            />

            <ScoreBox
              icon={<Brain className="h-4 w-4" />}
              label="Teaching Match"
              value={user.teachingScore}
            />

          </div>

          {/* TEACHING SKILLS */}

          <SkillSection
            title="They can teach"
            icon={<GraduationCap className="h-4 w-4" />}
            skills={user.teachingSkills}
          />

          {/* LEARNING SKILLS */}

          <SkillSection
            title="They want to learn"
            icon={<Brain className="h-4 w-4" />}
            skills={user.learningSkills}
          />

          {/* ACTION */}
          <div className="flex flex-row gap-2">
             <Button
          onClick={()=> router.push(`/user/users/${user._id}`)}
            className="group/btn cursor-pointer w-37.5 gap-2 rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] transition-all duration-300 hover:opacity-90"
          >
            View Profile

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>

           <Button
            className="group/btn cursor-pointer w-37.5   gap-2 rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] transition-all duration-300 hover:opacity-90"
          >
            Send Request

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
          </div>

         

        </CardContent>

      </Card>
    </motion.div>
  );
};


export default MatchCard