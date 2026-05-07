export interface Sneaker {
  id: number;
  sku: string;
  name: string;
  brand: string;
  color: Array<'BLACK' | 'WHITE' | 'RED' | 'BLUE' | 'GREEN' | 'GREY' | 'BROWN' | 'MULTI' | 'PURPLE' | 'ORANGE' |'PINK' | 'YELLOW'>;
  price: number;
  priceFormatted: string;
  status?: 'AVAILABLE' | 'PREMIUM' | 'SOLD_OUT' | 'ARCHIVED';
  image: string;
  description?: string;
}
