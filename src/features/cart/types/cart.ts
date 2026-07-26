import type { Sneaker } from "../../archive/types/sneaker";

export type SneakerSize = number;

export type CartProduct = Pick<
  Sneaker,
  "id" | "sku" | "name" | "brand" | "price" | "priceFormatted" | "image"
>;

export interface CartItem extends CartProduct {
  quantity: number;
  size: SneakerSize;
}
