export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Heading & Data */}
          <div>
            <span className="fuego-tag">Mission Archive // 001</span>
            <h2 className="about-title">
              Drop <span className="about-highlight">Heat</span>
              <br />
              Stay lit.
            </h2>

            <div className="data-sheet">
              <div className="data-item">
                <span className="data-point-value text-[var(--orange)]">
                  +234
                </span>
                <span className="data-point-label mono">Region Code</span>
              </div>
              <div className="data-item">
                <span className="data-point-value">100%</span>
                <span className="data-point-label mono">Street Verified</span>
              </div>
              <div className="data-item">
                <span className="data-point-value">NG</span>
                <span className="data-point-label mono">HQ Location</span>
              </div>
              <div className="data-item">
                <span className="data-point-value">∞</span>
                <span className="data-point-label mono">Community Driven</span>
              </div>
            </div>
          </div>

          {/* Right Column: Manifesto Content */}
          <div className="flex flex-col justify-end pb-2">
            <p className="manifesto-body">
              FUEGO was born out of a simple necessity: making sure the culture
              in Nigeria gets the respect it deserves. We’re an independent team
              of sneakerheads who know that a pair of shoes is never just a pair
              of shoes—it’s an identity. We don't answer to a corporate office;
              we answer to the people on the ground who know the difference
              between a trend and a classic.
            </p>
            <p className="manifesto-body">
              Our focus is on curation, not just volume. We spend our time
              hand-selecting every drop to ensure that what you see is what you
              actually want to wear. No fillers, no noise—just the heat that
              defines the local scene. If it’s on our shelf, it’s because we’ve
              verified the vibe and the quality ourselves. This isn't just a
              business; it’s our contribution to the growing sneaker community.
            </p>

            <div className="mt-6">
              <button className="btn-main">Join the Collective</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
