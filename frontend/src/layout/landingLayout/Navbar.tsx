"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/work-flow" },
    { name: "Explore Skill", path: "/explore-skill" },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#52291A]/60 bg-[#0B0804]/95 shadow-lg shadow-black/20 backdrop-blur-md">
      <div className="mx-auto flex h-19 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
            width={60}
            height={60}
            alt="SkillSwap Logo"
            priority
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-3">
          {navMenu.map((menu) => {
            const isActive = menu.path === pathname;

            return (
              <Link
                key={menu.name}
                href={menu.path}
                className={`
                  group relative rounded-lg px-3 py-2 text-sm font-semibold
                  transition-all duration-300
                  lg:px-4 lg:text-base
                  ${
                    isActive
                      ? "text-[#FFF7ED]"
                      : "text-[#A8A29E] hover:text-[#FFF7ED]"
                  }
                `}
              >
                {menu.name}

                <span
                  className={`
                    absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2
                    rounded-full bg-linear-to-r from-[#F97316] to-[#E59A0B]
                    transition-all duration-300
                    ${
                      isActive
                        ? "w-[70%] opacity-100"
                        : "w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100"
                    }
                  `}
                />

                {isActive && (
                  <span className="absolute inset-0 -z-10 rounded-lg bg-[#F97316]/5 blur-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/login")}
            className="
              h-10 cursor-pointer rounded-lg border-[#6B3515]
              bg-transparent px-5 font-semibold text-[#FFF7ED]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-[#F97316]
              hover:bg-[#F97316]/10
              hover:text-[#F97316]
              hover:shadow-lg hover:shadow-[#F97316]/10
            "
          >
            Login
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/register")}
            className="
              h-10 cursor-pointer rounded-lg border-0
              bg-linear-to-r from-[#F97316] to-[#E59A0B]
              px-5 font-bold text-[#1C1008]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:from-[#FF8A3D]
              hover:to-[#F0B323]
              hover:shadow-lg hover:shadow-[#F97316]/20
              active:translate-y-0
            "
          >
            Get Started
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="
            flex h-10 w-10 cursor-pointer items-center justify-center
            rounded-lg border border-[#6B3515]
            bg-[#1C1008] text-[#FFF7ED]
            transition-all duration-300
            hover:border-[#F97316]
            hover:bg-[#F97316]/10
            hover:text-[#F97316]
            md:hidden
          "
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={`
          overflow-hidden border-t border-[#52291A]/60 bg-[#100905]
          transition-all duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-5 pt-3 sm:px-6">
          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navMenu.map((menu) => {
              const isActive = menu.path === pathname;

              return (
                <Link
                  key={menu.name}
                  href={menu.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    group flex items-center justify-between rounded-xl
                    px-4 py-3 text-sm font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-linear-to-r from-[#F97316]/15 to-[#E59A0B]/10 text-[#FFF7ED]"
                        : "text-[#A8A29E] hover:bg-[#1C1008] hover:text-[#FFF7ED]"
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-sm shadow-[#F97316]" />
                    )}

                    {menu.name}
                  </span>

                  <ChevronRight
                    className={`
                      h-4 w-4 transition-all duration-300
                      ${
                        isActive
                          ? "translate-x-0 text-[#F97316]"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#F97316]"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#52291A]/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="
    group relative h-11 cursor-pointer overflow-hidden
    border-[#6B3515]
    bg-[#1C1008]
    px-5 font-semibold text-[#FFF7ED]
    transition-all duration-300
    hover:border-[#F97316]
    hover:shadow-lg hover:shadow-[#F97316]/10
    focus:outline-none focus:ring-2
    focus:ring-[#F97316]
    focus:ring-offset-2
    focus:ring-offset-[#0B0804]
  "
            >
              {/* Left → center */}
              <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#F97316] to-[#52291A] transition-all duration-500 ease-out group-hover:w-1/2" />

              {/* Right → center */}
              <span className="absolute inset-y-0 right-0 w-0 bg-linear-to-r from-[#52291A] to-[#F97316] transition-all duration-500 ease-out group-hover:w-1/2" />

              {/* Content */}
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                Login
              </span>
            </Button>

            <Button
  type="button"
  onClick={() => {
    setMobileMenuOpen(false);
    router.push("/register");
  }}
  className="
    group relative h-11 cursor-pointer overflow-hidden
    border-0
    bg-linear-to-r from-[#F97316] to-[#E59A0B]
    px-5 font-bold text-[#1C1008]
    shadow-lg shadow-[#F97316]/10
    transition-all duration-300
    hover:-translate-y-0.5
    hover:shadow-xl hover:shadow-[#F97316]/20
    focus:outline-none
    focus:ring-2
    focus:ring-[#F97316]
    focus:ring-offset-2
    focus:ring-offset-[#0B0804]
  "
>
  {/* Left → Right */}
  <span
    className="
      pointer-events-none absolute inset-y-0 left-0 w-full
      -translate-x-full
      bg-linear-to-r from-[#52291A] to-[#1A0D04]
      transition-transform duration-500 ease-out
      group-hover:translate-x-0
    "
  />

  {/* Text */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FFF7ED]">
    Get Started
  </span>
</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
