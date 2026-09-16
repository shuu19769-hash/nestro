import type { Metadata } from "next";
import { JournalView } from "@/components/pages/JournalView";

export const metadata: Metadata = {
  title: "مجلة NESTRO للتصميم الداخلي",
  description: "أفكار حول التصميم الداخلي والأثاث والخامات وأسلوب الحياة المدروس في الإمارات.",
  alternates: { canonical: "/ar/journal/", languages: { en: "/journal/", ar: "/ar/journal/" } },
};

export default function ArabicJournalPage() { return <JournalView locale="ar" />; }
