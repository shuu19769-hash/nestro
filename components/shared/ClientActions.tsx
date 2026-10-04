"use client";

import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/constants";
import { mailtoHref } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { useUiStore } from "@/lib/store";

export function ConsultationButton({ children, className = "button button-primary" }: { children?: React.ReactNode; className?: string }) {
  const open = useUiStore((state) => state.open);
  const ar = usePathname().startsWith("/ar");
  return <button className={className} onClick={() => open("consultation")}>{children ?? (ar ? "احجز استشارة" : "Book a consultation")}</button>;
}

export function WhatsAppFab() {
  const pathname = usePathname();
  const ar = pathname.startsWith("/ar");
  const detailPage = /\/shop\/[^/]+/.test(pathname);
  const message = ar ? "مرحباً نسترو، أود حجز استشارة." : undefined;
  const emailHref = mailtoHref(ar ? "ar" : "en");
  return <div className={`fixed end-4 z-30 flex flex-col items-center gap-3 sm:end-5 ${detailPage ? "bottom-24 md:bottom-5" : "bottom-5"}`}>
    <a href={emailHref} aria-label={ar ? "راسل نسترو عبر البريد الإلكتروني" : "Email NESTRO"} className="grid h-13 w-13 place-items-center rounded-full bg-brand text-on-gold shadow-[0_0_0_7px_rgba(199,149,56,.16),0_14px_34px_rgba(80,59,23,.22)] transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage sm:h-14 sm:w-14"><Mail size={25} strokeWidth={2.2} /></a>
    <a href={whatsappUrl(message)} onClick={() => track("whatsapp", { pathname })} target="_blank" rel="noreferrer" aria-label={ar ? "تواصل مع نسترو عبر واتساب" : "Chat with NESTRO on WhatsApp"} className="whatsapp-action grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage sm:h-14 sm:w-14"><svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current"><path d="M16.02 3.2A12.74 12.74 0 0 0 5.1 22.46L3.2 28.8l6.5-1.84A12.8 12.8 0 1 0 16.02 3.2Zm0 23.4a10.56 10.56 0 0 1-5.38-1.48l-.39-.23-3.86 1.09 1.12-3.76-.25-.39a10.58 10.58 0 1 1 8.76 4.77Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-1 1.24-.18.21-.37.24-.69.08a8.67 8.67 0 0 1-2.55-1.57 9.6 9.6 0 0 1-1.77-2.21c-.18-.31 0-.47.14-.62.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61a1.17 1.17 0 0 0-.85.4 3.55 3.55 0 0 0-1.11 2.64c0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.43 5.45 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.88-.77 2.15-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" /></svg></a>
  </div>;
}

export function AddToQuoteButton({ slug, className = "button button-dark", children }: { slug: string; className?: string; children?: React.ReactNode }) {
  const add = useUiStore((state) => state.addToQuote);
  const ar = usePathname().startsWith("/ar");
  return <button className={className} onClick={() => add(slug)}>{children ?? (ar ? "اطلب عرض سعر" : "Request quote")}</button>;
}
