import { LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileCatalogueButton() {
  const { pathname } = useLocation();

  if (pathname === "/catalogue") return null;

  return (
    <Link
      to="/catalogue"
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-1/2 z-[90] mx-auto inline-flex h-11 w-fit -translate-x-1/2 items-center justify-center gap-2 rounded-control border border-glass-line bg-glass px-5 text-[13px] font-medium text-ink no-underline backdrop-blur-[16px] transition-colors duration-300 ease-soft hover:border-text min-[769px]:hidden sm:h-12 sm:px-6 sm:text-[14px]"
      aria-label="Shop all sneakers"
    >
      <LayoutGrid size={16} />
      <span>Shop all</span>
    </Link>
  );
}
