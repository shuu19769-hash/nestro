import type { Metadata } from "next";
import Link from "@/components/shared/StaticLink";
import { ArrowLeft } from "lucide-react";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";

const categories = {
  sofas: { title: "أرائك وجلسات حسب الطلب", intro: "نضبط كل قرار متعلق بالراحة، من عمق المقعد وإحساس الحشوة إلى ارتفاع الذراع وأداء القماش، حول غرفتك والأشخاص الذين يستخدمونها.", image: "/images/catalog/custom-sofa-chair.webp" },
  beds: { title: "أسرّة وألواح رأس حسب الطلب", intro: "نسب مريحة وتنجيد غني بالملمس وتفاصيل مدمجة مصممة وفق عمارة غرفة نومك.", image: "/images/catalog/custom-bed-headboard.webp" },
  wardrobes: { title: "خزائن وتخزين حسب الطلب", intro: "تخزين معماري هادئ مصمم من الداخل إلى الخارج حول مقتنياتك وروتينك ومساحتك المتاحة.", image: "/images/catalog/wardrobe-cabinet.webp" },
};
export function generateStaticParams() { return Object.keys(categories).map((category) => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const { category } = await params, data = categories[category as keyof typeof categories]; return { title: data.title, description: data.intro, alternates: { canonical: `/ar/custom-furniture/${category}/`, languages: { en: `/custom-furniture/${category}/`, ar: `/ar/custom-furniture/${category}/` } } }; }
export default async function Page({ params }: { params: Promise<{ category: string }> }) { const { category } = await params, data = categories[category as keyof typeof categories]; return <ServiceTemplate locale="ar" eyebrow="مصمم حسب المقاس" title={data.title} intro={data.intro} image={data.image} startingPrice="ضمن فئات 150–300 و300–600 و600+ درهم" benefits={[{ title: "مصمم حولك", copy: "تستجيب الراحة والنسب لجسمك وغرفتك وعاداتك اليومية." }, { title: "اختيار موجه للخامات", copy: "نختصر الاحتمالات إلى مجموعة واثقة ومتناغمة." }, { title: "صناعة متخصصة", copy: "نعتمد كل خامة وتشطيب قبل بدء الإنتاج." }]} materials={["جوز", "بلوط", "بوكليه", "كتان", "مخمل", "نسيج عالي الأداء"]}><section className="section section-bronze"><div className="container-site text-center"><h2 className="heading">هل لديك مرجع في ذهنك؟</h2><p className="mx-auto mt-5 max-w-xl text-white/60">شارك الأبعاد أو رسماً أولياً أو صورة، وسنساعدك على تحويلها إلى قطعة تناسب مساحتك حقاً.</p><Link href="/ar/custom-furniture#wizard" className="button mt-8 bg-ivory text-charcoal">أنشئ موجزاً مخصصاً <ArrowLeft size={16} /></Link></div></section></ServiceTemplate>; }
