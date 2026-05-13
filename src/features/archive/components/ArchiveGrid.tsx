import type { Sneaker } from "../types/sneaker";
import SneakerCard from "./SneakerCard";
import "../styles/ArchiveGrid.css";

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
