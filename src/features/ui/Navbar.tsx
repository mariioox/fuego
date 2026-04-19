import {
  Flame,
  Instagram,
  MessageCircle,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <nav className="nav-wrapper">
      <div className="container nav-container">
        {/* Logo Section */}
        <Link to="/" className="nav-logo-group">
          <span className="nav-logo-text">FUEG</span>
          <Flame size={23} fill="var(--orange)" color="var(--orange)" />
        </Link>

        {/* Action Section */}
        <div className="nav-right-group">
          <Link to="/catalogue" className="nav-link-archive">
            Full_Archive <ArrowRight size={14} />
          </Link>

          {/* Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="theme-icon-btn"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="nav-divider"></div>

          <a
            href="https://www.instagram.com/fuego.heat?igsh=MXRxZzh3OTM5MHNyMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-link"
          >
            <Instagram size={20} />
          </a>

          <a
            href="https://wa.me/message/MNPXIERXZVHPK1"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-link"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
