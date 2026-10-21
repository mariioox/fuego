import { memo, useState, useEffect, useRef, useCallback } from "react";
import { Check, Plus } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import type { SneakerSize } from "../../cart/types/cart";
import { SNEAKER_SIZES } from "../data/sizes";
import { useCart } from "../../cart/hooks/useCart";
import { cn } from "../../../core/utils/cn";
import { formatBrand } from "../../../core/utils/format";
import { revealStyle, useReveal } from "../../../core/hooks/useReveal";
import SpecimenModal from "./SpecimenModal";

function SneakerCard({
  sneaker,
  delay = 0,
}: {
  sneaker: Sneaker;
  delay?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickSize, setQuickSize] = useState<SneakerSize>(42);
  const [addStatus, setAddStatus] = useState<"IDLE" | "ADDED">("IDLE");
  const quickRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [ref, shown] = useReveal<HTMLElement>();

  const closeQuickAdd = useCallback(() => {
    setQuickAddOpen(false);
    setAddStatus("IDLE");
  }, []);

  useEffect(() => {
    if (!quickAddOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        closeQuickAdd();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeQuickAdd();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, [quickAddOpen, closeQuickAdd]);

  const quickAddId = `quick-add-${sneaker.id}`;

  const handleQuickAdd = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!quickAddOpen) {
      setQuickSize(42);
      setAddStatus("IDLE");
    }
    setQuickAddOpen((open) => !open);
  };

  const handleQuickAddSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(sneaker, quickSize);
    setAddStatus("ADDED");
    window.setTimeout(() => setAddStatus("IDLE"), 1400);
    setQuickAddOpen(false);
  };

  useEffect(() => {
    if (quickAddOpen) {
      quickRef.current?.focus();
    }
  }, [quickAddOpen]);

  const added = addStatus === "ADDED";

  return (
    <>
      <article
        ref={ref}
        style={revealStyle(shown, delay)}
        className="group flex w-full min-w-0 cursor-pointer flex-col gap-3.5"
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-surface bg-tile">
          {!isLoaded && (
            <div className="absolute inset-5 animate-shimmer rounded-[8%] bg-[linear-gradient(90deg,rgba(128,128,128,0.06)_25%,rgba(128,128,128,0.12)_50%,rgba(128,128,128,0.06)_75%)] bg-[length:200%_100%]" />
          )}

          {sneaker.status === "SOLD_OUT" && (
            <span className="absolute left-3 top-3 z-[5] rounded-control border border-white/80 bg-white/55 px-2.5 py-1 text-[12px] font-medium text-[#0B0B0C] backdrop-blur-[10px]">
              Sold out
            </span>
          )}

          <img
            src={sneaker.image}
            alt={sneaker.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "h-full w-full object-contain p-[10%] mix-blend-multiply transition-[transform,opacity] duration-700 ease-soft group-hover:scale-[1.05] group-hover:-translate-y-1 group-hover:-rotate-2",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          />

          <button
            type="button"
            className={cn(
              "absolute bottom-3 right-3 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-control border transition-[background-color,color,border-color,transform] duration-300 ease-soft group-hover:scale-[1.06] sm:h-11 sm:w-11",
              added
                ? "border-transparent bg-[#0B0B0C] text-white"
                : "border-white/80 bg-white/55 text-[#0B0B0C] backdrop-blur-[16px]",
            )}
            aria-label={
              added
                ? `${sneaker.name} added to bag`
                : `Quick add ${sneaker.name} to bag`
            }
            aria-expanded={quickAddOpen}
            aria-controls={quickAddId}
            aria-haspopup="dialog"
            onClick={handleQuickAdd}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </button>

          {quickAddOpen && (
            <div
              ref={quickRef}
              id={quickAddId}
              className="absolute inset-0 z-20 flex flex-col gap-3 overflow-y-auto rounded-surface bg-card p-4 max-sm:fixed max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-auto max-sm:z-[95] max-sm:gap-4 max-sm:p-5 max-sm:shadow-glass"
              role="dialog"
              aria-label={`Quick add ${sneaker.name}`}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[13px] text-muted">Select size</span>
              <div className="grid grid-cols-4 gap-1.5 max-sm:grid-cols-5 max-sm:gap-2">
                {SNEAKER_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-center rounded-control border border-line bg-transparent text-[13px] font-medium text-ink transition-colors duration-300 ease-soft hover:border-text max-sm:h-11",
                      quickSize === size && "border-text bg-text text-bg",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickSize(size);
                    }}
                    aria-label={`Size ${size}`}
                    aria-pressed={quickSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-auto h-11 w-full cursor-pointer rounded-control border-none bg-btn text-[14px] font-medium text-btn-ink transition-transform duration-300 ease-soft active:translate-y-px"
                onClick={handleQuickAddSubmit}
              >
                {added ? "Added to bag" : "Add to bag"}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 px-0.5 sm:px-1">
          <span className="text-[12px] text-muted sm:text-[13px]">{formatBrand(sneaker.brand)}</span>
          <h3 className="text-[14px] font-medium leading-[1.35] text-ink sm:text-[15px]">
            {sneaker.name}
          </h3>
          <span className="text-[14px] font-semibold text-ink sm:text-[15px]">
            {sneaker.priceFormatted}
          </span>
        </div>
      </article>

      {showModal && (
        <SpecimenModal sneaker={sneaker} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default memo(SneakerCard);
