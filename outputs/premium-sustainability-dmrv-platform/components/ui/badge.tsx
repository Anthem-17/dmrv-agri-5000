import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeTone = "brand" | "emerald" | "amber" | "sky" | "slate" | "rose";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  sky: "bg-sky-50 text-sky-700 ring-sky-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-100"
};

export function Badge({ className, tone = "slate", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
