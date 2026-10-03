
// import {
//   LayoutDashboard,
//   Users,
//   Sparkles,
//   ArrowLeftRight,
//   Activity,
//   Flag,
//   FolderTree,
// } from "lucide-react";

// export const adminMenuItems = [
//   {
//     label: "Dashboard",
//     href: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Users Management",
//     href: "/admin/user-management",
//     icon: Users,
//   },
//   {
//     label: "Skills Management",
//     href: "/admin/skills-management",
//     icon: Sparkles,
//   },
//   {
//     label: "SkillCategory Management",
//     href: "/admin/skillCategory-management",
//     icon: FolderTree,
//   },
//   {
//     label: "Swap Requests",
//     href: "/admin/swap-request-management",
//     icon: ArrowLeftRight,
//   },
//   {
//     label: "All Swaps",
//     href: "/admin/swap-management",
//     icon: Activity,
//   },
//   {
//     label: "Report Management",
//     href: "/admin/report-management",
//     icon: Flag,
//   },
// ];

import {
  LayoutDashboard,
  Users,
  Sparkles,
  ArrowLeftRight,
  Activity,
  Flag,
  FolderTree,
} from "lucide-react";

export const adminMenuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your SkillSwap platform.",
  },
  {
    label: "Users Management",
    href: "/admin/user-management",
    icon: Users,
    description: "Manage users, accounts, and platform access.",
  },
  {
    label: "Skills Management",
    href: "/admin/skills-management",
    icon: Sparkles,
    description: "Manage and organize skills available on SkillSwap.",
  },
  {
    label: "SkillCategory Management",
    href: "/admin/skillCategory-management",
    icon: FolderTree,
    description: "Manage skill categories and their availability.",
  },
  {
    label: "Swap Requests",
    href: "/admin/swap-request-management",
    icon: ArrowLeftRight,
    description: "Review and manage incoming skill swap requests.",
  },
  {
    label: "All Swaps",
    href: "/admin/swap-management",
    icon: Activity,
    description: "Monitor all active, completed, and cancelled swaps.",
  },
  {
    label: "Report Management",
    href: "/admin/report-management",
    icon: Flag,
    description: "Review user reports and manage moderation status.",
  },
];