const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nestro.ae")
  .trim()
  .replace(/\s+/g, "")
  .replace(/\/+$/, "");

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971564564441",
  phone: process.env.NEXT_PUBLIC_PHONE || "+971 56 456 4441",
  email: normalizeEmail(
    process.env.NEXT_PUBLIC_EMAIL || "nestro.ae@gmail.com",
  ),
  /** @deprecated Prefer server-side `/api/enquiry/`; kept for emergency client fallback only */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  formAccessKey: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY || "",
  siteUrl,
};

export const whatsappUrl = (message = "Hello NESTRO, I would like to book a consultation.") =>
  `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
