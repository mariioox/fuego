export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

const brandOverrides: Record<string, string> = {
  ADIDAS: "adidas",
  ASICS: "ASICS",
  "NEW BALANCE": "New Balance",
};

/** Turns a registry brand code into sentence case ("NIKE" -> "Nike"). */
export function formatBrand(brand: string) {
  const key = brand.toUpperCase();
  if (brandOverrides[key]) return brandOverrides[key];
  return key.charAt(0) + key.slice(1).toLowerCase();
}
