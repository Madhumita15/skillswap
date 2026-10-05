"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import useIsClinet from "@/components/UseIsClient";

interface NavbarProps {
  setMobileOpen: (open: boolean) => void;
}

 

const Navbar = ({ setMobileOpen }: NavbarProps) => {
  const pathname = usePathname();
  const {data} = useProfile()

  const getMessage = () => {
    if (pathname === "/user/dashboard") {
      return {
        title: `Welcome back ${data?.data?.name ?? "user"} 👋`,
        subtitle: "Ready to learn, share and grow?",
      };
    }

    if (pathname === "/user/discovery") {
      return {
        title: "Discover new skills",
        subtitle: "Find people and skills worth exploring.",
      };
    }

    if (pathname === "/user/my-match") {
      return {
        title: "Find your perfect match",
        subtitle: "Connect with someone who complements your skills.",
      };
    }

    if (pathname === "/user/my-sent-request") {
      return {
        title: "Your sent requests",
        subtitle: "Keep track of your skill exchange requests.",
      };
    }

    if (pathname === "/user/my-received-request") {
      return {
        title: "Received requests",
        subtitle: "See who wants to exchange skills with you.",
      };
    }

    if (pathname === "/user/active-swap") {
      return {
        title: "Your active swap",
        subtitle: "Keep learning and sharing with your partner.",
      };
    }

    if (pathname === "/user/swap-history") {
      return {
        title: "Swap history",
        subtitle: "Review your previous skill exchanges.",
      };
    }

    if (pathname === "/user/my-reviews") {
      return {
        title: "Your reviews",
        subtitle: "See what others say about your skill exchanges.",
      };
    }

    if (pathname === "/user/profile") {
      return {
        title: "Your profile",
        subtitle: "Keep your skills and information up to date.",
      };
    }

    return {
      title: "Welcome to SkillSwap",
      subtitle: "Learn • Share • Grow",
    };
  };

  const message = getMessage();

  const isClient = useIsClinet();
  if (!isClient) return null;

  return (
    <header
      className="
        sticky top-0 z-50 h-16 w-full border-b border-[#52291A]/70 bg-[#211309]/95 backdrop-blur-xl
      "
    >
      <div
        className="relative flex h-full w-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-6
        "
      >
        {/* =====================================================
            LEFT SIDE
            Animated welcome / page message
        ===================================================== */}

        <div className="flex min-w-0 flex-1 items-center">
          {/* Mobile Menu */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
            className="
              mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#52291A] bg-[#1C1008] text-[#A8A29E] transition-all duration-300 hover:border-[#F97316]  hover:bg-[#25140B] hover:text-[#F97316] focus:outline-non focus:ring-2 focus:ring-[#F97316]/30 lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          {/* Animated Message */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{
                  opacity: 0,
                  x: -20,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: 20,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <h1
                  className="
                    truncate
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#FFF7ED]
                    sm:text-sm
                  "
                >
                  {message.title}
                </h1>

                <p
                  className="
                    mt-0.5
                    hidden
                    truncate
                    text-[10px]
                    text-[#78716C]
                    sm:block
                    md:text-[11px]
                  "
                >
                  {message.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =====================================================
            CENTER
            Search Bar
        ===================================================== */}

        <div
          className="
            hidden
            h-10
            w-full
            max-w-95
            shrink
            items-center
            gap-2
            rounded-xl
            border
            border-[#52291A]
            bg-[#1C1008]
            px-3
            shadow-inner
            transition-all
            duration-300
            focus-within:border-[#F97316]
            focus-within:bg-[#211309]
            focus-within:ring-2
            focus-within:ring-[#F97316]/10
            md:flex
          "
        >
          <Search
            className="
              h-4 w-4
              shrink-0
              text-[#78716C]
              transition-colors
              duration-300
            "
          />

          <input
            type="text"
            placeholder="Search skills, people..."
            className="
              h-full
              min-w-0
              flex-1
              bg-transparent
              text-xs
              text-[#FFF7ED]
              outline-none
              placeholder:text-[#6B625C]
            "
          />

          {/* Keyboard shortcut */}
          <span
            className="
              hidden
              rounded-md
              border border-[#52291A]
              bg-[#211309]
              px-1.5
              py-0.5
              text-[9px]
              text-[#78716C]
              lg:block
            "
          >
            /
          </span>
        </div>

        {/* =====================================================
            RIGHT SIDE
            Notification + Profile
        ===================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
            sm:gap-2
          "
        >
          {/* Search button on small screens */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            aria-label="Search"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-[#A8A29E]
              transition-all duration-300
              hover:bg-[#1C1008]
              hover:text-[#F97316]
              focus:outline-none
              focus:ring-2
              focus:ring-[#F97316]/30
              md:hidden
            "
          >
            <Search className="h-4.5 w-4.5" />
          </motion.button>

          {/* Notification */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            aria-label="Notifications"
            className="
              group
              relative
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-[#A8A29E]
              transition-all duration-300
              hover:bg-[#1C1008]
              hover:text-[#F97316]
              focus:outline-none
              focus:ring-2
              focus:ring-[#F97316]/30
            "
          >
            <Bell
              className="
                h-4.5 w-4.5
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            {/* Notification indicator */}
            <span
              className="
                absolute
                right-1.5
                top-1.5
                h-1.5
                w-1.5
                rounded-full
                bg-[#F97316]
                ring-2
                ring-[#211309]
              "
            />
          </motion.button>

          {/* Divider */}
          <div
            className="
              mx-1
              hidden
              h-7
              w-px
              bg-[#52291A]/70
              sm:block
            "
          />

          {/* User Profile */}
          <button
            type="button"
            className="group flex items-center gap-2 rounded-lg  px-1.5  py-1 transition-all  duration-300 hover:bg-[#1C1008] focus:outline-none focus:ring-2   focus:ring-[#F97316]/30
            "
          >
            {/* Avatar */}
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#6B3515]
                bg-[#1C1008]
                text-[#F97316]
                transition-all
                duration-300
                group-hover:border-[#F97316]
                group-hover:shadow-md
                group-hover:shadow-[#F97316]/10
              "
            >

              <Image src={data?.data[0].avatar_image ?? "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FydG9vbiUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"} className="object-cover h-8 w-8 rounded-full" width={20} height={20} alt="alter"/>
            </div>

            {/* User name */}
            <div className="hidden text-left sm:block">
              <p
                className="
                  max-w-25
                  truncate
                  text-xs
                  font-semibold
                  text-[#FFF7ED]
                "
              >
               {data?.data[0].name ?? "user"}
              </p>

              <p className="text-[9px] text-[#78716C]">
                Member
              </p>
            </div>

            {/* Dropdown */}
            <ChevronDown
              className="
                hidden
                h-3.5
                w-3.5
                text-[#78716C]
                transition-all
                duration-300
                group-hover:text-[#F97316]
                sm:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;