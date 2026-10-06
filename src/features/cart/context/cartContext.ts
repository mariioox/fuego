import { createContext } from "react";
import type { CartItem, CartProduct, SneakerSize } from "../types/cart";
import type { PromoCode } from "../data/promo";
import type { Sneaker } from "../../archive/types/sneaker";

export interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  discount: number;
  cartTotal: number;
  promoCode: string;
  appliedPromo: PromoCode | null;
  addItem: (product: Sneaker | CartProduct, size: SneakerSize) => void;
  removeItem: (id: number, size: SneakerSize) => void;
  increaseQuantity: (id: number, size: SneakerSize) => void;
  decreaseQuantity: (id: number, size: SneakerSize) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => { ok: boolean; error?: string };
  removePromo: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);