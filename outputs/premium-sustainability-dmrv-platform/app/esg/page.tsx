"use client";

import { useMemo } from "react";
import { BrainCircuit, Leaf, ShieldCheck, Users } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { MetricBarChart, MetricLineChart } from "@/components/ui/charts";
import { companies, esgScores, monthlyEmissions } from "@/data/mock-data";
import { useAuth } from "@/hooks/use-auth";

export default function EsgPage() {
  const { user } = useAuth();
  const score = useMemo(() => esgScores.find((item) => item.userId === user?.id) ?? esgScores[0], [user?.id]);
  const benchmark = useMemo(
    () => [
      { label: "This quarter", environmental: score.environmental, social: score.social, governance: score.governance },
      { label: "Industry avg", environmental: 79, social: 75, governance: 73 },
      { label: "Best-in-class", environmental: 96, social: 92, governance: 90 }
    ],
    [score]
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="ESG analytics"
          title="Environmental, social, and governance performance"
          description="See score composition, benchmark comparisons, and tailored sustainability recommendations."
          actions={<Badge tone="brand">Overall score {score.overall}</Badge>}
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <KpiCard label="Environmental" value={`${score.environmental}`} delta="+6" tone="emerald" />
          <KpiCard label="Social" value={`${score.social}`} delta="+4" tone="sky" />
          <KpiCard label="Governance" value={`${score.governance}`} delta="+2" tone="amber" />
          <KpiCard label="Overall ESG" value={`${score.overall}`} delta="+5" tone="brand" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 lg:grid-cols-2">
            <MetricLineChart
              title="ESG trend"
              data={score.trend}
              xKey="month"
              lines={[{ dataKey: "score", stroke: "#9333ea", name: "Overall score" }]}
            />
            <MetricBarChart
              title="Benchmark comparison"
              data={benchmark}
              xKey="label"
              bars={[
                { dataKey: "environmental", fill: "#14b8a6", name: "Environmental" },
                { dataKey: "social", fill: "#0ea5e9", name: "Social" },
                { dataKey: "governance", fill: "#f59e0b", name: "Governance" }
              ]}
            />
          </div>

          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Sustainability recommendations</CardTitle>
              <CardDescription className="text-slate-300">
                Actionable next steps informed by score movement and project performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Improve water governance", "Add irrigation telemetry and monthly utilization reports."],
                ["Strengthen community reporting", "Document worker safety and local participation metrics."],
                ["Increase biodiversity coverage", "Expand habitat corridors around the project block."]
              ].map(([title, description]) => (
                <div key={title as string} className="rounded-3xl bg-white/[0.06] p-4">
                  <p className="font-medium">{title as string}</p>
                  <p className="mt-1 text-sm text-slate-300">{description as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Score composition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Environmental", score.environmental],
                ["Social", score.social],
                ["Governance", score.governance]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-950">{label as string}</p>
                    <Badge tone="brand">{value as number}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {companies.slice(0, 3).map((company) => (
                <div key={company.id} className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-medium text-slate-950">{company.name}</p>
                  <p className="text-sm text-slate-500">
                    {company.sector} - ESG {company.esgScore}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-600 to-violet-700 text-white">
            <CardContent className="space-y-3">
              <BrainCircuit className="h-5 w-5" />
              <p className="text-lg font-semibold">AI guidance</p>
              <p className="text-sm text-white/80">
                ESG recommendations are synthesized from monthly emissions, project verification, and evidence quality.
              </p>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {[
                  ["Monthly ESG trend", `${monthlyEmissions.at(-1)?.esg ?? score.overall}`],
                  ["Policy readiness", "92%"],
                  ["Compliance score", "96%"],
                  ["Risk reduction", "14%"]
                ].map(([label, value]) => (
                  <div key={label as string} className="rounded-2xl bg-white/10 p-3">
                    <p className="text-xs text-white/70">{label as string}</p>
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
