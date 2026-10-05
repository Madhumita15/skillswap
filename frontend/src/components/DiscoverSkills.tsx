import { useGetActiveSkillByUser } from "@/hooks/useSkills";
import { Skill } from "@/typescript/interface/skill.interface";
import { motion } from "framer-motion";
import Image from "next/image";

const DiscoverSkills = () => {
  const { data } = useGetActiveSkillByUser();
  const skills = data?.data || [];
  return (
    <section className="overflow-hidden bg-[#0B0804] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading comes from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
            Explore & Exchange
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#FFF7ED] md:text-5xl">
            Discover skills worth sharing
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#A8A29E]">
            Find people who can teach what you want to learn, while learning
            something they want to know.
          </p>
        </motion.div>

        {/* Skills */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill: Skill, index: number) => {
            // Alternating left/right entrance
            const fromLeft = index % 2 === 0;

            return (
              <motion.div
                key={skill.name}
                initial={{
                  opacity: 0,
                  x: fromLeft ? -100 : 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group rounded-2xl border border-[#52291A] bg-[#1C1008] p-6 transition-colors duration-300 hover:border-[#F97316]"
              >
                {skill.skill_logo && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/10">
                    <Image
                      src={skill.skill_logo}
                      alt={skill.name}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                )}

                <h3 className="mt-5 text-xl font-semibold text-[#FFF7ED]">
                  {skill.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                  {skill.description}
                </p>

                <div className="mt-5 h-[2px] w-0 bg-[#F97316] transition-all duration-500 group-hover:w-16" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSkills;
