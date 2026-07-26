// src/pages/Catalogue.tsx
import SEO from "../core/components/SEO";
import ArchiveContainer from "../features/archive/components/ArchiveContainer";

export default function Catalogue() {
  return (
    <main className="catalogue-page">
      <SEO
        title="Full Archive — Browse All Sneakers"
        description="Browse the complete Fuego sneaker archive. Filter by brand, color, and price. Nike, Jordan, Adidas, New Balance, Puma, and more available in Nigeria."
      />
      <ArchiveContainer />
    </main>
  );
}
