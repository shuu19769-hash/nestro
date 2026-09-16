const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nestro.ae")
  .trim()
  .replace(/\s+/g, "")
  .replace(/\/+$/, "");

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971564564441",
  phone: process.env.NEXT_PUBLIC_PHONE || "+971 56 456 4441",
  email: process.env.NEXT_PUBLIC_EMAIL || "Nestro.ae@gmail.com",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  formAccessKey: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY || "",
  siteUrl,
};

export const whatsappUrl = (message = "Hello NESTRO, I would like to book a consultation.") =>
  `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
