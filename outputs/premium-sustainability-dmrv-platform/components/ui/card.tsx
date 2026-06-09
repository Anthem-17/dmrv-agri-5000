import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-white/75",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />;
}

export function CardDescription({ className, ...props }: CardProps) {
  return <p className={cn("text-sm text-slate-600", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("space-y-4", className)} {...props} />;
}
