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
    sub: "SUBSCRIBE TO THE NEWSLETTER TO WIN A NEW NIKE AF1.",
    img: heroSix,
    btnText: "SUBSCRIBE",
    link: "/#newsletter",
  },
  {
    id: "002",
    meta: "STOCK_UPDATE",
    title: "CURATED <br/> ARCHIVE.",
    sub: "CHECK OUT OUR UPDATED COLLECTION.",
    img: heroThree,
    btnText: "View Collection",
    link: "/catalogue",
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
    }, 10000); // 10 seconds gives people time to read the giveaway text
    return () => clearInterval(timer);
  }, []);

  const handleHeroClick = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;
    audio.play();

    document.body.classList.add("trigger-flicker");
    setTimeout(() => document.body.classList.remove("trigger-flicker"), 300);
  };

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
            <button className="btn-main w-fit" onClick={handleHeroClick}>
              {SLIDES[current].btnText}
            </button>
          </a>

          <div className="corner-br"></div>
        </div>
      </div>
    </section>
  );
}
