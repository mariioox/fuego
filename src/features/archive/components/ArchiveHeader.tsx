import { Search, X } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  setBrandFilter: (val: string) => void;
  colorFilter: string;
  setColorFilter: (val: string) => void;
  setSortOrder: (val: string) => void;
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
  setSearchTerm,
  setBrandFilter,
  colorFilter,
  setColorFilter,
  setSortOrder,
}: Props) {
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
          />
          {searchTerm && (
            <X
              size={14}
              className="clear-search"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
        <div className="filter-row">
          <select
            className="filter-select mono"
            onChange={(e) => setBrandFilter(e.target.value)}
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

          {/* <select
            className="filter-select mono"
            onChange={(e) => setColorFilter(e.target.value)}
          >
            <option value="ALL">COLOR: ALL</option>
            <option value="RED">RED</option>
            <option value="BLACK">BLACK</option>
            <option value="BLUE">BLUE</option>
          </select> */}

          <select
            className="filter-select mono"
            onChange={(e) => setSortOrder(e.target.value)}
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
                className={`mono swatch-btn swatch-all ${colorFilter === "ALL" ? "active" : ""}`}
                onClick={() => setColorFilter("ALL")}
              >
                ALL
              </button>

              {/* Color Mapping */}
              {COLORS.map((color) => (
                <button
                  key={color}
                  title={color}
                  className={`swatch-btn ${colorFilter === color ? "active" : ""}`}
                  onClick={() => setColorFilter(color)}
                >
                  <div
                    className={`swatch-inner inner-${color.toLowerCase()}`}
                  />

                  {/* Optional: Add a small orange dot for active state */}
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
