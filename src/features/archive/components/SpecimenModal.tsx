import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import type { SneakerSize } from "../../cart/types/cart";
import { SNEAKER_SIZES } from "../data/sizes";
import { SWATCH_COLORS } from "../data/swatchColors";
import { useCart } from "../../cart/hooks/useCart";
import { Button } from "../../../core/ui/Button";
import { StatusBadge } from "../../../core/ui/StatusBadge";
import { cn } from "../../../core/utils/cn";

interface SpecimenModalProps {
  sneaker: Sneaker;
  onClose: () => void;
}

export default function SpecimenModal({
  sneaker,
  onClose,
}: SpecimenModalProps) {
  const { addItem } = useCart();
  const [addStatus, setAddStatus] = useState<"IDLE" | "ADDED">("IDLE");
  const [selectedSize, setSelectedSize] = useState<SneakerSize>(42);
  const [imgLoaded, setImgLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const nameId = `specimen-name-${sneaker.id}`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const firstFocusable = overlayRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [handleKeyDown]);

  const handleAddToCart = () => {
    addItem(sneaker, selectedSize);
    setAddStatus("ADDED");
    window.setTimeout(() => setAddStatus("IDLE"), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-black/80 p-2.5 backdrop-blur-[10px]"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={nameId}
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex max-h-[90vh] w-full max-w-[1000px] flex-col overflow-y-auto overflow-x-hidden border border-edge bg-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2.5 top-2.5 z-[100] flex h-8 w-8 cursor-pointer items-center justify-center rounded-[2px] border-none bg-ink text-bg"
          onClick={onClose}
          aria-label="Close specimen details"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-center justify-center border-b border-edge bg-white p-[30px] lg:min-h-[500px] lg:border-b-0 lg:border-r lg:p-[60px]">
            {!imgLoaded && (
              <div className="absolute inset-[30px] animate-shimmer rounded-[8%] bg-[linear-gradient(90deg,rgba(128,128,128,0.06)_25%,rgba(128,128,128,0.12)_50%,rgba(128,128,128,0.06)_75%)] bg-[length:200%_100%]" />
            )}
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className={cn(
                "max-w-[90%] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-opacity duration-[400ms]",
                imgLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          <div className="relative flex flex-col p-5 lg:p-[45px] mono">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-black tracking-tighter text-brand">
                  SPECIMEN_ID // {sneaker.sku}
                </div>
                <h2
                  className="my-2 mb-6 text-[clamp(1.8rem,8vw,2.5rem)] font-[950] uppercase italic leading-[0.95]"
                  id={nameId}
                >
                  {sneaker.name}
                </h2>
              </div>
            </div>

            <div className="mb-6 border-t border-edge">
              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-extrabold whitespace-nowrap tracking-[0.05em] opacity-40">
                  ARCHIVE_STATUS
                </span>
                <StatusBadge status={sneaker.status} />
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-extrabold whitespace-nowrap tracking-[0.05em] opacity-40">
                  BRAND_ORIGIN
                </span>
                <span className="text-right text-[11px] font-black break-all">{sneaker.brand}</span>
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-extrabold whitespace-nowrap tracking-[0.05em] opacity-40">
                  COLOR_PROFILE
                </span>
                <div className="flex gap-2">
                  {sneaker.color.map((c) => (
                    <div
                      key={c}
                      className="h-3.5 w-3.5 flex-shrink-0 rounded-[2px] border border-white/20"
                      style={{ background: SWATCH_COLORS[c] }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-extrabold whitespace-nowrap tracking-[0.05em] opacity-40">
                  MARKET_VALUATION
                </span>
                <span className="text-right text-[11px] font-black break-all text-brand">
                  {sneaker.priceFormatted}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-extrabold whitespace-nowrap tracking-[0.05em] opacity-40">
                  SELECT_SIZE
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {SNEAKER_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={cn(
                        "flex h-[34px] w-[38px] cursor-pointer items-center justify-center border border-edge bg-transparent font-mono text-[11px] font-bold text-ink transition-[border-color,background-color,color] duration-200 hover:border-brand",
                        selectedSize === size && "border-ink bg-ink text-bg",
                      )}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="mb-6 border-l-2 border-brand bg-white/[0.02] p-4 text-[11px] uppercase leading-[1.6] tracking-[0.05em] opacity-70">
              {sneaker.description ||
                `TECHNICAL ANALYSIS: ${sneaker.name} EXHIBITS SUPERIOR ARCHITECTURAL INTEGRITY. 
                DESIGNED BY ${sneaker.brand}, THIS UNIT REMAINS A HIGH-PRIORITY SPECIMEN WITHIN 
                THE ${sneaker.color.join("/")} COLOR SEQUENCE.`}
            </p>

            <Button
              className="sticky bottom-0 z-10 mt-auto w-full min-h-[48px] text-xs tracking-[0.08em] hover:-translate-y-px"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              {addStatus === "ADDED" ? "ADDED_TO_CART" : "ADD_TO_CART"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}