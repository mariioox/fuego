import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../../../core/ui/Section";
import Pill from "../../../core/ui/Pill";
import { SNEAKER_REGISTRY } from "../../archive/data/sneakerRegistry";
import SneakerCard from "../../archive/components/SneakerCard";

const BRAND_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "NIKE", label: "Nike" },
  { value: "JORDAN", label: "Jordan" },
  { value: "ADIDAS", label: "adidas" },
  { value: "NEW BALANCE", label: "New Balance" },
  { value: "PUMA", label: "Puma" },
  { value: "TIMBERLAND", label: "Timberland" },
  { value: "ASICS", label: "ASICS" },
  { value: "VANS", label: "Vans" },
];

export default function NewIn() {
  const [brand, setBrand] = useState("ALL");

  const featured = useMemo(() => {
    const list = SNEAKER_REGISTRY.filter(
      (sneaker) => brand === "ALL" || sneaker.brand === brand,
    );
    return [...list].sort((a, b) => b.id - a.id).slice(0, 8);
  }, [brand]);

  return (
    <Section id="new-in">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(26px,5vw,48px)] font-semibold leading-none tracking-[-0.035em] text-ink">
          New in
        </h2>
        <Link
          to="/catalogue"
          className="group inline-flex h-11 items-center gap-2 rounded-control border border-line bg-card px-5 text-[14px] font-medium text-ink no-underline transition-colors duration-300 ease-soft hover:border-text"
        >
          View the full archive
          <ArrowRight
            size={15}
            className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-2.5">
        {BRAND_FILTERS.map((filter) => (
          <Pill
            key={filter.value}
            active={brand === filter.value}
            aria-pressed={brand === filter.value}
            onClick={() => setBrand(filter.value)}
          >
            {filter.label}
          </Pill>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-[repeat(auto-fill,minmax(max(160px,calc((100%_-_60px)/4)),1fr))]">
        {featured.map((sneaker, index) => (
          <SneakerCard
            key={sneaker.id}
            sneaker={sneaker}
            delay={120 + index * 70}
          />
        ))}
      </div>
    </Section>
  );
}
