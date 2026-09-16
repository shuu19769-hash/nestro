import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";

const services = {
  "sofa-restoration": { title: "ترميم الأرائك", intro: "أعد قطعة مألوفة إلى أفضل حالاتها مع إصلاح الهيكل وتجديد الحشوات وتنجيد مفصل بدقة.", image: "/images/catalog/sofa-set-upholstery.webp" },
  headboards: { title: "ألواح رأس حسب الطلب", intro: "ألواح رأس منجدة حسب المقاس بدرزات أنيقة وحشوات متقنة وتفاصيل مدمجة اختيارية.", image: "/images/catalog/headboard-upholstery.webp" },
  "outdoor-cushions": { title: "التنجيد الخارجي", intro: "راحة مقاومة للأشعة فوق البنفسجية وسريعة الجفاف للشرفات والجلسات بجوار المسابح ومناخ الإمارات.", image: "/images/catalog/outdoor-cushions.webp" },
  majlis: { title: "تنجيد المجالس", intro: "جلسات رحبة ومتينة مصممة للضيافة المعاصرة ونسب غرفتك.", image: "/images/catalog/sofa-set-upholstery.webp" },
  "leather-restoration": { title: "ترميم الجلود", intro: "تنظيف متخصص وتصحيح للألوان وإصلاح لأثاث الجلد الجيد الذي ما زالت أمامه سنوات من الاستخدام.", image: "/images/catalog/chair-upholstery.webp" },
};
export function generateStaticParams() { return Object.keys(services).map((service) => ({ service })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> { const { service } = await params, data = services[service as keyof typeof services]; return { title: data.title, description: data.intro, alternates: { canonical: `/ar/interior-solutions/upholstery/${service}/`, languages: { en: `/interior-solutions/upholstery/${service}/`, ar: `/ar/interior-solutions/upholstery/${service}/` } } }; }
export default async function Page({ params }: { params: Promise<{ service: string }> }) { const { service } = await params, data = services[service as keyof typeof services]; return <ServiceTemplate locale="ar" eyebrow="مشغل التنجيد" title={data.title} intro={data.intro} image={data.image} benefits={[{ title: "تقييم صادق", copy: "نفحص الهيكل ونشرح ما يستحق الترميم قبل تقديم السعر." }, { title: "إعادة بناء الراحة", copy: "نجدد النوابض والأحزمة والإسفنج لدعم طريقة جلوسك اليوم." }, { title: "تشطيب مفصل", copy: "نحسم القوالب والدرزات والحواف والوصلات بدقة الورشة." }]} materials={["كتان عالي الأداء", "بوكليه", "مخمل", "جلد", "نسيج خارجي", "اختيار مخصص"]} />; }
