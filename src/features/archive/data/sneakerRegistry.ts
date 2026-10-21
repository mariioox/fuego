import type { Sneaker } from "../types/sneaker";
import { formatNaira } from "../../../core/utils/format";
import { nikeSneakers } from "./sneakers/nike";
import { jordanSneakers } from "./sneakers/jordan";
import { adidasSneakers } from "./sneakers/adidas";
import { newBalanceSneakers } from "./sneakers/newbalance";
import { miscSneakers } from "./sneakers/misc";
import { pumaSneakers } from "./sneakers/puma";

/* STEP 1: DYNAMIC ASSET IMPORT */
const imageModules = import.meta.glob('./assets-cutout/*.webp', { 
  eager: true, 
  import: 'default' 
});

/* STEP 2: SKU MAPPING LOGIC */
const imageMap: Record<string, string> = {};

Object.entries(imageModules).forEach(([path, url]) => {
  const fileName = path.split('/').pop()?.replace('.webp', '') || '';
  // Extracts the string after the last " - "
  const sku = fileName.split(' - ').pop()?.trim() || '';
  
  if (sku) {
    imageMap[sku] = url as string;
  }
});

/* STEP 3: IMAGE LOOKUP HELPER */
const getSneakerImage = (sku: string) => imageMap[sku] || "/placeholder-shoe.webp";

/* STEP 2: MERGE & AUTOMATE REGISTRY */
const rawRegistry = [
  ...nikeSneakers,
  ...jordanSneakers,
  ...adidasSneakers,
  ...newBalanceSneakers,
  ...miscSneakers,
  ...pumaSneakers,
];

/* STEP 4: DATA REGISTRY */
export const SNEAKER_REGISTRY: Sneaker[] = rawRegistry.map((shoe, index) => ({
  id: index + 1,
  sku: shoe.sku!,
  name: shoe.name!,
  brand: shoe.brand!,
  color: shoe.color || [],
  status: shoe.status || 'AVAILABLE',
  availability: shoe.availability || 'PRE_ORDER',
  inHandSizes: shoe.inHandSizes,
  price: shoe.price || 0,
  priceFormatted: formatNaira(shoe.price || 0),
  image: getSneakerImage(shoe.sku!),
  description: shoe.description,
}));