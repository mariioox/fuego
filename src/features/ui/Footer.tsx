import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";
const INSTAGRAM_URL = "https://www.instagram.com/fuego.heat";
const TIKTOK_URL = "https://www.tiktok.com/@fuego_heatng";
const X_URL = "https://x.com/fuego_heatng";

const lagosTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export default function Footer() {
  const [time, setTime] = useState(lagosTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(lagosTime()), 15000);
    return () => window.clearInterval(id);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-[clamp(80px,9vw,128px)] border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-[clamp(16px,3vw,32px)] py-10">
        {/* Row 1 */}
        <div className="flex flex-wrap items-start justify-between gap-10 max-lg:gap-12">
          <div className="max-w-[380px]">
            <p className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              Rare pairs, sourced right. Delivered across Nigeria.
            </p>

            <div className="mt-6 inline-flex h-10 items-center gap-2 rounded-control border border-glass-line bg-glass px-4 text-[13px] text-ink backdrop-blur-[10px]">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#22C55E] animate-[statusPulse_1.6s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              <span>Open for orders</span>
              <span className="text-muted">· Lagos {time}</span>
            </div>
          </div>

          <div className="flex gap-[72px] max-sm:gap-10">
            <div>
              <p className="text-[13px] text-muted">Shop</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    to="/catalogue"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Shop all
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#new-in"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    New in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#newsletter"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Giveaway
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[13px] text-muted">Contact</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink no-underline transition-colors duration-300 ease-soft hover:text-muted"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-control border border-glass-line bg-glass px-5 text-[14px] text-ink backdrop-blur-[10px] transition-colors duration-300 ease-soft hover:border-text"
          >
            Back to top ↑
          </button>
        </div>

        {/* Row 2 — wordmark */}
        <div
          aria-hidden="true"
          className="mt-[clamp(56px,7vw,96px)] flex items-baseline justify-center overflow-hidden text-ink"
        >
          <span className="font-display text-[clamp(88px,21vw,320px)] font-bold leading-[0.78] tracking-[-0.06em]">
            FUEG
          </span>
          <Flame
            className="inline-block h-[0.72em] w-[0.72em] origin-bottom animate-[flameBreath_1.6s_ease-in-out_infinite_alternate]"
            fill="var(--orange)"
            color="var(--orange)"
          />
        </div>

        {/* Row 3 */}
        <div className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 pb-9 text-[13px] text-muted">
          <p>
            © {new Date().getFullYear()} Fuego. Every pair verified authentic.
          </p>
          <p>Built in Lagos</p>
        </div>
      </div>
    </footer>
  );
}
