import { cn } from "../utils/cn";

const statusStyles: Record<string, string> = {
  available: "border-green-500/35 text-green-500",
  premium: "border-brand text-brand",
};

export function StatusBadge({ status }: { status?: string }) {
  const key = (status ?? "archived").toLowerCase();

  return (
    <span
      className={cn(
        "self-start whitespace-nowrap rounded-full border border-edge px-2.5 py-1 text-[10px] font-semibold tracking-[0.06em] uppercase",
        statusStyles[key] ?? "border-edge text-ink/40",
      )}
    >
      {status ?? "Archived"}
    </span>
  );
}