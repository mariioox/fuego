// src/features/archive/data/sneakerRegistry.ts
import type { Sneaker } from '../types';

export const SNEAKER_REGISTRY: Sneaker[] = [
  {
    id: 1,
    sku: "DZ5485-612",
    name: "AJ1 Retro High 'Chicago'",
    brand: "JORDAN",
    color: ["RED", "WHITE","BLACK"],
    price: 450000,
    priceFormatted: "₦450,000",
    tag: "HOT",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    sku: "CW2288-111",
    name: "Air Force 1 '07 White",
    brand: "NIKE",
    color: ["WHITE"],
    price: 120000,
    priceFormatted: "₦120,000",
    tag: "CLASSIC",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
  },
  // Add more here...
];
