import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Sneaker } from "../../archive/types/sneaker";
import type { CartItem, CartProduct, SneakerSize } from "../types/cart";
import { PROMO_CODES, type PromoCode } from "../data/promo";
import { CartContext, type CartContextValue } from "./cartContext";

const CART_STORAGE_KEY = "fuego-cart";
const PROMO_STORAGE_KEY = "fuego-promo";

function readStoredCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function readStoredPromo() {
  try {
    return localStorage.getItem(PROMO_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function toCartProduct(product: Sneaker | CartProduct): CartProduct {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    brand: product.brand,
    price: product.price,
    priceFormatted: product.priceFormatted,
    image: product.image,
  };
}

function findPromo(code: string): PromoCode | undefined {
  const normalized = code.trim().toLowerCase();
  if (!normalized) return undefined;
  return PROMO_CODES.find((p) => p.code.trim().toLowerCase() === normalized);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string>(readStoredPromo);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
  }, [promoCode]);

  const addItem = useCallback((product: Sneaker | CartProduct, size: SneakerSize) => {
    const cartProduct = toCartProduct(product);

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...cartProduct, quantity: 1, size }];
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: number, size: SneakerSize) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(item.id === id && item.size === size)),
    );
  }, []);

  const increaseQuantity = useCallback((id: number, size: SneakerSize) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size && item.quantity < 99
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((id: number, size: SneakerSize) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const applyPromo = useCallback(
    (code: string): { ok: boolean; error?: string } => {
      const promo = findPromo(code);
      if (!promo) {
        return { ok: false, error: "Invalid promo code" };
      }
      setPromoCode(promo.code);
      return { ok: true };
    },
    [],
  );

  const removePromo = useCallback(() => setPromoCode(""), []);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const appliedPromo = promoCode ? findPromo(promoCode) ?? null : null;
    const discount = appliedPromo ? Math.min(appliedPromo.discount, subtotal) : 0;
    const cartTotal = subtotal - discount;

    return {
      items,
      isCartOpen,
      cartCount,
      subtotal,
      discount,
      cartTotal,
      promoCode,
      appliedPromo,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      openCart,
      closeCart,
      applyPromo,
      removePromo,
    };
  }, [
    addItem,
    applyPromo,
    clearCart,
    closeCart,
    decreaseQuantity,
    increaseQuantity,
    isCartOpen,
    items,
    openCart,
    promoCode,
    removeItem,
    removePromo,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
