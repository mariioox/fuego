import { cn } from "../utils/cn";

const statusDots: Record<string, string> = {
  available: "bg-[#22C55E]",
  premium: "bg-orange",
  sold_out: "bg-muted",
  archived: "bg-muted",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  premium: "Premium",
  sold_out: "Sold out",
  archived: "Archived",
};

/**
 * Small status chip: a 6px dot next to a sentence-case label.
 */
export function StatusBadge({ status }: { status?: string }) {
  const key = (status ?? "archived").toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 self-start whitespace-nowrap rounded-control border border-line bg-chip px-2.5 text-[12px] font-medium text-ink",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          statusDots[key] ?? "bg-muted",
        )}
        aria-hidden="true"
      />
      {statusLabels[key] ?? status ?? "Archived"}
    </span>
  );
}
