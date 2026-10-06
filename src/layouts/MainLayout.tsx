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
    <div className="min-h-screen flex flex-col pb-[72px] md:pb-0">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" className="flex-grow">{children}</main>
      <MobileCatalogueButton />
      <div className="border-t border-edge">
        <Footer />
      </div>
    </div>
  );
}
