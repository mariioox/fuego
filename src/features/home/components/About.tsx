import { ArrowRight } from "lucide-react";
import Section from "../../../core/ui/Section";
import { revealStyle, useReveal } from "../../../core/hooks/useReveal";

const INSTAGRAM_URL = "https://www.instagram.com/fuego.heat";

export default function About() {
  const [imageRef, imageShown] = useReveal<HTMLDivElement>();
  const [textRef, textShown] = useReveal<HTMLDivElement>();

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-[clamp(20px,5vw,72px)]">
        <div
          ref={imageRef}
          style={revealStyle(imageShown)}
          className="flex-1 basis-[380px]"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-surface bg-tile">
            <img
              src="/curated.jpeg"
              alt="The Fuego team curating sneakers in Lagos"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div
          ref={textRef}
          style={revealStyle(textShown, 140)}
          className="flex flex-1 basis-[320px] flex-col items-start gap-4 sm:basis-[380px] sm:gap-5"
        >
          <span className="text-[13px] text-muted">About Fuego</span>
          <h2 className="font-display text-[clamp(30px,6vw,60px)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Curated,
            <br />
            not crowded.
          </h2>
          <p className="max-w-[460px] text-[16px] leading-[1.55] text-muted sm:text-[17px]">
            We&apos;re an independent team of sneakerheads in Lagos. We hand-pick
            every pair, check it ourselves, and only list what we&apos;d wear.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-control border border-line bg-card px-5 text-[14px] font-medium text-ink no-underline transition-colors duration-300 ease-soft hover:border-text"
          >
            Follow on Instagram
            <ArrowRight
              size={15}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </Section>
  );
}
