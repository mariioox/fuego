export interface PromoCode {
  code: string;
  influencer: string;
  discount: number;
}

// Add each influencer's unique code here as you sign them.
// Codes are matched case-insensitively (spaces trimmed).
export const PROMO_CODES: PromoCode[] = [
  { code: "TAYLA10", influencer: "@tayla.online", discount: 1000 },
  // { code: "JAYZSTYLE", influencer: "@jayzstyle", discount: 1000 },
];
