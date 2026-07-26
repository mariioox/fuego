import { useState, useEffect, useCallback } from "react";
import { useSound } from "../../../core/hooks/useSound";
import "../styles/Hero.css";
import heroThree from "../../../assets/Hero3.jpeg";
import heroSix from "../../../assets/Hero6.jpeg";
import heroOne from "../../../assets/Hero1.jpeg";

const SLIDES = [
  {
    id: "001",
    meta: "RAFFLE_ACTIVE // GIVEAWAY",
    title: ["WIN THE", "ICON."],
    sub: "SUBSCRIBE TO THE NEWSLETTER TO WIN A NEW NIKE AF1.",
    img: heroSix,
    btnText: "SUBSCRIBE",
    link: "/#newsletter",
  },
  {
    id: "002",
    meta: "STOCK_UPDATE",
    title: ["CURATED", "ARCHIVE."],
    sub: "CHECK OUT OUR UPDATED COLLECTION.",
    img: heroThree,
    btnText: "View Collection",
    link: "/catalogue",
  },
  {
    id: "003",
    meta: "COMMUNITY // CONNECT",
    title: ["JOIN THE", "CIRCLE."],
    sub: "Follow us for early access drops and private community events.",
    img: heroOne,
    btnText: "Follow Instagram",
    link: "https://www.instagram.com/fuego.heat",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const playClick = useSound("/sounds/click.mp3");

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [current]);

  const handleHeroClick = () => {
    playClick(0.4);

    document.body.classList.add("trigger-flicker");
    setTimeout(() => document.body.classList.remove("trigger-flicker"), 300);
  };

  return (
    <section className="hero-section" aria-label="Hero slideshow">
      {/* 1. TOP PROGRESS NAVIGATION */}
      <div className="hero-top-nav">
        <div className="top-progress-track">
          <div className="top-progress-fill" key={current} />
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
      <div className="hero-static-content" aria-live="polite" aria-atomic="true">
        <div className="hero-content-box">
          <span
            key={SLIDES[current].id}
            className="hero-meta hero-meta-animate"
          >
            {SLIDES[current].meta}
          </span>

          <h1 className="hero-title">
            {SLIDES[current].title.map((line, i) => (
              <span key={i}>
                {line}
                {i < SLIDES[current].title.length - 1 && <br />}
              </span>
            ))}
          </h1>

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

      {/* 4. SLIDE CONTROLS */}
      <div className="hero-controls">
        <button
          className="hero-nav-btn"
          aria-label="Previous slide"
          onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        >
          &#8592;
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slides">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              className={`hero-dot ${index === current ? "active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button
          className="hero-nav-btn"
          aria-label="Next slide"
          onClick={() => goTo((current + 1) % SLIDES.length)}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
