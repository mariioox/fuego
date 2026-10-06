import Section from "../../../core/ui/Section";
import { Button } from "../../../core/ui/Button";

export default function About() {
  return (
    <Section className="bg-bg">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Left Column: Heading & Data */}
        <div>
          <span className="mb-6 inline-block bg-ink px-3 py-1 text-[0.7rem] font-black uppercase text-bg">
            Mission Archive // 001
          </span>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-black italic uppercase leading-[0.85] tracking-[-0.04em]">
            Drop <span className="text-brand">Heat</span>
            <br />
            Stay lit.
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-10 border-t border-edge pt-10">
            <div>
              <span className="block text-5xl font-black leading-none tracking-[-0.02em] text-brand">
                +234
              </span>
              <span className="mono mt-1 block text-[10px] font-black uppercase opacity-30">Region Code</span>
            </div>
            <div>
              <span className="block text-5xl font-black leading-none tracking-[-0.02em]">100%</span>
              <span className="mono mt-1 block text-[10px] font-black uppercase opacity-30">Street Verified</span>
            </div>
            <div>
              <span className="block text-5xl font-black leading-none tracking-[-0.02em]">NG</span>
              <span className="mono mt-1 block text-[10px] font-black uppercase opacity-30">HQ Location</span>
            </div>
            <div>
              <span className="block text-5xl font-black leading-none tracking-[-0.02em]">∞</span>
              <span className="mono mt-1 block text-[10px] font-black uppercase opacity-30">Community Driven</span>
            </div>
          </div>
        </div>

        {/* Right Column: Manifesto Content */}
        <div className="flex flex-col justify-end pb-2">
          <p className="mb-8 max-w-[480px] text-base leading-relaxed opacity-70">
            FUEGO was born out of a simple necessity: making sure the culture
            in Nigeria gets the respect it deserves. We’re an independent team
            of sneakerheads who know that a pair of shoes is never just a pair
            of shoes—it’s an identity. We don't answer to a corporate office;
            we answer to the people on the ground who know the difference
            between a trend and a classic.
          </p>
          <p className="mb-8 max-w-[480px] text-base leading-relaxed opacity-70">
            Our focus is on curation, not just volume. We spend our time
            hand-selecting every drop to ensure that what you see is what you
            actually want to wear. No fillers, no noise—just the heat that
            defines the local scene. If it’s on our shelf, it’s because we’ve
            verified the vibe and the quality ourselves. This isn't just a
            business; it’s our contribution to the growing sneaker community.
          </p>

          <div className="mt-6">
            <Button
              href="https://www.instagram.com/fuego.heat"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="rounded-full"
            >
              Join the Collective
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
