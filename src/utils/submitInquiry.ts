// Truthful submission boundary:
// 1) If VITE_FORMSPREE_ENDPOINT or VITE_INQUIRY_ENDPOINT is set, POST JSON there.
// 2) Otherwise, fall back to opening the visitor's mail client with a prefilled
//    inquiry to info@zaintechoman.com — never fake a "sent to server" success.

export interface Inquiry {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export type SubmitResult =
  | { ok: true; via: "endpoint" }
  | { ok: true; via: "mailto" };

export function inquiryMailto(i: Inquiry, to: string): string {
  const subject = encodeURIComponent(`Website inquiry — ${i.service} — ${i.name}`);
  const body = encodeURIComponent(
    [`Name: ${i.name}`, `Company: ${i.company || "-"}`, `Email: ${i.email}`, `Phone: ${i.phone || "-"}`, `Service: ${i.service}`, "", i.message].join("\n")
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export async function submitInquiry(i: Inquiry): Promise<SubmitResult> {
  const endpoint =
    (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined) ||
    (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined);

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...i, source: "zaintechoman.com contact form", page: window.location.href }),
    });
    if (!res.ok) throw new Error(`Submission failed (${res.status})`);
    return { ok: true, via: "endpoint" };
  }

  // No backend configured — hand off to the visitor's email client.
  window.location.href = inquiryMailto(i, "info@zaintechoman.com");
  return { ok: true, via: "mailto" };
}
