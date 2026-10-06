import {
  Flame,
  Instagram,
  MessageCircle,
  Sun,
  Moon,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import Container from "../../core/ui/Container";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-[100] flex h-[70px] items-center border-b border-edge bg-bg backdrop-blur-[12px]">
      <Container className="flex w-full items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center text-inherit no-underline">
          <span className="text-[1.4rem] font-bold italic uppercase">FUEG</span>
          <Flame size={23} fill="var(--orange)" color="var(--orange)" />
        </Link>

        {/* Action Section */}
        <div className="flex items-center gap-4 max-sm:gap-2">
          <Link
            to="/catalogue"
            className="flex items-center gap-2 border border-transparent p-2 font-mono text-[11px] font-extrabold uppercase text-inherit opacity-70 no-underline transition-all duration-300 hover:border-edge hover:bg-card hover:text-brand hover:opacity-100 max-sm:text-[0]"
          >
            Full_Archive <ArrowRight size={14} className="max-sm:size-[15px]" />
          </Link>

          {/* Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-[10px] p-1.5 text-inherit transition-[transform,color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-15 hover:bg-card hover:text-brand"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="h-[26px] w-px bg-edge max-[400px]:hidden"></div>

          <a
            href="https://www.instagram.com/fuego.heat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-[10px] p-1.5 text-inherit opacity-70 transition-opacity duration-300 hover:bg-card hover:text-brand hover:opacity-100 max-[400px]:hidden"
            aria-label="Fuego on Instagram"
          >
            <Instagram size={20} />
          </a>

          <a
            href="https://wa.me/message/MNPXIERXZVHPK1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-[10px] p-1.5 text-inherit opacity-70 transition-opacity duration-300 hover:bg-card hover:text-brand hover:opacity-100 max-[400px]:hidden"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>

          <button
            onClick={openCart}
            className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-edge bg-card text-inherit transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_10px_24px_rgba(255,94,0,0.12)] max-sm:h-10 max-sm:w-10 max-sm:rounded-[11px]"
            aria-label={`Open cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="mono absolute -right-1.5 -top-1.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-bg bg-brand px-[6px] text-[11px] font-bold leading-none text-white shadow-[0_4px_12px_rgba(255,94,0,0.35)] animate-[badgePop_0.35s_cubic-bezier(0.16,1,0.3,1)]"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </Container>
    </nav>
  );
}
