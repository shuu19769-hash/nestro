"use client";

import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { catalog, catalogCollections, localized } from "@/lib/catalog";
import { useUiStore } from "@/lib/store";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [queryString, setQueryString] = useState("");
  const mobileDialog = useRef<HTMLDivElement>(null);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const path = usePathname();
  const ar = path.startsWith("/ar");
  const prefix = ar ? "/ar" : "";
  const openOverlay = useUiStore((state) => state.open);
  const wishlistCount = useUiStore((state) => state.wishlist.length);
  const quoteCount = useUiStore((state) => state.quote.length);
  const switchPath = ar
    ? path.replace(/^\/ar/, "") || "/"
    : `/ar${path === "/" ? "" : path}`;
  const switchHref = `${switchPath}${queryString}`;
  const active = (href: string) =>
    path === `${prefix}${href}` || path.startsWith(`${prefix}${href}/`);
  const locale = ar ? "ar" : "en";
  const nav = ar
    ? [
        { label: "أثاث حسب الطلب", href: "/custom-furniture" },
        { label: "الستائر والحجب", href: "/blinds-curtains" },
        { label: "التنجيد", href: "/upholstery" },
        { label: "المطابخ", href: "/kitchens" },
        { label: "بلاط الحمامات", href: "/washroom-tiles" },
        { label: "المشاريع", href: "/projects" },
        { label: "تواصل معنا", href: "/contact" },
      ]
    : [
        { label: "Custom furniture", href: "/custom-furniture" },
        { label: "Blinds & curtains", href: "/blinds-curtains" },
        { label: "Upholstery", href: "/upholstery" },
        { label: "Kitchens", href: "/kitchens" },
        { label: "Washroom tiles", href: "/washroom-tiles" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ];
  const groups = [
    {
      ...nav[0],
      items: catalog.filter((item) => item.collection === "custom-furniture"),
    },
    {
      ...nav[1],
      items: catalog.filter(
        (item) =>
          item.collection === "blinds" || item.collection === "curtains",
      ),
    },
    {
      ...nav[2],
      items: catalog.filter(
        (item) =>
          item.collection === "indoor-upholstery" ||
          item.collection === "outdoor-upholstery",
      ),
    },
    {
      ...nav[3],
      items: catalog.filter((item) => item.collection === "kitchen-cabinets"),
    },
    {
      ...nav[4],
      items: catalog.filter((item) => item.collection === "washroom-tiles"),
    },
  ];

  useEffect(() => {
    setQueryString(window.location.search);
    setActiveMenu(null);
  }, [path]);

  useEffect(
    () => () => {
      if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    },
    [],
  );

  const openMenu = (href: string) => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    setActiveMenu(href);
  };

  const scheduleMenuClose = () => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = setTimeout(() => setActiveMenu(null), 280);
  };

  const completeMenuNavigation = () => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    setActiveMenu(null);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => [
      ...(mobileDialog.current?.querySelectorAll<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])",
      ) ?? []),
    ];
    focusable()[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const labels = ar
    ? {
        open: "فتح قائمة التنقل",
        close: "إغلاق القائمة",
        primary: "التنقل الرئيسي",
        search: "البحث",
        wishlist: "المفضلة",
        quote: "طلب عرض سعر",
        language: "التبديل إلى الإنجليزية",
      }
    : {
        open: "Open navigation",
        close: "Close navigation",
        primary: "Primary navigation",
        search: "Search",
        wishlist: "Wishlist",
        quote: "Quote",
        language: "Switch to Arabic",
      };

  return (
    <>
      <AnnouncementBar ar={ar} />
      <div className="hidden" dir={ar ? "rtl" : "ltr"}>
        {ar
          ? "استشارة تصميم مجانية · توصيل في جميع أنحاء الإمارات"
          : "Complimentary design consultation · Delivery across the UAE"}
      </div>
      <header
        className="brand-header sticky top-0 z-40 border-b border-white/15"
        dir={ar ? "rtl" : "ltr"}
      >
        <div className="container-site relative flex h-[68px] min-w-0 items-center justify-between gap-1 sm:h-[76px] sm:gap-5">
          <button
            className="icon-button lg:!hidden"
            aria-label={labels.open}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <Link
            href={prefix || "/"}
            aria-label={ar ? "الصفحة الرئيسية لنسترو" : "NESTRO home"}
            className="relative w-[90px] shrink-0 transition hover:brightness-110 sm:w-[116px]"
          >
            <Image
              src="/brand/nestro-wordmark-c79538.png"
              alt="NESTRO"
              width={116}
              height={39}
              className="h-auto w-full object-contain"
              priority
            />
          </Link>
          <nav
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
            aria-label={labels.primary}
          >
            {groups.map((group) => {
              const groupActive =
                active(group.href) ||
                group.items.some(
                  (item) => path === `${prefix}/shop/${item.slug}`,
                );
              return (
                <div
                  className="group/menu static"
                  key={group.href}
                  onPointerEnter={() => openMenu(group.href)}
                  onPointerLeave={scheduleMenuClose}
                  onFocusCapture={() => openMenu(group.href)}
                >
                  <Link
                    href={`${prefix}${group.href}`}
                    aria-current={groupActive ? "page" : undefined}
                    aria-expanded={activeMenu === group.href}
                    className="header-nav-link flex items-center gap-1 rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-[.07em] transition xl:px-3 xl:text-[11px]"
                  >
                    {group.label}
                    <ChevronDown size={12} />
                  </Link>
                  <div
                    className={`modal-panel absolute start-1/2 top-[calc(100%-1px)] max-h-[calc(100vh-8rem)] w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto overscroll-contain p-5 transition-opacity duration-200 rtl:translate-x-1/2 ${activeMenu === group.href ? "visible opacity-100" : "invisible opacity-0"}`}
                    onPointerEnter={() => openMenu(group.href)}
                    onPointerLeave={scheduleMenuClose}
                  >
                    <div className="flex items-end justify-between gap-5 border-b fine-border pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[.16em] text-sage">
                          {group.label}
                        </span>
                        <p className="mt-1 text-sm text-black/55">
                          {group.items.length}{" "}
                          {ar ? "خياراً متخصصاً" : "specialist offerings"}
                        </p>
                      </div>
                      <a
                        href={`${prefix}${group.href}`}
                        onClick={completeMenuNavigation}
                        className="text-xs font-bold text-sage"
                      >
                        {ar ? "عرض القسم ←" : "View category →"}
                      </a>
                    </div>
                    <div
                      className={`mt-4 grid gap-1 ${group.items.length > 12 ? "grid-cols-4" : group.items.length > 6 ? "grid-cols-3" : "grid-cols-2"}`}
                    >
                      {group.items.map((item) => (
                        <a
                          key={item.slug}
                          href={`${prefix}/shop/${item.slug}`}
                          onClick={completeMenuNavigation}
                          className="rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-sage/10 hover:text-sage"
                        >
                          {localized(item.name, locale)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {nav.slice(5).map((item) => (
              <Link
                key={item.href}
                href={`${prefix}${item.href}`}
                aria-current={active(item.href) ? "page" : undefined}
                className="header-nav-link rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-[.07em] transition xl:px-3 xl:text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <a
              href={switchHref}
              className="icon-button border border-white/30 text-xs font-bold"
              aria-label={labels.language}
            >
              {ar ? "EN" : "ع"}
            </a>
            <button
              className="icon-button"
              aria-label={labels.search}
              onClick={() => openOverlay("search")}
            >
              <Search size={19} />
            </button>
            <button
              className="icon-button relative !hidden sm:!inline-grid"
              aria-label={labels.wishlist}
              onClick={() => openOverlay("wishlist")}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute end-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-sage px-1 text-[9px] text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              className="icon-button relative"
              aria-label={labels.quote}
              onClick={() => openOverlay("quote")}
            >
              <ShoppingBag size={19} />
              {quoteCount > 0 && (
                <span className="absolute end-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-sage px-1 text-[9px] text-white">
                  {quoteCount}
                </span>
              )}
            </button>
            <button
              className="button button-primary ms-2 !hidden !min-h-[44px] !px-4 xl:!inline-flex"
              onClick={() => openOverlay("consultation")}
            >
              {ar ? "احجز استشارة" : "Book consultation"}
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/45 p-2 backdrop-blur-sm lg:hidden"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setMobileOpen(false);
          }}
        >
          <div
            ref={mobileDialog}
            className="mobile-nav-drawer modal-panel ms-auto h-full w-full max-w-md overflow-y-auto overscroll-contain bg-ivory p-5"
            dir={ar ? "rtl" : "ltr"}
            role="dialog"
            aria-modal="true"
            aria-label={labels.primary}
          >
            <div className="flex items-center justify-between border-b fine-border pb-5">
              <Image
                src="/brand/nestro-wordmark-gold.png"
                alt="NESTRO"
                width={116}
                height={36}
                className="h-auto w-[116px]"
              />
              <button
                className="icon-button"
                onClick={() => setMobileOpen(false)}
                aria-label={labels.close}
              >
                <X />
              </button>
            </div>
            <nav className="mt-5 flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`${prefix}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b fine-border py-4 text-xl font-medium sm:text-2xl ${active(item.href) ? "text-sage" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={switchHref}
                onClick={() => setMobileOpen(false)}
                className="border-b fine-border py-4 text-xl font-medium"
              >
                {ar ? "English" : "العربية"}
              </a>
            </nav>
            <p className="divider-label mt-7">
              {ar ? "جميع الخدمات" : "All services"}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {catalogCollections.map((collection) => (
                <Link
                  prefetch={false}
                  key={collection.slug}
                  href={`${prefix}/shop?collection=${collection.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="surface-card p-3 text-sm"
                >
                  {localized(collection.name, ar ? "ar" : "en")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
