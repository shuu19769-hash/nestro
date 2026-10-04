import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheck, Hand, Leaf, PenTool } from "lucide-react";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Locale } from "@/types";

export const metadata: Metadata = {
  title: "About NESTRO",
  description:
    "Meet NESTRO, a UAE furniture and interior lifestyle studio grounded in thoughtful design, honest materials and enduring craft.",
};
export function AboutView({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <section className="container-site grid gap-10 py-14 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:py-24">
        <div>
          <span className="eyebrow">{ar ? "عن NESTRO" : "About NESTRO"}</span>
          <h1 className="display mt-6">
            {ar ? "طريقة أكثر عناية لتأثيث الحياة." : "A more thoughtful way to furnish a life."}
          </h1>
        </div>
        <p className="subheading lg:pb-2">
          {ar ? "NESTRO استوديو إماراتي للتصميم الداخلي والأثاث، تأسس على قناعة بسيطة: أكثر الغرف فخامة ليست الأعلى صوتاً، بل الأكثر انسجاماً مع أصحابها." : "NESTRO is a UAE interiors and furniture studio built on a simple belief: the most luxurious rooms are not the loudest, but the ones that fit their people beautifully."}
        </p>
      </section>
      <div className="card-image relative aspect-[16/8] min-h-[520px] w-full max-w-full">
        <Image
          src="/images/collections/custom-furniture.webp"
          alt={ar ? "تصميم داخلي من NESTRO" : "NESTRO interior"}
          fill
          priority
          className="object-cover"
        />
      </div>
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow={ar ? "وجهة نظرنا" : "Our point of view"}
            title={ar ? "الجمال ليس سوى البداية." : "Beautiful is only the beginning."}
          />
          <div className="prose-nestro text-lg">
            <p>
              {ar ? "ننظر أبعد من المظهر إلى الصفات الهادئة التي تجعل الغرفة ناجحة: كيف يتحرك الضوء، وأين تستقر اليد بطبيعتها، وأي مسار يبقى واضحاً، وأي الخامات تزداد جمالاً مع الزمن." : "We look beyond appearance to the quieter qualities that make a room work: how light moves, where a hand naturally rests, which path stays clear, and which materials become better with age."}
            </p>
            <p>
              {ar ? "توجّه هذه الرؤية أعمالنا في كل نطاق، من كرسي واحد منجّد إلى منزل متكامل. نستمع أولاً، وننقح بعناية، ونجمع المصممين والحرفيين وفنيي التركيب المناسبين لكل مهمة." : "That thinking informs every scale of our work—from a single upholstered chair to a complete home. We listen first, edit carefully and bring together the right designers, makers and installers for the task."}
            </p>
            <p>
              {ar ? "ينبغي أن تبدو النتيجة شخصية من دون تكلف، راقية وسهلة للعيش في الوقت نفسه؛ منزل يستقر في مكانه منذ اليوم الأول ويزداد معنى مع مرور الوقت." : "The result should feel personal without trying too hard; elevated, but still easy to live with. A home that feels settled from the first day and grows more meaningful over time."}
            </p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "ما يوجهنا" : "What guides us"}
            title={ar ? "أربع قيم حاضرة في كل تفصيل." : "Four values, present in every detail."}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {(ar ? [
              { icon: PenTool, title: "الوضوح", copy: "فكرة قوية منقحة حتى يصبح لكل عنصر سبب لوجوده." },
              { icon: Hand, title: "الحِرفة", copy: "معرفة بالخامات وصناعة دقيقة يمكنك رؤيتها ولمسها والثقة بها." },
              { icon: Leaf, title: "الاستدامة", copy: "قطع تستحق الصيانة والترميم والانتقال إلى الفصل التالي." },
              { icon: CircleCheck, title: "العناية", copy: "تواصل واضح وخدمة مسؤولة من موجز المشروع حتى التركيب." },
            ] : [
              {
                icon: PenTool,
                title: "Clarity",
                copy: "A strong idea, edited until every element has a reason to be there.",
              },
              {
                icon: Hand,
                title: "Craft",
                copy: "Material knowledge and careful making you can see, feel and trust.",
              },
              {
                icon: Leaf,
                title: "Longevity",
                copy: "Pieces worth maintaining, restoring and carrying into the next chapter.",
              },
              {
                icon: CircleCheck,
                title: "Care",
                copy: "Clear communication and accountable service from brief to installation.",
              },
            ]).map((value) => (
              <div
                key={value.title}
                className="surface-card interactive-card p-7"
              >
                <value.icon className="text-sage" />
                <h2 className="mt-7 text-xl font-medium">{value.title}</h2>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="card-image relative aspect-[5/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/collections/indoor-upholstery.webp"
              alt={ar ? "عينات خامات وتصميم للأثاث" : "Furniture material and design samples"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">{ar ? "جذورنا في الإمارات" : "Rooted in the UAE"}</span>
            <h2 className="heading mt-5">
              {ar ? "خبرة تصميم عالمية. وفهم محلي." : "Global design fluency. Local understanding."}
            </h2>
            <p className="subheading mt-6">
              {ar ? "تفرض منازل الإمارات متطلبات خاصة على الأثاث والمنسوجات: مقاومة الضوء، وحضوراً واثقاً في المساحات، وضيافة كريمة، وخدمة سلسة تناسب إيقاع الحياة. ينطلق عملنا من هذا السياق." : "Homes in the UAE ask particular things of furniture and textiles: resilience to light, confidence at scale, generous hospitality and seamless service across busy lives. Our work is grounded in that context."}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="pill">{ar ? "49 خياراً متخصصاً" : "49 specialist offerings"}</span>
              <span className="pill">{ar ? "سبع مجموعات متكاملة" : "Seven complete collections"}</span>
              <span className="pill">{ar ? "إرشاد بالعربية والإنجليزية" : "English and Arabic guidance"}</span>
            </div>
            <ConsultationButton className="button button-dark mt-8">
              {ar ? "تعرّف إلى الاستوديو" : "Meet the studio"}
            </ConsultationButton>
          </div>
        </div>
      </section>
    </div>
  );
}

