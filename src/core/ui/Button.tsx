import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}

const base =
  "inline-flex select-none cursor-pointer items-center justify-center gap-2.5 font-black uppercase tracking-[0.06em] transition-[color,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px";

const variants = {
  solid: "bg-ink text-bg hover:text-brand",
  outline:
    "border border-edge bg-transparent text-ink hover:border-brand hover:text-brand",
};

const sizes = {
  sm: "min-h-[36px] px-4 text-[9px]",
  md: "min-h-[46px] px-6 text-[11px]",
  lg: "min-h-[52px] px-8 text-xs",
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}