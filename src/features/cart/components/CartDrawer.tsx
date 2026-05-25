// src/features/cart/components/CartDrawer.tsx
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/cart";
import "../styles/CartDrawer.css";

// Formatted with country code, omitting leading plus sign or internal spacing
const WHATSAPP_PHONE = "2348151729606";

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildOrderMessage(items: CartItem[], total: number) {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.quantity}x ${item.name} (${item.sku}) - ${formatNaira(
          item.price * item.quantity,
        )}`,
    )
    .join("\n");

  return `Hello FUEGO, I want to order:\n\n${itemLines}\n\nTotal: ${formatNaira(
    total,
  )}`;
}

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    cartCount,
    cartTotal,
    closeCart,
    clearCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const [copyStatus, setCopyStatus] = useState<"IDLE" | "COPIED">("IDLE");

  const orderMessage = useMemo(
    () => buildOrderMessage(items, cartTotal),
    [cartTotal, items],
  );

  // Trigger sensory feedback loops (Click sound + Screen flicker)
  const triggerSensoryFeedback = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;
    audio.play().catch((err) => console.log("Audio playback blocked", err));

    document.body.classList.add("trigger-flicker");
    setTimeout(() => document.body.classList.remove("trigger-flicker"), 300);
  };

  useEffect(() => {
    if (!isCartOpen) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeCart, isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) setCopyStatus("IDLE");
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
    // Light click sound only when tweaking item count numbers
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => {});
    action();
  };

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <div>
            <span className="cart-kicker mono">ORDER_QUEUE</span>
            <h2 className="cart-title">Cart</h2>
          </div>
          <button className="cart-icon-btn" onClick={closeCart} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-main">
                    <div className="cart-item-top">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-meta mono">
                          {item.brand} // {item.sku}
                        </p>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-control" aria-label="Quantity controls">
                        <button
                          onClick={() => handleQuantityAdjustment(() => decreaseQuantity(item.id))}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          onClick={() => handleQuantityAdjustment(() => increaseQuantity(item.id))}
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

              <button className="cart-checkout-btn" onClick={handleCheckout}>
                <ShoppingBag size={18} />
                ORDER_ON_WHATSAPP
              </button>

              <button className="cart-copy-btn mono" onClick={handleCopyOrder}>
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