import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const SkillMatching = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0804] px-6 py-24">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
            <Sparkles className="h-4 w-4" />
            Smart Matching
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#FFF7ED] md:text-5xl">
            Skills that find each other
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#A8A29E]">
            You teach what they want to learn.
            They teach what you want to learn.
          </p>
        </motion.div>

        {/* People matching */}
        <div className="relative flex flex-col items-center justify-center gap-10 md:flex-row md:gap-0">

          {/* LEFT PERSON */}
          <motion.div
            initial={{ opacity: 0, x: -180 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-sm"
          >
            <div className="rounded-3xl border border-[#52291A] bg-[#1C1008] p-6 shadow-2xl">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316]/15 text-xl">
                  👩‍💻
                </div>

                <div>
                  <h3 className="font-semibold text-[#FFF7ED]">
                    Alex
                  </h3>
                  <p className="text-sm text-[#A8A29E]">
                    Frontend Developer
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-wider text-[#A8A29E]">
                  Can teach
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-sm text-[#F97316]">
                    React
                  </span>

                  <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-sm text-[#F97316]">
                    JavaScript
                  </span>
                </div>

                <p className="mb-3 mt-5 text-xs uppercase tracking-wider text-[#A8A29E]">
                  Wants to learn
                </p>

                <span className="rounded-full bg-[#E59A0B]/10 px-3 py-1 text-sm text-[#E59A0B]">
                  Node.js
                </span>
              </div>
            </div>
          </motion.div>


          {/* CENTER MATCH */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              type: "spring",
              stiffness: 120,
            }}
            className="relative z-20 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#F97316] bg-[#1C1008] shadow-[0_0_40px_rgba(249,115,22,0.2)]"
          >
            <div className="text-center">
              <Check className="mx-auto h-6 w-6 text-[#F97316]" />
              <span className="text-[10px] font-bold text-[#E59A0B]">
                MATCH
              </span>
            </div>
          </motion.div>


          {/* RIGHT PERSON */}
          <motion.div
            initial={{ opacity: 0, x: 180 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-sm"
          >
            <div className="rounded-3xl border border-[#52291A] bg-[#1C1008] p-6 shadow-2xl">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E59A0B]/15 text-xl">
                  👨‍💻
                </div>

                <div>
                  <h3 className="font-semibold text-[#FFF7ED]">
                    Sarah
                  </h3>
                  <p className="text-sm text-[#A8A29E]">
                    Backend Developer
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-wider text-[#A8A29E]">
                  Can teach
                </p>

                <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-sm text-[#F97316]">
                  Node.js
                </span>

                <p className="mb-3 mt-5 text-xs uppercase tracking-wider text-[#A8A29E]">
                  Wants to learn
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#E59A0B]/10 px-3 py-1 text-sm text-[#E59A0B]">
                    React
                  </span>

                  <span className="rounded-full bg-[#E59A0B]/10 px-3 py-1 text-sm text-[#E59A0B]">
                    JavaScript
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Match score */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-[#52291A] bg-[#1C1008] px-5 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/10">
            <Sparkles className="h-5 w-5 text-[#F97316]" />
          </div>

          <div>
            <p className="text-sm text-[#A8A29E]">
              Skill compatibility
            </p>

            <p className="font-bold text-[#FFF7ED]">
              94% Match
            </p>
          </div>

          <ArrowRight className="ml-auto h-5 w-5 text-[#E59A0B]" />
        </motion.div>

      </div>
    </section>
  );
};

export default SkillMatching;