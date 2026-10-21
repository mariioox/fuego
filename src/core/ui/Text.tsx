import type { HTMLAttributes, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-[11px]",
      sm: "text-[12px]",
      base: "text-[13px]",
      md: "text-[14px]",
      lg: "text-[15px]",
      xl: "text-[16px]",
      "2xl": "text-[17px]",
      "3xl": "text-[18px]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      ink: "text-ink",
      muted: "text-muted",
      white: "text-white",
      bg: "text-bg",
      btnInk: "text-btn-ink",
    },
    leading: {
      tight: "leading-[0.98]",
      snug: "leading-[1]",
      normal: "leading-[1.15]",
      relaxed: "leading-[1.35]",
      loose: "leading-[1.55]",
    },
    tracking: {
      tight: "tracking-[-0.045em]",
      snug: "tracking-[-0.04em]",
      normal: "tracking-[-0.035em]",
      wide: "tracking-[-0.025em]",
      wider: "tracking-[-0.02em]",
    },
  },
  defaultVariants: {
    size: "base",
    color: "ink",
  },
});

export interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

export function Text({
  as: Tag = "p",
  className,
  size,
  weight,
  color,
  leading,
  tracking,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textVariants({ size, weight, color, leading, tracking }), className)}
      {...props}
    />
  );
}

export { textVariants };
export default Text;
