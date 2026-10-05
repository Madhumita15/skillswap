import { Skill } from "@/typescript/interface/skill.interface";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";


type SkillSelectorProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: Skill[];
  selectedSkills: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export const SkillSelector = ({
  title,
  description,
  icon,
  skills,
  selectedSkills,
  onChange,
  error,
}: SkillSelectorProps) => {
  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      onChange(selectedSkills.filter((id) => id !== skillId));
    } else {
      onChange([...selectedSkills, skillId]);
    }
  };

  const removeSkill = (skillId: string) => {
    onChange(selectedSkills.filter((id) => id !== skillId));
  };

  return (
    <section className="space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="
              flex h-8 w-8 items-center justify-center rounded-lg
              border border-[#F97316]/20
              bg-linear-to-br from-[#F97316]/15 to-[#E59A0B]/5
              text-[#F97316]
            "
          >
            {icon}
          </div>

          <h3 className="font-semibold text-white">{title}</h3>
        </div>

        <p className="mt-1 text-xs text-white/40">{description}</p>
      </div>

      {/* Selected skills */}
      {selectedSkills.length > 0 && (
        <div
          className="
            flex flex-wrap gap-2 rounded-xl
            border border-[#F97316]/15
            bg-[#17100A]
            p-3
            shadow-inner
          "
        >
          {selectedSkills.map((skillId) => {
            const skill = skills.find((item) => item._id === skillId);

            return (
              <Badge
                key={skillId}
                className="
                  gap-1 rounded-full
                  border border-[#F97316]/30
                  bg-linear-to-r
                  from-[#F97316]/20
                  to-[#E59A0B]/10
                  px-3 py-1.5
                  text-[#F97316]
                  transition-all duration-300
                  hover:border-[#F97316]/60
                  hover:bg-[#F97316]/20
                  hover:shadow-[0_0_15px_rgba(249,115,22,0.12)]
                "
              >
                {skill?.name || skillId}

                <button
                  type="button"
                  onClick={() => removeSkill(skillId)}
                  className="
                    ml-1 rounded-full
                    p-0.5
                    transition-all
                    hover:bg-[#F97316]/20
                    hover:text-white
                    focus:outline-none
                    focus:ring-1
                    focus:ring-[#F97316]
                  "
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Skill buttons */}
      <div
        className="
          flex max-h-48 flex-wrap gap-2 overflow-y-auto
          rounded-xl
          border border-white/10
          bg-[#17100A]
          p-3
          transition-all duration-300
          hover:border-[#F97316]/25
        "
      >
        {skills.length > 0 ? (
          skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill._id);

            return (
              <button
                key={skill._id}
                type="button"
                onClick={() => toggleSkill(skill._id)}
                className={`group flex items-center
  gap-2 rounded-full border px-3 py-2
  text-sm font-medium
  transition-all duration-300
  outline-none
  focus-visible:ring-2
  focus-visible:ring-[#F97316]

  ${
    isSelected
      ? `
        border-[#F97316]
        bg-linear-to-r
        from-[#F97316]
        to-[#E59A0B]
        text-white
        shadow-[0_0_18px_rgba(249,115,22,0.20)]
        hover:-translate-y-0.5
        hover:shadow-[0_0_25px_rgba(249,115,22,0.30)]
      `
      : `
        border-white/10
        bg-[#0B0804]
        text-white/60
        hover:-translate-y-0.5
        hover:border-[#F97316]/50
        hover:bg-[#F97316]/10
        hover:text-[#F97316]
        hover:shadow-[0_0_18px_rgba(249,115,22,0.10)]
      `
  }
`}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}

                {skill.name}
              </button>
            );
          })
        ) : (
          <p className="w-full py-4 text-center text-sm text-white/30">
            No active skills available.
          </p>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </section>
  );
};
