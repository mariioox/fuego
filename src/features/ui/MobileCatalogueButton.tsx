import { LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileCatalogueButton() {
  const { pathname } = useLocation();

  if (pathname === "/catalogue") return null;

  return (
    <Link
      to="/catalogue"
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-0 right-0 z-[90] mx-auto flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-brand px-[22px] text-[13px] font-semibold text-white no-underline shadow-[0_8px_24px_rgba(255,94,0,0.28)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 min-[769px]:hidden"
      aria-label="Browse the catalogue"
    >
      <LayoutGrid size={16} />
      <span>Catalogue</span>
    </Link>
  );
}