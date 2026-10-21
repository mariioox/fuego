import { MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Section from "../../../core/ui/Section";
import { Button } from "../../../core/ui/Button";

export default function About() {
  return (
    <Section className="bg-bg">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Left Column: Heading & Data */}
        <div>
          <span className="mb-6 inline-block rounded-full bg-ink px-4 py-1.5 text-[0.7rem] font-semibold text-bg">
            Lagos, Nigeria
          </span>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1] tracking-[-0.04em]">
            Drop <span className="text-brand">heat</span>.
            <br />
            Stay lit.
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-10 border-t border-edge pt-10">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ShieldCheck size={22} />
              </span>
              <span className="mt-4 block text-[15px] font-semibold">
                Verified authentic
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-ink/50">
                Every pair checked by hand before it ships.
              </span>
            </div>
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Truck size={22} />
              </span>
              <span className="mt-4 block text-[15px] font-semibold">
                Nationwide delivery
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-ink/50">
                Lagos to every corner of the country.
              </span>
            </div>
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MessageCircle size={22} />
              </span>
              <span className="mt-4 block text-[15px] font-semibold">
                Order in a chat
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-ink/50">
                WhatsApp us, no forms or friction.
              </span>
            </div>
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Sparkles size={22} />
              </span>
              <span className="mt-4 block text-[15px] font-semibold">
                Curated, not crowded
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-ink/50">
                A tight archive, edited by people who care.
              </span>
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
              Join the community
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
