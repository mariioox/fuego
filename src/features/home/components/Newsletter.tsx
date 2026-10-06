import { useState, useRef, useEffect } from "react";
import { useSound } from "../../../core/hooks/useSound";
import { subscribeEmail } from "../../../core/api/subscribe";
import Section from "../../../core/ui/Section";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const playClick = useSound("/sounds/click.mp3");
  const flickerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flickerTimer.current) clearTimeout(flickerTimer.current);
    };
  }, []);

  const triggerFeedback = () => {
    playClick(0.4);

    const overlay = document.getElementById("flicker-overlay");
    overlay?.classList.add("trigger-flicker");
    flickerTimer.current = setTimeout(
      () => overlay?.classList.remove("trigger-flicker"),
      300,
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerFeedback();
    setStatus("LOADING");

    const result = await subscribeEmail(email);

    if (result.success) {
      setStatus("SUCCESS");
      setEmail("");
    } else {
      setStatus("ERROR");
      setErrorMessage(result.error || "SUBSCRIPTION_FAILED // TRY_AGAIN.");
    }
  };

  return (
    <Section id="newsletter" className="bg-ink text-bg">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-black italic uppercase leading-[0.85] tracking-[-0.05em]">
            NEVER MISS
            <br />A RELEASE
          </h2>
          <p className="max-w-[450px] font-mono text-[13px] leading-relaxed opacity-70">
            JOIN THE INNER CIRCLE FOR EARLY ACCESS TO NEW ARCHIVE ADDITIONS,
            PROMOS AND GIVEAWAYS.
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubscribe}>
          <div className="flex flex-col gap-[10px] min-[600px]:flex-row">
            <input
              type="email"
              placeholder={
                status === "SUCCESS"
                  ? "SUBSCRIPTION_ACTIVE"
                  : "ENTER_EMAIL_ADDRESS"
              }
              className="flex-1 border border-white/20 bg-transparent p-[18px] font-mono text-xs text-white outline-none transition-colors duration-300 focus:border-brand"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "LOADING" || status === "SUCCESS"}
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="cursor-pointer border-none bg-brand px-10 py-[18px] font-mono text-xs font-black text-white transition-transform duration-300 hover:-translate-y-[3px] hover:brightness-110 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              disabled={status === "LOADING" || status === "SUCCESS"}
            >
              {status === "LOADING" ? "COMMUNICATING..." : "SUBSCRIBE"}
            </button>
          </div>
          <div
            className="mono text-[10px] tracking-[0.1em] opacity-40"
            role="status"
            aria-live="polite"
          >
            {status === "SUCCESS"
              ? "// ACCESS_GRANTED. CHECK_INBOX."
              : status === "ERROR"
                ? `// ${errorMessage}`
                : "// SECURE_CONNECTION_REQUIRED."}
          </div>
        </form>
      </div>
    </Section>
  );
}
