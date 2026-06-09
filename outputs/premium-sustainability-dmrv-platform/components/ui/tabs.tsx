"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: string[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            value === tab ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
