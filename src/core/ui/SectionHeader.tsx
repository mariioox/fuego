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
          <span className="mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-8 mb-4 text-[clamp(2rem,4.5vw,3.2rem)] font-black italic uppercase leading-[0.9] tracking-[-0.04em]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}