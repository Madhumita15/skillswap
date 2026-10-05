import { StatCardProps } from "@/typescript/interface/dashboard.interface";
import { Card, CardContent } from "./ui/card";

const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
  return (
    <Card
      tabIndex={0}
      className="
        group
        relative
        overflow-hidden
        border-[#F97316]/20
        bg-[#17100A]
        text-white
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#F97316]/50
        hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#F97316]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0B0804]
      "
    >
      {/* Subtle top gradient */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-[#F97316]
          via-[#E59A0B]
          to-transparent
          opacity-70
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:from-[#F97316]
          group-hover:to-[#E59A0B]
        "
      />

      {/* Hover glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-[#F97316]/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-[#F97316]/20
          group-hover:scale-150
        "
      />

      <CardContent className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Icon */}
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-[#F97316]/25
              bg-gradient-to-br
              from-[#F97316]/15
              to-[#E59A0B]/5
              text-[#F97316]
              shadow-inner
              transition-all
              duration-300
              group-hover:border-[#F97316]/50
              group-hover:bg-gradient-to-br
              group-hover:from-[#F97316]/25
              group-hover:to-[#E59A0B]/10
              group-hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]
            "
          >
            <Icon
              className="
                h-5 w-5
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:-rotate-3
              "
            />
          </div>

          {/* Number */}
          <span
            className="
              bg-gradient-to-r
              from-[#F97316]
              to-[#E59A0B]
              bg-clip-text
              text-4xl
              font-extrabold
              leading-none
              tracking-tight
              text-transparent
              transition-all
              duration-300
              group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]
              sm:text-5xl
            "
          >
            {value}
          </span>
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3
            className="
              text-sm
              font-semibold
              tracking-wide
              text-white
              transition-colors
              duration-300
              group-hover:text-[#F97316]
              sm:text-base
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2
              text-xs
              leading-relaxed
              text-white/45
              sm:text-sm
            "
          >
            {description}
          </p>
        </div>

        {/* Bottom hover line */}
        <div
          className="
            absolute
            bottom-0
            left-5
            right-5
            h-px
            origin-left
            scale-x-0
            bg-gradient-to-r
            from-[#F97316]
            to-[#E59A0B]
            transition-transform
            duration-500
            group-hover:scale-x-100
          "
        />
      </CardContent>
    </Card>
  );
};

export default StatCard;
