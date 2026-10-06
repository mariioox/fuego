import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../../../core/ui/Section";
import SectionHeader from "../../../core/ui/SectionHeader";
import LV_TIMB_black from "../../archive/data/assets/Louis Vuitton Timberland 6 Ankle Boot Wheat Monogram - 1AD72X.webp";
import Speedcat_BW from "../../archive/data/assets/Puma Speedcat OG Black White - 398846-01.webp";
import Forest_green from "../../archive/data/assets/New Balance 9060 Team Forest Green - U9060VRA.webp";
import Rammellzee from "../../archive/data/assets/Nike SB Dunk High Supreme Rammellzee - FD8779-100.webp";
import Timberland_grey from "../../archive/data/assets/Timberland 6 Waterproof Boot Ice Studios - TB0A44VY-EJR.webp";
import Speedcat_blue from "../../archive/data/assets/Puma Speedcat Archive Team Light Blue Club Navy - 398847-01.webp";
import comme from "../../archive/data/assets/Adidas Samba x Comme des Garçons Play White_Pink - 01ASCGPWP.webp";

const ICONS = [
  {
    id: 1,
    name: "Louis Vuitton x Timberland",
    tag: "Timberland",
    img: LV_TIMB_black,
  },
  {
    id: 2,
    name: "Speedcat B&W",
    tag: "PUMA",
    img: Speedcat_BW,
  },
  {
    id: 3,
    name: "Team Forest Green",
    tag: "New Balance 9060 ",
    img: Forest_green,
  },
  {
    id: 4,
    name: "Supreme Rammellzee",
    tag: "Nike SB Dunk High",
    img: Rammellzee,
  },
  {
    id: 5,
    name: "Timberland Grey",
    tag: "Timberland",
    img: Timberland_grey,
  },
  {
    id: 6,
    name: "Speedcat Blue",
    tag: "Puma",
    img: Speedcat_blue,
  },
  {
    id: 7,
    name: "Comme des Garçons",
    tag: "Adidas",
    img: comme,
  },
];

export default function ShopIcons() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <Section>
      <div className="mb-10">
        <SectionHeader
          title={
            <>
              Shop Our <span className="text-brand">Icons</span>
            </>
          }
          action={
            <div className="flex gap-3">
              <button
                onClick={() => handleScroll("left")}
                className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink bg-transparent text-ink transition-all duration-300 hover:border-brand hover:text-brand"
                aria-label="Scroll icons left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink bg-transparent text-ink transition-all duration-300 hover:border-brand hover:text-brand"
                aria-label="Scroll icons right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          }
        />

        {/* Independent Link Row */}
        <Link
          to="/catalogue"
          className="w-fit border-b border-current font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-inherit opacity-40 no-underline transition-opacity duration-500 hover:text-brand hover:opacity-100"
        >
          View Full Archive // →
        </Link>
      </div>

      {/* Carousel Row */}
      <div ref={scrollRef} className="no-scrollbar mt-5 flex gap-[30px] overflow-x-auto pb-8 snap-x snap-mandatory">
        {ICONS.map((icon) => (
          <div key={icon.id} className="group flex min-w-[250px] flex-shrink-0 flex-col self-stretch snap-start">
            <div className="mb-2.5 mt-2.5 aspect-square w-[280px] overflow-hidden rounded-[15px] border border-edge bg-card">
              <img
                src={icon.img}
                alt={icon.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </div>
            <div className="mt-5 text-center">
              <h3 className="text-[13px] font-black uppercase tracking-tight">
                {icon.name}
              </h3>
              <p className="mono mt-1 text-[10px] font-bold uppercase opacity-40">
                {icon.tag}
              </p>
            </div>
          </div>
        ))}

        <Link
          to="/catalogue"
          className="flex h-[280px] min-w-[280px] flex-shrink-0 flex-col items-center justify-center gap-3 rounded-[15px] border-2 border-dashed border-edge text-inherit no-underline transition-all duration-500 hover:border-brand hover:bg-brand/5"
        >
          <ArrowRight size={32} className="text-brand" />
          <span className="mono text-[11px] font-black uppercase tracking-widest">
            Explore Archive
          </span>
        </Link>
      </div>
    </Section>
  );
}
