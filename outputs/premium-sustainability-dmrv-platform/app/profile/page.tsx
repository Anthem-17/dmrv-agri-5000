"use client";

import { Award, CreditCard, FileText, MapPinned, User2 } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { carbonCredits, projects } from "@/data/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { formatNumber } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuth();
  const userProjects = projects.filter((project) => project.ownerId === user?.id);
  const userCredits = carbonCredits.filter((credit) => userProjects.some((project) => project.id === credit.projectId));

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Profile"
          title="Your sustainability identity"
          description="A polished profile view with project ownership, credits, and performance statistics."
          actions={<Badge tone="brand">{user?.role ?? "user"}</Badge>}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar initials={user?.avatar ?? "CN"} className="h-16 w-16 rounded-3xl" />
                <div>
                  <p className="text-2xl font-semibold text-slate-950">{user?.name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Score", user?.score ?? 0],
                  ["Credits", user?.credits ?? 0],
                  ["Emissions reduced", user?.emissionsReduced ?? 0],
                  ["Projects", userProjects.length]
                ].map(([label, value]) => (
                  <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label as string}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">{formatNumber(value as number)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project portfolio</CardTitle>
              <CardDescription>Projects under your ownership and their certification state.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProjects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{project.name}</p>
                      <p className="text-sm text-slate-500">{project.location}</p>
                    </div>
                    <Badge tone={project.verification === "Approved" ? "emerald" : "amber"}>{project.verification}</Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Land</p>
                      <p className="font-medium text-slate-950">{project.landSize} ha</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Trees</p>
                      <p className="font-medium text-slate-950">{formatNumber(project.treesPlanted)}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Credits</p>
                      <p className="font-medium text-slate-950">{formatNumber(project.carbonCredits)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Credit inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userCredits.map((credit) => (
                <div key={credit.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-950">{credit.projectName}</p>
                    <Badge tone="brand">{formatNumber(credit.quantity)}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{credit.verificationStatus}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Identity details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Role", user?.role ?? "user"],
                ["Company", user?.companyId ?? "n/a"],
                ["Location", user?.location ?? "n/a"],
                ["Member status", "Active"]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{label as string}</p>
                  <p className="mt-1 font-medium text-slate-950">{value as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-950 text-white">
            <CardContent className="space-y-3">
              <User2 className="h-5 w-5" />
              <p className="text-lg font-semibold">Profile completeness</p>
              <p className="text-sm text-slate-300">A polished identity card for enterprise demos and investor walkthroughs.</p>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {[
                  ["KYC", "Complete"],
                  ["Documents", "4 files"],
                  ["Verification", "Approved"],
                  ["Awards", "3 badges"]
                ].map(([label, value]) => (
                  <div key={label as string} className="rounded-2xl bg-white/[0.06] p-3">
                    <p className="text-xs text-slate-300">{label as string}</p>
                    <p className="mt-1 font-semibold">{value as string}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
