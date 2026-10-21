import { Flame, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";
const INSTAGRAM_URL = "https://www.instagram.com/fuego.heat";
const TIKTOK_URL = "https://www.tiktok.com/@fuego_heatng";
const X_URL = "https://x.com/fuego_heatng";

function TikTokIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-[clamp(48px,7vw,80px)] border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)] py-6 max-sm:py-5">
        <div className="flex flex-wrap items-start justify-between gap-6 max-sm:gap-4">
          <div className="max-w-[320px]">
            <p className="font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink max-sm:text-[16px]">
              Rare pairs, sourced right. Delivered across Nigeria.
            </p>
          </div>

          <div className="flex gap-8 max-sm:gap-6">
            <div>
              <p className="text-[12px] text-muted">Shop</p>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <Link
                    to="/catalogue"
                    className="text-[14px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Shop all
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#new-in"
                    className="text-[14px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    New in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#newsletter"
                    className="text-[14px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Subscribe
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[12px] text-muted">Connect</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <TikTokIcon />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-control border border-glass-line bg-glass px-2 text-[20px] text-ink backdrop-blur-[10px] transition-colors duration-300 ease-soft hover:border-text max-sm:h-9 max-sm:px-3 max-sm:text-[12px]"
          >
            ↑
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mt-[clamp(32px,5vw,56px)] flex items-baseline justify-center overflow-hidden text-ink"
        >
          <span className="font-display text-[clamp(56px,14vw,160px)] font-bold leading-[0.78] tracking-[-0.06em]">
            FUEG
          </span>
          <Flame
            className="inline-block h-[0.8em] w-[0.8em] origin-bottom animate-[flameBreath_1.6s_ease-in-out_infinite_alternate]"
            fill="var(--orange)"
            color="var(--orange)"
          />
        </div>

        <div className="mt-[clamp(24px,4vw,40px)] flex flex-wrap items-center justify-center gap-3 border-t border-line pt-5 pb-7 text-[12px] text-muted">
          <p>
            © {new Date().getFullYear()} Fuego. Every pair verified authentic.
          </p>
        </div>
      </div>
    </footer>
  );
}
