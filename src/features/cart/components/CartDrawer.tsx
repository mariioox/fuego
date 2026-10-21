// src/features/cart/components/CartDrawer.tsx
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { formatNaira } from "../../../core/utils/format";
import { Button } from "../../../core/ui/Button";
import { cn } from "../../../core/utils/cn";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cart";

// Formatted with country code, omitting leading plus sign or internal spacing
const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || "2348151729606";

function buildOrderMessage(
  items: CartItem[],
  subtotal: number,
  discount: number,
  promoCode: string,
  influencer: string,
) {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.quantity}x ${item.name} (${item.sku}) Size ${item.size} - ${formatNaira(
          item.price * item.quantity,
        )}`,
    )
    .join("\n");

  const promoLine =
    discount > 0
      ? `\nPROMO: ${promoCode} (${influencer}) — ${formatNaira(discount)} off`
      : "";

  return `Hello FUEGO, I want to order:\n\n${itemLines}\n\nSubtotal: ${formatNaira(
    subtotal,
  )}${promoLine}\nTotal: ${formatNaira(subtotal - discount)}`;
}

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    cartCount,
    subtotal,
    discount,
    cartTotal,
    promoCode,
    appliedPromo,
    closeCart,
    clearCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    applyPromo,
    removePromo,
  } = useCart();
  const [copyStatus, setCopyStatus] = useState<"IDLE" | "COPIED">("IDLE");
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<
    "IDLE" | "ACCEPTED" | "REJECTED"
  >("IDLE");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const orderMessage = useMemo(
    () =>
      buildOrderMessage(
        items,
        subtotal,
        discount,
        promoCode,
        appliedPromo?.influencer || "",
      ),
    [appliedPromo, discount, items, promoCode, subtotal],
  );

  const handleClose = useCallback(() => {
    setCopyStatus("IDLE");
    setPromoStatus("IDLE");
    previouslyFocused.current?.focus?.();
    previouslyFocused.current = null;
    closeCart();
  }, [closeCart]);

  const previousOverflow = useRef<string>("");

  useEffect(() => {
    if (!isCartOpen) return;

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow.current;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCopyOrder = async () => {
    await navigator.clipboard.writeText(orderMessage);
    setCopyStatus("COPIED");
  };

  const handleCheckout = () => {
    // URL-encode order text to safely pass spaces and linebreaks to WhatsApp UI
    const encodedText = encodeURIComponent(orderMessage);
    const directUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  const handleQuantityAdjustment = (action: () => void) => {
    action();
  };

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput);
    setPromoStatus(result.ok ? "ACCEPTED" : "REJECTED");
    if (result.ok) {
      setPromoInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end bg-black/[0.62] backdrop-blur-[8px]" onClick={handleClose}>
      <aside
        className="m-3 flex h-[calc(100dvh-24px)] w-[min(100vw-24px,460px)] flex-col overflow-hidden rounded-surface border border-line bg-card text-ink shadow-[0_18px_60px_rgba(0,0,0,0.28)] max-md:m-2 max-md:h-[calc(100dvh-16px)] max-md:w-[calc(100vw-16px)]"
        onClick={(event) => event.stopPropagation()}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-[82px] flex-shrink-0 items-center justify-between border-b border-line px-5 py-4 max-md:px-4">
          <h2 className="font-display text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-ink">
            Your bag
          </h2>
          <button
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-control border border-line bg-transparent text-ink transition-colors duration-300 ease-soft hover:border-text"
            onClick={handleClose}
            aria-label="Close bag"
            ref={closeButtonRef}
          >
            <X size={18} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div className="grid grid-cols-[94px_1fr] gap-3.5 border-b border-line py-3.5 max-md:grid-cols-[82px_1fr]" key={`${item.id}-${item.size}`}>
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-surface bg-tile">
                    <img src={item.image} alt={item.name} className="h-[88%] w-[88%] object-contain mix-blend-multiply" />
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[14px] font-medium leading-[1.25] break-words">{item.name}</h3>
                        <p className="mt-1 text-[12px] text-muted">
                          {item.brand} · {item.sku} · EU {item.size}
                        </p>
                      </div>
                      <button
                        className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-control border border-line bg-transparent text-ink transition-colors duration-300 ease-soft hover:border-text"
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-10 items-center overflow-hidden rounded-control border border-line bg-card" aria-label="Quantity controls">
                        <button
                          className="flex h-10 w-9 cursor-pointer items-center justify-center border-0 bg-transparent text-inherit transition-colors duration-300 ease-soft hover:text-muted"
                          onClick={() => handleQuantityAdjustment(() => decreaseQuantity(item.id, item.size))}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[32px] text-center text-[13px] font-medium">{item.quantity}</span>
                        <button
                          className="flex h-10 w-9 cursor-pointer items-center justify-center border-0 bg-transparent text-inherit transition-colors duration-300 ease-soft hover:text-muted"
                          onClick={() => handleQuantityAdjustment(() => increaseQuantity(item.id, item.size))}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="whitespace-nowrap text-[14px] font-semibold text-ink">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-line bg-card px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-md:px-4">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="text-[13px] text-muted">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
                <strong className="text-[1.15rem] font-semibold text-ink">{formatNaira(cartTotal)}</strong>
              </div>

              {discount > 0 && (
                <div className="mb-2.5 flex items-center justify-between gap-3 text-[12px] font-medium text-muted">
                  <span>
                    {promoCode} {appliedPromo ? `(${appliedPromo.influencer})` : ""}
                  </span>
                  <span className="whitespace-nowrap">-{formatNaira(discount)}</span>
                </div>
              )}

              <div className="mb-1 flex h-11 items-stretch overflow-hidden rounded-control border border-line bg-card">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={promoCode ? "Code applied" : "Promo code"}
                  aria-label="Promo code"
                  disabled={!!promoCode}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyPromo();
                  }}
                  className="min-w-0 flex-1 bg-transparent px-4 text-[13px] text-ink outline-none placeholder:text-muted"
                />
                {promoCode ? (
                  <button
                    type="button"
                    className="cursor-pointer border-l border-line bg-transparent px-4 text-[13px] font-medium text-ink transition-colors duration-300 ease-soft hover:text-muted"
                    onClick={() => {
                      removePromo();
                      setPromoStatus("IDLE");
                    }}
                    aria-label="Remove promo code"
                  >
                    X
                  </button>
                ) : (
                  <button
                    type="button"
                    className="cursor-pointer border-none bg-btn px-5 text-[13px] font-medium text-btn-ink transition-colors duration-300 ease-soft hover:opacity-90"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </button>
                )}
              </div>
              {promoStatus !== "IDLE" && (
                <p
                  className={cn(
                    "mb-2.5 mt-1 text-[11px] font-medium",
                    promoStatus === "ACCEPTED" ? "text-ink" : "text-[#f32536]",
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {promoStatus === "ACCEPTED"
                    ? "Code applied — ₦1,000 off"
                    : "That code isn't valid"}
                </p>
              )}

              <Button className="w-full" onClick={handleCheckout}>
                <ShoppingBag size={18} />
                Checkout on WhatsApp
              </Button>

              <div className="mt-2 flex gap-2 max-md:gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleCopyOrder}
                >
                  {copyStatus === "COPIED" ? "Order copied" : "Copy order"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Empty bag
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-[30px] text-center text-ink">
            <ShoppingBag size={42} className="mb-[18px] text-muted" />
            <h3 className="mb-2 font-display text-[1.5rem] font-semibold tracking-[-0.02em]">Your bag is empty</h3>
            <p className="max-w-[260px] text-[14px] leading-[1.6] text-muted">
              Add a pair from the archive to start an order.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}