import { LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./styles/MobileCatalogueButton.css";

export default function MobileCatalogueButton() {
  const { pathname } = useLocation();

  if (pathname === "/catalogue") return null;

  return (
    <Link to="/catalogue" className="mobile-catalogue-cta" aria-label="Browse the catalogue">
      <LayoutGrid size={16} className="mobile-cta-icon" />
      <span>Catalogue</span>
    </Link>
  );
}
