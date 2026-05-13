import { useEffect } from "react";
import { X } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-section">
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className="modal-main-img"
            />
          </div>

          <div className="modal-details-section mono">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="orange-text text-[10px] font-black tracking-tighter">
                  SPECIMEN_ID // {sneaker.sku}
                </div>
                <h2 className="modal-sneaker-name">{sneaker.name}</h2>
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
            </div>

            <p className="modal-description">
              {sneaker.description ||
                `TECHNICAL ANALYSIS: ${sneaker.name} EXHIBITS SUPERIOR ARCHITECTURAL INTEGRITY. 
                DESIGNED BY ${sneaker.brand}, THIS UNIT REMAINS A HIGH-PRIORITY SPECIMEN WITHIN 
                THE ${sneaker.color.join("/")} COLOR SEQUENCE.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
