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
      className="flex items-start gap-3 rounded-surface border border-line bg-card p-4 sm:gap-4 sm:p-6"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chip text-ink sm:h-11 sm:w-11">
        <Icon size={20} strokeWidth={1.6} />
      </span>
      <span>
        <span className="block text-[14px] font-semibold text-ink sm:text-[15px]">
          {item.title}
        </span>
        <span className="mt-1 block text-[13px] leading-[1.5] text-muted sm:text-[14px]">
          {item.text}
        </span>
      </span>
    </div>
  );
}

export default function TrustCards() {
  return (
    <section
      className="mx-auto w-full max-w-[1240px] px-[clamp(14px,3vw,32px)] pb-[clamp(32px,6vw,96px)]"
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
