
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { BookOpen, ChevronRight, GraduationCap, UserRound } from "lucide-react";
import { MatchedUser, Skill } from "@/typescript/interface/skill.interface";
import { useRouter } from "next/navigation";

const DiscoveryCard = ({ user }: { user: MatchedUser }) => {
  const router = useRouter()
  return (
    <Card
      className="
        group relative overflow-hidden
        border-[#52291A]/70
        bg-[#1C1008]
        py-0
        shadow-lg shadow-black/10
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#F97316]/50
        hover:shadow-xl
        hover:shadow-[#F97316]/5
      "
    >
      {/* Image */}

      {/* Profile Image */}
      <div className="flex justify-center pt-6">
        <div
          className="
      relative
      h-24 w-24
      overflow-hidden
      rounded-full
      border-2 border-[#6B3515]
      bg-[#100905]
      shadow-lg shadow-black/20
      transition-all duration-300
      group-hover:border-[#F97316]
      group-hover:shadow-[#F97316]/10
    "
        >
          {user.avatar_image ? (
            <Image
              src={user.avatar_image}
              alt={`${user.name}'s profile`}
              fill
              sizes="110px"
              className="
          object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserRound className="h-10 w-10 text-[#52291A]" />
            </div>
          )}

          {/* Online indicator */}
          {user.status === "active" && (
            <span
              className="
          absolute
          bottom-1 right-1
          h-4 w-4
          rounded-full
          border-2 border-[#1C1008]
          bg-green-500
        "
            />
          )}
        </div>
      </div>

      {/* Content */}

      <CardHeader className="px-5 pb-2 pt-4">
        <h3
          className="
          truncate
          text-base
          font-bold
          text-[#FFF7ED]
          transition-colors
          group-hover:text-[#F97316]
        "
        >
          {user.name}
        </h3>

        <p
          className="
          mt-1
          line-clamp-2
          min-h-10
          text-xs
          leading-5
          text-[#A8A29E]
        "
        >
          {user.bio || "Ready to exchange skills and learn together."}
        </p>
      </CardHeader>

      <CardContent className="px-5">
        {/* Teaching */}

        <div>
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-[#F97316]" />

            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#A8A29E]">
              Can teach
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(user.teachingSkills ?? []).slice(0, 3).map((skill: Skill) => (
              <span
                key={skill._id}
                className="
                    rounded-md
                    border border-[#52291A]
                    bg-[#100905]
                    px-2 py-1
                    text-[10px]
                    font-medium
                    text-[#FFF7ED]
                  "
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Learning */}

        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-[#E59A0B]" />

            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#A8A29E]">
              Wants to learn
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(user.learningSkills ?? []).slice(0, 3).map((skill: Skill) => (
              <span
                key={skill._id}
                className="
                    rounded-md
                    border border-[#6B3515]
                    bg-[#24140A]
                    px-2 py-1
                    text-[10px]
                    font-medium
                    text-[#E59A0B]
                  "
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer */}

      <CardFooter className="border-t border-[#52291A]/40  py-4 flex flex-row gap-1">
        <Button
        onClick={()=> router.push(`/user/users/${user._id}`)}
          className="
            group/button
            cursor-pointer
            w-[120px]
            bg-linear-to-r
            from-[#F97316]
            to-[#E59A0B]
            font-semibold
            text-[#1C1008]
            shadow-md
            shadow-[#F97316]/5
            transition-all
            duration-300
            hover:opacity-90
          "
        >
          View Profile
          <ChevronRight
            className="
              ml-1
              h-4 w-4
              transition-transform
              duration-300
              group-hover/button:translate-x-1
            "
          />
        </Button>

        <Button
          className="
            group/button
            cursor-pointer
             w-[120px]
            bg-linear-to-r
            from-[#F97316]
            to-[#E59A0B]
            font-semibold
            text-[#1C1008]
            shadow-md
            shadow-[#F97316]/5
            transition-all
            duration-300
            hover:opacity-90
          "
        >
          Send Request
          <ChevronRight
            className="
              ml-1
              h-4 w-4
              transition-transform
              duration-300
              group-hover/button:translate-x-1
            "
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiscoveryCard;
