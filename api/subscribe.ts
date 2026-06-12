import type { VercelRequest, VercelResponse } from "@vercel/node";

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
      const error = await brevoResponse.json();
      console.error("Brevo API error:", error);
      return response.status(500).json({ error: "Failed to subscribe" });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
