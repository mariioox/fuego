import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

interface GlassPanelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Translucent frosted surface used for the navbar, filter chips and cards.
 * Values live in the design tokens (`--glass-bg`, `--glass-edge`,
 * `--glass-shadow`) so light and dark stay in sync.
 */
export default function GlassPanel({
  as: Tag = "div",
  className,
  children,
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-glass-edge bg-glass shadow-glass backdrop-blur-[10px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
