import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

// Mock Data - We can move this to a separate file later
const ARCHIVE_DATA = [
  {
    id: 1,
    name: "AJ1 Retro High 'Chicago'",
    brand: "JORDAN",
    color: "RED",
    price: "₦450,000",
    tag: "HOT",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Air Force 1 '07 White",
    brand: "NIKE",
    color: "WHITE",
    price: "₦120,000",
    tag: "CLASSIC",
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
  },
  {
    id: 3,
    name: "Dunk Low 'Panda'",
    brand: "NIKE",
    color: "BLACK",
    price: "₦180,000",
    tag: "RESTOCK",
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
  },
  {
    id: 4,
    name: "Yeezy Boost 350 V2",
    brand: "ADIDAS",
    color: "GREY",
    price: "₦320,000",
    tag: "LIMITED",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
  },
  {
    id: 5,
    name: "AJ1 Retro High 'Chicago'",
    brand: "JORDAN",
    color: "RED",
    price: "₦450,000",
    tag: "HOT",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 6,
    name: "Air Force 1 '07 White",
    brand: "NIKE",
    color: "WHITE",
    price: "₦120,000",
    tag: "CLASSIC",
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
  },
  {
    id: 7,
    name: "Dunk Low 'Panda'",
    brand: "NIKE",
    color: "BLACK",
    price: "₦180,000",
    tag: "RESTOCK",
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
  },
  {
    id: 8,
    name: "Yeezy Boost 350 V2",
    brand: "ADIDAS",
    color: "GREY",
    price: "₦320,000",
    tag: "LIMITED",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
  },
];

export default function Catalogue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [colorFilter, setColorFilter] = useState("ALL");

  // Filter Logic
  const filteredData = ARCHIVE_DATA.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === "ALL" || item.brand === brandFilter;
    const matchesColor = colorFilter === "ALL" || item.color === colorFilter;
    return matchesName && matchesBrand && matchesColor;
  });

  return (
    <main className="catalogue-page">
      <section className="container py-20">
        {/* --- Catalogue Header --- */}
        <header className="catalogue-header">
          <div>
            <span className="mono text-[var(--orange)] text-xs font-bold tracking-widest">
              COLLECTION_INDEX // 2026
            </span>
            <h1 className="archive-title">FULL ARCHIVE.</h1>
          </div>

          <div className="filter-system">
            <div className="search-wrapper">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="SEARCH_BY_NAME..."
                className="search-input mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <X
                  size={14}
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>

            <select
              className="filter-select mono"
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="ALL">BRAND: ALL</option>
              <option value="NIKE">NIKE</option>
              <option value="JORDAN">JORDAN</option>
              <option value="ADIDAS">ADIDAS</option>
            </select>

            <select
              className="filter-select mono"
              onChange={(e) => setColorFilter(e.target.value)}
            >
              <option value="ALL">COLOR: ALL</option>
              <option value="WHITE">WHITE</option>
              <option value="BLACK">BLACK</option>
              <option value="RED">RED</option>
              <option value="GREY">GREY</option>
            </select>
          </div>
        </header>

        {/* --- The Clean Grid --- */}
        <div className="archive-grid">
          {filteredData.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="archive-card"
            >
              <div className="card-img-wrapper">
                {item.tag && <span className="card-tag">{item.tag}</span>}
                <img src={item.img} alt={item.name} />
                <div className="card-overlay">
                  <ArrowUpRight size={24} />
                </div>
              </div>

              <div className="card-info">
                <h3 className="card-name">{item.name}</h3>
                <div className="flex justify-between items-start mb-2">
                  <span className="mono text-[10px] opacity-50">
                    {item.brand}
                  </span>{" "}
                  <br />
                  <span className="mono text-[10px] text-[var(--orange)] font-bold">
                    {item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="py-20 text-center mono opacity-40 text-sm">
            NO_MATCHING_SPECIMENS_FOUND
          </div>
        )}
      </section>
    </main>
  );
}
