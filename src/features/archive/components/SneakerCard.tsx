import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Sneaker } from "../types/sneaker";
import SpecimenModal from "./SpecimenModal";
import "../styles/SneakerCard.css";

export default function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="archive-card" onClick={() => setShowModal(true)}>
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
          <div className="card-overlay">
            <div className="mono text-[10px] tracking-widest font-black">
              VIEW_SPECIMEN
            </div>
            <ArrowUpRight size={24} />
          </div>
        </div>

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
