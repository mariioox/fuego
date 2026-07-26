import { Instagram } from "lucide-react";
import "../styles/Community.css";

export default function Community() {
  return (
    <section className="community-section">
      <div className="container">
        {/* Re-Styled Header */}
        <div className="flex justify-between items-start">
          <div className="comm-header-group">
            <h2 className="comm-title">
              ON <br /> GROUND
            </h2>
            <div className="comm-sub-wrap">
              <span className="comm-orange-line"></span>
              <p className="mono text-[10px] font-black tracking-[0.2em] opacity-40">
                Community Fit-Check // @fuego.heat
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/fuego.heat"
            target="_blank"
            rel="noopener noreferrer"
            className="comm-tag-link"
          >
            <span className="opacity-40">Submission:</span>
            <span>TAG US TO BE FEATURED</span>
            <Instagram size={14} className="text-[var(--orange)]" />
          </a>
        </div>

        {/* The Grid */}
        <div className="community-grid">
          {/* Big Fit Pic */}
          <div className="community-item community-hero">
            <img
              src="https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?w=800"
              alt="Community Fit"
              className="community-img"
            />
            <span className="community-label">@user_01 / Lagos</span>
          </div>

          <div className="community-item">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400"
              alt="Sneaker community verified heat"
              className="community-img"
            />
            <span className="community-label">Verified Heat</span>
          </div>

          <div className="community-item">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
              alt="Lagos sneaker archive collection"
              className="community-img"
            />
            <span className="community-label">Lagos Archive</span>
          </div>

          <div className="community-item">
            <img
              src="https://images.unsplash.com/photo-1512675845772-b962317738aa?w=400"
              alt="Sneaker culture vibe check"
              className="community-img"
            />
            <span className="community-label">@vibe_check</span>
          </div>

          <div className="community-item">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
              alt="Select sneaker series collection"
              className="community-img"
            />
            <span className="community-label">Select Series</span>
          </div>
        </div>
      </div>
    </section>
  );
}
