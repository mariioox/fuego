import { Flame, Instagram, MessageCircle } from "lucide-react";
import Container from "../../core/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-bg pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
      <Container>
        {/* Top Row: Brand & Mission */}
        <div className="mb-8 flex flex-wrap justify-between gap-12">
          <div className="footer-brand-sec">
            <div className="flex items-center">
              <span className="text-[1.5rem] font-black italic">FUEG</span>
              <Flame size={25} fill="var(--orange)" color="var(--orange)" />
            </div>
            <p className="mt-4 max-w-[350px] text-sm leading-relaxed opacity-60">
              More than a store. A community documenting the sneaker culture
              across Nigeria. From the streets of Lagos to the world.
            </p>
          </div>

          {/* Nav & Socials */}
          <div className="flex gap-16">
            <div>
              <p className="mono">Navigation</p>
              <div className="mt-4 flex flex-col gap-2">
                <a href="/catalogue" className="text-[0.6rem] font-bold uppercase text-inherit no-underline transition-colors duration-200 hover:text-brand">
                  Archive
                </a>
              </div>
            </div>

            <div>
              <p className="mono">Connect</p>
              <div className="mt-4 flex items-center justify-around">
                <a
                  href="https://www.instagram.com/fuego.heat"
                  className="text-[0.6rem] font-bold uppercase text-inherit no-underline transition-colors duration-200 hover:text-brand"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="https://x.com/fuego_heatng"
                  className="text-[0.6rem] font-bold uppercase text-inherit no-underline transition-colors duration-200 hover:text-brand"
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
                  className="text-[0.6rem] font-bold uppercase text-inherit no-underline transition-colors duration-200 hover:text-brand"
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
                  className="text-[0.6rem] font-bold uppercase text-inherit no-underline transition-colors duration-200 hover:text-brand"
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
        <div className="flex items-center justify-between border-t border-edge pt-6 text-[0.55rem] opacity-60">
          <div className="flex items-center gap-[5px]">
            <span className="mr-2 block h-2 w-2 rounded-full bg-[#1ff56d] shadow-[0_0_10px_rgba(40,223,107,0.76)]"></span>
            <p className="mono">Verified // NG-Ops Active</p>
          </div>

          <p className="uppercase">
            © {new Date().getFullYear()} FUEGO NIGERIA. BUILT FOR THE CULTURE.
          </p>
        </div>
      </Container>
    </footer>
  );
}
