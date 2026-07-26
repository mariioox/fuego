// src/pages/Home.tsx
import SEO from "../core/components/SEO";
import Hero from "../features/home/components/Hero";
import ShopIcons from "../features/home/components/ShopIcons";
import About from "../features/home/components/About";
import Newsletter from "../features/home/components/Newsletter";

export default function Home() {
  return (
    <>
      <SEO
        title="Premium Sneaker Collection Nigeria"
        description="Fuego Archive — Nigeria's premium sneaker archive. Browse curated collections of Nike, Jordan, Adidas, New Balance, Puma and more. Streetwear culture from Lagos to the world."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Fuego Archive",
            url: "https://feugo-heat.vercel.app",
            description:
              "Nigeria's premium sneaker archive. Curated collections of Nike, Jordan, Adidas, New Balance, Puma and more.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://feugo-heat.vercel.app/catalogue?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Hero />
      <div className="section-divider">
        <ShopIcons />
      </div>
      <div className="section-divider">
        <About />
      </div>
      <div className="section-divider">
        <Newsletter />
      </div>
    </>
  );
}
