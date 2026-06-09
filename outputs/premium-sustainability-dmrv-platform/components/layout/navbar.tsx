"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { SearchBar } from "@/components/ui/search-bar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, role, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="xl:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden items-center gap-2 lg:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <SearchBar value={query} onChange={setQuery} placeholder="Search projects, credits, users..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge tone={role === "admin" ? "brand" : "emerald"}>{role === "admin" ? "Admin" : "User"}</Badge>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
            <Avatar initials={user?.avatar ?? "CN"} />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name ?? "Guest"}</p>
              <p className="text-xs text-slate-500">{user?.location ?? "Not signed in"}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} title="Navigation">
        <div className="space-y-4">
          <div className="lg:hidden">
            <SearchBar value={query} onChange={setQuery} placeholder="Search..." />
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <Link href="/dashboard" className="block rounded-2xl bg-slate-50 px-4 py-3">
              Dashboard
            </Link>
            <Link href="/marketplace" className="block rounded-2xl bg-slate-50 px-4 py-3">
              Marketplace
            </Link>
            <Link href="/leaderboard" className="block rounded-2xl bg-slate-50 px-4 py-3">
              Leaderboard
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
