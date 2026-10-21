import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../core/utils/cn";
import { SWATCH_COLORS } from "../data/swatchColors";
import Pill from "../../../core/ui/Pill";

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
    <header className="mb-12 mt-0 flex flex-col gap-6 border-b border-edge pb-8 lg:mb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            The collection
          </span>
          <h1 className="mt-6 text-[clamp(2.6rem,5vw,3.6rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            The full archive
          </h1>
        </div>

        <div className="flex w-full flex-col items-end gap-4 lg:max-w-[680px]">
          <div className="relative flex h-11 w-full items-center rounded-full border border-edge bg-card transition-colors duration-200 focus-within:border-brand">
            <Search size={15} className="absolute left-4 opacity-30" />
            <input
              type="text"
              placeholder="Search by model or SKU"
              className="w-full bg-transparent pl-11 pr-10 text-[13px] outline-none placeholder:text-ink/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search by model name or SKU"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 flex h-6 w-6 cursor-pointer items-center justify-center bg-transparent text-ink opacity-50 transition-opacity hover:opacity-100"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="hidden h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-edge bg-card text-[12px] font-semibold text-ink max-md:flex"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="archive-filter-row"
          >
            Filters
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                filtersOpen && "rotate-180",
              )}
            />
          </button>

          <div
            id="archive-filter-row"
            className={cn(
              "flex flex-wrap items-center gap-2.5",
              !filtersOpen && "max-md:hidden",
            )}
          >
            <select
              className="h-10 cursor-pointer rounded-full border border-edge bg-card px-4 text-[12px] font-medium text-ink outline-none transition-colors duration-200 hover:border-brand"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              aria-label="Filter by brand"
            >
              <option value="ALL">All brands</option>
              <option value="IN_HAND">In stock now</option>
              <option value="NIKE">Nike</option>
              <option value="JORDAN">Jordan</option>
              <option value="ADIDAS">Adidas</option>
              <option value="ASICS">Asics</option>
              <option value="PUMA">Puma</option>
              <option value="VANS">Vans</option>
              <option value="CONVERSE">Converse</option>
              <option value="NEW BALANCE">New Balance</option>
              <option value="TIMBERLAND">Timberland</option>
            </select>

            <select
              className="h-10 cursor-pointer rounded-full border border-edge bg-card px-4 text-[12px] font-medium text-ink outline-none transition-colors duration-200 hover:border-brand"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort sneakers"
            >
              <option value="NEWEST">Newest first</option>
              <option value="PRICE_ASC">Price: low to high</option>
              <option value="PRICE_DESC">Price: high to low</option>
            </select>

            <div className="flex w-full flex-col items-start">
              <span className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-ink/40 uppercase">
                Colour
              </span>

              <div className="flex flex-wrap items-center gap-1.5">
                <Pill
                  active={colorFilter === "ALL"}
                  onClick={() => setColorFilter("ALL")}
                  aria-pressed={colorFilter === "ALL"}
                  className="h-8 px-3.5 text-[11px]"
                >
                  All
                </Pill>

                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Filter by ${color.toLowerCase()}`}
                    aria-pressed={colorFilter === color}
                    className={cn(
                      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-edge bg-card transition-colors duration-200 hover:border-ink",
                      colorFilter === color && "border-brand",
                    )}
                    onClick={() => setColorFilter(color)}
                  >
                    <span
                      className="h-[16px] w-[16px] rounded-full border border-black/10"
                      style={{ background: SWATCH_COLORS[color] }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
