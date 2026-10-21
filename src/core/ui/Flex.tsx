import type { HTMLAttributes, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      rowReverse: "flex-row-reverse",
      colReverse: "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      wrapReverse: "flex-wrap-reverse",
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
    direction: "row",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: ElementType;
}

export function Flex({
  as: Tag = "div",
  className,
  direction,
  align,
  justify,
  wrap,
  gap,
  ...props
}: FlexProps) {
  return (
    <Tag
      className={cn(flexVariants({ direction, align, justify, wrap, gap }), className)}
      {...props}
    />
  );
}

export { flexVariants };
export default Flex;
