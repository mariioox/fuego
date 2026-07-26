import type { Sneaker } from "./sneaker";

export type SneakerInput = Pick<Sneaker, "sku" | "name" | "brand" | "color" | "price"> &
  Partial<Pick<Sneaker, "status" | "description">>;
