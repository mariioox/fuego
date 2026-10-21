import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

interface GlassPanelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Translucent frosted surface used for the navbar, toolbar and floating cards.
 * Values live in the design tokens (`--glass`, `--glass-line`,
 * `--glass-shadow`) so light and dark stay in sync.
 */
export default function GlassPanel({
  as: Tag = "div",
  className,
  children,
}: GlassPanelProps) {
  return (
    <Tag className={cn("rounded-surface glass", className)}>{children}</Tag>
  );
}
