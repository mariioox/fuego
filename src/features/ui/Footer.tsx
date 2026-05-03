import { Flame, Instagram, MessageCircle } from "lucide-react";

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
                <a href="#" className="footer-link">
                  Archive
                </a>
                <a href="#" className="footer-link">
                  The Hunt
                </a>
                <a href="#" className="footer-link">
                  Sourcing
                </a>
              </div>
            </div>

            <div>
              <p className="footer-group-title mono">Connect</p>
              <div className="footer-social-icons">
                <a
                  href="https://wa.me/message/MNPXIERXZVHPK1"
                  className="footer-link"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={22} />
                </a>
                <a
                  href="https://www.instagram.com/fuego.heat"
                  className="footer-link"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
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

          <div className="footer-legal">
            <a href="#" className="footer-link mono">
              Terms
            </a>
            <a href="#" className="footer-link mono">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
