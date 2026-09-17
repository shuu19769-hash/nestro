import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import site from "@/data/site-config.json";
import { CONTACT, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact & Book a Consultation",
  description:
    "Contact NESTRO for furniture, curtain, upholstery and interior consultations across the UAE.",
};
export default function ContactPage() {
  return (
    <>
      <section className="container-site pb-12 pt-16 md:pb-20 md:pt-24">
        <span className="eyebrow">Contact NESTRO</span>
        <h1 className="display mt-6 max-w-5xl">
          Let’s begin with
          <br />a conversation.
        </h1>
        <p className="subheading mt-7">
          Tell us about the piece, room or project you have in mind. We’ll
          connect you with the right design advisor.
        </p>
      </section>
      <section className="section section-soft">
        <div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-medium">Speak to the studio</h2>
            <div className="mt-7 space-y-3">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <Phone className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">Call us</strong>
                  <small dir="ltr" className="mt-1 block text-black/55">
                    {CONTACT.phone}
                  </small>
                </span>
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <MessageCircle className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">WhatsApp</strong>
                  <small className="mt-1 block text-black/55">
                    Typically answered during studio hours
                  </small>
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="surface-card interactive-card flex items-start gap-4 p-4"
              >
                <Mail className="mt-1 text-sage" size={20} />
                <span>
                  <strong className="block text-sm">Email</strong>
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
                  <strong className="block text-sm">Studio hours</strong>
                  <small className="mt-1 block text-black/55">
                    {site.hours}
                  </small>
                </span>
              </div>
            </div>
            <h2 className="mt-12 text-2xl font-medium">Across the UAE</h2>
            <div className="mt-6 space-y-4">
              {site.locations.map((location) => (
                <div
                  key={location.city}
                  className="flex gap-4 border-t fine-border pt-4"
                >
                  <MapPin className="mt-1 text-sage" size={19} />
                  <p>
                    <strong className="block text-sm">{location.city}</strong>
                    <span className="text-xs text-black/55">
                      {location.address}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="container-site py-4">
        <div className="surface-card grid min-h-[400px] place-items-center text-center">
          <div>
            <MapPin className="mx-auto text-sage" size={28} />
            <h2 className="mt-5 text-2xl font-medium">
              NESTRO design studio · UAE
            </h2>
            <p className="mt-2 text-sm text-black/55">
              Exact appointment location is confirmed with your design advisor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
