import { Flame, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";
const INSTAGRAM_URL = "https://www.instagram.com/fuego.heat";
const TIKTOK_URL = "https://www.tiktok.com/@fuego_heatng";
const X_URL = "https://x.com/fuego_heatng";

function TikTokIcon() {
  return (
    <svg
      width="16"
      height="16"
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
      width="16"
      height="16"
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
    <footer className="mt-[clamp(24px,4vw,40px)] border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,28px)] py-3 max-sm:py-2">
        <div className="flex flex-wrap items-start justify-between gap-3 max-sm:gap-2">
          <div className="max-w-[300px]">
            <p className="font-display text-[16px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink max-sm:text-[14px]">
              Rare pairs, sourced right. Delivered across Nigeria.
            </p>
          </div>

          <div className="flex gap-6 max-sm:gap-4">
            <div>
              <p className="text-[11px] text-muted">Shop</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                <li>
                  <Link
                    to="/catalogue"
                    className="text-[13px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Shop all
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#new-in"
                    className="text-[13px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    New in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#newsletter"
                    className="text-[13px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Giveaway
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] ml-15 text-muted">Connect</p>
              <div className="mt-2 flex items-center gap-1.5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <TikTokIcon />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-control border border-glass-line bg-glass px-3 text-[12px] text-ink backdrop-blur-[10px] transition-colors duration-300 ease-soft hover:border-text max-sm:h-8 max-sm:px-2.5 max-sm:text-[11px]"
          >
            Back to top ↑
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mt-[clamp(8px,1.5vw,14px)] flex items-center justify-center overflow-hidden text-ink leading-none"
        >
          <span className="font-display text-[clamp(42px,10vw,98px)] font-bold leading-[0.78] tracking-[-0.06em]">
            FUEG
          </span>
          <Flame
            className="ml-[2px] inline-block h-[clamp(42px,10vw,98px)] w-[clamp(38px,9vw,88px)] origin-center -translate-y-[1px]"
            fill="var(--orange)"
            color="var(--orange)"
          />
        </div>

        <div className="mt-[clamp(6px,1vw,10px)] flex flex-wrap items-center justify-center gap-3 border-t border-line pt-2 pb-1 text-[11px] text-muted">
          <p>
            © {new Date().getFullYear()} Fuego. Every pair verified authentic.
          </p>
        </div>
      </div>
    </footer>
  );
}
