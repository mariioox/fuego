import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ICONS = [
  {
    id: 1,
    name: "Air Max",
    tag: "Lagos Classic",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    id: 2,
    name: "Jordan 1",
    tag: "The Grail",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
  },
  {
    id: 3,
    name: "Dunk Low",
    tag: "Street King",
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
  },
  {
    id: 4,
    name: "NB 9060",
    tag: "New Wave",
    img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400",
  },
  {
    id: 5,
    name: "Vans Old",
    tag: "Daily 234",
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
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
