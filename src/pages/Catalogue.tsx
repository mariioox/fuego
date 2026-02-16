import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Catalogue() {
  const [activeBrand, setActiveBrand] = useState("All");
  const brands = ["All", "Jordan", "Nike", "Adidas", "New Balance"];

  return (
    <div className="py-12 bg-[var(--bg)] min-h-screen">
      <div className="container">
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 mono text-[10px] font-black uppercase opacity-50 no-underline text-inherit hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        <header className="mb-12">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">
            Inventory
          </h2>
          <p className="mono text-[10px] opacity-40 uppercase mt-2">
            Verified Sourcing // 234
          </p>
        </header>

        <div className="catalogue-container section-separator pt-10">
          <aside>
            <span className="mono text-[10px] opacity-30 font-black uppercase block mb-6">
              Filter
            </span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`filter-btn ${activeBrand === brand ? "active" : ""}`}
              >
                {brand}
              </button>
            ))}
          </aside>

          <div className="product-grid">
            {/* Placeholder Card */}
            <div className="stock-card">
              <div className="stock-img-container">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                  className="stock-img"
                />
              </div>
              <span className="mono text-[9px] opacity-40 uppercase">
                Jordan
              </span>
              <h3 className="text-sm font-black uppercase my-1">
                AJ4 Pine Green
              </h3>
              <p className="text-orange-600 font-bold">₦450,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
