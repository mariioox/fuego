import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

interface SectionProps {
  as?: ElementType;
  id?: string;
  borderTop?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Section({
  as: Tag = "section",
  id,
  borderTop = false,
  className,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1440px] px-[clamp(20px, 6vw, 96px)] py-[clamp(4rem, 7vw, 6rem)]",
        borderTop && "border-t border-edge",
        className,
      )}
    >
      {children}
    </Tag>
  );
}