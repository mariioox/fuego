import { Flame, Instagram, MessageCircle } from "lucide-react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="container">
        {/* Top Row: Brand & Mission */}
        <div className="footer-top-row">
          <div className="footer-brand-sec">
            <div className="footer-logo-wrap">
              <span className="footer-logo-text">FUEG</span>
              <Flame size={25} fill="var(--orange)" color="var(--orange)" />
            </div>
            <p className="footer-mission">
              More than a store. A community documenting the sneaker culture
              across Nigeria. From the streets of Lagos to the world.
            </p>
          </div>

          {/* Nav & Socials */}
          <div className="footer-nav-groups">
            <div>
              <p className="footer-group-title mono">Navigation</p>
              <div className="footer-link-list">
                <a href="/catalogue" className="footer-link">
                  Archive
                </a>
              </div>
            </div>

            <div>
              <p className="footer-group-title mono">Connect</p>
              <div className="footer-social-icons">
                <a
                  href="https://www.instagram.com/fuego.heat"
                  className="footer-link"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="https://x.com/fuego_heatng"
                  className="footer-link"
                  aria-label="Twitter / X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@fuego_heatng"
                  className="footer-link"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.8.1V9.01a6.28 6.28 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 5.58 2.18v-3.4a4.85 4.85 0 0 1-3.77-1.2z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/message/MNPXIERXZVHPK1"
                  className="footer-link"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Specs & Copyright */}
        <div className="footer-bottom-row">
          <div className="footer-status">
            <span className="status-dot"></span>
            <p className="mono">Verified // NG-Ops Active</p>
          </div>

          <p className="footer-copyright uppercase">
            © {new Date().getFullYear()} FUEGO NIGERIA. BUILT FOR THE CULTURE.
          </p>
        </div>
      </div>
    </footer>
  );
}
