"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  FilePlus,
  LayoutDashboard,
  PieChart,
  Settings,
  ShieldCheck,
  Store,
  Satellite,
  Trophy,
  User
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminNav, userNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  satellite: Satellite,
  calculator: Calculator,
  store: Store,
  "file-plus": FilePlus,
  "shield-check": ShieldCheck,
  "pie-chart": PieChart,
  trophy: Trophy,
  user: User,
  settings: Settings
} as const;

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();
  const navItems = role === "admin" ? adminNav : userNav;

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200/70 bg-white/80 px-4 py-5 backdrop-blur xl:block">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
          C
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900">Carbon Nexus</h1>
          <p className="text-xs text-slate-500">dMRV and ESG intelligence</p>
        </div>
      </div>

      <Card className="mb-6 bg-slate-950 text-white shadow-xl">
        <div className="space-y-3">
          <Badge tone="brand" className="bg-white/10 text-white ring-white/10">
            Premium Enterprise
          </Badge>
          <div>
            <p className="text-sm text-slate-300">Real-time project integrity</p>
            <h3 className="mt-1 text-lg font-semibold">Track, verify, and monetize carbon impact.</h3>
          </div>
          <Button href="/projects/verification" className="w-full bg-white text-slate-950 hover:bg-slate-100">
            Open verification queue
          </Button>
        </div>
      </Card>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
