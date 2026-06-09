import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-glow hover:from-brand-500 hover:to-violet-500",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  outline: "border border-slate-200 bg-white text-slate-900 hover:border-brand-300 hover:text-brand-700",
  destructive: "bg-rose-600 text-white hover:bg-rose-500"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  href,
  anchorProps,
  ...props
}: ButtonProps) {
  const sharedClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link className={sharedClasses} href={href} {...anchorProps}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={sharedClasses}
      {...props}
    />
  );
}
