import { CONTACT } from "@/lib/constants";

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  message?: string;
  service?: string;
  language?: string;
  source?: string;
  sourceUrl?: string;
  utmSource?: string;
  /** Honeypot — must stay empty (never use name="company"; browsers autofill it) */
  nestro_hp?: string;
};

export type EnquiryLocale = "en" | "ar";

export function mailtoHref(locale: EnquiryLocale = "en"): string {
  const subject =
    locale === "ar"
      ? "استفسار مشروع جديد — NESTRO"
      : "NESTRO project enquiry";
  const body =
    locale === "ar"
      ? "مرحباً فريق NESTRO،\n\nأود الاستفسار عن مشروع.\n\nالخدمة: \nالموقع في الإمارات: \nالتفاصيل: \n\nمع الشكر،\n"
      : "Hello NESTRO team,\n\nI would like to enquire about a project.\n\nService: \nUAE location: \nDetails: \n\nThank you,\n";
  return buildMailto({
    email: CONTACT.email,
    subject,
    body,
  });
}

export function buildMailto({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${email}?${params.toString()}`;
}

/** Submit enquiry via site API (better deliverability than posting to Web3Forms from the browser). */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const response = await fetch("/api/enquiry/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(data?.error || "enquiry_failed");
  }
}
