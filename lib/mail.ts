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

function formatServiceLabel(slug?: string): string {
  if (!slug?.trim()) return "—";
  return slug
    .trim()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatEnquiryPlainText(payload: EnquiryPayload): string {
  const service = formatServiceLabel(payload.service);
  const lines = [
    "NESTRO — New website enquiry",
    "────────────────────────────",
    "",
    `Name:     ${payload.name.trim()}`,
    `Phone:    ${payload.phone.trim()}`,
    `Email:    ${payload.email.trim()}`,
    `Service:  ${service}`,
  ];
  if (payload.language) lines.push(`Language: ${payload.language}`);
  if (payload.sourceUrl) lines.push(`Page:     ${payload.sourceUrl}`);
  lines.push(
    "",
    "Message",
    "───────",
    payload.message?.trim() || "(No message provided)",
    "",
    "Reply to this email to respond directly to the customer.",
  );
  return lines.join("\n");
}

export function enquirySubject(payload: EnquiryPayload): string {
  const service = formatServiceLabel(payload.service);
  return `[NESTRO] New enquiry — ${payload.name.trim()} (${service})`;
}

function formatEnquiryHtml(payload: EnquiryPayload): string {
  const service = formatServiceLabel(payload.service);
  const message = escapeHtml(
    payload.message?.trim() || "(No message provided)",
  ).replace(/\r?\n/g, "<br>");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:120px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#111">${escapeHtml(value)}</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:Manrope,Segoe UI,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.06)">
        <tr><td style="background:#1c1c1c;padding:28px 32px">
          <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c79538;font-weight:700">NESTRO</p>
          <h1 style="margin:10px 0 0;font-size:22px;font-weight:600;color:#fff;line-height:1.3">New website enquiry</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", payload.name.trim())}
            ${row("Phone", payload.phone.trim())}
            ${row("Email", payload.email.trim())}
            ${row("Service", service)}
            ${payload.sourceUrl ? row("Page", payload.sourceUrl) : ""}
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px 32px">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#888">Message</p>
          <div style="padding:16px;background:#faf8f4;border-radius:12px;font-size:14px;line-height:1.6;color:#222">${message}</div>
          <p style="margin:24px 0 0;font-size:12px;color:#888">Reply to this email to reach the customer directly.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
