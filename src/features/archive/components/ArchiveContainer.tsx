import { useState, useMemo } from "react";
import { SNEAKER_REGISTRY } from "../data/sneakerRegistry";
import ArchiveHeader from "./ArchiveHeader";
import ArchiveGrid from "./ArchiveGrid";
import type { Sneaker } from "../types/sneaker";
import "./styles/ArchiveContainer.css";
import "./styles/ArchiveGrid.css";

const ITEMS_PER_PAGE = 20;

export default function ArchiveContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [colorFilter, setColorFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  // Helper to reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...SNEAKER_REGISTRY];

    // Search Filter
    if (searchTerm) {
      const lowSearch = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowSearch) ||
          item.sku.toLowerCase().includes(lowSearch),
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
      return b.id - a.id;
    });
  }, [searchTerm, brandFilter, colorFilter, sortOrder]);

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
    <section className="container py-20">
      <ArchiveHeader
        searchTerm={searchTerm}
        setSearchTerm={(v) => handleFilterChange(setSearchTerm, v)}
        setBrandFilter={(v) => handleFilterChange(setBrandFilter, v)}
        colorFilter={colorFilter}
        setColorFilter={(v) => handleFilterChange(setColorFilter, v)}
        setSortOrder={(v) => handleFilterChange(setSortOrder, v)}
      />

      <ArchiveGrid data={visibleData} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-nav">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="nav-btn mono"
          >
            PREV
          </button>

          <div className="page-numbers mono">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`page-num ${currentPage === i + 1 ? "active" : ""}`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="nav-btn mono"
          >
            NEXT
          </button>
        </div>
      )}

      {filteredAndSortedData.length === 0 && (
        <div className="py-20 text-center mono opacity-40 text-sm">
          NO_MATCHING_SPECIMENS_FOUND
        </div>
      )}
    </section>
  );
}
