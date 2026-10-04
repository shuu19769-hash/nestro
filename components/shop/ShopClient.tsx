"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { catalogCollections, localized, localizedRoom } from "@/lib/catalog";
import type { CatalogOffering, Locale } from "@/types";
import { ProductCard } from "./ProductCard";

const labels = {
  en: {
    filters: "Refine services",
    collection: "Service family",
    room: "Room / use",
    material: "Material",
    operation: "Operation",
    environment: "Environment",
    all: "All",
    manual: "Manual",
    motorized: "Motorized",
    indoor: "Indoor",
    outdoor: "Outdoor",
    results: "services",
    clear: "Clear filters",
    empty: "No services match these filters.",
    emptyHelp: "Remove a filter or explore another service family.",
    show: "Show filters",
  },
  ar: {
    filters: "تصفية الخدمات",
    collection: "مجموعة الخدمات",
    room: "الغرفة / الاستخدام",
    material: "الخامة",
    operation: "التشغيل",
    environment: "المكان",
    all: "الكل",
    manual: "يدوي",
    motorized: "آلي",
    indoor: "داخلي",
    outdoor: "خارجي",
    results: "خدمة",
    clear: "مسح التصفية",
    empty: "لا توجد خدمات مطابقة.",
    emptyHelp: "أزل أحد عوامل التصفية أو اختر مجموعة خدمات أخرى.",
    show: "إظهار عوامل التصفية",
  },
};

export function ShopClient({
  products,
  locale = "en",
}: {
  products: CatalogOffering[];
  locale?: Locale;
}) {
  const text = labels[locale];
  const pathname = usePathname();
  const search = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const collection = search.get("collection") ?? "All";
  const room = search.get("room") ?? "All";
  const material = search.get("material") ?? "All";
  const operation = search.get("operation") ?? "All";
  const environment = search.get("environment") ?? "All";

  const rooms = [
    "All",
    ...Array.from(new Set(products.flatMap((item) => item.rooms))),
  ];
  const materials = [
    "All",
    ...Array.from(
      new Set(
        products.flatMap((item) =>
          item.materials.map((entry) => entry.name.en),
        ),
      ),
    ),
  ];
  const active = [collection, room, material, operation, environment].filter(
    (value) => value !== "All",
  ).length;
  const update = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    if (value === "All") params.delete(key);
    else params.set(key, value);
    window.history.replaceState(null, "", `${pathname}${params.size ? `?${params}` : ""}`);
  };

  const filtered = useMemo(
    () =>
      products
        .filter(
          (item) =>
            (collection === "All" || item.collection === collection) &&
            (room === "All" || item.rooms.includes(room)) &&
            (material === "All" ||
              item.materials.some((entry) => entry.name.en === material)) &&
            (operation === "All" ||
              (operation === "motorized"
                ? item.motorization
                : !item.motorization)) &&
            (environment === "All" || item.indoorOutdoor === environment),
        )
        .sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        ),
    [products, collection, room, material, operation, environment],
  );

  const Select = ({
    label,
    name,
    value,
    values,
  }: {
    label: string;
    name: string;
    value: string;
    values: { value: string; label: string }[];
  }) => (
    <label className="block text-xs font-bold uppercase tracking-[.12em] text-black/65">
      {label}
      <select
        value={value}
        onChange={(event) => update(name, event.target.value)}
        className="control mt-2 text-sm font-normal normal-case tracking-normal"
      >
        {values.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
  const Filters = () => (
    <div className="space-y-6">
      <Select
        label={text.collection}
        name="collection"
        value={collection}
        values={[
          { value: "All", label: text.all },
          ...catalogCollections.map((entry) => ({
            value: entry.slug,
            label: localized(entry.name, locale),
          })),
        ]}
      />
      <Select
        label={text.room}
        name="room"
        value={room}
        values={rooms.map((value) => ({
          value,
          label: value === "All" ? text.all : localizedRoom(value, locale),
        }))}
      />
      <Select
        label={text.material}
        name="material"
        value={material}
        values={materials.map((value) => ({
          value,
          label: value === "All" ? text.all : locale === "ar" ? localized(products.flatMap((item) => item.materials).find((entry) => entry.name.en === value)?.name || { en: value, ar: value }, locale) : value,
        }))}
      />
      <Select
        label={text.operation}
        name="operation"
        value={operation}
        values={[
          { value: "All", label: text.all },
          { value: "manual", label: text.manual },
          { value: "motorized", label: text.motorized },
        ]}
      />
      <Select
        label={text.environment}
        name="environment"
        value={environment}
        values={[
          { value: "All", label: text.all },
          { value: "indoor", label: text.indoor },
          { value: "outdoor", label: text.outdoor },
        ]}
      />
      {active > 0 && (
        <button
          className="text-xs font-semibold text-sage hover:underline"
          onClick={() => window.history.replaceState(null, "", pathname)}
        >
          {text.clear}
        </button>
      )}
    </div>
  );

  return (
    <section className="container-site pb-24">
      <div className="flex items-center justify-between border-y fine-border py-4">
        <p className="text-sm text-black/60">
          <strong className="text-charcoal">{filtered.length}</strong>{" "}
          {text.results}
        </p>
        <button
          className="button button-outline !min-h-10 lg:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal size={16} />
          {text.show}
          {active > 0 && ` (${active})`}
        </button>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="surface-card sticky top-[150px] hidden h-fit p-5 lg:block">
          <p className="divider-label mb-6">{text.filters}</p>
          <Filters />
        </aside>
        <div>
          {filtered.length ? (
            <div data-motion-group="stagger" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <ProductCard key={item.slug} product={item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="surface-card py-24 text-center">
              <h2 className="text-2xl font-medium">{text.empty}</h2>
              <p className="mt-3 text-sm text-black/55">{text.emptyHelp}</p>
              <button
                className="button button-primary mt-6"
                onClick={() => window.history.replaceState(null, "", pathname)}
              >
                {text.clear}
              </button>
            </div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[90] p-3 lg:hidden"
          onMouseDown={(event) =>
            event.currentTarget === event.target && setFiltersOpen(false)
          }
        >
          <div className="modal-panel ms-auto h-full w-full max-w-sm overflow-y-auto p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">{text.filters}</h2>
              <button
                className="icon-button"
                onClick={() => setFiltersOpen(false)}
                aria-label={locale === "ar" ? "إغلاق عوامل التصفية" : "Close filters"}
              >
                <X />
              </button>
            </div>
            <div className="mt-8">
              <Filters />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
