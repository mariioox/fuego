import type { Sneaker } from "../types";

/**
 * STEP 1: DYNAMIC ASSET IMPORT
 * Vite scans the assets folder. 'eager: true' ensures the images 
 * are bundled immediately for the grid.
 */
const imageModules = import.meta.glob('./assets/*.webp', { 
  eager: true, 
  import: 'default' 
});

/**
 * STEP 2: SKU MAPPING LOGIC
 * We process the file paths to extract the SKU from your naming convention:
 * "Nike SB Dunk Low University Red Gum - FJ1674-600.webp" -> "FJ1674-600"
 */
const imageMap: Record<string, string> = {};

Object.entries(imageModules).forEach(([path, url]) => {
  const fileName = path.split('/').pop()?.replace('.webp', '') || '';
  // Extracts the string after the last " - "
  const sku = fileName.split(' - ').pop()?.trim() || '';
  
  if (sku) {
    imageMap[sku] = url as string;
  }
});

/**
 * STEP 3: IMAGE LOOKUP HELPER
 */
const getSneakerImage = (sku: string) => imageMap[sku] || "/placeholder-shoe.webp";

/**
 * STEP 4: DATA REGISTRY
 */
export const SNEAKER_REGISTRY: Sneaker[] = [
  {
    id: 1,
    sku: "FJ1674-600",
    name: "Nike SB Dunk Low 'University Red Gum'",
    brand: "NIKE",
    color: ["RED", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FJ1674-600"),
  },{
    id: 3,
    sku: "IF8768",
    name: "adidas Campus 00s Core Black White",
    brand: "ADIDAS",
    color: ["BLACK", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("IF8768"),
  },{
    id: 4,
    sku: "HF4340-800",
    name: "Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick",
    brand: "JORDAN",
    color: ["RED", "WHITE"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("HF4340-800"),
  },{
    id: 5,
    sku: "1202A056-111",
    name: "ASICS Gel-Kayano 14 White Dark Grape ",
    brand: "ASICS",
    color: ["BLACK", "WHITE", "PURPLE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("1202A056-111"),
  },{
    id: 6,
    sku: "1202A056-109",
    name: "ASICS Gel-Kayano 14 White Midnight",
    brand: "ASICS",
    color: ["BLACK", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("1202A056-109"),
  },{
    id: 7,
    sku: "DH6927-111",
    name: "Jordan 4 Retro Military Black",
    brand: "JORDAN",
    color: ["BLACK", "WHITE", "GREY"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("DH6927-111"),
  },{
    id: 8,
    sku: "FV5029-100",
    name: "Jordan 4 Retro White Cement",
    brand: "JORDAN",
    color: ["GREY", "WHITE", "BLACK"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("FV5029-100"),
  },{
    id: 9,
    sku: "HF3975-001",
    name: "Jordan 5 Retro OG Black Metallic Reimagined",
    brand: "JORDAN",
    color: ["GREY", "WHITE", "BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("HF3975-001"),
  },{
    id: 10,
    sku: "136027-035",
    name: "Jordan 5 Retro Oreo",
    brand: "JORDAN",
    color: ["GREY", "WHITE", "BLACK"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("136027-035"),
  },{
    id: 11,
    sku: "DD0587-002",
    name: "Jordan 5 Retro Wolf Grey",
    brand: "JORDAN",
    color: ["GREY", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("DD0587-002"),
  },{
    id: 13,
    sku: "U9060ZGB",
    name: "New Balance 9060 Shadow Grey Castlerock",
    brand: "NEW BALANCE",
    color: ["WHITE", "GREEN"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("U9060ZGB"),
  },{
    id: 14,
    sku: "U9060VRA",
    name: "New Balance 9060 Team Forest Green",
    brand: "NEW BALANCE",
    color: ["GREEN", "WHITE", "BLACK"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("U9060VRA"),
  },{
    id: 15,
    sku: "U9060BPM",
    name: "New Balance 9060 Triple Black",
    brand: "NEW BALANCE",
    color: ["BLACK"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("U9060BPM"),
  },{
    id: 16,
    sku: "U2000EA",
    name: "New Balance Abzorb 2000 Black Grey",
    brand: "NEW BALANCE",
    color: ["BLACK", "GREY"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("U2000EA"),
  },{
    id: 18,
    sku: "U2000EA",
    name: "New Balance Abzorb 2000 Black Grey",
    brand: "NEW BALANCE",
    color: ["BLACK", "GREY"],
    price: 450000,
    priceFormatted: "₦450,000",
    image: getSneakerImage("U2000EA"),
  },{
    id: 17,
    sku: "315122-001",
    name: "Nike Air Force 1 Low '07 Black",
    brand: "NIKE",
    color: ["BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("315122-001"),
  },{
    id: 18,
    sku: "315122-111",
    name: "Nike Air Force 1 Low '07 White",
    brand: "NIKE",
    color: ["WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("315122-111"),
  },{
    id: 19,
    sku: "FJ4217-002",
    name: "Nike Air Max 95 Black University Blue",
    brand: "NIKE",
    color: ["BLACK", "BLUE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FJ4217-002"),
  },{
    id: 20,
    sku: "HV1470-001",
    name: "Nike Dunk Low Ducks of a Feather Black University of Oregon PE",
    brand: "NIKE",
    color: ["BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("HV1470-001"),
  },{
    id: 21,
    sku: "HQ3815-001",
    name: "Nike Dunk Low Symbiote",
    brand: "NIKE",
    color: ["BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("HQ3815-001"),
  },{
    id: 22,
    sku: "BQ6817-011",
    name: "Nike SB Dunk Low Chlorophyll",
    brand: "NIKE",
    color: ["BLACK", "GREY", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("BQ6817-011"),
  },{
    id: 23,
    sku: "895969-006",
    name: "Nike SB Dunk Low Ishod Wair Dark Grey",
    brand: "NIKE",
    color: ["BLACK", "GREY", "WHITE", "RED"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("895969-006"),
  },{
    id: 24,
    sku: "BQ6817-200",
    name: "Nike SB Dunk Low Light Cream Thunderstorm",
    brand: "NIKE",
    color: ["BLACK", "BLUE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("BQ6817-200"),
  },{
    id: 25,
    sku: "FN5880-001",
    name: "Nike SB Dunk Low Premium City of Style",
    brand: "NIKE",
    color: ["YELLOW", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FN5880-001"),
  },{
    id: 26,
    sku: "FZ5251-001",
    name: "Nike SB Dunk Low Rayssa Leal",
    brand: "NIKE",
    color: ["BLUE", "WHITE", "GREY"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FZ5251-001"),
  },{
    id: 27,
    sku: "FZ1289-200",
    name: "Nike SB Dunk Low Riot Skateshop",
    brand: "NIKE",
    color: ["BLACK", "RED", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FZ1289-200"),
  },{
    id: 28,
    sku: "CZ2239-600",
    name: "Nike SB Dunk Low What The Paul",
    brand: "NIKE",
    color: ["BLACK", "WHITE", "RED", "BLUE", "GREEN", "GREY", "PURPLE", "MULTI"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("CZ2239-600"),
  },{
    id: 29,
    sku: "FQ1180-001",
    name: "Nike SB Dunk Low Yuto Horigome",
    brand: "NIKE",
    color: ["GREY", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("FQ1180-001"),
  },{
    id: 30,
    sku: "HQ1988-001",
    name: "Nike Shox R4 Black Bright Crimson",
    brand: "NIKE",
    color: ["BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("HQ1988-001"),
  },{
    id: 31,
    sku: "HQ1988-002",
    name: "Nike Shox R4 Black Metallic Silver",
    brand: "NIKE",
    color: ["BLACK", "RED", "WHITE", "GREY"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("HQ1988-002"),
  }, {
    id: 32,
    sku: "398847-01",
    name: "Puma Speedcat Archive Team Light Blue Club Navy",
    brand: "PUMA",
    color: ["BLUE", "BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("398847-01"),
  },{
    id: 33,
    sku: "398846-01",
    name: "Puma Speedcat OG Black White",
    brand: "PUMA",
    color: ["BLACK", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("398846-01"),
  },{
    id: 34,
    sku: "TB010073-009",
    name: "Timberland 6 Boot Black Nubuck Premium",
    brand: "TIMBERLAND",
    color: ["BLACK"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("TB010073-009"),
  },{
    id: 35,
    sku: "TB010061-713",
    name: "Timberland 6 Premium Waterproof Boot Wheat",
    brand: "TIMBERLAND",
    color: ["BLACK", "BROWN"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("TB010061-713"),
  },{
    id: 36,
    sku: "TB0A44VY-EJR",
    name: "Timberland 6 Waterproof Boot Ice Studios",
    brand: "TIMBERLAND",
    color: ["GREY"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("TB0A44VY-EJR"),
  },{
    id: 37,
    sku: "VN0009QC6BT",
    name: "Vans Knu Skool Black White",
    brand: "VANS",
    color: ["BLACK", "WHITE"],
    price: 185000,
    priceFormatted: "₦185,000",
    image: getSneakerImage("VN0009QC6BT"),
  }]

;