"use client";
import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import {
  ArrowRight,
  Check,
  Heart,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { catalog, bySlug, localized, startingPrice } from "@/lib/catalog";
import { submitEnquiry } from "@/lib/enquiry";
import { useUiStore } from "@/lib/store";
import type { CatalogOffering, QuoteLine } from "@/types";
function Drawer({
  title,
  children,
  onClose,
  ar = false,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  ar?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop fixed inset-0 z-[70]"
      onMouseDown={(e) => e.currentTarget === e.target && onClose()}
    >
      <aside
        className="ms-auto flex h-full w-full max-w-lg flex-col border-s border-white/30 bg-ivory shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b fine-border px-6 py-5">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="icon-button"
            ref={closeRef}
            onClick={onClose}
            aria-label={ar ? "إغلاق" : "Close"}
          >
            <X />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}
function Empty({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="grid min-h-72 place-items-center text-center">
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/10 text-sage">
          {icon}
        </span>
        <h3 className="mt-5 text-xl font-medium">{title}</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-black/60">
          {copy}
        </p>
      </div>
    </div>
  );
}
function Row({
  item,
  line,
  action,
  ar = false,
}: {
  item: CatalogOffering;
  line?: QuoteLine;
  action?: React.ReactNode;
  ar?: boolean;
}) {
  const price = startingPrice(item),
    locale = ar ? "ar" : "en",
    prefix = ar ? "/ar" : "";
  return (
    <div className="flex gap-4 border-b fine-border py-4">
      <Image
        src={item.images[0]}
        alt=""
        width={120}
        height={100}
        className="h-24 w-24 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <Link
          href={`${prefix}/shop/${item.slug}`}
          className="font-medium hover:text-sage"
        >
          {localized(item.name, locale)}
        </Link>
        <p className="mt-1 text-sm text-black/55">
          {line?.option ||
            (price
              ? `${ar ? "من" : "From"} AED ${price}/m²`
              : ar
                ? "حسب الطلب"
                : "By quote")}
          {line?.width
            ? ` · ${line.width} × ${line.height} cm · ${ar ? "الكمية" : "Qty"} ${line.quantity}`
            : ""}
        </p>
        {line?.estimate && (
          <strong className="mt-1 block text-sm">
            {ar ? "تقديري" : "Est."} AED {line.estimate.toLocaleString()}
          </strong>
        )}
        <div className="mt-3">{action}</div>
      </div>
    </div>
  );
}
function SearchBox({
  onClose,
  ar = false,
}: {
  onClose: () => void;
  ar?: boolean;
}) {
  const [query, setQuery] = useState(""),
    locale = ar ? "ar" : "en",
    prefix = ar ? "/ar" : "";
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const synonyms: Record<string, string> = {
      zebra: "duplex",
      roman: "fabric blind",
      sofa: "upholstery",
      outdoor: "garden terrace",
      ستائر: "curtains blinds",
      تنجيد: "upholstery",
      أريكة: "sofa",
    };
    const expanded = `${q} ${synonyms[q] || ""}`;
    return catalog
      .filter(
        (x) =>
          `${x.name.en} ${x.name.ar} ${x.collection} ${x.rooms.join(" ")} ${x.materials.map((m) => `${m.name.en} ${m.name.ar}`).join(" ")}`
            .toLowerCase()
            .includes(q) || expanded.includes(x.slug.split("-")[0]),
      )
      .slice(0, 10);
  }, [query]);
  return (
    <div
      className="modal-backdrop fixed inset-0 z-[80] p-3 sm:p-10"
      dir={ar ? "rtl" : "ltr"}
      onMouseDown={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="modal-panel mx-auto max-h-[90vh] max-w-3xl overflow-y-auto p-5 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center gap-3 rounded-full border fine-border bg-ivory px-4 py-2">
          <Search className="text-sage" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              ar
                ? "ابحث في 49 خياراً للأثاث والمطابخ والستائر والتنجيد وبلاط الحمامات…"
                : "Search 49 furniture, kitchen, curtain, blind, upholstery and washroom options…"
            }
            className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none sm:text-lg"
          />
          <button
            className="icon-button"
            onClick={onClose}
            aria-label={ar ? "إغلاق" : "Close"}
          >
            <X />
          </button>
        </div>
        {!query ? (
          <p className="py-12 text-center text-sm text-black/50">
            {ar
              ? "جرّب «ستائر»، «تنجيد»، «آلي» أو «خارجي»."
              : "Try “roller”, “motorized”, “outdoor”, “linen” or “تنجيد”."}
          </p>
        ) : results.length ? (
          <div className="pt-3">
            {results.map((x) => (
              <Link
                prefetch={false}
                onClick={onClose}
                key={x.slug}
                href={`${prefix}/shop/${x.slug}`}
                className="interactive-card flex items-center justify-between rounded-xl px-3 py-4 hover:bg-sage/8"
              >
                <span>
                  <small className="block text-[10px] font-bold uppercase tracking-[.16em] text-sage">
                    {localized(x.badges[0], locale)}
                  </small>
                  <strong className="mt-1 block">
                    {localized(x.name, locale)}
                  </strong>
                </span>
                <ArrowRight className={ar ? "rotate-180" : ""} size={18} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-black/50">
            {ar
              ? "لا توجد نتائج. جرّب غرفة أو خامة أو خدمة."
              : "No matches. Try a room, material or service."}
          </p>
        )}
      </div>
    </div>
  );
}
function Consultation({
  onClose,
  ar = false,
}: {
  onClose: () => void;
  ar?: boolean;
}) {
  const [sent, setSent] = useState(false),
    [submitError, setSubmitError] = useState(""),
    submit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError("");
      const data = new FormData(e.currentTarget);
      const phone = String(data.get("phone") || "");
      if (phone.replace(/\D/g, "").length < 7) {
        setSubmitError(
          ar
            ? "يرجى إدخال رقم هاتف صحيح."
            : "Please enter a valid phone number.",
        );
        return;
      }
      try {
        await submitEnquiry({
          name: String(data.get("name") || ""),
          phone,
          email: String(data.get("email") || ""),
          service: String(data.get("service") || ""),
          message: ar
            ? "طلب استشارة من نافذة الموقع."
            : "Consultation request from site modal.",
          language: ar ? "ar" : "en",
          source: "consultation_modal",
          sourceUrl: location.href,
          utmSource:
            new URLSearchParams(location.search).get("utm_source") || "",
          nestro_hp: String(data.get("nestro_hp") || ""),
        });
        setSent(true);
      } catch {
        setSubmitError(
          ar
            ? "تعذر الإرسال. جرّب واتساب أو نموذج التواصل."
            : "Could not send. Try WhatsApp or the contact form.",
        );
      }
    };
  return (
    <div
      className="modal-backdrop fixed inset-0 z-[80] grid place-items-center p-3 sm:p-4"
      dir={ar ? "rtl" : "ltr"}
      onMouseDown={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="modal-panel relative max-h-[94vh] w-full max-w-xl overflow-y-auto p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          className="icon-button absolute end-4 top-4"
          onClick={onClose}
          aria-label={ar ? "إغلاق" : "Close"}
        >
          <X />
        </button>
        {sent ? (
          <div className="py-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage text-charcoal">
              <Check />
            </span>
            <h2 className="mt-6 text-3xl font-medium">
              {ar ? "شكراً لك." : "Thank you."}
            </h2>
            <p className="mt-3 text-black/60">
              {ar
                ? "سيتواصل معك مستشار من نسترو قريباً."
                : "A NESTRO advisor will be in touch shortly."}
            </p>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              {ar ? "موعد خاص" : "Private appointment"}
            </span>
            <h2 className="mt-5 text-3xl font-medium">
              {ar ? "لنصمم مساحتك معاً." : "Let’s shape your space."}
            </h2>
            <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
              <input
                type="text"
                name="nestro_hp"
                tabIndex={-1}
                autoComplete="new-password"
                className="absolute -left-[9999px] h-px w-px opacity-0"
                aria-hidden="true"
              />
              <label className="text-sm">
                {ar ? "الاسم" : "Name"}
                <input required name="name" className="control mt-2" />
              </label>
              <label className="text-sm">
                {ar ? "الهاتف" : "Phone"}
                <input
                  required
                  name="phone"
                  type="tel"
                  dir="ltr"
                  className="control mt-2"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                {ar ? "البريد الإلكتروني" : "Email"}
                <input
                  required
                  name="email"
                  type="email"
                  dir="ltr"
                  className="control mt-2"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                {ar ? "كيف يمكننا مساعدتك؟" : "What can we help with?"}
                <select name="service" className="control mt-2">
                  <option>{ar ? "أثاث حسب الطلب" : "Custom furniture"}</option>
                  <option>
                    {ar ? "ستائر وستائر عصرية" : "Curtains & blinds"}
                  </option>
                  <option>{ar ? "تنجيد داخلي" : "Indoor upholstery"}</option>
                  <option>{ar ? "تنجيد خارجي" : "Outdoor upholstery"}</option>
                </select>
              </label>
              <button className="button button-primary sm:col-span-2">
                {ar ? "اطلب استشارة" : "Request consultation"}
              </button>
              {submitError && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2"
                >
                  {submitError}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
function Quick({
  item,
  onClose,
  ar = false,
}: {
  item: CatalogOffering;
  onClose: () => void;
  ar?: boolean;
}) {
  const s = useUiStore(),
    price = startingPrice(item),
    locale = ar ? "ar" : "en",
    prefix = ar ? "/ar" : "";
  return (
    <Drawer ar={ar} title={ar ? "عرض سريع" : "Quick view"} onClose={onClose}>
      <div dir={ar ? "rtl" : "ltr"}>
        <Image
          src={item.images[0]}
          alt={localized(item.name, locale)}
          width={800}
          height={650}
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
        <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-sage">
          {localized(item.badges[0], locale)}
        </p>
        <h2 className="mt-2 text-3xl font-medium">
          {localized(item.name, locale)}
        </h2>
        <p className="mt-3 text-lg">
          {price
            ? `${ar ? "من" : "From"} AED ${price}/m²`
            : ar
              ? "حسب الطلب"
              : "By quote"}
        </p>
        <p className="mt-4 text-sm leading-7 text-black/65">
          {localized(item.summary, locale)}
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            onClick={() => s.addToQuote(item.slug)}
            className="button button-dark"
          >
            {ar ? "أضف للعرض" : "Add to quote"}
          </button>
          <button
            onClick={() => s.toggleWishlist(item.slug)}
            className="button button-outline"
          >
            <Heart size={17} />
            {ar ? "حفظ" : "Save"}
          </button>
        </div>
        <Link
          prefetch={false}
          href={`${prefix}/shop/${item.slug}`}
          onClick={onClose}
          className="mt-4 flex items-center justify-center gap-2 py-3 text-sm font-semibold"
        >
          {ar ? "كل التفاصيل" : "Full details"}
          <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
        </Link>
      </div>
    </Drawer>
  );
}
export function GlobalOverlays() {
  const s = useUiStore(),
    open = s.open,
    ar = usePathname().startsWith("/ar"),
    wishes = catalog.filter((x) => s.wishlist.includes(x.slug)),
    quick = bySlug(s.quickViewSlug || "");
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open("search");
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      {s.searchOpen && <SearchBox ar={ar} onClose={s.closeAll} />}{" "}
      {s.consultationOpen && <Consultation ar={ar} onClose={s.closeAll} />}{" "}
      {s.wishlistOpen && (
        <Drawer
          ar={ar}
          title={ar ? "قائمة المفضلة" : "Your wishlist"}
          onClose={s.closeAll}
        >
          {wishes.length ? (
            wishes.map((x) => (
              <Row
                ar={ar}
                key={x.slug}
                item={x}
                action={
                  <button
                    className="text-xs font-semibold text-sage"
                    onClick={() => s.addToQuote(x.slug)}
                  >
                    {ar ? "أضف للعرض" : "Add to quote"}
                  </button>
                }
              />
            ))
          ) : (
            <Empty
              icon={<Heart />}
              title={ar ? "مكان لاختياراتك المفضلة" : "A place for favourites"}
              copy={
                ar
                  ? "احفظ الخيارات أثناء الاستكشاف للعودة إليها لاحقاً."
                  : "Save offerings as you explore."
              }
            />
          )}
        </Drawer>
      )}{" "}
      {s.quoteOpen && (
        <Drawer
          ar={ar}
          title={ar ? "عرض السعر المهيأ" : "Your configured quote"}
          onClose={s.closeAll}
        >
          {s.quote.length ? (
            <>
              <div>
                {s.quote.map((line) => {
                  const item = bySlug(line.slug);
                  return item ? (
                    <Row
                      ar={ar}
                      key={line.id}
                      item={item}
                      line={line}
                      action={
                        <button
                          className="inline-flex items-center gap-1 text-xs text-black/45"
                          onClick={() => s.removeFromQuote(line.id)}
                        >
                          <Trash2 size={13} />
                          {ar ? "إزالة" : "Remove"}
                        </button>
                      }
                    />
                  ) : null;
                })}
              </div>
              <button
                className="button button-primary mt-5 w-full"
                onClick={() => {
                  s.closeAll();
                  s.open("consultation");
                }}
              >
                {ar ? "أرسل طلب عرض السعر" : "Send quote request"}
              </button>
            </>
          ) : (
            <Empty
              icon={<ShoppingBag />}
              title={ar ? "عرض السعر فارغ" : "Your quote is empty"}
              copy={
                ar
                  ? "هيئ أحد الخيارات وأضف قياساته هنا."
                  : "Configure an offering and add its measurements here."
              }
            />
          )}
        </Drawer>
      )}{" "}
      {quick && (
        <Quick ar={ar} item={quick} onClose={() => s.setQuickView(null)} />
      )}
    </div>
  );
}
