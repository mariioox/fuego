import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import type { SneakerSize } from "../../cart/types/cart";
import { SNEAKER_SIZES } from "../data/sizes";
import { useCart } from "../../cart/context/CartContext";
import "../styles/SpecimenModal.css";

// Helper to map your color strings to hex/css values
const colorMap: Record<string, string> = {
  BLACK: "#000000",
  WHITE: "#ffffff",
  RED: "#f32536",
  BLUE: "#239ce7",
  GREEN: "#2fdf4c",
  GREY: "#9c9c9c",
  BROWN: "#795548",
  MULTI: "conic-gradient(red, yellow, green, blue, red)",
  PURPLE: "#9c27b0",
  ORANGE: "#fd6200",
  PINK: "#e91e63",
  YELLOW: "#ffeb3b",
};

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
  const [selectedSize, setSelectedSize] = useState<SneakerSize>(42);  const [imgLoaded, setImgLoaded] = useState(false);
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
      className="modal-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={nameId}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close specimen details">
          <X size={16} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-section">
            {!imgLoaded && <div className="modal-img-skeleton" />}
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className={`modal-main-img ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          <div className="modal-details-section mono">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="orange-text text-[10px] font-black tracking-tighter">
                  SPECIMEN_ID // {sneaker.sku}
                </div>
                <h2 className="modal-sneaker-name" id={nameId}>
                  {sneaker.name}
                </h2>
              </div>
            </div>

            <div className="modal-data-table">
              <div className="data-row">
                <span className="label">ARCHIVE_STATUS</span>
                <span
                  className={`status-badge ${sneaker.status?.toLowerCase() || "archived"}`}
                >
                  {sneaker.status || "ARCHIVED"}
                </span>
              </div>

              <div className="data-row">
                <span className="label">BRAND_ORIGIN</span>
                <span className="value">{sneaker.brand}</span>
              </div>

              <div className="data-row">
                <span className="label">COLOR_PROFILE</span>
                <div className="flex gap-1">
                  {sneaker.color.map((c) => (
                    <div
                      key={c}
                      className="swatch-mini"
                      style={{ background: colorMap[c] }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <div className="data-row">
                <span className="label">MARKET_VALUATION</span>
                <span className="value text-orange-500">
                  {sneaker.priceFormatted}
                </span>
              </div>

              <div className="data-row">
                <span className="label">SELECT_SIZE</span>
                <div className="size-grid">
                  {SNEAKER_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`size-btn ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="modal-description">
              {sneaker.description ||
                `TECHNICAL ANALYSIS: ${sneaker.name} EXHIBITS SUPERIOR ARCHITECTURAL INTEGRITY. 
                DESIGNED BY ${sneaker.brand}, THIS UNIT REMAINS A HIGH-PRIORITY SPECIMEN WITHIN 
                THE ${sneaker.color.join("/")} COLOR SEQUENCE.`}
            </p>

            <button className="modal-add-cart-btn" onClick={handleAddToCart}>
              <ShoppingBag size={18} />
              {addStatus === "ADDED" ? "ADDED_TO_CART" : "ADD_TO_CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
