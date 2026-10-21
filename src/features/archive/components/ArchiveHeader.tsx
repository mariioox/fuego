import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../core/utils/cn";
import { SWATCH_COLORS } from "../data/swatchColors";
import Pill from "../../../core/ui/Pill";
import { BRANDS } from "../../../core/constants";

interface Props {
  searchTerm: string;
  brandFilter: string;
  setSearchTerm: (val: string) => void;
  setBrandFilter: (val: string) => void;
  colorFilter: string;
  setColorFilter: (val: string) => void;
  setSortOrder: (val: string) => void;
  sortOrder: string;
  count: number;
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
        count,
      }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [moreOpen]);

  return (
    <header>
      <nav
        aria-label="Breadcrumb"
        className="text-[13px] text-muted animate-[riseIn_0.8s_ease-soft_both]"
      >
        <Link
          to="/"
          className="text-muted no-underline transition-colors duration-300 ease-soft hover:text-ink"
        >
          Home
        </Link>
        <span className="mx-1.5" aria-hidden="true">
          /
        </span>
        <span aria-current="page" className="text-ink">
          Shop all
        </span>
      </nav>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 animate-[riseIn_0.8s_ease-soft_both] sm:gap-4" style={{ animationDelay: "80ms" }}>
        <h1 className="font-display text-[clamp(36px,7vw,80px)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
          The archive
        </h1>
        <p className="text-[14px] text-muted sm:text-[15px]">
          {count} {count === 1 ? "pair" : "pairs"}
        </p>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center gap-2 rounded-nav glass p-2 animate-[riseIn_0.8s_ease-soft_both] sm:mt-8"
        style={{ animationDelay: "160ms" }}
      >
        <label className="flex h-11 min-w-0 flex-[1_1_260px] items-center gap-2 rounded-control border border-line bg-card px-3 transition-colors duration-300 ease-soft focus-within:border-text">
          <span className="sr-only">Search the archive</span>
          <Search size={16} className="shrink-0 text-muted" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search Samba, Jordan 4, 9060…"
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-muted transition-colors duration-300 ease-soft hover:text-ink"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>

        <div className="relative flex h-11 items-center rounded-control border border-line bg-card pr-8">
          <label className="sr-only" htmlFor="archive-sort">
            Sort by
          </label>
          <select
            id="archive-sort"
            className="h-full cursor-pointer appearance-none rounded-control bg-transparent pl-4 text-[14px] font-medium text-ink outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="FEATURED">Sort: Featured</option>
            <option value="PRICE_ASC">Price: low to high</option>
            <option value="PRICE_DESC">Price: high to low</option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 text-muted"
            aria-hidden="true"
          />
        </div>

        <div ref={popRef} className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-expanded={moreOpen}
            aria-haspopup="dialog"
              className={cn(
                "inline-flex h-11 cursor-pointer items-center gap-2 rounded-control border px-4 text-[14px] font-medium transition-colors duration-300 ease-soft",
                colorFilter !== "ALL"
                  ? "border-text bg-text text-bg"
                  : "border-line bg-card text-ink hover:border-text",
              )}
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              More filters
            </button>

          {moreOpen && (
            <div
              className="absolute right-0 top-full z-[90] mt-2 w-[268px] rounded-surface glass p-4 max-sm:fixed max-sm:inset-x-3 max-sm:bottom-4 max-sm:top-auto max-sm:mt-0 max-sm:w-auto"
              role="dialog"
              aria-label="More filters"
            >
              <span className="block text-[13px] text-muted">Colour</span>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-label="All colours"
                  aria-pressed={colorFilter === "ALL"}
                  onClick={() => setColorFilter("ALL")}
                  className={cn(
                    "h-7 w-7 cursor-pointer rounded-full border bg-transparent transition-all duration-300 ease-soft",
                    colorFilter === "ALL"
                      ? "border-text ring-2 ring-text ring-offset-2 ring-offset-[var(--card)]"
                      : "border-line",
                  )}
                />
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Filter by ${color.toLowerCase()}`}
                    aria-pressed={colorFilter === color}
                    onClick={() => setColorFilter(color)}
                    className={cn(
                      "h-7 w-7 cursor-pointer rounded-full border transition-all duration-300 ease-soft",
                      colorFilter === color
                        ? "border-text ring-2 ring-text ring-offset-2 ring-offset-[var(--card)]"
                        : "border-line",
                    )}
                    style={{ background: SWATCH_COLORS[color] }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-4 mb-6 flex flex-wrap items-center gap-2 animate-[riseIn_0.8s_ease-soft_both] sm:mt-5 sm:mb-8 sm:gap-2.5"
        style={{ animationDelay: "220ms" }}
      >
        {BRANDS.map((filter) => (
          <Pill
            key={filter.value}
            active={brandFilter === filter.value}
            aria-pressed={brandFilter === filter.value}
            onClick={() => setBrandFilter(filter.value)}
          >
            {filter.label}
          </Pill>
        ))}
      </div>
    </header>
  );
}
