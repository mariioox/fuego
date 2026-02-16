export default function Lookbook() {
  return (
    <section className="lookbook-section">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black mono opacity-40 uppercase tracking-widest">
            Visual Archive // 2024
          </h2>
          <span className="text-[10px] font-bold underline cursor-pointer hover:text-[var(--orange)]">
            VIEW FULL LOOKBOOK
          </span>
        </div>

        {/* The Grid */}
        <div className="lookbook-grid">
          {/* Main Large Image */}
          <div className="lookbook-item item-big">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800"
              alt="Street Vibe"
              className="lookbook-img"
            />
            <div className="lookbook-overlay">
              <span className="lookbook-text">Lagos Island / 04:00 PM</span>
            </div>
          </div>

          {/* Smaller Supporting Images */}
          <div className="lookbook-item">
            <img
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400"
              alt="Detail"
              className="lookbook-img"
            />
          </div>

          <div className="lookbook-item">
            <img
              src="https://images.unsplash.com/photo-1597044003301-2cd48dbffae5?w=400"
              alt="Footwear"
              className="lookbook-img"
            />
            <div className="lookbook-overlay">
              <span className="lookbook-text">Verified Heat</span>
            </div>
          </div>

          <div
            className="lookbook-item item-wide"
            style={{ gridColumn: "span 2" }}
          >
            <div className="w-full h-full flex items-center justify-center p-8 bg-[var(--orange)] text-white">
              <h3 className="text-2xl font-black italic uppercase leading-none text-center">
                Quality <br /> Over <br /> Labels.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
