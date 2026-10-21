import type { HTMLAttributes, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const stackVariants = cva("flex flex-col", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "start",
    gap: 4,
  },
});

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: ElementType;
}

export function Stack({
  as: Tag = "div",
  className,
  align,
  justify,
  gap,
  ...props
}: StackProps) {
  return (
    <Tag
      className={cn(stackVariants({ align, justify, gap }), className)}
      {...props}
    />
  );
}

export { stackVariants };
export default Stack;
