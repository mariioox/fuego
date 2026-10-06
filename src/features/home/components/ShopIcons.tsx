import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../../core/ui/Container";
import "../styles/ShopIcons.css";
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
    <section className="shop-section">
      <Container>
        <div className="mb-10">
          {/* Main Row */}
          <div className="shop-header-top">
            <h2 className="shop-header-title">
              Shop Our <span className="about-highlight">Icons</span>
            </h2>

            <div className="shop-nav-group">
              <button
                onClick={() => handleScroll("left")}
                className="nav-btn-circle"
                aria-label="Scroll icons left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="nav-btn-circle"
                aria-label="Scroll icons right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Independent Link Row */}
          <div>
            <Link to="/catalogue" className="shop-sublink">
              View Full Archive // →
            </Link>
          </div>
        </div>

        {/* Carousel Row */}
        <div ref={scrollRef} className="shop-carousel-container no-scrollbar">
          {ICONS.map((icon) => (
            <div key={icon.id} className="icon-item-card">
              <div className="icon-image-container">
                <img src={icon.img} alt={icon.name} />
              </div>
              <div className="text-center mt-5">
                <h3 className="text-[13px] font-black uppercase tracking-tight">
                  {icon.name}
                </h3>
                <p className="mono text-[10px] opacity-40 uppercase font-bold mt-1">
                  {icon.tag}
                </p>
              </div>
            </div>
          ))}

          <Link to="/catalogue" className="view-all-card">
            <ArrowRight size={32} className="text-[var(--orange)]" />
            <span className="mono text-[11px] font-black uppercase tracking-widest">
              Explore Archive
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
