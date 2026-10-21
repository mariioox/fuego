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
        "mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)] py-[clamp(40px,8vw,128px)]",
        borderTop && "border-t border-line",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
