import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "تواصل معنا واحجز استشارة",
  description:
    "تواصل مع نسترو لاستشارات الأثاث والستائر والتنجيد والحلول الداخلية في دولة الإمارات.",
  alternates: {
    canonical: "/ar/contact/",
    languages: { en: "/contact/", ar: "/ar/contact/" },
  },
};

export default function ArabicContactPage() {
  return (
    <>
      <section className="container-site pb-12 pt-16 md:pb-20 md:pt-24">
        <span className="eyebrow">تواصل مع نسترو</span>
        <h1 className="display mt-6 max-w-5xl">
          لنبدأ
          <br />
          بمحادثة.
        </h1>
        <p className="subheading mt-7">
          أخبرنا عن القطعة أو الغرفة أو المشروع الذي تفكر فيه، وسنوصلك بمستشار
          التصميم المناسب.
        </p>
      </section>
      <section className="section section-soft">
        <div className="container-site grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
          <div>
            <h2 className="text-2xl font-medium">تحدث مع الاستوديو</h2>
            <div className="mt-7 space-y-3">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <Phone className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">اتصل بنا</strong>
                  <small dir="ltr" className="mt-1 block text-black/55">
                    {CONTACT.phone}
                  </small>
                </span>
              </a>
              <a
                href={whatsappUrl("مرحباً نسترو، أود حجز استشارة.")}
                target="_blank"
                rel="noreferrer"
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <MessageCircle className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">واتساب</strong>
                  <small className="mt-1 block text-black/55">
                    نرد عادةً خلال ساعات عمل الاستوديو
                  </small>
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <Mail className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">البريد الإلكتروني</strong>
                  <small
                    dir="ltr"
                    className="mt-1 block break-all text-black/55"
                  >
                    {CONTACT.email}
                  </small>
                </span>
              </a>
              <div className="surface-card flex items-start gap-4 p-4">
                <Clock className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">ساعات العمل</strong>
                  <small className="mt-1 block text-black/55">
                    الاثنين–السبت، 9:00 صباحاً–6:00 مساءً
                  </small>
                </span>
              </div>
            </div>
            <h2 className="mt-10 text-2xl font-medium sm:mt-12">
              نخدم جميع أنحاء الإمارات
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/60">
              تتوفر الاستشارات وخدمات القياس والتوصيل والتركيب بحسب نطاق المشروع
              وموقعه.
            </p>
          </div>
          <ContactForm locale="ar" />
        </div>
      </section>
    </>
  );
}
