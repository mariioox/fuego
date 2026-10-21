import { useState, useMemo } from "react";
import { cn } from "../../../core/utils/cn";
import { useDebounce } from "../../../core/hooks/useDebounce";
import Section from "../../../core/ui/Section";
import { Button } from "../../../core/ui/Button";
import { SNEAKER_REGISTRY } from "../data/sneakerRegistry";
import ArchiveHeader from "./ArchiveHeader";
import ArchiveGrid from "./ArchiveGrid";
import type { Sneaker } from "../types/sneaker";

const ITEMS_PER_PAGE = 20;
const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";

export default function ArchiveContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [colorFilter, setColorFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("FEATURED");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Helper to reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...SNEAKER_REGISTRY];

    // Search Filter — brand and model name
    if (debouncedSearch) {
      const lowSearch = debouncedSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowSearch) ||
          item.brand.toLowerCase().includes(lowSearch),
      );
    }

    // Brand Filter
    if (brandFilter !== "ALL") {
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
      return a.id - b.id;
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

  const clearFilters = () => {
    setSearchTerm("");
    setBrandFilter("ALL");
    setColorFilter("ALL");
    setSortOrder("FEATURED");
    setCurrentPage(1);
  };

  return (
    <Section className="pt-[clamp(40px,6vw,72px)]">
      <ArchiveHeader
        searchTerm={searchTerm}
        brandFilter={brandFilter}
        colorFilter={colorFilter}
        setSearchTerm={(v) => handleFilterChange(setSearchTerm, v)}
        setBrandFilter={(v) => handleFilterChange(setBrandFilter, v)}
        setColorFilter={(v) => handleFilterChange(setColorFilter, v)}
        setSortOrder={(v) => handleFilterChange(setSortOrder, v)}
        sortOrder={sortOrder}
        count={filteredAndSortedData.length}
      />

      {filteredAndSortedData.length > 0 ? (
        <>
          <ArchiveGrid data={visibleData} />

          {totalPages > 1 && (
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3 max-sm:mt-10 max-sm:gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="h-11 cursor-pointer rounded-control border border-line bg-card px-5 text-[14px] font-medium text-ink transition-colors duration-300 ease-soft disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-text max-sm:px-3"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={cn(
                      "h-11 w-11 cursor-pointer rounded-control border-none bg-transparent text-[14px] font-medium transition-colors duration-300 ease-soft max-sm:h-9 max-sm:w-9",
                      currentPage === i + 1
                        ? "bg-text text-bg"
                        : "text-muted hover:text-ink",
                    )}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="h-11 cursor-pointer rounded-control border border-line bg-card px-5 text-[14px] font-medium text-ink transition-colors duration-300 ease-soft disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-text max-sm:px-3"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full items-center justify-center rounded-surface bg-card px-6 py-[72px]">
          <div className="max-w-[440px] text-center">
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-[-0.02em] text-ink">
              No pairs match that yet
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted">
              Tell us the shoe and your size, and we&apos;ll source it for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Ask on WhatsApp
              </Button>
              <Button variant="outline" size="lg" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
