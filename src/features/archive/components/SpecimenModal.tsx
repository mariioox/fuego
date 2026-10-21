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
  const previousOverflow = useRef<string>("");
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
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const firstFocusable = overlayRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow.current;
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
          className="absolute right-2.5 top-2.5 z-[100] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-ink text-bg"
          onClick={onClose}
          aria-label="Close specimen details"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-center justify-center border-b border-edge bg-card p-[30px] lg:min-h-[500px] lg:border-b-0 lg:border-r lg:p-[60px]">
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

          <div className="relative flex flex-col p-5 lg:p-[45px]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-semibold tracking-[0.16em] text-brand uppercase">
                  {sneaker.sku}
                </div>
                <h2
                  className="my-2 mb-6 text-[clamp(1.6rem,6vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.02em]"
                  id={nameId}
                >
                  {sneaker.name}
                </h2>
              </div>
            </div>

            <div className="mb-6 border-t border-edge">
              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.12em] text-ink/40 uppercase">
                  Status
                </span>
                <StatusBadge status={sneaker.status} />
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.12em] text-ink/40 uppercase">
                  Brand
                </span>
                <span className="text-right text-[12px] font-semibold break-all">{sneaker.brand}</span>
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.12em] text-ink/40 uppercase">
                  Colour
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
                <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.12em] text-ink/40 uppercase">
                  Price
                </span>
                <span className="text-right text-[12px] font-semibold break-all text-brand">
                  {sneaker.priceFormatted}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2.5 border-b border-edge py-3">
                <span className="text-[10px] font-semibold whitespace-nowrap tracking-[0.12em] text-ink/40 uppercase">
                  Select size
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {SNEAKER_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={cn(
                        "flex h-[34px] w-[38px] cursor-pointer items-center justify-center border border-edge bg-transparent text-[11px] font-semibold text-ink transition-[border-color,background-color,color] duration-200 hover:border-brand",
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

            <p className="mb-6 border-l-2 border-brand bg-white/[0.02] p-4 text-[13px] leading-[1.6] text-ink/70">
              {sneaker.description ||
                `A ${sneaker.brand} classic in ${sneaker.color.join(" / ")}. Hand-checked and ready to wear.`}
            </p>

            <Button
              className="sticky bottom-0 z-10 mt-auto w-full min-h-[48px]"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              {addStatus === "ADDED" ? "Added to bag" : "Add to bag"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}