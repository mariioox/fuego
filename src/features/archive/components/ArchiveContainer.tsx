import { useState, useMemo } from "react";
import { SNEAKER_REGISTRY } from "../data/sneakerRegistry";
import ArchiveHeader from "./ArchiveHeader";
import ArchiveGrid from "./ArchiveGrid";
import type { Sneaker } from "../types";

export default function ArchiveContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [colorFilter, setColorFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  const filteredAndSortedData = useMemo(() => {
    let result = [...SNEAKER_REGISTRY];

    // 2. Filter by Name/SKU
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 3. Filter by Brand
    if (brandFilter !== "ALL") {
      result = result.filter((item) => item.brand === brandFilter);
    }

    // 4. Filter by Color
    if (colorFilter !== "ALL") {
      result = result.filter((item) =>
        item.color.includes(colorFilter as Sneaker["color"][number]),
      );
    }

    // 5. Apply Sorting
    return result.sort((a, b) => {
      if (sortOrder === "PRICE_ASC") return a.price - b.price;
      if (sortOrder === "PRICE_DESC") return b.price - a.price;
      return b.id - a.id; // Default: Newest (highest ID)
    });
  }, [searchTerm, brandFilter, colorFilter, sortOrder]);

  return (
    <section className="container py-20">
      <ArchiveHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setBrandFilter={setBrandFilter}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        setSortOrder={setSortOrder}
      />

      <ArchiveGrid data={filteredAndSortedData} />

      {filteredAndSortedData.length === 0 && (
        <div className="py-20 text-center mono opacity-40 text-sm">
          NO_MATCHING_SPECIMENS_FOUND
        </div>
      )}
    </section>
  );
}
