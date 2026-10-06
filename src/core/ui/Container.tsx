import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export default function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px] px-[clamp(20px, 6vw, 96px)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}