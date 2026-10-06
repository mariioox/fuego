// src/features/cart/components/CartDrawer.tsx
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { useSound } from "../../../core/hooks/useSound";
import { formatNaira } from "../../../core/utils/format";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cart";
import "../styles/CartDrawer.css";

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
  const playClick = useSound("/sounds/click.mp3");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

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

  // Trigger sensory feedback loops (Click sound + Screen flicker)
  const triggerSensoryFeedback = () => {
    playClick(0.4);

    document.getElementById("flicker-overlay")?.classList.add("trigger-flicker");
    setTimeout(
      () => document.getElementById("flicker-overlay")?.classList.remove("trigger-flicker"),
      300,
    );
  };

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

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow.current;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose, isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCopyOrder = async () => {
    triggerSensoryFeedback();
    await navigator.clipboard.writeText(orderMessage);
    setCopyStatus("COPIED");
  };

  const handleCheckout = () => {
    triggerSensoryFeedback();

    // URL-encode order text to safely pass spaces and linebreaks to WhatsApp UI
    const encodedText = encodeURIComponent(orderMessage);
    const directUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  const handleQuantityAdjustment = (action: () => void) => {
    playClick(0.2);
    action();
  };

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput);
    setPromoStatus(result.ok ? "ACCEPTED" : "REJECTED");
    if (result.ok) {
      setPromoInput("");
      playClick(0.4);
    }
  };

  return (
    <div className="cart-overlay" onClick={handleClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <div>
            <span className="cart-kicker mono">ORDER_QUEUE</span>
            <h2 className="cart-title">Cart</h2>
          </div>
          <button
            className="cart-icon-btn"
            onClick={handleClose}
            aria-label="Close cart"
            ref={closeButtonRef}
          >
            <X size={18} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={`${item.id}-${item.size}`}>
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-main">
                    <div className="cart-item-top">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-meta mono">
                          {item.brand} // {item.sku} // EU {item.size}
                        </p>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-control" aria-label="Quantity controls">
                        <button
                          onClick={() => handleQuantityAdjustment(() => decreaseQuantity(item.id, item.size))}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          onClick={() => handleQuantityAdjustment(() => increaseQuantity(item.id, item.size))}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="cart-item-price mono">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="mono">ITEMS // {cartCount}</span>
                <strong>{formatNaira(cartTotal)}</strong>
              </div>

              {discount > 0 && (
                <div className="cart-discount-row mono">
                  <span>
                    PROMO // {promoCode}{" "}
                    {appliedPromo ? `(${appliedPromo.influencer})` : ""}
                  </span>
                  <span>-{formatNaira(discount)}</span>
                </div>
              )}

              <div className="promo-form mono">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={
                    promoCode ? "PROMO_CODE_APPLIED" : "ENTER_PROMO_CODE"
                  }
                  aria-label="Promo code"
                  disabled={!!promoCode}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyPromo();
                  }}
                />
                {promoCode ? (
                  <button
                    type="button"
                    className="promo-clear-btn"
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
                    className="promo-apply-btn"
                    onClick={handleApplyPromo}
                  >
                    APPLY
                  </button>
                )}
              </div>
              {promoStatus !== "IDLE" && (
                <p
                  className={`promo-feedback mono ${promoStatus === "ACCEPTED" ? "ok" : "err"}`}
                  role="status"
                  aria-live="polite"
                >
                  {promoStatus === "ACCEPTED"
                    ? "CODE_ACCEPTED // ₦1,000 OFF"
                    : "INVALID_CODE"}
                </p>
              )}

              <button className="cart-checkout-btn" onClick={handleCheckout}>
                <ShoppingBag size={18} />
                ORDER_ON_WHATSAPP
              </button>

              <div className="cart-actions-row">
                <button
                  className="cart-copy-btn mono"
                  onClick={handleCopyOrder}
                >
                  {copyStatus === "COPIED" ? "ORDER_TEXT_COPIED" : "COPY_ORDER_TEXT"}
                </button>

                <button
                  className="cart-clear-btn mono"
                  onClick={() => {
                    triggerSensoryFeedback();
                    clearCart();
                  }}
                >
                  CLEAR_QUEUE
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <ShoppingBag size={42} />
            <h3>QUEUE_EMPTY</h3>
            <p className="mono">
              ADD SPECIMENS FROM THE ARCHIVE TO BEGIN AN ORDER.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
