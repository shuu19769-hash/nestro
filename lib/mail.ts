import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { EnquiryPayload } from "@/lib/enquiry";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const user = (
    process.env.SMTP_USER?.trim().toLowerCase() ||
    process.env.NEXT_PUBLIC_EMAIL?.trim().toLowerCase() ||
    ""
  ).trim();
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, "") || "";
  if (!user || !pass) return null;

  const to = (
    process.env.CONTACT_INBOX?.trim().toLowerCase() || user
  ).trim();
  const from =
    process.env.SMTP_FROM?.trim() ||
    `NESTRO Website <${user}>`;

  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user,
    pass,
    from,
    to,
  };
}

let cachedTransport: Transporter | null = null;
let cachedKey = "";

function getTransport(config: SmtpConfig): Transporter {
  const key = `${config.host}:${config.port}:${config.user}`;
  if (cachedTransport && cachedKey === key) return cachedTransport;
  cachedTransport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  cachedKey = key;
  return cachedTransport;
}

export function formatEnquiryPlainText(payload: EnquiryPayload): string {
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
  ];
  if (payload.service) lines.push(`Service: ${payload.service}`);
  if (payload.language) lines.push(`Language: ${payload.language}`);
  if (payload.source) lines.push(`Source: ${payload.source}`);
  if (payload.sourceUrl) lines.push(`Page: ${payload.sourceUrl}`);
  if (payload.utmSource) lines.push(`UTM: ${payload.utmSource}`);
  lines.push("", payload.message?.trim() || "(No message provided)");
  return lines.join("\n");
}

export function enquirySubject(payload: EnquiryPayload): string {
  const service = payload.service?.trim();
  const label = service ? ` — ${service}` : "";
  return `[NESTRO Website] Enquiry from ${payload.name.trim()}${label}`;
}

function formatEnquiryHtml(payload: EnquiryPayload): string {
  const text = formatEnquiryPlainText(payload)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">${text}</body></html>`;
}

export async function verifySmtpConnection(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const config = getSmtpConfig();
  if (!config) {
    return { ok: false, error: "SMTP_USER or SMTP_APP_PASSWORD not set" };
  }
  try {
    await getTransport(config).verify();
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export async function sendEnquiryViaSmtp(
  payload: EnquiryPayload,
): Promise<boolean> {
  const config = getSmtpConfig();
  if (!config) return false;

  const replyTo = payload.email.trim();
  const subject = enquirySubject(payload);
  const text = formatEnquiryPlainText(payload);
  const html = formatEnquiryHtml(payload);

  try {
    await getTransport(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo,
      subject,
      text,
      html,
      headers: {
        "X-Entity-Ref-ID": `nestro-enquiry-${Date.now()}`,
        Precedence: "auto",
      },
    });
    return true;
  } catch (err) {
    console.error("SMTP send error:", err);
    return false;
  }
}

export async function sendSmtpTestMessage(): Promise<{
  ok: boolean;
  messageId?: string;
  error?: string;
}> {
  const config = getSmtpConfig();
  if (!config) {
    return { ok: false, error: "SMTP_USER or SMTP_APP_PASSWORD not set" };
  }

  const verify = await verifySmtpConnection();
  if (!verify.ok) return { ok: false, error: verify.error };

  try {
    const info = await getTransport(config).sendMail({
      from: config.from,
      to: config.to,
      subject: "[NESTRO Website] SMTP test — contact form",
      text: [
        "This is a test message from the NESTRO site SMTP setup.",
        "",
        `Sent at: ${new Date().toISOString()}`,
        `SMTP user: ${config.user}`,
        `Inbox: ${config.to}`,
        "",
        "If this landed in your inbox (not Spam), the contact form is configured correctly.",
      ].join("\n"),
      html: `<p>This is a <strong>SMTP test</strong> from the NESTRO contact form.</p><p>Sent at: ${new Date().toISOString()}</p>`,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
