import type { Sneaker } from "../types/sneaker";
import SneakerCard from "./SneakerCard";

interface Props {
  data: Sneaker[];
}

export default function ArchiveGrid({ data }: Props) {
  return (
    <div className="mb-12 grid grid-cols-2 gap-[14px] md:grid-cols-3 md:gap-[18px] xl:grid-cols-4">
      {data.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
