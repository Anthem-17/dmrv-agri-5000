import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <Badge tone="brand">{eyebrow}</Badge> : null}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 lg:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 lg:text-base">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
