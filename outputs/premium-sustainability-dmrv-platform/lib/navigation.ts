import type { NavItem } from "@/types";

export const userNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { label: "dMRV", href: "/dmrv", icon: "satellite" },
  { label: "Calculator", href: "/calculator", icon: "calculator" },
  { label: "Marketplace", href: "/marketplace", icon: "store" },
  { label: "Projects", href: "/projects/register", icon: "file-plus" },
  { label: "Verification", href: "/projects/verification", icon: "shield-check" },
  { label: "ESG Analytics", href: "/esg", icon: "pie-chart" },
  { label: "Leaderboard", href: "/leaderboard", icon: "trophy" },
  { label: "Profile", href: "/profile", icon: "user" },
  { label: "Settings", href: "/settings", icon: "settings" }
];

export const adminNav: NavItem[] = [
  { label: "Admin Dashboard", href: "/admin", icon: "layout-dashboard" },
  { label: "dMRV Monitoring", href: "/dmrv", icon: "satellite" },
  { label: "Marketplace", href: "/marketplace", icon: "store" },
  { label: "Verification", href: "/projects/verification", icon: "shield-check" },
  { label: "Leaderboard", href: "/leaderboard", icon: "trophy" },
  { label: "Settings", href: "/settings", icon: "settings" }
];
