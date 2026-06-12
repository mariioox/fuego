import { useState } from "react";
import "../styles/Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const triggerFeedback = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;
    audio.play();

    document.body.classList.add("trigger-flicker");
    setTimeout(() => document.body.classList.remove("trigger-flicker"), 300);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerFeedback();
    setStatus("LOADING");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("SUCCESS");
      setEmail("");
    } catch (err) {
      console.error("SUBSCRIBE_FAILURE:", err);
      setStatus("ERROR");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-grid">
          <div className="news-content">
            <h2 className="news-title">
              NEVER MISS
              <br />A RELEASE
            </h2>
            <p className="news-description">
              JOIN THE INNER CIRCLE FOR EARLY ACCESS TO NEW ARCHIVE ADDITIONS,
              PROMOS AND GIVEAWAYS.
            </p>
          </div>

          <form className="news-form" onSubmit={handleSubscribe}>
            <div className="input-group">
              <input
                type="email"
                placeholder={
                  status === "SUCCESS"
                    ? "SUBSCRIPTION_ACTIVE"
                    : "ENTER_EMAIL_ADDRESS"
                }
                className="news-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "LOADING" || status === "SUCCESS"}
                required
              />
              <button
                type="submit"
                className="news-submit"
                disabled={status === "LOADING" || status === "SUCCESS"}
              >
                {status === "LOADING" ? "COMMUNICATING..." : "SUBSCRIBE"}
              </button>
            </div>
            <div className="news-disclaimer mono">
              {status === "SUCCESS"
                ? "// ACCESS_GRANTED. CHECK_INBOX."
                : "// SECURE_CONNECTION_REQUIRED."}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
