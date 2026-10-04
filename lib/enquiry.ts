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
      ? "استفسار مشروع — NESTRO"
      : "NESTRO — Project enquiry";
  const body =
    locale === "ar"
      ? "مرحباً فريق NESTRO،\r\n\r\nأود الاستفسار عن مشروع.\r\n\r\nالخدمة:\r\nالموقع في الإمارات:\r\nالتفاصيل:\r\n\r\nمع الشكر،\r\n"
      : "Hello NESTRO team,\r\n\r\nI would like to enquire about a project.\r\n\r\nService:\r\nUAE location:\r\nDetails:\r\n\r\nThank you,\r\n";
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
  // encodeURIComponent uses %20 for spaces (not "+"), which mobile mail clients decode correctly.
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
