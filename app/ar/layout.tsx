import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "نسترو — أثاث وتصميم داخلي", template: "%s | نسترو" },
  description: "أثاث حسب الطلب وستائر وتنجيد وحلول داخلية مصممة للمساحات في دولة الإمارات.",
};

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ar" dir="rtl" className="min-w-0">{children}</div>;
}
