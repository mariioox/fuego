import { Flame, Instagram, MessageCircle } from "lucide-react";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--bg)",
        borderBottom: "var(--border)",
        height: "65px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontWeight: 900, fontSize: "1.4rem", fontStyle: "italic" }}
          >
            FUEG
          </span>
          <Flame size={24} fill="var(--orange)" color="var(--orange)" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <a href="#" style={{ color: "inherit" }}>
            <Instagram size={20} />
          </a>
          <a href="#" style={{ color: "inherit" }}>
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
