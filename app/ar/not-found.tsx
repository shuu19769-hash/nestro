import Link from "@/components/shared/StaticLink";

export default function ArabicNotFound() {
  return <section className="container-site grid min-h-[65vh] place-items-center py-20 text-center" dir="rtl"><div><span className="eyebrow">404</span><h1 className="heading mt-6">لم نتمكن من العثور على هذه الصفحة.</h1><p className="mx-auto mt-4 max-w-xl text-black/60">قد يكون الرابط قد تغير. يمكنك العودة إلى الصفحة الرئيسية أو استكشاف خدمات NESTRO.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/ar" className="button button-primary">الصفحة الرئيسية</Link><Link href="/ar/shop" className="button button-outline">استكشف الخدمات</Link></div></div></section>;
}
