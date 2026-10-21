import { MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { revealStyle, useReveal } from "../../../core/hooks/useReveal";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified authentic",
    text: "Every pair is checked by hand before it ships.",
  },
  {
    icon: Truck,
    title: "Delivered nationwide",
    text: "From Lagos to anywhere in Nigeria.",
  },
  {
    icon: MessageCircle,
    title: "Order in a chat",
    text: "Size help and orders on WhatsApp.",
  },
];

function TrustCard({
  item,
  delay,
}: {
  item: (typeof TRUST_ITEMS)[number];
  delay: number;
}) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      style={revealStyle(shown, delay)}
      className="flex items-start gap-4 rounded-surface border border-line bg-card p-6"
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chip text-ink">
        <Icon size={20} strokeWidth={1.6} />
      </span>
      <span>
        <span className="block text-[15px] font-semibold text-ink">
          {item.title}
        </span>
        <span className="mt-1 block text-[14px] leading-[1.5] text-muted">
          {item.text}
        </span>
      </span>
    </div>
  );
}

export default function TrustCards() {
  return (
    <section
      className="mx-auto w-full max-w-[1240px] px-[clamp(16px,3vw,32px)] pb-[clamp(48px,6vw,96px)]"
      aria-label="Why shop with Fuego"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        {TRUST_ITEMS.map((item, index) => (
          <TrustCard key={item.title} item={item} delay={index * 90} />
        ))}
      </div>
    </section>
  );
}
