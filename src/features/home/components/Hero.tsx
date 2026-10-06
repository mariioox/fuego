import { useState, useEffect, useCallback, useRef } from "react";
import { useSound } from "../../../core/hooks/useSound";
import { Button } from "../../../core/ui/Button";
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
  const [leaving, setLeaving] = useState<number | null>(null);
  const playClick = useSound("/sounds/click.mp3");
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setLeaving(current);
    setCurrent(index);
    leaveTimer.current = setTimeout(() => setLeaving(null), 1200);
  }, [current]);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % SLIDES.length;
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      setLeaving(current);
      setCurrent(next);
      leaveTimer.current = setTimeout(() => setLeaving(null), 1200);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [current]);

  // Cleanup leave timer on unmount
  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  const handleHeroClick = () => {
    playClick(0.4);

    const overlay = document.getElementById("flicker-overlay");
    overlay?.classList.add("trigger-flicker");
    setTimeout(() => overlay?.classList.remove("trigger-flicker"), 300);
  };

  return (
    <section className="relative h-[91dvh] w-full overflow-hidden bg-black" aria-label="Hero slideshow">
      <div className="hero-top-nav absolute left-0 top-0 z-50 flex w-full gap-0.5">
        <div className="top-progress-track relative h-[1.5px] flex-1 cursor-progress bg-white/10">
          <div className="top-progress-fill absolute left-0 top-0 h-full w-0 animate-fill-progress bg-brand" key={current} />
        </div>
      </div>

      <div className="hero-bg-wrapper absolute inset-0 z-[1]">
        {leaving !== null && (
          <div className="hero-slide-bg absolute inset-0 z-[2] animate-hero-fade-out opacity-0" key={`leaving-${leaving}`}>
            <img src={SLIDES[leaving].img} alt="" className="hero-img h-full w-full scale-[1.2] object-cover brightness-[0.4]" />
          </div>
        )}
        <div className="hero-slide-bg absolute inset-0 animate-hero-fade-in opacity-0" key={`curr-${current}`}>
          <img
            src={SLIDES[current].img}
            alt=""
            className="hero-img h-full w-full animate-hero-zoom scale-[1.2] object-cover brightness-[0.4]"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hero-static-content pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center" aria-live="polite" aria-atomic="true">
        <div className="hero-content-box relative mx-auto flex w-[90%] max-w-[850px] flex-col items-center px-6 py-10 text-center pointer-events-auto md:p-16">
          <span
            key={SLIDES[current].id}
            className="hero-meta-animate block animate-meta-slide font-mono text-sm font-extrabold uppercase tracking-[0.2em] text-brand"
          >
            {SLIDES[current].meta}
          </span>

          <h1 className="my-8 text-[clamp(3rem,7vw,5rem)] font-black italic uppercase leading-[0.8] tracking-[-0.04em] text-[rgba(238,223,209,0.65)] max-md:my-4 max-md:text-[clamp(2.6rem,11vw,4rem)]">
            {SLIDES[current].title.map((line, i) => (
              <span key={i}>
                {line}
                {i < SLIDES[current].title.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <span
            key={`sub-${SLIDES[current].id}`}
            className="hero-desc-animate mx-auto mb-8 block max-w-[440px] animate-meta-slide-slow font-mono text-[19px] font-extrabold uppercase leading-[1.4] tracking-[0.05em] text-[rgb(236,226,217)] max-md:max-w-full max-md:text-sm"
          >
            {SLIDES[current].sub}
          </span>

          <Button
            href={SLIDES[current].link}
            target={SLIDES[current].link.startsWith("http") ? "_blank" : undefined}
            rel={SLIDES[current].link.startsWith("http") ? "noopener noreferrer" : undefined}
            size="lg"
            className="w-fit rounded-full text-[15px]"
            onClick={handleHeroClick}
          >
            {SLIDES[current].btnText}
          </Button>

          <div className="corner-br"></div>
        </div>
      </div>

      <div className="hero-controls absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 max-md:bottom-6">
        <button
          className="hero-nav-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 font-mono text-sm text-white/70 transition-colors hover:border-white/60 hover:bg-white/15 hover:text-white"
          aria-label="Previous slide"
          onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        >
          &#8592;
        </button>

        <div className="hero-dots flex gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              aria-current={index === current ? "true" : undefined}
              aria-label={`Go to slide ${index + 1}`}
              className={`hero-dot h-2 w-2 cursor-pointer rounded-full border border-white/40 bg-transparent p-0 transition-all hover:border-white/80 ${index === current ? "scale-[1.3] border-brand bg-brand" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button
          className="hero-nav-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 font-mono text-sm text-white/70 transition-colors hover:border-white/60 hover:bg-white/15 hover:text-white"
          aria-label="Next slide"
          onClick={() => goTo((current + 1) % SLIDES.length)}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}