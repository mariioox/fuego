// src/pages/Home.tsx
import Hero from "../features/home/components/Hero";
import ShopIcons from "../features/home/components/ShopIcons";
import About from "../features/home/components/About";
// import Community from "../features/home/components/Community";
import Newsletter from "../features/home/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider">
        <ShopIcons />
      </div>
      <div className="section-divider">
        <About />
      </div>
      {/* <div className="section-divider">
        <Community />
      </div> */}
      <div className="section-divider">
        <Newsletter />
      </div>
    </>
  );
}
