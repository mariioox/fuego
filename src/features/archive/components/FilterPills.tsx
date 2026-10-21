import { useMemo } from "react";
import { cn } from "../../../core/utils/cn";
import { SNEAKER_REGISTRY } from "../data/sneakerRegistry";

interface Props {
  brandFilter: string;
  setBrandFilter: (val: string) => void;
}

export default function FilterPills({ brandFilter, setBrandFilter }: Props) {
  const pills = useMemo(() => {
    const counts = new Map<string, number>();
    let inHand = 0;

    for (const sneaker of SNEAKER_REGISTRY) {
      counts.set(sneaker.brand, (counts.get(sneaker.brand) ?? 0) + 1);
      if (sneaker.availability === "IN_HAND") inHand += 1;
    }

    return [
      { value: "ALL", label: "All", count: SNEAKER_REGISTRY.length },
      { value: "IN_HAND", label: "In Hand Ready", count: inHand },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([brand, count]) => ({ value: brand, label: brand, count })),
    ];
  }, []);

  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
      role="group"
      aria-label="Filter by brand"
    >
      {pills.map((pill) => {
        const active = brandFilter === pill.value;

        return (
          <button
            key={pill.value}
            type="button"
            onClick={() => setBrandFilter(pill.value)}
            aria-pressed={active}
            className={cn(
              "glass-panel mono flex h-[34px] shrink-0 items-center gap-1.5 rounded-full px-4 text-[10px] font-black uppercase tracking-[0.08em] transition-colors duration-300",
              active
                ? "border-transparent bg-brand text-white"
                : "text-ink hover:border-brand hover:text-brand",
            )}
          >
            {pill.label}
            <span className={active ? "text-[9px] text-white/70" : "text-[9px] opacity-40"}>
              {pill.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
