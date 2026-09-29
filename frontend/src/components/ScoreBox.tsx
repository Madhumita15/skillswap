import { ScoreBoxProps } from "@/typescript/interface/skill.interface";
import { Progress } from "./ui/progress";



const ScoreBox = ({
  icon,
  label,
  value,
}: ScoreBoxProps) => {
  return (
    <div className="rounded-xl border border-[#52291A]/60 bg-[#100905]/60 p-3">

      <div className="mb-2 flex items-center gap-2 text-[#A8A29E]">
        {icon}

        <span className="truncate text-[11px]">
          {label}
        </span>
      </div>

      <div className="text-lg font-bold text-[#FFF7ED]">
        {value}%
      </div>

      <Progress
        value={value}
        className="mt-2 h-1.5 bg-[#1C1008]"
      />

    </div>
  );
};

export default ScoreBox