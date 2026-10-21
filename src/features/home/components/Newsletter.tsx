import { useState } from "react";
import { subscribeEmail } from "../../../core/api/subscribe";
import Section from "../../../core/ui/Section";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("LOADING");

    const result = await subscribeEmail(email);

    if (result.success) {
      setStatus("SUCCESS");
      setEmail("");
    } else {
      setStatus("ERROR");
      setErrorMessage(result.error || "Subscription failed — please try again.");
    }
  };

  return (
    <Section id="newsletter" className="bg-ink text-bg">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.04em]">
            Never miss a release
          </h2>
          <p className="max-w-[450px] text-[14px] leading-relaxed opacity-70">
            Join the list for early access to new archive additions, promos and
            giveaways.
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubscribe}>
          <div className="flex flex-col gap-[10px] min-[600px]:flex-row">
            <input
              type="email"
              placeholder={
                status === "SUCCESS" ? "You're subscribed" : "Email address"
              }
              className="flex-1 border border-white/20 bg-transparent p-[18px] text-[13px] text-white outline-none transition-colors duration-200 focus:border-brand placeholder:text-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "LOADING" || status === "SUCCESS"}
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="cursor-pointer border-none rounded-full bg-brand px-10 py-[16px] text-[13px] font-semibold text-white transition-colors duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === "LOADING" || status === "SUCCESS"}
            >
              {status === "LOADING" ? "Sending…" : "Subscribe"}
            </button>
          </div>
          <div
            className="text-[12px] opacity-50"
            role="status"
            aria-live="polite"
          >
            {status === "SUCCESS"
              ? "You're on the list — check your inbox."
              : status === "ERROR"
                ? errorMessage
                : "No spam. One email when something worth having drops."}
          </div>
        </form>
      </div>
    </Section>
  );
}
