import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> {
  /** Accessible name — icons alone carry no meaning for screen readers. */
  label: string;
}

/**
 * Square icon control used across the navbar and cards.
 */
export default function IconButton({
  label,
  className,
  href,
  target,
  rel,
  type = "button",
  children,
  ...props
}: IconButtonProps) {
  const base =
    "inline-flex h-12 w-12 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip";

  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={label}
        className={cn(base, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={label}
      className={cn(base, className)}
      {...props}
    >
      {children}
    </button>
  );
}
