export interface Sneaker {
  id: number;
  sku: string;
  name: string;
  brand: string;
  color: Array<'RED' | 'BLUE' | 'BLACK' | 'WHITE' | 'GREEN' | 'GREY' | 'MULTI'>;
  price: number;
  priceFormatted: string;
  tag?: string;
  image: string;
}
