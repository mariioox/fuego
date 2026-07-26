const API_BASE = "/api";

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error || "Subscription failed" };
  }

  return { success: true };
}
