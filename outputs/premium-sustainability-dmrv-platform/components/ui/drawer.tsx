"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
}

export function Drawer({ open, onOpenChange, title, children }: DrawerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 bg-slate-950/50"
        aria-label="Close drawer backdrop"
        onClick={() => onOpenChange(false)}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-soft transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}
