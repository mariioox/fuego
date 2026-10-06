// src/features/cart/components/CartDrawer.tsx
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { useSound } from "../../../core/hooks/useSound";
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
  const playClick = useSound("/sounds/click.mp3");
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
    <div className="fixed inset-0 z-[10000] flex justify-end bg-black/[0.62] backdrop-blur-[8px]" onClick={handleClose}>
      <aside
        className="flex h-dvh w-[min(100vw,460px)] flex-col border-l border-edge bg-bg text-ink shadow-[-18px_0_60px_rgba(0,0,0,0.28)] max-md:w-full max-md:border-l-0"
        onClick={(event) => event.stopPropagation()}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-[82px] flex-shrink-0 items-center justify-between border-b border-edge px-5 py-4 max-md:px-4">
          <div>
            <span className="mono mb-1 block text-[10px] font-black text-brand">ORDER_QUEUE</span>
            <h2 className="text-[2rem] font-[950] uppercase italic leading-none">Cart</h2>
          </div>
          <button
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center border border-edge bg-card text-ink transition-colors hover:border-brand hover:text-brand"
            onClick={handleClose}
            aria-label="Close cart"
            ref={closeButtonRef}
          >
            <X size={18} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div className="grid grid-cols-[94px_1fr] gap-3.5 border-b border-edge py-3.5 max-md:grid-cols-[82px_1fr]" key={`${item.id}-${item.size}`}>
                  <div className="flex aspect-square items-center justify-center overflow-hidden bg-white">
                    <img src={item.image} alt={item.name} className="h-[88%] w-[88%] object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.12)]" />
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="break-words text-[13px] font-[950] uppercase leading-[1.15]">{item.name}</h3>
                        <p className="mono mt-[5px] text-[9px] font-black opacity-45">
                          {item.brand} // {item.sku} // EU {item.size}
                        </p>
                      </div>
                      <button
                        className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center border border-edge bg-card text-ink transition-colors hover:border-brand hover:text-brand"
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-8 items-center border border-edge bg-card" aria-label="Quantity controls">
                        <button
                          className="flex h-[30px] w-8 cursor-pointer items-center justify-center border-0 bg-transparent text-inherit hover:text-brand"
                          onClick={() => handleQuantityAdjustment(() => decreaseQuantity(item.id, item.size))}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[30px] text-center font-mono text-[11px] font-black">{String(item.quantity).padStart(2, "0")}</span>
                        <button
                          className="flex h-[30px] w-8 cursor-pointer items-center justify-center border-0 bg-transparent text-inherit hover:text-brand"
                          onClick={() => handleQuantityAdjustment(() => increaseQuantity(item.id, item.size))}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="mono whitespace-nowrap text-[11px] font-[950] text-brand">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-edge bg-bg px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-md:px-4">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="mono text-[10px] font-black opacity-50">ITEMS // {cartCount}</span>
                <strong className="text-[1.15rem] font-[950] text-brand">{formatNaira(cartTotal)}</strong>
              </div>

              {discount > 0 && (
                <div className="mono mb-2.5 flex items-center justify-between gap-3 text-[10px] font-black text-brand">
                  <span>
                    PROMO // {promoCode}{" "}
                    {appliedPromo ? `(${appliedPromo.influencer})` : ""}
                  </span>
                  <span className="whitespace-nowrap">-{formatNaira(discount)}</span>
                </div>
              )}

              <div className="mono mb-1 flex h-[34px] items-stretch border border-edge bg-card">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={promoCode ? "PROMO_CODE_APPLIED" : "ENTER_PROMO_CODE"}
                  aria-label="Promo code"
                  disabled={!!promoCode}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyPromo();
                  }}
                  className="min-w-0 flex-1 bg-transparent px-3 text-[10px] font-extrabold uppercase text-ink outline-none placeholder:opacity-40"
                />
                {promoCode ? (
                  <button
                    type="button"
                    className="cursor-pointer border-l border-edge bg-transparent px-4 font-mono text-[10px] font-black tracking-[0.06em] text-ink hover:text-brand"
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
                    className="cursor-pointer border-none bg-ink px-4 font-mono text-[10px] font-black tracking-[0.06em] text-bg hover:text-brand"
                    onClick={handleApplyPromo}
                  >
                    APPLY
                  </button>
                )}
              </div>
              {promoStatus !== "IDLE" && (
                <p
                  className={cn(
                    "mono mb-2.5 mt-1 text-[9px] font-black",
                    promoStatus === "ACCEPTED" ? "text-brand" : "text-[#f32536]",
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {promoStatus === "ACCEPTED"
                    ? "CODE_ACCEPTED // ₦1,000 OFF"
                    : "INVALID_CODE"}
                </p>
              )}

              <Button className="w-full" onClick={handleCheckout}>
                <ShoppingBag size={18} />
                ORDER_ON_WHATSAPP
              </Button>

              <div className="mt-2 flex gap-2 max-md:gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleCopyOrder}
                >
                  {copyStatus === "COPIED" ? "ORDER_TEXT_COPIED" : "COPY_ORDER_TEXT"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    triggerSensoryFeedback();
                    clearCart();
                  }}
                >
                  CLEAR_QUEUE
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-[30px] text-center text-ink">
            <ShoppingBag size={42} className="mb-[18px] text-brand" />
            <h3 className="mb-2 text-[1.6rem] font-[950] italic">QUEUE_EMPTY</h3>
            <p className="mono max-w-[260px] text-[10px] leading-[1.6] opacity-50">
              ADD SPECIMENS FROM THE ARCHIVE TO BEGIN AN ORDER.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}