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
      if (e.key === "Escape") closeQuickAdd();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [quickAddOpen, closeQuickAdd]);

  const handleQuickAdd = (e: React.MouseEvent) => {
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
  };

  return (
    <>
      <div
        className="archive-card"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        <div className="card-img-wrapper">
          {sneaker.status && <span className="card-tag">{sneaker.status}</span>}
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
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={14} />
          </button>

          <div className="card-overlay">
            <div className="mono text-[10px] tracking-widest font-black">
              VIEW_SPECIMEN
            </div>
            <ArrowUpRight size={24} />
          </div>
        </div>

        {quickAddOpen && (
          <div
            ref={quickRef}
            className="quick-add-popover"
            role="dialog"
            aria-label={`Quick add ${sneaker.name}`}
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
            <span className="card-brand">{sneaker.brand}</span>
            <div className="card-price">{sneaker.priceFormatted}</div>
          </div>
        </div>
      </div>

      {showModal && (
        <SpecimenModal sneaker={sneaker} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default memo(SneakerCard);
