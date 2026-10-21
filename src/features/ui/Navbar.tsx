import { useEffect, useState } from "react";
import { Flame, MessageCircle, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import IconButton from "../../core/ui/IconButton";

const WHATSAPP_URL = "https://wa.me/message/MNPXIERXZVHPK1";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  const { cartCount, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalogue", label: "Shop all" },
  ];

  return (
    <nav aria-label="Main" className="w-full px-3 sm:px-4">
      <div
        className="glass relative mx-auto flex h-[68px] w-full max-w-[1120px] items-center rounded-nav px-3 pl-[18px] pr-2 transition-[box-shadow] duration-[400ms] ease-soft sm:h-[72px] sm:pl-[26px] sm:pr-3"
        style={{
          boxShadow: scrolled ? "var(--glass-shadow-up)" : "var(--glass-shadow)",
        }}
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-0.5 text-ink no-underline"
          aria-label="Fuego — home"
        >
          <span className="font-display text-[19px] font-bold tracking-[0.06em] sm:text-[21px]">
            FUEG
          </span>
          <Flame size={16} fill="var(--orange)" color="var(--orange)" className="sm:h-[18px] sm:w-[18px]" />
        </Link>

        <div className="flex h-[68px] flex-1 flex-wrap items-center justify-center gap-6 overflow-hidden max-sm:hidden sm:h-[72px] sm:gap-8">
          {links.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-[15px] font-medium text-ink no-underline"
                    : "text-[15px] font-medium text-muted no-underline transition-colors duration-300 ease-soft hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Link
            to="/catalogue"
            aria-label="Search the archive"
            className="inline-flex h-10 w-10 items-center justify-center rounded-control text-ink transition-colors duration-300 ease-soft hover:bg-chip sm:h-12 sm:w-12"
          >
            <Search size={20} />
          </Link>

          <IconButton
            label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
          >
            <span
              key={theme}
              className="inline-flex animate-[themeSpin_0.5s_ease-soft]"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </span>
          </IconButton>

          <IconButton
            label="Chat on WhatsApp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} />
          </IconButton>

          <button
            onClick={openCart}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-control bg-btn text-btn-ink transition-transform duration-300 ease-soft active:translate-y-px sm:h-12 sm:w-12"
            aria-label={`Open bag with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-bg bg-orange px-1 text-[11px] font-semibold leading-none text-[#0B0B0C] animate-[badgePop_220ms_cubic-bezier(0.34,1.56,0.64,1)]"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
