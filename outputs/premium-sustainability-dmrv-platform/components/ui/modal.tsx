"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export function Modal({ open, onOpenChange, title, description, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn("w-[min(92vw,42rem)] rounded-3xl border border-slate-200 bg-white p-0 shadow-soft")}
      onClose={() => onOpenChange(false)}
    >
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
            {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} aria-label="Close modal">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
