import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Sneaker } from "../../archive/types/sneaker";
import type { CartItem, CartProduct } from "../types/cart";

const CART_STORAGE_KEY = "fuego-cart";

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addItem: (product: Sneaker | CartProduct) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Sneaker | CartProduct) => {
    const cartProduct = toCartProduct(product);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...cartProduct, quantity: 1 }];
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const increaseQuantity = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      isCartOpen,
      cartCount,
      cartTotal,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      openCart,
      closeCart,
    };
  }, [
    addItem,
    clearCart,
    closeCart,
    decreaseQuantity,
    increaseQuantity,
    isCartOpen,
    items,
    openCart,
    removeItem,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
