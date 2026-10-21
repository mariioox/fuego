import { useState, useMemo } from "react";
import { cn } from "../../../core/utils/cn";
import { useDebounce } from "../../../core/hooks/useDebounce";
import Section from "../../../core/ui/Section";
import { SNEAKER_REGISTRY } from "../data/sneakerRegistry";
import ArchiveHeader from "./ArchiveHeader";
import ArchiveGrid from "./ArchiveGrid";
import type { Sneaker } from "../types/sneaker";

const ITEMS_PER_PAGE = 20;

export default function ArchiveContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [colorFilter, setColorFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Helper to reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...SNEAKER_REGISTRY];

    // Search Filter
    if (debouncedSearch) {
      const lowSearch = debouncedSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowSearch) ||
          item.sku.toLowerCase().includes(lowSearch),
      );
    }

    // Brand / Availability Filter
    if (brandFilter === "IN_HAND") {
      result = result.filter((item) => item.availability === "IN_HAND");
    } else if (brandFilter !== "ALL") {
      result = result.filter((item) => item.brand === brandFilter);
    }

    // Color Filter (Strict Type Safety)
    if (colorFilter !== "ALL") {
      result = result.filter((item) =>
        item.color.includes(colorFilter as Sneaker["color"][number]),
      );
    }

    // Sorting Logic
    return result.sort((a, b) => {
      if (sortOrder === "PRICE_ASC") return a.price - b.price;
      if (sortOrder === "PRICE_DESC") return b.price - a.price;
      return b.id - a.id;
    });
  }, [debouncedSearch, brandFilter, colorFilter, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleData = filteredAndSortedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section className="py-[clamp(3rem,6vw,5.5rem)]">
      <ArchiveHeader
        searchTerm={searchTerm}
        brandFilter={brandFilter}
        colorFilter={colorFilter}
        setSearchTerm={(v) => handleFilterChange(setSearchTerm, v)}
        setBrandFilter={(v) => handleFilterChange(setBrandFilter, v)}
        setColorFilter={(v) => handleFilterChange(setColorFilter, v)}
        setSortOrder={(v) => handleFilterChange(setSortOrder, v)}
        sortOrder={sortOrder}
      />

      {/* ... inside ArchiveContainer return ... */}

      {filteredAndSortedData.length > 0 ? (
        <>
          <ArchiveGrid data={visibleData} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="my-20 flex items-center justify-center gap-8 border-t border-edge pt-12 max-sm:my-12 max-sm:gap-2 max-sm:pt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="mono cursor-pointer border border-edge bg-transparent px-6 py-2 text-[10px] font-black uppercase text-ink transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-20 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-bg max-sm:px-[0.7rem] max-sm:py-1 max-sm:text-[9px] max-sm:whitespace-nowrap"
              >
                PREV
              </button>

              <div className="mono flex gap-4 max-sm:flex-nowrap max-sm:gap-1 max-sm:overflow-x-auto max-sm:no-scrollbar">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={cn(
                      "cursor-pointer border-none bg-transparent p-2 text-[12px] font-black text-ink opacity-30 transition-all duration-200 max-sm:p-[0.35rem_0.45rem] max-sm:text-[11px]",
                      currentPage === i + 1 &&
                        "text-brand opacity-100 underline underline-offset-4",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="mono cursor-pointer border border-edge bg-transparent px-6 py-2 text-[10px] font-black uppercase text-ink transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-20 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-bg max-sm:px-[0.7rem] max-sm:py-1 max-sm:text-[9px] max-sm:whitespace-nowrap"
              >
                NEXT
              </button>
            </div>
          )}
        </>
      ) : (
        /* NEW HIGH-TECH EMPTY STATE */
        <div className="mt-8 flex w-full items-center justify-center border border-dashed border-edge bg-white/2 px-8 py-32">
          <div className="max-w-[500px] text-center">
            <div className="mono mb-4 text-[11px] font-black text-brand">
              SYSTEM_ERROR // NULL_SEARCH
            </div>
            <h3 className="mb-4 text-[2rem] font-black uppercase leading-none italic">
              NO_MATCHING_ITEMS_FOUND
            </h3>
            <p className="mono mb-10 text-[11px] uppercase leading-relaxed tracking-[0.05em] opacity-50">
              SEARCH PARAMETERS RETURNED ZERO DATA POINTS. PLEASE RECALIBRATE
              FILTERS.
            </p>
            <button
              className="mono cursor-pointer border-none bg-ink px-7 py-3.5 text-[10px] font-black text-bg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
              onClick={() => {
                setSearchTerm("");
                setBrandFilter("ALL");
                setColorFilter("ALL");
              }}
            >
              RECALIBRATE_SYSTEM
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
