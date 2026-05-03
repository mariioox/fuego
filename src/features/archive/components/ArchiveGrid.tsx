// src/features/archive/components/ArchiveGrid.tsx
import type { Sneaker } from "../types/sneaker";
import SneakerCard from "./SneakerCard";

interface Props {
  data: Sneaker[];
}

export default function ArchiveGrid({ data }: Props) {
  return (
    <div className="archive-grid">
      {data.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
