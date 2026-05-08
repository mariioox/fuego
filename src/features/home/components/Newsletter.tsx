import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const triggerFeedback = () => {
    // 1. Mechanical Click Sound (Place file in public/sounds/click.mp3)
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;
    audio.play();

    // 2. Screen Flicker
    document.body.classList.add("trigger-flicker");
    setTimeout(() => document.body.classList.remove("trigger-flicker"), 300);
  };

  useEffect(() => {
    emailjs.init("QGzZ9cloXxyNwqCfq");
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerFeedback();
    setStatus("LOADING");

    try {
      await emailjs.send("service_wscab66", "template_1", {
        user_email: email,
      });
      setStatus("SUCCESS");
      setEmail("");
    } catch (err) {
      console.error("EMAIL_FAILURE:", err);
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
              JOIN THE INNER CIRCLE FOR EARLY ACCESS TO NEW ARCHIVE ADDITIONS.
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
