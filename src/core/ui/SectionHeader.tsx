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
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-6",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <span className="text-[13px] font-medium text-muted">{eyebrow}</span>
        )}
        <h2 className="mt-3 font-display text-[clamp(32px,3.6vw,48px)] font-semibold leading-none tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
