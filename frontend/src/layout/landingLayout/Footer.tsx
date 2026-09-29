"use client"

import React from "react";
import Link from "next/link";
import {  ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter()
  return (
    <footer className="border-t border-[#52291A] bg-[#0B0804] text-[#FFF7ED]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div>
              <Image
              onClick={()=> router.push("/")}
                src={
                  "/images/watermarked_img_4340371330782871677-removebg-preview.png"
                }
                width={60}
                height={60}
                alt="logo"
              />
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#A8A29E]">
              Share what you know. Learn what you love. Connect with people and
              exchange skills through meaningful peer-to-peer learning.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#F97316]"
              >
                <FontAwesomeIcon icon={faGithub}  className="text-lg" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#F97316]"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#F97316]"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-lg"/>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#F97316]"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FFF7ED]">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/discover"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  Discover People
                </Link>
              </li>

              <li>
                <Link
                  href="/matches"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  My Matches
                </Link>
              </li>

              <li>
                <Link
                  href="/swap-requests"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  Swap Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  About SkillSwap
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FFF7ED]">
              Account
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="group flex items-center gap-1 text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  Login
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="group flex items-center gap-1 text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  Create Account
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="text-sm text-[#A8A29E] transition-colors hover:text-[#F97316]"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#52291A] pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-[#78716C]">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-[#78716C] transition-colors hover:text-[#F97316]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[#78716C] transition-colors hover:text-[#F97316]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
