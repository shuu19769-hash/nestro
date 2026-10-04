"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types";

export function BeforeAfterSlider({ locale = "en" }: { locale?: Locale }) {
  const [position, setPosition] = useState(52);
  const ar = locale === "ar";
  return (
    <div className="relative aspect-[16/9] min-h-[360px] w-full max-w-full overflow-hidden rounded-2xl bg-parchment">
      <Image src="/images/catalog/sponge-repairing.webp" alt={ar ? "خامات التنجيد قبل الترميم" : "Upholstery materials before restoration"} fill className="object-cover grayscale-[.25]" sizes="100vw" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <div className="relative h-full" style={{ width: `${10000 / position}%` }}><Image src="/images/catalog/sofa-set-upholstery.webp" alt={ar ? "الأريكة بعد اكتمال التنجيد" : "Finished sofa upholstery"} fill className="object-cover" sizes="100vw" /></div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${position}%` }}><span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lg"><MoveHorizontal size={20} /></span></div>
      <input type="range" min="15" max="85" value={position} onChange={(event) => setPosition(Number(event.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" aria-label={ar ? "حرّك للمقارنة بين قبل وبعد" : "Move to compare before and after"} />
      <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-white">{ar ? "بعد" : "After"}</span>
      <span className="absolute bottom-4 right-4 rounded-full bg-charcoal/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-white">{ar ? "قبل" : "Before"}</span>
    </div>
  );
}
