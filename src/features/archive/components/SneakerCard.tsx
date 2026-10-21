import { memo, useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import type { SneakerSize } from "../../cart/types/cart";
import { SNEAKER_SIZES } from "../data/sizes";
import { useCart } from "../../cart/hooks/useCart";
import { cn } from "../../../core/utils/cn";
import SpecimenModal from "./SpecimenModal";

function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickSize, setQuickSize] = useState<SneakerSize>(42);
  const [addStatus, setAddStatus] = useState<"IDLE" | "ADDED">("IDLE");
  const quickRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

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
    window.setTimeout(() => setAddStatus("IDLE"), 1200);
    setQuickAddOpen(false);
  };

  useEffect(() => {
    if (quickAddOpen) {
      quickRef.current?.focus();
    }
  }, [quickAddOpen]);

  const inHand = sneaker.availability === "IN_HAND";

  return (
    <>
      <article
        className="group relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-glass-edge bg-glass shadow-glass backdrop-blur-[10px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)]"
        onClick={() => setShowModal(true)}
      >
        <div className="relative m-2.5 aspect-square overflow-hidden rounded-xl bg-[radial-gradient(68%_52%_at_50%_56%,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_72%)] dark:bg-[radial-gradient(68%_52%_at_50%_56%,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_72%)]">
          {!isLoaded && (
            <div className="absolute inset-5 animate-shimmer rounded-[8%] bg-[linear-gradient(90deg,rgba(128,128,128,0.06)_25%,rgba(128,128,128,0.12)_50%,rgba(128,128,128,0.06)_75%)] bg-[length:200%_100%]" />
          )}

          <span className="pointer-events-none absolute left-3 top-3 z-[5] text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand">
            {sneaker.brand}
          </span>

          {/* Soft contact shadow so the cut-out shoe sits on the glass */}
          <div className="pointer-events-none absolute bottom-[16%] left-1/2 z-[1] h-[7%] w-[52%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0)_70%)] blur-[4px] transition-transform duration-500 group-hover:scale-110" />

          <img
            src={sneaker.image}
            alt={sneaker.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "relative z-[2] h-full w-full object-contain p-3.5 transition-[transform,opacity] duration-500 group-hover:scale-105",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          />

          <button
            type="button"
            className="absolute bottom-3.5 right-3.5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-edge bg-card text-ink shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-[background-color,color,border-color,transform] duration-200 hover:scale-105 hover:border-ink hover:bg-ink hover:text-bg max-sm:h-9 max-sm:w-9 max-sm:bottom-3 max-sm:right-3"
            aria-label={`Quick add ${sneaker.name} to cart`}
            aria-expanded={quickAddOpen}
            aria-controls={quickAddId}
            aria-haspopup="dialog"
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={14} />
          </button>

          <button
            type="button"
            className="absolute bottom-3 left-3 z-[6] inline-flex translate-y-1 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white opacity-0 backdrop-blur-[6px] transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-haspopup="dialog"
            aria-label={`View ${sneaker.name} details`}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            View details
            <ArrowUpRight size={14} />
          </button>
        </div>

        {quickAddOpen && (
          <div
            ref={quickRef}
            id={quickAddId}
            className="absolute inset-0 z-20 flex flex-col gap-3 overflow-y-auto border border-edge bg-bg p-3.5"
            role="dialog"
            aria-label={`Quick add ${sneaker.name}`}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-50">
              Select size
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {SNEAKER_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={cn(
                    "flex h-[34px] cursor-pointer items-center justify-center border border-edge bg-transparent text-[11px] font-semibold text-ink transition-colors duration-200 hover:border-brand",
                    quickSize === size && "border-ink bg-ink text-bg hover:border-ink",
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
              className="mt-auto h-10 w-full cursor-pointer border-none bg-ink text-[11px] font-bold uppercase tracking-[0.08em] text-bg transition-colors duration-200 hover:text-brand"
              onClick={handleQuickAddSubmit}
            >
              {addStatus === "ADDED" ? "Added to bag" : "Add to bag"}
            </button>
          </div>
        )}

        <div className="border-t border-edge px-4 pb-4 pt-3.5 max-sm:px-3.5 max-sm:pb-3.5 max-sm:pt-3">
          <h3 className="mb-2 min-h-[3.15rem] text-[1.05rem] font-semibold leading-[1.25] text-ink max-sm:min-h-[2.85rem] max-sm:text-[0.95rem] max-sm:leading-[1.2]">
            {sneaker.name}
          </h3>
          <div className="flex items-end justify-between gap-3 border-t border-edge pt-2">
            <span
              className={cn(
                "truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/45",
                inHand && "text-brand",
              )}
              title={
                inHand
                  ? `In stock, EU ${sneaker.inHandSizes?.join("/") ?? ""}`
                  : "Pre-order"
              }
            >
              {inHand
                ? `In stock · ${sneaker.inHandSizes?.join("/") ?? "—"}`
                : "Pre-order"}
            </span>
            <div className="ml-auto shrink-0 whitespace-nowrap text-[0.85rem] font-semibold text-ink max-sm:text-[0.8rem]">
              {sneaker.priceFormatted}
            </div>
          </div>
        </div>
      </article>

      {showModal && (
        <SpecimenModal sneaker={sneaker} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default memo(SneakerCard);
