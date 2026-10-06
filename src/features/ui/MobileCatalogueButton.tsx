import { LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileCatalogueButton() {
  const { pathname } = useLocation();

  if (pathname === "/catalogue") return null;

  return (
    <Link
      to="/catalogue"
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-0 right-0 z-[90] mx-auto flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-brand px-[22px] font-mono text-xs font-black uppercase tracking-[0.08em] text-white no-underline transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 animate-[glowPulse_2.6s_ease-in-out_infinite] min-[769px]:hidden"
      aria-label="Browse the catalogue"
    >
      <LayoutGrid size={16} className="animate-[iconNudge_2.6s_ease-in-out_infinite]" />
      <span>Catalogue</span>
    </Link>
  );
}