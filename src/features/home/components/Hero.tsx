import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroImage = "/assets/Hero3.webp";
const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";

export default function Hero() {
  return (
    <section
      className="mx-auto w-full max-w-[1240px] px-[clamp(16px,3vw,32px)] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,96px)]"
      aria-label="Fuego — verified sneakers"
    >
      <div className="flex flex-wrap items-center gap-[clamp(32px,4vw,56px)]">
        <div className="flex flex-1 basis-[440px] flex-col gap-6">
          <span
            className="inline-flex h-8 w-fit items-center gap-2 rounded-control border border-line bg-chip px-3 text-[13px] text-muted animate-[riseIn_0.8s_ease-soft_both]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            Lagos · Verified authentic
          </span>

          <h1
            className="font-display text-[clamp(48px,6.4vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink animate-[riseIn_0.8s_ease-soft_both]"
            style={{ animationDelay: "80ms" }}
          >
            Rare pairs,
            <br />
            sourced right.
          </h1>

          <p
            className="max-w-[440px] text-[18px] leading-[1.55] text-muted animate-[riseIn_0.8s_ease-soft_both]"
            style={{ animationDelay: "160ms" }}
          >
            Nike, Jordan, adidas, New Balance and more. Every pair checked by
            hand and delivered across Nigeria.
          </p>

          <div
            className="flex flex-wrap items-center gap-2.5 animate-[riseIn_0.8s_ease-soft_both]"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/catalogue"
              className="group inline-flex h-[52px] items-center gap-2 rounded-control bg-btn px-7 text-[15px] font-medium text-btn-ink no-underline transition-transform duration-300 ease-soft"
            >
              Shop the archive
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
              />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center rounded-control border border-line bg-glass px-7 text-[15px] font-medium text-ink no-underline backdrop-blur-[10px] transition-colors duration-300 ease-soft hover:border-text"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative flex-1 basis-[440px] animate-[riseIn_0.8s_ease-soft_both]">
          <div className="aspect-[7/5.4] w-full overflow-hidden rounded-surface bg-tile">
            <img
              src={heroImage}
              alt="Curated sneakers from the Fuego archive"
              className="h-full w-full object-cover animate-[heroZoom_2.2s_ease-soft_both]"
              fetchPriority="high"
            />
          </div>

          <a
            href="#newsletter"
            className="absolute bottom-4 left-4 flex max-w-[360px] items-center gap-4 rounded-surface border border-white/75 bg-white/60 p-4 no-underline backdrop-blur-[22px] animate-[riseIn_0.8s_ease-soft_both] max-sm:right-4"
            style={{ animationDelay: "520ms" }}
          >
            <span className="min-w-0">
              <span className="block text-[12px] text-[#4B4B50]">Giveaway</span>
              <span className="mt-0.5 block text-[15px] font-semibold text-[#0B0B0C]">
                Win a new Nike Air Force 1
              </span>
            </span>
            <span className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-[#0B0B0C] text-white">
              <ArrowRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
