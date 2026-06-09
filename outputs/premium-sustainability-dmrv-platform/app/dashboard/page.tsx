"use client";

import { CalendarDays, CheckCircle2, MapPinned, Sparkles, TriangleAlert } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { MetricAreaChart, MetricLineChart } from "@/components/ui/charts";
import {
  monthlyEmissions,
  projects,
  users
} from "@/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const recentActivities = [
  ["Submitted project baseline", "Mangrove Revival", "2h ago", "Pending"],
  ["Issued carbon credit batch", "Regenerative Soy Fields", "6h ago", "Verified"],
  ["Verified satellite evidence", "Community Forest Block", "1d ago", "Under Review"]
];

export default function DashboardPage() {
  const { user } = useAuth();
  const ownedProjects = projects.filter((project) => project.ownerId === user?.id);
  const userCompany = users.find((item) => item.companyId === user?.companyId);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="User dashboard"
          title={`Welcome back, ${user?.name ?? "Climate operator"}`}
          description="Monitor your sustainability projects, ESG trajectory, and carbon credit performance from one premium interface."
          actions={
            <>
              <Badge tone="brand" className="h-11 px-4">
                <Sparkles className="h-4 w-4" />
                {userCompany?.name ?? "Your company"}
              </Badge>
              <Badge tone="emerald" className="h-11 px-4">
                <CheckCircle2 className="h-4 w-4" />
                {ownedProjects.length} active projects
              </Badge>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <KpiCard label="Total Carbon Credits" value={formatNumber(user?.credits ?? 0)} delta="+12%" tone="brand" />
          <KpiCard label="ESG Score" value={`${user?.score ?? 0}`} delta="+4" tone="emerald" />
          <KpiCard label="Emissions Reduced" value={`${formatNumber(user?.emissionsReduced ?? 0)}t`} delta="+18%" tone="sky" />
          <KpiCard label="Active Projects" value={`${ownedProjects.length}`} delta="+1" tone="amber" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <MetricAreaChart
                title="Monthly emissions"
                data={monthlyEmissions}
                xKey="month"
                lines={[
                  { dataKey: "emissions", stroke: "#9333ea", fill: "#9333ea", name: "Emissions" },
                  { dataKey: "reductions", stroke: "#14b8a6", fill: "#14b8a6", name: "Reductions" }
                ]}
              />
              <MetricLineChart
                title="ESG progress"
                data={monthlyEmissions}
                xKey="month"
                lines={[
                  { dataKey: "esg", stroke: "#0ea5e9", name: "ESG score" },
                  { dataKey: "credits", stroke: "#f59e0b", name: "Credits earned" }
                ]}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent activities</CardTitle>
                <CardDescription>Project events and verification milestones across your portfolio.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-3 font-medium">Activity</th>
                        <th className="pb-3 font-medium">Project</th>
                        <th className="pb-3 font-medium">Time</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map(([activity, project, time, status]) => (
                        <tr key={`${activity}-${project}`} className="border-b border-slate-100 last:border-0">
                          <td className="py-4 text-slate-700">{activity}</td>
                          <td className="py-4 text-slate-600">{project}</td>
                          <td className="py-4 text-slate-500">{time}</td>
                          <td className="py-4">
                            <Badge tone={status === "Verified" ? "emerald" : status === "Under Review" ? "amber" : "slate"}>
                              {status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-950 text-white">
              <CardHeader>
                <CardTitle className="text-white">AI insights</CardTitle>
                <CardDescription className="text-slate-300">
                  Recommendations generated from project trends and telemetry.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Optimize irrigation to reduce water intensity by 11% next cycle.",
                  "Submit additional satellite evidence to accelerate verification.",
                  "Your projected credit issuance could increase by 8% with low-till adoption."
                ].map((insight) => (
                  <div key={insight} className="rounded-3xl bg-white/[0.06] p-4 text-sm text-slate-200">
                    {insight}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project status</CardTitle>
                <CardDescription>Current state for all owned projects.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ownedProjects.map((project) => (
                  <div key={project.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-950">{project.name}</p>
                        <p className="text-sm text-slate-500">{project.location}</p>
                      </div>
                      <Badge tone={project.verification === "Approved" ? "emerald" : "amber"}>{project.verification}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">Credits</p>
                        <p className="font-semibold text-slate-950">{formatNumber(project.carbonCredits)}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">ESG</p>
                        <p className="font-semibold text-slate-950">{project.esgScore}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-600 to-violet-700 text-white">
              <CardContent className="space-y-3">
                <MapPinned className="h-5 w-5" />
                <p className="text-lg font-semibold">Map placeholder</p>
                <p className="text-sm text-white/80">
                  Geospatial project layers, farm blocks, and monitoring zones are rendered here in production.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Land size", `${ownedProjects.reduce((sum, project) => sum + project.landSize, 0)} ha`],
                  ["Trees planted", formatNumber(ownedProjects.reduce((sum, project) => sum + project.treesPlanted, 0))],
                  ["Fuel usage", formatNumber(ownedProjects.reduce((sum, project) => sum + project.fuelUsage, 0))],
                  ["Water usage", formatNumber(ownedProjects.reduce((sum, project) => sum + project.waterUsage, 0))]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
