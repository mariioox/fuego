import type { HTMLAttributes, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      auto: "grid-cols-[repeat(auto-fill,minmax(160px,1fr))]",
      autoFit: "grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
      sneaker: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(max(160px,calc((100%_-_60px)/4)),1fr))]",
    },
    gap: {
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      x3y6: "gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
  },
});

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: ElementType;
}

export function Grid({
  as: Tag = "div",
  className,
  cols,
  gap,
  ...props
}: GridProps) {
  return (
    <Tag
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  );
}

export { gridVariants };
export default Grid;
