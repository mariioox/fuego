import { useState, useEffect } from "react";
import "../styles/Hero.css";
// Import your assets here
import heroThree from "../../../assets/Hero3.jpeg";
import heroSix from "../../../assets/Hero6.jpeg";
import heroOne from "../../../assets/Hero1.jpeg";

const SLIDES = [
  {
    id: "001",
    meta: "RAFFLE_ACTIVE // GIVEAWAY",
    title: "WIN THE <br/> ICON.",
    sub: "Buy any pair this month for a chance to win a new Nike AF1.",
    img: heroSix,
    btnText: "Shop to Enter",
    link: "/catalogue",
  },
  {
    id: "002",
    meta: "STOCK_UPDATE // Q1_26",
    title: "CURATED <br/> ARCHIVE.",
    sub: "Send a picture of a shoe in our collection to the link below to buy and be qualified to join the giveaway.",
    img: heroThree,
    btnText: "View Collection",
    link: "https://wa.me/message/MNPXIERXZVHPK1",
  },
  {
    id: "003",
    meta: "COMMUNITY // CONNECT",
    title: "JOIN THE <br/> CIRCLE.",
    sub: "Follow us for early access drops and private community events.",
    img: heroOne,
    btnText: "Follow Instagram",
    link: "https://www.instagram.com/fuego.heat",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 10000); // 8 seconds gives people time to read the giveaway text
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* 1. TOP PROGRESS NAVIGATION */}
      <div className="hero-top-nav">
        <div className="top-progress-track">
          <div className="top-progress-fill" />
        </div>
      </div>

      {/* 2. BACKGROUND CROSS-FADE */}
      <div className="hero-bg-wrapper">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide-bg ${index === current ? "active" : ""}`}
          >
            <img src={slide.img} alt="" className="hero-img" />
          </div>
        ))}
      </div>

      {/* 3. STATIC CONTENT */}
      <div className="hero-static-content">
        <div className="hero-content-box">
          {/* Metadata (System Style) */}
          <span
            key={SLIDES[current].id}
            className="hero-meta hero-meta-animate"
          >
            {SLIDES[current].meta}
          </span>

          {/* Title (The Message) */}
          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: SLIDES[current].title }}
          />

          {/* NEW: Subtext / Description */}
          <span
            key={`sub-${SLIDES[current].id}`}
            className="hero-description hero-desc-animate"
          >
            {SLIDES[current].sub}
          </span>

          <a
            href={SLIDES[current].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-main w-fit">
              {SLIDES[current].btnText}
            </button>
          </a>

          <div className="corner-br"></div>
        </div>
      </div>
    </section>
  );
}
