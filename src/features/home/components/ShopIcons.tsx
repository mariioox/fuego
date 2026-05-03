import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import University_red from "../../archive/data/assets/Nike SB Dunk Low University Red Gum - FJ1674-600.webp";
import Brick from "../../archive/data/assets/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick - HF4340-800.webp";
import Forest_green from "../../archive/data/assets/New Balance 9060 Team Forest Green - U9060VRA.webp";
import Riot from "../../archive/data/assets/Nike SB Dunk Low Riot Skateshop - FZ1289-200.webp";
import Timberland_grey from "../../archive/data/assets/Timberland 6 Waterproof Boot Ice Studios - TB0A44VY-EJR.webp";
import Speedcat_blue from "../../archive/data/assets/Puma Speedcat Archive Team Light Blue Club Navy - 398847-01.webp";

const ICONS = [
  {
    id: 1,
    name: "University Red Gum",
    tag: "Nike SB Dunk Low",
    img: University_red,
  },
  {
    id: 2,
    name: "Brick by Brick",
    tag: "Air Jordan 4 Retro OG",
    img: Brick,
  },
  {
    id: 3,
    name: "Team Forest Green",
    tag: "New Balance 9060 ",
    img: Forest_green,
  },
  {
    id: 4,
    name: "Riot Skateshop",
    tag: "Nike SB Dunk Low ",
    img: Riot,
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
      <div className="container">
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
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="nav-btn-circle"
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
      </div>
    </section>
  );
}
