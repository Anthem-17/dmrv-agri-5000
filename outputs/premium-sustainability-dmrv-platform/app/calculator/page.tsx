"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { ArrowRight, Leaf, Zap, Droplets, Fuel, TreePine } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateEmissions } from "@/lib/calculations";
import { formatNumber } from "@/lib/utils";

export default function CalculatorPage() {
  const [values, setValues] = useState({
    landSize: 120,
    trees: 32000,
    fuelUsage: 3800,
    electricityUsage: 9200,
    waterUsage: 11000,
    fertilizerUsage: 260
  });

  const result = useMemo(() => calculateEmissions(values), [values]);

  const update = (field: keyof typeof values) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: Number(event.target.value) }));
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Carbon calculator"
          title="Estimate emissions, offsets, and carbon credits"
          description="Live updates powered by React state and sustainability formulas designed for investor demos and product walkthroughs."
          actions={<Badge tone="brand">Live calculation</Badge>}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Adjust project parameters to recalculate estimated emissions in real time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["landSize", "Land size (ha)", TreePine],
                ["trees", "Trees planted", Leaf],
                ["fuelUsage", "Fuel usage (liters)", Fuel],
                ["electricityUsage", "Electricity usage (kWh)", Zap],
                ["waterUsage", "Water usage (L)", Droplets],
                ["fertilizerUsage", "Fertilizer usage (kg)", ArrowRight]
              ].map(([field, label, Icon]) => (
                <div key={field as string} className="space-y-2 rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-brand-600" />
                    <label className="text-sm font-medium text-slate-700">{label as string}</label>
                  </div>
                  <Input type="number" value={values[field as keyof typeof values]} onChange={update(field as keyof typeof values)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Card className="bg-slate-950 text-white">
                <CardContent>
                  <p className="text-sm text-slate-300">Estimated emissions</p>
                  <p className="mt-2 text-3xl font-semibold">{formatNumber(result.emissions, 1)} tCO2e</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-slate-500">Carbon offset</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(result.offset, 1)} tCO2e</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-slate-500">Carbon credits</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">{formatNumber(result.credits)}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact scorecard</CardTitle>
                <CardDescription>Environmental, social, and governance outputs update live with each input change.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Environmental score", result.environmental, "brand"],
                  ["Social score", result.social, "emerald"],
                  ["Governance score", result.governance, "sky"],
                  ["Overall ESG", result.overall, "amber"]
                ].map(([label, value, tone]) => (
                  <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label as string}</p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-3xl font-semibold text-slate-950">{value as number}</p>
                      <Badge tone={tone as "brand" | "emerald" | "sky" | "amber"}>Live</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculation summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <p>Net emissions = total emissions - sequestration offset.</p>
                <p>Carbon credits are estimated from sequestered carbon and reduction performance.</p>
                <p>Scores are normalized for a high-end demo experience, not for formal registry issuance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
