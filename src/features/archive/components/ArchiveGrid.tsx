import type { Sneaker } from "../types/sneaker";
import SneakerCard from "./SneakerCard";

interface Props {
  data: Sneaker[];
  startDelay?: number;
  stagger?: number;
}

export default function ArchiveGrid({
  data,
  startDelay = 280,
  stagger = 60,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-[repeat(auto-fill,minmax(max(160px,calc((100%_-_60px)/4)),1fr))]">
      {data.map((sneaker, index) => (
        <SneakerCard
          key={sneaker.id}
          sneaker={sneaker}
          delay={startDelay + Math.min(index, 12) * stagger}
        />
      ))}
    </div>
  );
}
