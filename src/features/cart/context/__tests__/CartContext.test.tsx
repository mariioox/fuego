import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "../CartContext";
import type { Sneaker } from "../../../archive/types/sneaker";
import type { SneakerSize } from "../../types/cart";
import type { ReactNode } from "react";

const TEST_SIZE: SneakerSize = 42;

const mockSneaker: Sneaker = {
  id: 1,
  sku: "TEST-001",
  name: "Test Sneaker",
  brand: "NIKE",
  color: ["BLACK", "WHITE"],
  price: 30000,
  priceFormatted: "₦30,000",
  status: "AVAILABLE",
  image: "/test.webp",
};

const mockSneaker2: Sneaker = {
  ...mockSneaker,
  id: 2,
  sku: "TEST-002",
  name: "Test Sneaker 2",
};

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("adds an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe("Test Sneaker");
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(30000);
    expect(result.current.isCartOpen).toBe(true);
  });

  it("increments quantity when adding same item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.cartCount).toBe(2);
    expect(result.current.cartTotal).toBe(60000);
  });

  it("does not increase quantity beyond 99", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    for (let i = 0; i < 100; i++) {
      act(() => result.current.increaseQuantity(1));
    }

    expect(result.current.items[0].quantity).toBe(99);
  });

  it("removes an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.removeItem(1));

    expect(result.current.items).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("decreases quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.decreaseQuantity(1));

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(30000);
  });

  it("removes item when quantity reaches 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.decreaseQuantity(1));

    expect(result.current.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.addItem(mockSneaker2, TEST_SIZE));
    act(() => result.current.clearCart());

    expect(result.current.items).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    const stored = JSON.parse(localStorage.getItem("fuego-cart") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("Test Sneaker");
  });

  it("calculates correct total with multiple items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.addItem(mockSneaker2, TEST_SIZE));

    expect(result.current.cartTotal).toBe(60000);
    expect(result.current.cartCount).toBe(2);
  });

  it("applies a valid promo code", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    let outcome: { ok: boolean; error?: string } | undefined;
    act(() => {
      outcome = result.current.applyPromo("TAYLA10");
    });

    expect(outcome?.ok).toBe(true);
    expect(result.current.promoCode).toBe("TAYLA10");
    expect(result.current.appliedPromo?.influencer).toBe("@tayla.online");
    expect(result.current.discount).toBe(1000);
    expect(result.current.cartTotal).toBe(29000);
  });

  it("matches promo codes case-insensitively", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    let outcome: { ok: boolean; error?: string } | undefined;
    act(() => {
      outcome = result.current.applyPromo("  tayla10  ");
    });

    expect(outcome?.ok).toBe(true);
    expect(result.current.discount).toBe(1000);
    expect(result.current.cartTotal).toBe(29000);
  });

  it("rejects an invalid promo code", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));

    let outcome: { ok: boolean; error?: string } | undefined;
    act(() => {
      outcome = result.current.applyPromo("FAKECODE");
    });

    expect(outcome?.ok).toBe(false);
    expect(outcome?.error).toBe("Invalid promo code");
    expect(result.current.discount).toBe(0);
    expect(result.current.cartTotal).toBe(30000);
  });

  it("caps discount at the subtotal", () => {
    const cheapSneaker: Sneaker = { ...mockSneaker, price: 500 };
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(cheapSneaker, TEST_SIZE));
    act(() => result.current.applyPromo("TAYLA10"));

    expect(result.current.discount).toBe(500);
    expect(result.current.cartTotal).toBe(0);
  });

  it("removes a promo code", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(mockSneaker, TEST_SIZE));
    act(() => result.current.applyPromo("TAYLA10"));
    act(() => result.current.removePromo());

    expect(result.current.promoCode).toBe("");
    expect(result.current.appliedPromo).toBeNull();
    expect(result.current.discount).toBe(0);
    expect(result.current.cartTotal).toBe(30000);
  });

  it("persists promo code to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.applyPromo("TAYLA10"));

    expect(localStorage.getItem("fuego-promo")).toBe("TAYLA10");
  });
});
