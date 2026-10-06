import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../core/utils/cn";
import { SWATCH_COLORS } from "../data/swatchColors";

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
    <header className="mb-8 mt-0 flex flex-col gap-8 border-b border-edge pb-8 lg:my-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="mono text-xs font-bold tracking-widest text-brand">
          COLLECTION_INDEX // 2026
        </span>
        <h1 className="mt-8 text-[clamp(3rem,5vw,4rem)] font-[950] italic uppercase leading-[0.85] tracking-[-0.05em]">
          FULL ARCHIVE.
        </h1>
      </div>

      <div className="sticky top-[70px] z-40 flex w-full flex-col items-end border-b border-edge bg-bg py-2.5 lg:static lg:border-0 lg:bg-transparent lg:py-0">
        <div className="relative mb-5 flex h-[30px] w-full max-w-[679px] items-center border border-edge bg-card transition-colors duration-500 focus-within:border-brand max-md:mb-3 max-md:h-10">
          <Search size={14} className="absolute left-3.5 opacity-30" />
          <input
            type="text"
            placeholder="SEARCH_BY_MODEL..."
            className="mono w-full bg-transparent pl-10 pr-3.5 text-[11px] uppercase outline-none max-md:text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search by model name or SKU"
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-1.5 flex h-6 w-6 cursor-pointer items-center justify-center bg-transparent text-ink opacity-50 transition-opacity hover:opacity-100"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="mb-3 hidden h-[38px] w-full cursor-pointer items-center justify-center gap-2 border border-edge bg-card text-[11px] font-black text-ink max-md:flex"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          aria-controls="archive-filter-row"
        >
          FILTERS
          <ChevronDown size={14} className={cn("transition-transform", filtersOpen && "rotate-180")} />
        </button>

        <div
          id="archive-filter-row"
          className={cn(
            "flex flex-wrap items-end gap-2.5 max-md:w-full max-md:items-stretch max-md:gap-2",
            !filtersOpen && "max-md:hidden",
          )}
        >
          <select
            className="mono h-[30px] cursor-pointer border border-edge bg-card px-2.5 text-[10px] font-semibold uppercase outline-none transition-colors duration-500 hover:border-brand max-md:h-10 max-md:flex-[1_1_45%] max-md:text-[11px]"
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
            className="mono h-[30px] cursor-pointer border border-edge bg-card px-2.5 text-[10px] font-semibold uppercase outline-none transition-colors duration-500 hover:border-brand max-md:h-10 max-md:flex-[1_1_45%] max-md:text-[11px]"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort sneakers"
          >
            <option value="NEWEST">SORT: NEWEST</option>
            <option value="PRICE_ASC">SORT: PRICE(LOW TO HIGH)</option>
            <option value="PRICE_DESC">SORT: PRICE(HIGH TO LOW)</option>
          </select>

          <div className="flex flex-col items-start max-md:w-full">
            <span className="mono mb-[5px] text-[10px] font-bold uppercase opacity-40">
              SPEC_COLOR_INDEX
            </span>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className={cn(
                  "mono flex h-[30px] cursor-pointer items-center justify-center border border-edge bg-card px-2.5 text-[9px] font-black text-ink transition-colors duration-300 hover:border-ink max-md:h-9",
                  colorFilter === "ALL" && "border-brand",
                )}
                onClick={() => setColorFilter("ALL")}
                aria-pressed={colorFilter === "ALL"}
                aria-label="Show all colors"
              >
                ALL
              </button>

              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Filter by ${color}`}
                  aria-pressed={colorFilter === color}
                  className={cn(
                    "relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-edge bg-card transition-colors duration-300 hover:border-ink max-md:h-9 max-md:w-9",
                    colorFilter === color && "border-brand",
                  )}
                  onClick={() => setColorFilter(color)}
                >
                  <div
                    className="h-[15px] w-[15px] border border-black/5 max-md:h-[18px] max-md:w-[18px]"
                    style={{ background: SWATCH_COLORS[color] }}
                  />
                  {colorFilter === color && (
                    <div className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-brand" />
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