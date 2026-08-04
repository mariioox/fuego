import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import "../styles/ArchiveHeader.css";

interface Props {
  searchTerm: string;
  brandFilter: string;
  setSearchTerm: (val: string) => void;
  setBrandFilter: (val: string) => void;
  colorFilter: string;
  setColorFilter: (val: string) => void;
  setSortOrder: (val: string) => void;
  sortOrder: string;
}

const COLORS = [
  "BLACK",
  "GREY",
  "WHITE",
  "RED",
  "BLUE",
  "YELLOW",
  "GREEN",
  "BROWN",
  "PURPLE",
  "PINK",
  "ORANGE",
  "MULTI",
];

export default function ArchiveHeader({
  searchTerm,
  brandFilter,
  setSearchTerm,
  setBrandFilter,
  colorFilter,
  setColorFilter,
  setSortOrder,
  sortOrder,
}: Props) {
  const [filtersOpen, setFiltersOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth > 768,
  );

  return (
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
            placeholder="SEARCH_BY_MODEL..."
            className="search-input mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search by model name or SKU"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="filters-toggle mono"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          aria-controls="archive-filter-row"
        >
          FILTERS
          <ChevronDown size={14} className={filtersOpen ? "rotated" : ""} />
        </button>

        <div
          id="archive-filter-row"
          className={`filter-row ${filtersOpen ? "open" : "collapsed"}`}
        >
          <select
            className="filter-select mono"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            aria-label="Filter by brand"
          >
            <option value="ALL">BRAND: ALL</option>
            <option value="NIKE">NIKE</option>
            <option value="JORDAN">JORDAN</option>
            <option value="ADIDAS">ADIDAS</option>
            <option value="ASICS">ASICS</option>
            <option value="PUMA">PUMA</option>
            <option value="VANS">VANS</option>
            <option value="CONVERSE">CONVERSE</option>
            <option value="NEW BALANCE">NEW BALANCE</option>
            <option value="TIMBERLAND">TIMBERLAND</option>
          </select>

          <select
            className="filter-select mono"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort sneakers"
          >
            <option value="NEWEST">SORT: NEWEST</option>
            <option value="PRICE_ASC">SORT: PRICE(LOW TO HIGH)</option>
            <option value="PRICE_DESC">SORT: PRICE(HIGH TO LOW)</option>
          </select>
          <div className="filter-group">
            <span className="filter-group-label mono">SPEC_COLOR_INDEX</span>

            <div className="swatch-grid">
              {/* ALL Button */}
              <button
                type="button"
                className={`mono swatch-btn swatch-all ${colorFilter === "ALL" ? "active" : ""}`}
                onClick={() => setColorFilter("ALL")}
                aria-pressed={colorFilter === "ALL"}
                aria-label="Show all colors"
              >
                ALL
              </button>

              {/* Color Mapping */}
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Filter by ${color}`}
                  aria-pressed={colorFilter === color}
                  className={`swatch-btn ${colorFilter === color ? "active" : ""}`}
                  onClick={() => setColorFilter(color)}
                >
                  <div
                    className={`swatch-inner inner-${color.toLowerCase()}`}
                  />
                  {colorFilter === color && (
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[var(--orange)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
