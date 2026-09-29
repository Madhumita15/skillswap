import { SkillSectionProps } from "@/typescript/interface/skill.interface";
import { Badge } from "./ui/badge";
import Image from "next/image";



const SkillSection = ({
  title,
  icon,
  skills,
}: SkillSectionProps) => {
  return (
    <div>

      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#FFF7ED]">
        <span className="text-[#F97316]">
          {icon}
        </span>

        {title}
      </div>

      <div className="flex flex-wrap gap-1.5">

        {skills?.map((skill) => (
          <Badge
            key={skill._id}
            variant="outline"
            className="border-[#6B3515] bg-[#100905] text-[11px] font-medium text-[#A8A29E] hover:border-[#F97316]/50 hover:text-[#FFF7ED]"
          >
            {skill.name}
          </Badge>
        ))}

      </div>

    </div>
  );
};


export default SkillSection