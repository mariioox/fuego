// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./core/hooks/useTheme";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./core/components/ScrollToTop";
import "./index.css";
// Page Imports
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="flicker-overlay"></div>
      <ScrollToTop />
      <MainLayout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
