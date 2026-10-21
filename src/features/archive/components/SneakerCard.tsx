import { memo, useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import type { SneakerSize } from "../../cart/types/cart";
import { SNEAKER_SIZES } from "../data/sizes";
import { useCart } from "../../cart/hooks/useCart";
import SpecimenModal from "./SpecimenModal";
import "../styles/SneakerCard.css";

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

  return (
    <>
      <article className="archive-card glass-panel" onClick={() => setShowModal(true)}>
        <div className="card-img-wrapper">
          <span className="card-brand-tag">{sneaker.brand}</span>

          <img
            src={sneaker.image}
            alt={sneaker.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`card-img ${isLoaded ? "opacity-100" : "opacity-0"}`}
          />

          <button
            type="button"
            className="quick-add-btn"
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
            className="card-overlay"
            aria-haspopup="dialog"
            aria-label={`View ${sneaker.name} details`}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <div className="mono text-[10px] tracking-widest font-black">
              VIEW_SPECIMEN
            </div>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {quickAddOpen && (
          <div
            ref={quickRef}
            id={quickAddId}
            className="quick-add-popover"
            role="dialog"
            aria-label={`Quick add ${sneaker.name}`}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quick-add-head mono">SELECT_SIZE</div>
            <div className="quick-add-sizes">
              {SNEAKER_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`quick-size-btn ${quickSize === size ? "active" : ""}`}
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
              className="quick-add-submit"
              onClick={handleQuickAddSubmit}
            >
              {addStatus === "ADDED" ? "ADDED_TO_CART" : "ADD_TO_CART"}
            </button>
          </div>
        )}

        <div className="card-info mono">
          <h3 className="card-name">{sneaker.name}</h3>
          <div className="card-meta-row">
            <span
              className={`card-stock ${sneaker.availability === "IN_HAND" ? "in-hand" : ""}`}
              title={
                sneaker.availability === "IN_HAND"
                  ? `In stock, EU ${sneaker.inHandSizes?.join("/") ?? ""}`
                  : "Pre-order"
              }
            >
              {sneaker.availability === "IN_HAND"
                ? `IN STOCK · ${sneaker.inHandSizes?.join("/") ?? "—"}`
                : "PRE-ORDER"}
            </span>
            <div className="card-price">{sneaker.priceFormatted}</div>
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
