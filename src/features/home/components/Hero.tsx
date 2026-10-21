import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroImage = "/giveaway.jpeg";
const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";

export default function Hero() {
  return (
    <section
      className="mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)] pt-[clamp(28px,5vw,88px)] pb-[clamp(36px,5vw,96px)]"
      aria-label="Fuego — verified sneakers"
    >
      <div className="flex flex-wrap items-center gap-[clamp(20px,4vw,56px)]">
        <div className="flex flex-1 basis-[320px] flex-col gap-4 sm:basis-[440px] sm:gap-6">
          <span
            className="hidden h-8 w-fit items-center gap-2 rounded-control border border-line bg-chip px-3 text-[13px] text-muted animate-[riseIn_0.8s_ease-soft_both]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            Lagos · Verified authentic
          </span>

          <h1
            className="font-display text-[clamp(38px,8vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink animate-[riseIn_0.8s_ease-soft_both]"
            style={{ animationDelay: "80ms" }}
          >
            Rare pairs,
            <br />
            sourced right.
          </h1>

          <p
            className="max-w-[440px] text-[16px] leading-[1.55] text-muted animate-[riseIn_0.8s_ease-soft_both] sm:text-[18px]"
            style={{ animationDelay: "160ms" }}
          >
            Nike, Jordan, adidas, New Balance and more. Every pair checked by
            hand and delivered across Nigeria.
          </p>

          <div
            className="flex flex-wrap items-center gap-2 animate-[riseIn_0.8s_ease-soft_both] sm:gap-2.5"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/catalogue"
              className="group inline-flex h-[48px] items-center gap-2 rounded-control bg-btn px-6 text-[14px] font-medium text-btn-ink no-underline transition-transform duration-300 ease-soft sm:h-[52px] sm:px-7 sm:text-[15px]"
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
              className="inline-flex h-[48px] items-center rounded-control border border-line bg-glass px-6 text-[14px] font-medium text-ink no-underline backdrop-blur-[10px] transition-colors duration-300 ease-soft hover:border-text sm:h-[52px] sm:px-7 sm:text-[15px]"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative flex-1 basis-[320px] animate-[riseIn_0.8s_ease-soft_both] sm:basis-[440px]">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-surface bg-tile sm:aspect-[7/5.4]">
            <img
              src={heroImage}
              alt="Giveaway sneakers"
              className="h-full w-full object-cover animate-[heroZoom_2.2s_ease-soft_both]"
              fetchPriority="high"
            />
          </div>

          <a
            href="#newsletter"
            className="absolute bottom-3 left-3 flex max-w-[320px] items-center gap-3 rounded-surface border border-white/75 bg-white/60 p-3 no-underline backdrop-blur-[22px] animate-[riseIn_0.8s_ease-soft_both] max-sm:right-3 sm:bottom-4 sm:left-4 sm:max-w-[360px] sm:gap-4 sm:p-4"
            style={{ animationDelay: "520ms" }}
          >
            <span className="min-w-0">
              <span className="block text-[11px] text-[#4B4B50] sm:text-[12px]">Giveaway</span>
              <span className="mt-0.5 block text-[14px] font-semibold text-[#0B0B0C] sm:text-[15px]">
                Win a new pair of sneakers
              </span>
            </span>
            <span className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-[#0B0B0C] text-white sm:h-11 sm:w-11">
              <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
