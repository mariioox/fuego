// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./core/hooks/useTheme";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./core/components/ScrollToTop";
import CartDrawer from "./features/cart/components/CartDrawer";
import { CartProvider } from "./features/cart/context/CartContext";
import "./index.css";
// Page Imports
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <CartProvider>
      <Router>
        <div className="flicker-overlay"></div>
        <ScrollToTop />
        <MainLayout theme={theme} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
          </Routes>
        </MainLayout>
        <CartDrawer />
      </Router>
    </CartProvider>
  );
}
