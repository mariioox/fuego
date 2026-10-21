// src/pages/Home.tsx
import SEO from "../core/components/SEO";
import Hero from "../features/home/components/Hero";
import ShopIcons from "../features/home/components/ShopIcons";
import About from "../features/home/components/About";
import Newsletter from "../features/home/components/Newsletter";

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fuego Archive",
  url: "https://fuego-heat.vercel.app",
  logo: "https://fuego-heat.vercel.app/flame.svg",
  description:
    "Nigeria's premier sneaker archive and streetwear community. Curated Nike, Jordan, Adidas, New Balance, Puma collections — Lagos to the world.",
  sameAs: [
    "https://www.instagram.com/fuego.heat",
    "https://x.com/fuego_heatng",
    "https://www.tiktok.com/@fuego_heatng",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressRegion: "Lagos",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
    contactOption: "WhatsApp",
  },
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fuego Archive",
  url: "https://fuego-heat.vercel.app",
  description:
    "Buy sneakers in Nigeria — curated Nike, Jordan, Adidas, New Balance, Puma. Verified authentic, Lagos-based sneaker store.",
  inLanguage: "en-NG",
  publisher: {
    "@type": "Organization",
    name: "Fuego Archive",
    logo: "https://fuego-heat.vercel.app/flame.svg",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://fuego-heat.vercel.app/catalogue?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Fuego Archive",
  url: "https://fuego-heat.vercel.app",
  logo: "https://fuego-heat.vercel.app/flame.svg",
  description:
    "Premium sneaker store in Nigeria. Buy Nike, Jordan, Adidas, New Balance, Puma sneakers online. Verified authentic streetwear.",
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Sneakers",
      category: "Footwear",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressRegion: "Lagos",
  },
  priceRange: "₦₦₦",
};

const breadcrumbsData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://fuego-heat.vercel.app",
    },
  ],
};

export default function Home() {
  return (
    <>
      <SEO
        title="Buy Sneakers in Nigeria | Premium Nike Jordan Adidas Store"
        description="Buy sneakers in Nigeria — Fuego Archive is Lagos' premium sneaker store. Shop verified authentic Nike, Jordan, Adidas, New Balance & Puma sneakers. Streetwear culture from Lagos to the world."
        url="https://fuego-heat.vercel.app"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsData) }}
      />
      <Hero />
      <div className="border-t border-edge">
        <ShopIcons />
      </div>
      <div className="border-t border-edge">
        <About />
      </div>
      <div className="border-t border-edge">
        <Newsletter />
      </div>
    </>
  );
}
