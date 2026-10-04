/**
 * Loads .env.local then runs Gmail SMTP verify + sends one test email.
 * Usage: node scripts/test-smtp.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadEnvFile(envPath);

const user = (
  process.env.SMTP_USER ||
  process.env.NEXT_PUBLIC_EMAIL ||
  ""
)
  .trim()
  .toLowerCase();
const pass = (process.env.SMTP_APP_PASSWORD || "").replace(/\s/g, "");
const to = (process.env.CONTACT_INBOX || user).trim().toLowerCase();
const from = process.env.SMTP_FROM?.trim() || `NESTRO Website <${user}>`;
const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || "587");

if (!user || !pass) {
  console.error("Missing SMTP_USER or SMTP_APP_PASSWORD in .env.local");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  requireTLS: true,
  auth: { user, pass },
});

console.log("SMTP config:", { host, port, user, to, from: from.replace(pass, "***") });

try {
  console.log("Step 1: verify connection…");
  await transport.verify();
  console.log("  OK — Gmail SMTP accepted credentials.");

  console.log("Step 2: send test email…");
  const info = await transport.sendMail({
    from,
    to,
    subject: "[NESTRO Website] SMTP test — contact form",
    text: [
      "NESTRO contact form SMTP test.",
      "",
      `Time: ${new Date().toISOString()}`,
      "Check inbox (and Spam once) for this message.",
    ].join("\n"),
  });
  console.log("  OK — message sent:", info.messageId);
  console.log("\nDone. Open", to, "and confirm the test email arrived.");
} catch (err) {
  console.error("SMTP test FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
}
