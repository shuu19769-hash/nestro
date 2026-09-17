"use client";
import { Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { reportGoogleAdsContactConversion } from "@/components/analytics/GoogleAdsTag";
import { track } from "@/lib/analytics";

export function ContactForm({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar",
    [sent, setSent] = useState(false),
    [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget),
      phone = String(data.get("phone") || "");
    if (phone.replace(/\D/g, "").length < 7) {
      setError(
        ar ? "يرجى إدخال رقم هاتف صحيح." : "Please enter a valid phone number.",
      );
      return;
    }
    try {
      if (
        CONTACT.formEndpoint &&
        CONTACT.formAccessKey &&
        CONTACT.formAccessKey !== "your_key_here"
      ) {
        data.append("access_key", CONTACT.formAccessKey);
        const response = await fetch(CONTACT.formEndpoint, {
          method: "POST",
          body: data,
        });
        if (!response.ok) throw new Error();
      }
      track("consultation", { source: "contact_form", locale });
      reportGoogleAdsContactConversion();
      setSent(true);
    } catch {
      setError(
        ar
          ? "تعذر إرسال طلبك. يرجى التواصل معنا عبر واتساب أو الهاتف."
          : "We could not send your request. Please try WhatsApp or call us instead.",
      );
    }
  };
  if (sent)
    return (
      <div
        className="surface-card grid min-h-[420px] place-items-center p-8 text-center sm:min-h-[520px]"
        dir={ar ? "rtl" : "ltr"}
      >
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage text-charcoal">
            <Check />
          </span>
          <h2 className="mt-6 text-3xl font-medium">
            {ar ? "تم استلام طلبك." : "We have your enquiry."}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/60">
            {ar
              ? "سيتواصل معك مستشار من نسترو قريباً لتحديد الخطوة المناسبة."
              : "A NESTRO advisor will contact you shortly to understand the right next step."}
          </p>
        </div>
      </div>
    );
  const services = [
    ["custom-furniture", ar ? "أثاث حسب الطلب" : "Custom furniture"],
    ["curtains-blinds", ar ? "ستائر وحجب ضوء" : "Curtains & blinds"],
    ["upholstery", ar ? "تنجيد" : "Upholstery"],
    ["kitchens", ar ? "خزائن المطابخ" : "Kitchen cabinets"],
    [
      "washroom-tiles",
      ar ? "بلاط وتجديد الحمامات" : "Washroom tiles & renovation",
    ],
    ["interiors", ar ? "حلول داخلية" : "Interior solutions"],
    ["trade", ar ? "مشروع تجاري" : "Trade / commercial"],
    ["other", ar ? "خدمة أخرى" : "Something else"],
  ];
  return (
    <form
      onSubmit={submit}
      className="surface-card p-5 shadow-sm sm:p-9"
      dir={ar ? "rtl" : "ltr"}
    >
      <input type="hidden" name="language" value={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {ar ? "الاسم" : "Name"}
          <input
            required
            name="name"
            autoComplete="name"
            className="control mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          {ar ? "الهاتف" : "Phone"}
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className="control mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          {ar ? "البريد الإلكتروني" : "Email"}
          <input
            required
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            className="control mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          {ar ? "الخدمة المطلوبة" : "I’m interested in"}
          <select name="service" className="control mt-2">
            {services.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {ar ? "أخبرنا عن مساحتك" : "Tell us about your space"}
          <textarea
            required
            name="message"
            placeholder={
              ar
                ? "نوع الغرفة، الموقع، النطاق التقريبي وأي تفاصيل مفيدة…"
                : "Room, location, approximate scope and anything else that would help…"
            }
            className="control mt-2 min-h-36"
          />
        </label>
        <label className="flex items-start gap-3 text-xs leading-5 text-black/55 sm:col-span-2">
          <input
            required
            type="checkbox"
            name="consent"
            className="mt-1 accent-sage"
          />
          {ar
            ? "أوافق على استخدام نسترو لهذه البيانات للرد على طلبي."
            : "I consent to NESTRO using these details to respond to my enquiry."}
        </label>
        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2"
          >
            {error}
          </p>
        )}
        <button className="button button-primary sm:col-span-2">
          {ar ? "إرسال الطلب" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
