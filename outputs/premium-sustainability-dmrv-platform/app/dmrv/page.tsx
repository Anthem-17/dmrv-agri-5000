"use client";

import { useMemo, useState } from "react";
import { Activity, Satellite, ShieldCheck, TreePine, Waves } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { MetricAreaChart, MetricBarChart, MetricLineChart, MetricPieChart } from "@/components/ui/charts";
import { Tabs } from "@/components/ui/tabs";
import { sensorReadings } from "@/data/mock-data";
import { formatNumber } from "@/lib/utils";

const rangeMap = {
  Daily: {
    area: [
      { label: "00:00", carbon: 34, moisture: 68, coverage: 88 },
      { label: "06:00", carbon: 36, moisture: 70, coverage: 89 },
      { label: "12:00", carbon: 40, moisture: 71, coverage: 91 },
      { label: "18:00", carbon: 38, moisture: 69, coverage: 90 }
    ],
    bar: [
      { label: "Field A", sensors: 22, alerts: 1, coverage: 96 },
      { label: "Field B", sensors: 18, alerts: 0, coverage: 92 },
      { label: "Field C", sensors: 24, alerts: 2, coverage: 98 }
    ]
  },
  Weekly: {
    area: [
      { label: "Mon", carbon: 31, moisture: 64, coverage: 86 },
      { label: "Tue", carbon: 34, moisture: 66, coverage: 87 },
      { label: "Wed", carbon: 35, moisture: 68, coverage: 89 },
      { label: "Thu", carbon: 37, moisture: 70, coverage: 90 },
      { label: "Fri", carbon: 39, moisture: 72, coverage: 92 }
    ],
    bar: [
      { label: "Zone 1", sensors: 28, alerts: 2, coverage: 91 },
      { label: "Zone 2", sensors: 32, alerts: 1, coverage: 95 },
      { label: "Zone 3", sensors: 24, alerts: 0, coverage: 88 }
    ]
  },
  Monthly: {
    area: [
      { label: "W1", carbon: 29, moisture: 62, coverage: 84 },
      { label: "W2", carbon: 32, moisture: 66, coverage: 86 },
      { label: "W3", carbon: 35, moisture: 68, coverage: 88 },
      { label: "W4", carbon: 38, moisture: 71, coverage: 91 }
    ],
    bar: [
      { label: "North", sensors: 36, alerts: 1, coverage: 95 },
      { label: "Central", sensors: 40, alerts: 3, coverage: 93 },
      { label: "South", sensors: 30, alerts: 1, coverage: 90 }
    ]
  },
  Yearly: {
    area: [
      { label: "Q1", carbon: 24, moisture: 59, coverage: 82 },
      { label: "Q2", carbon: 28, moisture: 63, coverage: 85 },
      { label: "Q3", carbon: 33, moisture: 67, coverage: 89 },
      { label: "Q4", carbon: 40, moisture: 72, coverage: 93 }
    ],
    bar: [
      { label: "2023", sensors: 120, alerts: 8, coverage: 84 },
      { label: "2024", sensors: 148, alerts: 5, coverage: 89 },
      { label: "2025", sensors: 176, alerts: 3, coverage: 94 }
    ]
  }
} as const;

export default function DmrvPage() {
  const [range, setRange] = useState<keyof typeof rangeMap>("Monthly");
  const data = rangeMap[range];

  const pieData = useMemo(
    () => [
      { name: "Verified", value: 48 },
      { name: "Pending", value: 14 },
      { name: "Satellite", value: 22 },
      { name: "Sensor", value: 16 }
    ],
    []
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="dMRV monitoring"
          title="Digital monitoring, reporting, and verification"
          description="Rich visual telemetry for IoT sensors, satellite coverage, carbon tracking, and verification confidence."
          actions={
            <Tabs tabs={["Daily", "Weekly", "Monthly", "Yearly"]} value={range} onChange={(value) => setRange(value as keyof typeof rangeMap)} />
          }
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <KpiCard label="Sensor uptime" value="99.2%" delta="+0.6" tone="brand" />
          <KpiCard label="Satellite coverage" value="94%" delta="+2.1" tone="emerald" />
          <KpiCard label="Emission integrity" value="98%" delta="+1.8" tone="sky" />
          <KpiCard label="Verification confidence" value="96%" delta="+3.4" tone="amber" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>IoT sensor data</CardTitle>
                <CardDescription>Live field telemetry and anomaly detection signals.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sensorReadings.map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p className="mt-1 text-2xl font-semibold text-slate-950">
                          {item.value}
                          {item.unit}
                        </p>
                      </div>
                      <Badge tone="emerald">+{item.delta}%</Badge>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-violet-600" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification status</CardTitle>
                <CardDescription>Evidence pipeline and status confidence.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  ["Pending", 14],
                  ["Under review", 31],
                  ["Verified", 37],
                  ["Approved", 18]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-950">{label}</p>
                      <p className="text-sm text-slate-500">{value}%</p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-brand-600" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Monitoring overview</CardTitle>
              <CardDescription className="text-slate-300">
                Sensor, satellite, and sequestration coverage across the current monitoring period.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                [Activity, "Carbon tracking", "Real-time emissions movement"],
                [Satellite, "Satellite", "Geo-spatial canopy analysis"],
                [Activity, "Field sensors", "Humidity and soil readings"],
                [TreePine, "Sequestration", "Biomass growth capture"],
                [Waves, "Water signal", "Irrigation and moisture trends"],
                [ShieldCheck, "Audit trail", "Evidence-linked verification"]
              ].map(([Icon, title, description]) => (
                <div key={title as string} className="rounded-3xl bg-white/[0.06] p-4">
                  <Icon className="h-5 w-5 text-brand-300" />
                  <p className="mt-3 font-medium">{title as string}</p>
                  <p className="mt-1 text-sm text-slate-300">{description as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <MetricAreaChart
            title={`Carbon and moisture trend - ${range}`}
            data={data.area}
            xKey="label"
            lines={[
              { dataKey: "carbon", stroke: "#9333ea", fill: "#9333ea", name: "Carbon uptake" },
              { dataKey: "moisture", stroke: "#14b8a6", fill: "#14b8a6", name: "Moisture" }
            ]}
          />
          <MetricBarChart
            title={`Coverage and alert status - ${range}`}
            data={data.bar}
            xKey="label"
            bars={[
              { dataKey: "sensors", fill: "#0ea5e9", name: "Sensors" },
              { dataKey: "alerts", fill: "#f59e0b", name: "Alerts" },
              { dataKey: "coverage", fill: "#9333ea", name: "Coverage" }
            ]}
          />
          <MetricPieChart title="Verification composition" data={pieData} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verification timeline</CardTitle>
            <CardDescription>Evidence state changes during the monitoring lifecycle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Daily ingest", "Sensors sync every 15 minutes", "Active"],
                ["Weekly audit", "Satellite scans compared to field data", "Live"],
                ["Monthly review", "Anomalies rolled into summary report", "Upcoming"],
                ["Annual archive", "Immutable report export and sign-off", "Locked"]
              ].map(([title, description, status], index) => (
                <div key={title as string} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-950">{title as string}</p>
                    <Badge tone={index === 0 || index === 1 ? "emerald" : "slate"}>{status as string}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{description as string}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
