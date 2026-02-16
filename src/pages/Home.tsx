import Hero from "../components/Hero";
import ShopIcons from "../components/ShopIcons";
import About from "../components/About";
import Community from "../components/Community";

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

      <div className="section-divider">
        <Community />
      </div>
    </>
  );
}
