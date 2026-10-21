import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

/**
 * Small filter chip. Inactive chips are frosted glass, the active one is
 * filled with the brand colour.
 */
export default function Pill({
  active = false,
  className,
  children,
  type = "button",
  ...props
}: PillProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[11px] font-semibold tracking-wide transition-colors duration-200",
        active
          ? "border-transparent bg-brand text-white"
          : "border-glass-edge bg-glass text-ink backdrop-blur-[10px] hover:border-brand hover:text-brand",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
