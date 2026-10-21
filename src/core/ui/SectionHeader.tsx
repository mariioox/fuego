import type { ReactNode } from "react";
import { cn } from "../utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-6 mb-4 text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}