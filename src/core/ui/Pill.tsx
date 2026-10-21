import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

/**
 * Filter chip used for the brand rows. Inactive chips are frosted glass, the
 * active one is filled with the current text colour.
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
        "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-control border px-[18px] text-[14px] font-medium backdrop-blur-[10px] transition-[background-color,border-color,color] duration-300 ease-soft",
        active
          ? "border-text bg-text text-bg"
          : "border-line bg-glass text-ink hover:border-text",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
