import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}

const base =
  "inline-flex select-none cursor-pointer items-center justify-center gap-2.5 font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px";

const variants = {
  solid: "bg-ink text-bg hover:text-brand",
  outline:
    "border border-edge bg-transparent text-ink hover:border-brand hover:text-brand",
};

const sizes = {
  sm: "min-h-[38px] px-5 text-[12px]",
  md: "min-h-[46px] px-6 text-[13px]",
  lg: "min-h-[52px] px-8 text-[14px]",
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  href,
  target,
  rel,
  type = "button",
  ...props
}: ButtonProps) {
  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}