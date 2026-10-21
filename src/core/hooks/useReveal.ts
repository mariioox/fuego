import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

/**
 * Reveal-on-scroll helper. Returns a ref to attach and a `shown` flag that
 * flips to true the first time the element enters the viewport.
 *
 * Under `prefers-reduced-motion: reduce` (or when IntersectionObserver is
 * unavailable) the content is shown immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(() => {
    if (typeof IntersectionObserver === "undefined") return true;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return [ref, shown];
}

/** Inline style pair that fades and lifts an element into place. */
export function revealStyle(shown: boolean, delay = 0): CSSProperties {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.8s var(--ease-soft) ${delay}ms, transform 0.8s var(--ease-soft) ${delay}ms`,
  };
}
