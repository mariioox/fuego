import { useState } from "react";
import { subscribeEmail } from "../../../core/api/subscribe";
import Section from "../../../core/ui/Section";
import { revealStyle, useReveal } from "../../../core/hooks/useReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [ref, shown] = useReveal<HTMLDivElement>();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("LOADING");

    const result = await subscribeEmail(email);

    if (result.success) {
      setStatus("SUCCESS");
      setEmail("");
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <Section id="newsletter">
      <div
        ref={ref}
        style={revealStyle(shown)}
        className="flex flex-wrap items-center justify-between gap-6 rounded-surface bg-panel p-[clamp(22px,5vw,64px)] sm:gap-10"
      >
        <div className="max-w-[520px]">
          <span className="inline-flex items-center gap-2 text-[12px] text-[#F4F4F2] sm:text-[13px]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-orange"
              aria-hidden="true"
            />
            Subscribe to our newsletter
          </span>
          <h2 className="mt-3 font-display text-[clamp(30px,6vw,60px)] font-semibold leading-[1] tracking-[-0.04em] text-[#F4F4F2] sm:mt-4">
            Win a new pair of
            <br />
            Air Force 1s.
          </h2>
          <p className="mt-4 max-w-[440px] text-[15px] leading-[1.55] text-[#A1A1A8] sm:mt-5 sm:text-[16px]">
            Join the list for early drops, restocks and the giveaway draw.
          </p>
        </div>

        <form
          className="w-full max-w-[480px] flex flex-col gap-2 sm:gap-3"
          onSubmit={handleSubscribe}
        >
          <label
            htmlFor="newsletter-email"
            className="text-[12px] text-[#A1A1A8] sm:text-[13px]"
          >
            Email address
          </label>
          <div className="flex flex-col gap-2 min-[500px]:flex-row min-[500px]:items-center">
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="h-[46px] w-full min-w-0 flex-1 rounded-control border border-white/12 bg-white/5 px-3.5 text-[14px] text-[#F4F4F2] outline-none transition-colors duration-300 ease-soft placeholder:text-white/40 focus-visible:border-white/30 focus-visible:outline-none sm:h-[52px] sm:px-4 sm:text-[15px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "LOADING" || status === "SUCCESS"}
              required
            />
            <button
              type="submit"
              className="h-[46px] w-full rounded-control border-none bg-orange px-6 text-[14px] font-semibold text-[#0B0B0C] transition-[filter,transform] duration-300 ease-soft hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-[#F4F4F2] min-[500px]:w-auto sm:h-[52px] sm:px-7 sm:text-[15px]"
              disabled={status === "LOADING" || status === "SUCCESS"}
            >
              {status === "LOADING" ? "Joining…" : "Join the list"}
            </button>
          </div>
          <p
            className="min-h-5 text-[13px] text-[#A1A1A8]"
            role="status"
            aria-live="polite"
          >
            {status === "SUCCESS"
              ? "You're in. Watch your inbox for the next drop."
              : status === "ERROR"
                ? "Something went wrong. Please try again."
                : ""}
          </p>
        </form>
      </div>
    </Section>
  );
}
