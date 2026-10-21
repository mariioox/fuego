import {
  ArrowRight,
  Flame,
  Instagram,
  MessageCircle,
  Sun,
  Moon,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import GlassPanel from "../../core/ui/GlassPanel";
import IconButton from "../../core/ui/IconButton";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-[100] w-full px-4 pt-4 max-md:px-0 max-md:pt-0">
      <GlassPanel
        className="mx-auto flex h-14 w-full max-w-[1440px] items-center rounded-full [padding-inline:calc(max(0px,(100%+32px-1440px)*0.5)+var(--gutter)-17px)] min-[1473px]:[padding-inline:calc(var(--gutter)-1px)] max-md:h-[70px] max-md:max-w-none max-md:rounded-none max-md:border-x-0 max-md:border-t-0 max-md:[padding-inline:var(--gutter)]"
      >
        <div className="flex w-full items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center text-inherit no-underline">
            <span className="text-[1.4rem] font-bold tracking-[-0.03em]">
              FUEG
            </span>
            <Flame size={23} fill="var(--orange)" color="var(--orange)" />
          </Link>

          {/* Action Section */}
          <div className="flex items-center gap-4 max-sm:gap-2">
            <Link
              to="/catalogue"
              className="flex items-center gap-2 border border-transparent p-2 text-[13px] font-medium text-inherit opacity-70 no-underline transition-colors duration-200 hover:border-edge hover:bg-card hover:text-brand hover:opacity-100 max-sm:text-[0]"
            >
              Archive{" "}
              <ArrowRight size={14} className="max-sm:size-[15px]" />
            </Link>

            <IconButton
              label="Toggle theme"
              onClick={toggleTheme}
              className="hover:rotate-15"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>

            <div className="h-[26px] w-px bg-edge max-[400px]:hidden" />

            <IconButton
              label="Fuego on Instagram"
              href="https://www.instagram.com/fuego.heat"
              target="_blank"
              rel="noopener noreferrer"
              className="max-[400px]:hidden"
            >
              <Instagram size={20} />
            </IconButton>

            <IconButton
              label="Chat on WhatsApp"
              href="https://wa.me/message/MNPXIERXZVHPK1"
              target="_blank"
              rel="noopener noreferrer"
              className="max-[400px]:hidden"
            >
              <MessageCircle size={20} />
            </IconButton>

            <button
              onClick={openCart}
              className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-edge bg-card text-inherit transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_10px_24px_rgba(255,94,0,0.12)] max-sm:h-10 max-sm:w-10 max-sm:rounded-[11px]"
              aria-label={`Open cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -right-1.5 -top-1.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-bg bg-brand px-[6px] text-[11px] font-bold leading-none text-white shadow-[0_4px_12px_rgba(255,94,0,0.35)] animate-[badgePop_0.35s_cubic-bezier(0.16,1,0.3,1)]"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </GlassPanel>
    </nav>
  );
}
