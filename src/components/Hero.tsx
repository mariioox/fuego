import { useState, useEffect } from "react";

const SLIDES = [
  {
    id: 1,
    label: "Nationwide Movement",
    title: "THE HUNT FOR\nREAL HEAT.",
    cta: "Join the Community",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070",
  },
  {
    id: 2,
    label: "Weekend Special",
    title: "GIVEAWAY:\nAIR JORDAN 4",
    cta: "Enter Now",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200",
  },
  {
    id: 3,
    label: "Community Curated",
    title: "VINTAGE DUNK\nARCHIVE.",
    cta: "Explore Archive",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{ height: "90vh", position: "relative", overflow: "hidden" }}
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.2)",
              zIndex: 1,
            }}
          />

          <img
            src={slide.image}
            alt={slide.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <div
            className="container"
            style={{
              position: "absolute",
              zIndex: 2,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "var(--orange)",
                fontWeight: 900,
                textTransform: "uppercase",
                marginBottom: "1rem",
                letterSpacing: "2px",
              }}
            >
              {slide.label}
            </p>
            <h1
              className="h1-bold"
              style={{ color: "white", whiteSpace: "pre-line" }}
            >
              {slide.title}
            </h1>
            <button
              style={{
                marginTop: "2rem",
                background: "white",
                color: "black",
                border: "none",
                padding: "1rem 2.5rem",
                fontWeight: 900,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 3,
        }}
      >
        {SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              width: "40px",
              height: "2px",
              background: i === current ? "white" : "rgba(255,255,255,0.3)",
              transition: "0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
