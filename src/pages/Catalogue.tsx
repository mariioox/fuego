// src/pages/Catalogue.tsx
import SEO from "../core/components/SEO";
import ArchiveContainer from "../features/archive/components/ArchiveContainer";

const catalogueData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sneaker Archive — Browse All Sneakers",
  description:
    "Browse all sneakers in the Fuego archive. Nike, Jordan, Adidas, New Balance, Puma — available in Nigeria with verified authenticity.",
  url: "https://feugo-heat.vercel.app/catalogue",
  isPartOf: {
    "@type": "WebSite",
    name: "Fuego Archive",
    url: "https://feugo-heat.vercel.app",
  },
};

const breadcrumbsData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://feugo-heat.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Full Archive",
      item: "https://feugo-heat.vercel.app/catalogue",
    },
  ],
};

export default function Catalogue() {
  return (
    <main className="catalogue-page">
      <SEO
        title="Buy Sneakers Nigeria — Nike Jordan Adidas New Balance Archive"
        description="Browse the full Fuego sneaker archive. Buy Nike, Jordan, Adidas, New Balance & Puma sneakers in Nigeria. Filter by brand, color, price. Verified authentic, Lagos-based."
        url="https://feugo-heat.vercel.app/catalogue"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsData) }}
      />
      <ArchiveContainer />
    </main>
  );
}
