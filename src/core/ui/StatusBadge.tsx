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
        "self-start whitespace-nowrap rounded border border-edge px-2 py-1 font-mono text-[9px] font-black uppercase tracking-[0.05em]",
        statusStyles[key] ?? "border-edge text-ink/40",
      )}
    >
      {status ?? "ARCHIVED"}
    </span>
  );
}