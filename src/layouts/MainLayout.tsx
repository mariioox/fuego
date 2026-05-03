import type { ReactNode } from "react";
import Navbar from "../features/ui/Navbar";
import Footer from "../features/ui/Footer";

interface Props {
  children: ReactNode;
  theme: string;
  toggleTheme: () => void;
}

export default function MainLayout({ children, theme, toggleTheme }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">{children}</main>
      <div className="section-divider">
        <Footer />
      </div>
    </div>
  );
}
