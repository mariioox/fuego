import { revealStyle, useReveal } from "../../../core/hooks/useReveal";

const BRANDS = [
  "Nike",
  "Jordan",
  "adidas",
  "New Balance",
  "Puma",
  "Timberland",
  "ASICS",
  "Converse",
];

export default function BrandRow() {
  const [ref, shown] = useReveal<HTMLDivElement>();

  return (
    <section
      className="mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)] pb-[clamp(32px,6vw,96px)]"
      aria-label="Brands we carry"
    >
      <div
        ref={ref}
        style={revealStyle(shown)}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 sm:gap-x-10 sm:gap-y-3"
      >
        {BRANDS.map((brand) => (
          <span
            key={brand}
            className="font-display text-[clamp(16px,2.6vw,24px)] font-medium text-muted"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
