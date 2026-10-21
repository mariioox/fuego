import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export default function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
