import type { VercelRequest, VercelResponse } from "@vercel/node";
import emailjs from "@emailjs/nodejs";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { email } = request.body;

  if (!email || typeof email !== "string") {
    return response.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: "Invalid email format" });
  }

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      return response.status(500).json({ error: "Failed to subscribe" });
    }

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      { user_email: email },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      },
    );

    return response.status(200).json({ success: true });
  } catch {
    return response.status(500).json({ error: "Internal server error" });
  }
}
