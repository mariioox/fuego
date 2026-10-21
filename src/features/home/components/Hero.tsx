import { Button } from "../../../core/ui/Button";
import GlassPanel from "../../../core/ui/GlassPanel";

// Served from /public so it can be preloaded with a stable path
const heroImage = "/assets/Hero6.webp";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" aria-label="Fuego — verified sneakers">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-[var(--gutter)] pb-24 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-32 lg:pt-12">
        <div className="max-w-[560px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            New season
          </span>
          <h1 className="mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
            Sneakers you can trust.
          </h1>
          <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink/60">
            Hand-picked pairs, checked by us and delivered across Nigeria.
            No fillers, no noise — just the heat.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href="/catalogue"
              size="lg"
              className="rounded-full px-9 text-ink"
            >
              Shop the archive
            </Button>
            <a
              href="/#newsletter"
              className="inline-flex h-[52px] items-center rounded-full border border-edge px-7 text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:border-brand hover:text-brand"
            >
              Win a pair
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] border border-edge bg-card shadow-[0_30px_80px_rgba(0,0,0,0.10)]">
            <img
              src={heroImage}
              alt="Curated sneakers from the Fuego archive"
              className="aspect-[4/5] w-full object-cover"
              fetchPriority="high"
            />
          </div>

          <GlassPanel className="absolute -bottom-7 -left-3 w-[228px] rounded-2xl p-5 sm:-left-8 sm:w-[264px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              Giveaway
            </span>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/80">
              Win a pair of Nike Air Force 1s. One draw a month, subscribers only.
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
