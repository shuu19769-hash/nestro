import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/lib/enquiry";
import { sendEnquiryViaSmtp } from "@/lib/mail";

export const runtime = "nodejs";

function isValidPayload(body: unknown): body is EnquiryPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as EnquiryPayload;
  if (p.company?.trim()) return false;
  const email = p.email?.trim() || "";
  const name = p.name?.trim() || "";
  const phone = p.phone?.trim() || "";
  if (!name || name.length < 2) return false;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  if (phone.replace(/\D/g, "").length < 7) return false;
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "invalid_enquiry" }, { status: 400 });
  }

  const payload: EnquiryPayload = {
    ...body,
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
  };

  const sent = await sendEnquiryViaSmtp(payload);

  if (!sent) {
    return NextResponse.json(
      {
        error: "smtp_send_failed",
        hint: "Set SMTP_USER and SMTP_APP_PASSWORD (Gmail app password) on the server.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
