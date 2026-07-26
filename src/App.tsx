// src/App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTheme } from "./core/hooks/useTheme";
import ErrorBoundary from "./core/components/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./core/components/ScrollToTop";
import CartDrawer from "./features/cart/components/CartDrawer";
import { CartProvider } from "./features/cart/context/CartContext";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const Catalogue = lazy(() => import("./pages/Catalogue"));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ErrorBoundary>
    <HelmetProvider>
      <CartProvider>
        <Router>
          <div className="flicker-overlay"></div>
          <ScrollToTop />
          <MainLayout theme={theme} toggleTheme={toggleTheme}>
            <Suspense>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
              </Routes>
            </Suspense>
          </MainLayout>
          <CartDrawer />
        </Router>
      </CartProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
}
