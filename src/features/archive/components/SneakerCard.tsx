import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Sneaker } from "../types";

export default function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/product/${sneaker.id}`} className="archive-card">
      <div className="card-img-wrapper">
        {sneaker.tag && <span className="card-tag">{sneaker.tag}</span>}
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
    </Link>
  );
}
