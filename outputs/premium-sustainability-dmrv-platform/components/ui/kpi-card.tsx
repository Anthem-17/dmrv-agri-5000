import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta: string;
  tone?: "brand" | "emerald" | "amber" | "sky";
}

const toneClasses = {
  brand: "from-brand-500 to-violet-500",
  emerald: "from-emerald-500 to-teal-500",
  amber: "from-amber-500 to-orange-500",
  sky: "from-sky-500 to-cyan-500"
};

export function KpiCard({ label, value, delta, tone = "brand" }: KpiCardProps) {
  const positive = !delta.startsWith("-");

  return (
    <Card className="overflow-hidden">
      <div className={cn("h-1 w-full bg-gradient-to-r", toneClasses[tone])} />
      <CardContent className="pt-4">
        <p className="text-sm text-slate-500">{label}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <h3 className="text-3xl font-semibold tracking-tight text-slate-900">{value}</h3>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
              positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {delta}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
