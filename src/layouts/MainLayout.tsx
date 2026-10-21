import type { ReactNode } from "react";
import Navbar from "../features/ui/Navbar";
import Footer from "../features/ui/Footer";
import MobileCatalogueButton from "../features/ui/MobileCatalogueButton";

interface Props {
  children: ReactNode;
  theme: string;
  toggleTheme: () => void;
}

export default function MainLayout({ children, theme, toggleTheme }: Props) {
  return (
    <div className="relative isolate flex min-h-screen flex-col max-md:pb-0">
      <a
        href="#main-content"
        className="absolute left-0 -top-full z-10001 rounded-control bg-ink px-6 py-3 text-sm font-semibold text-bg no-underline focus:top-0"
      >
        Skip to content
      </a>

      <div className="sticky top-0 z-60 pt-3">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </div>

      <main id="main-content" className="grow">
        {children}
      </main>

      <MobileCatalogueButton />
      <Footer />
    </div>
  );
}
