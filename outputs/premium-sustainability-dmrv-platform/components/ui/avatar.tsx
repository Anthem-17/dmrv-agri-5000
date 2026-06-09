import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
}

export function Avatar({ className, initials, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-sm font-semibold text-white shadow-glow",
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
