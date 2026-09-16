import Image from "next/image";
import Link from "@/components/shared/StaticLink";
import {
  ArrowRight,
  Award,
  Gem,
  MapPin,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { PremiumServices } from "@/components/home/PremiumServices";
import { TrustBar } from "@/components/home/TrustBar";
import { ConsultationButton } from "@/components/shared/ClientActions";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { journalFor, processFor, projectsFor } from "@/lib/editorial";
import type { Locale } from "@/types";

const materialFamilies = [
  {
    title: "Curtain textiles",
    text: "Sheers, linen, velvet and blackout constructions selected for light, privacy and drape.",
    image: "/images/catalog/linen-curtains.webp",
    href: "/blinds-curtains#offerings",
  },
  {
    title: "Furniture finishes",
    text: "Timber, veneers, stone, metal and integrated details composed around the room.",
    image: "/images/catalog/wall-tv-unit.webp",
    href: "/custom-furniture",
  },
  {
    title: "Indoor upholstery",
    text: "Performance fabrics, leather, bouclé and cushioning specified for lasting comfort.",
    image: "/images/catalog/sofa-set-upholstery.webp",
    href: "/upholstery#offerings",
  },
  {
    title: "Outdoor performance",
    text: "Weather-resistant textiles, quick-dry foam and protective covers for UAE conditions.",
    image: "/images/catalog/outdoor-cushions.webp",
    href: "/upholstery#offerings",
  },
  {
    title: "Kitchen surfaces",
    text: "Lacquer, laminate, glass, quartz and hardware coordinated into one architectural composition.",
    image: "/images/catalog/handleless-contemporary-kitchen.webp",
    href: "/kitchens#offerings",
  },
  {
    title: "Washroom finishes",
    text: "Porcelain, stone-look surfaces, mosaics, trims and grout specified together.",
    image: "/images/catalog/marble-look-porcelain-tiles.webp",
    href: "/washroom-tiles#offerings",
  },
];

const clientSectors = [
  [
    "Homes & villas",
    "Measured furniture, window treatments and upholstery for apartments, villas and majlis spaces.",
  ],
  [
    "Hospitality",
    "Durable, guest-ready specifications for hotels, restaurants, lounges and serviced residences.",
  ],
  [
    "Offices",
    "Tailored furniture, privacy systems and upholstery for productive, welcoming workplaces.",
  ],
  [
    "Design professionals",
    "Measurement, samples, fabrication and installation support for designers and architects.",
  ],
];

const materialFamiliesAr = [
  { title: "أقمشة الستائر", text: "أقمشة شفافة وكتان ومخمل وخيارات تعتيم مختارة وفق الضوء والخصوصية وانسيابية القماش." },
  { title: "تشطيبات الأثاث", text: "خشب وقشور حجرية ومعدن وتفاصيل مدمجة تتناغم مع الغرفة." },
  { title: "التنجيد الداخلي", text: "أقمشة عالية الأداء وجلود وبوكليه وحشوات مختارة لراحة تدوم." },
  { title: "خامات خارجية عالية الأداء", text: "أقمشة مقاومة للطقس وإسفنج سريع الجفاف وأغطية واقية تناسب مناخ الإمارات." },
  { title: "أسطح المطابخ", text: "لكر ولامينيت وزجاج وكوارتز وإكسسوارات منسقة في تكوين معماري واحد." },
  { title: "تشطيبات الحمامات", text: "بورسلان وأسطح بمظهر الحجر وفسيفساء وحواف وجراوت محددة معاً." },
];

const clientSectorsAr = [
  ["المنازل والفلل", "أثاث مقاس ومعالجات نوافذ وتنجيد للشقق والفلل والمجالس."],
  ["الضيافة", "مواصفات متينة وجاهزة للضيوف للفنادق والمطاعم والصالات والشقق الفندقية."],
  ["المكاتب", "أثاث مخصص وأنظمة خصوصية وتنجيد لمساحات عمل منتجة ومرحبة."],
  ["محترفو التصميم", "دعم في القياس والعينات والتصنيع والتركيب للمصممين والمعماريين."],
];

export function HomeView({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const prefix = ar ? "/ar" : "";
  const link = (href: string) => href.startsWith("#") ? href : `${prefix}${href}`;
  const projects = projectsFor(locale);
  const journal = journalFor(locale);
  const processSteps = processFor(locale);
  const materials = ar ? materialFamilies.map((item, index) => ({ ...item, ...materialFamiliesAr[index] })) : materialFamilies;
  const sectors = ar ? clientSectorsAr : clientSectors;
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <section className="relative min-h-[calc(100svh-108px)] overflow-hidden bg-charcoal text-white">
        <Image
          src="/images/nestro-hero.webp"
          alt={ar ? "غرفة معيشة معاصرة ودافئة من تصميم وتأثيث NESTRO" : "A warm contemporary living room furnished by NESTRO"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[calc(100svh-108px)] items-end pb-16 pt-28 md:items-center md:py-24">
          <div data-motion="fade-rise" className="w-full min-w-0 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-white/75">
              {ar ? "تصميم داخلي · أثاث · أسلوب حياة" : "Interiors · Furniture · Lifestyle"}
            </p>
            <h1 className="display mt-6">{ar ? "منزل يشبهك وحدك." : "A home, distinctly yours."}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/78 md:text-lg">
              {ar ? "أثاث حسب الطلب وتصميمات داخلية مدروسة، مصممة حول طريقة حياتك في الإمارات." : "Bespoke furniture and considered interiors, designed around the way you live in the UAE."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#services" className="button button-primary">
                {ar ? "استكشف الخدمات" : "Explore services"} <ArrowRight className={ar ? "rotate-180" : ""} size={17} />
              </Link>
              <ConsultationButton className="button button-ivory">
                {ar ? "احصل على عرض سعر مجاني" : "Get a free quote"}
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>

      <TrustBar locale={locale} />

      <PremiumServices locale={locale} />

      <section className="section showroom-gold-section text-white">
        <div className="container-site space-y-20 lg:space-y-28">
          <div className="showroom-editorial grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div data-motion="slide-start" className="card-image showroom-media relative min-h-[520px] overflow-hidden rounded-xl lg:min-h-[680px]">
              <Image
                src="/images/collections/kitchen-cabinets.webp"
                alt={ar ? "خزائن مطبخ معاصرة مصممة حسب الطلب" : "Tailored contemporary kitchen cabinetry"}
                fill
                sizes="(max-width:1024px) 100vw,60vw"
                className="object-cover"
              />
            </div>
            <div data-motion="slide-end" className="lg:ps-10">
              <span className="eyebrow !text-brass">{ar ? "استوديو المطابخ" : "The kitchen studio"}</span>
              <h2 className="heading mt-6 text-white">
                {ar ? "خزائن بهدوء معماري." : "Cabinetry with architectural calm."}
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-white/70">
                {ar ? "يتم تخطيط التخزين والتشطيبات والأجهزة والحركة كتكوين واحد، ثم القياس والتصنيع والمحاذاة بما يناسب مساحتك." : "Storage, finishes, appliances and movement are planned as one composition, then measured, made and aligned for your space."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={link("/kitchens")} className="button button-primary">
                  {ar ? "استكشف المطابخ" : "Explore kitchens"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
                </Link>
                <ConsultationButton className="button button-ivory">
                  {ar ? "خطط لمطبخك" : "Plan your kitchen"}
                </ConsultationButton>
              </div>
            </div>
          </div>
          <div className="showroom-editorial grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div data-motion="slide-start" className="order-2 lg:order-1 lg:pe-10">
              <span className="eyebrow !text-brass">
                {ar ? "الأسطح والتركيب" : "Surfaces and installation"}
              </span>
              <h2 className="heading mt-6 text-white">
                {ar ? "حمامات متكاملة من البلاط حتى الفاصل الأخير." : "Washrooms resolved from tile to final joint."}
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-white/70">
                {ar ? "انتقل بسلاسة من اختيار البورسلان والفسيفساء إلى معاينة الموقع والتحضير والتخطيط والتركيب والجراوت والتشطيب." : "Move naturally from porcelain and mosaic selection to site assessment, preparation, setting-out, installation, grouting and finishing."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={link("/washroom-tiles")} className="button button-primary">
                  {ar ? "استكشف بلاط الحمامات" : "Explore washroom tiles"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
                </Link>
                <ConsultationButton className="button button-ivory">
                  {ar ? "ناقش مشروع التجديد" : "Discuss renovation"}
                </ConsultationButton>
              </div>
            </div>
            <div data-motion="slide-end" className="card-image showroom-media relative order-1 min-h-[520px] overflow-hidden rounded-xl lg:order-2 lg:min-h-[680px]">
              <Image
                src="/images/collections/washroom-tiles.webp"
                alt={ar ? "بلاط حمام دافئ بمظهر الحجر وتركيب منسق" : "Warm stone-look washroom tiles and coordinated installation"}
                fill
                sizes="(max-width:1024px) 100vw,60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "الخامات والتشطيبات" : "Materials & finishes"}
            title={ar ? "الخامة المناسبة لكل احتياج." : "The right material for every requirement."}
            copy={ar ? "قارن المظهر والأداء والعناية مع إرشاد متخصص قبل اعتماد المواصفات النهائية." : "Compare appearance, performance and care with specialist guidance before approving the final specification."}
          />
          <div data-motion-group="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Link
                key={material.title}
                href={link(material.href)}
                data-motion="scale-in"
                className="surface-card group overflow-hidden rounded-2xl"
              >
                <div className="card-image relative aspect-[4/3]">
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">{material.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/55">
                    {material.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-sage">
                    {ar ? "استكشف الخيارات" : "Explore options"} <ArrowRight className={ar ? "rotate-180" : ""} size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y fine-border">
        <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow={ar ? "من نخدم" : "Who we serve"}
            title={ar ? "دعم متخصص لكل نطاق." : "Specialist support at every scale."}
            copy={ar ? "تدعم العملية المدروسة نفسها الغرف المفردة والعقارات الكاملة والمشاريع التجارية المدارة باحتراف." : "The same measured process supports individual rooms, complete properties and professionally managed commercial projects."}
          />
          <div data-motion-group="stagger" className="sector-grid grid gap-3 sm:grid-cols-2">
            {sectors.map(([title, text], index) => (
              <div key={title} className="sector-card p-7">
                <span className="sector-number-badge grid h-11 w-11 place-items-center rounded-full text-xs font-bold text-charcoal">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section showroom-process-section text-charcoal">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "عملية NESTRO" : "The NESTRO process"}
            title={ar ? "من المحادثة الأولى إلى اللمسة الأخيرة." : "From first conversation to final placement."}
            copy={ar ? "عملية واضحة وتعاونية تحافظ على خصوصية التجربة وجمال النتيجة." : "A clear, collaborative process keeps the experience personal and the outcome beautifully resolved."}
          />
          <div data-motion-group="stagger" className="mt-14 grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="process-stage-card p-7 lg:p-9">
                <span className="process-number-badge grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-charcoal">
                  {step.number}
                </span>
                <h3 className="mt-8 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={ar ? "أعمال مختارة" : "Selected work"}
              title={ar ? "مساحات برؤية واضحة." : "Spaces with a point of view."}
              copy={ar ? "بيئات سكنية وتجارية تتكامل من خلال الأثاث حسب الطلب وحساسية الخامات والتفاصيل الهادئة." : "Residential and commercial environments resolved through custom furniture, material sensitivity and quiet detail."}
            />
            <Link href={link("/projects")} className="button button-outline">
              {ar ? "عرض كل المشاريع" : "View all projects"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
            </Link>
          </div>
          <div data-motion-group="stagger" className="mt-12 grid gap-5 md:grid-cols-3">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <Link
                  key={project.slug}
                  href={`${prefix}/projects/${project.slug}`}
                  data-motion="fade-rise"
                  className="editorial-link group"
                >
                  <div className="card-image relative aspect-[4/5] rounded-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[.16em] text-sage">
                    {project.location}
                  </p>
                  <h3 className="mt-1 text-xl font-medium">{project.title}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div data-motion="slide-start">
            <SectionHeading
              eyebrow={ar ? "حياة ثانية" : "A second life"}
              title={ar ? "شاهد التحول." : "See the transformation."}
              copy={ar ? "الأثاث الجيد يستحق العناية. يعيد مشغلنا بناء الراحة وتجديد الهيكل ومنح القطع المألوفة تعبيراً جديداً ودقيقاً." : "Good furniture deserves care. Our atelier rebuilds comfort, renews structure and gives familiar pieces a precise new expression."}
            />
            <Link
              href={`${prefix}/shop/sofa-set-upholstery`}
              className="button button-primary mt-8"
            >
              {ar ? "استكشف الترميم" : "Explore restoration"}
            </Link>
          </div>
          <div data-motion="slide-end"><BeforeAfterSlider locale={locale} /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "في أنحاء الإمارات" : "Across the Emirates"}
            title={ar ? "تصميم قريب من منزلك." : "Designed close to home."}
            copy={ar ? "تتوفر مواعيد المعرض والقياس المنزلي والتركيب المُدار في جميع أنحاء الإمارات." : "Showroom appointments, home measurements and managed installation are available throughout the UAE."}
            align="center"
          />
          <div data-motion-group="stagger" className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {(ar ? [
              { city: "دبي", text: "مواعيد الاستوديو والزيارات المنزلية" },
              { city: "أبوظبي", text: "استشارات التصميم والتركيب" },
              { city: "الشارقة", text: "زيارات منزلية وتوصيل في أنحاء الإمارات" },
            ] : [
              { city: "Dubai", text: "Studio appointments & home visits" },
              {
                city: "Abu Dhabi",
                text: "Design consultations & installation",
              },
              { city: "Sharjah", text: "Home visits & UAE-wide delivery" },
            ]).map((area) => (
              <div
                key={area.city}
                data-motion="scale-in"
                className="surface-card rounded-2xl p-7 text-center"
              >
                <MapPin className="mx-auto text-sage" />
                <h3 className="mt-4 text-xl font-medium">{area.city}</h3>
                <p className="mt-2 text-sm text-black/55">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bronze overflow-hidden">
        <div className="container-site grid lg:grid-cols-2">
          <div className="flex flex-col justify-center py-16 pr-0 lg:py-24 lg:pr-16">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-white/60">
              {ar ? "صُنع لك وحدك" : "Made only for you"}
            </span>
            <h2 className="heading mt-5">{ar ? "فكرتك، مصاغة بخبرة." : "Your idea, expertly resolved."}</h2>
            <p className="mt-6 max-w-xl leading-7 text-white/70">
              {ar ? "اختر الشكل والتشطيب والإحساس. تحوّل خدمة الأثاث حسب الطلب لدينا المراجع الأولية والاحتياجات الواقعية إلى قطعة واحدة مدروسة." : "Choose the form, finish and feeling. Our custom furniture service turns rough references and real requirements into one considered piece."}
            </p>
            <Link
              href={`${prefix}/custom-furniture#wizard`}
              className="button mt-8 w-fit bg-ivory text-charcoal"
            >
              {ar ? "ابدأ تصميم قطعتك" : "Begin your piece"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
            </Link>
          </div>
          <div className="relative min-h-[480px]">
            <Image
              src="/images/catalog/custom-sofa-chair.webp"
              alt={ar ? "تفصيل أريكة مصنوعة حسب الطلب" : "Crafted custom sofa detail"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "وعدنا" : "Our promise"}
            title={ar ? "الفخامة هي الوضوح في كل خطوة." : "Luxury is clarity at every step."}
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {(ar ? [
              { icon: Gem, title: "خامات صادقة", copy: "خيارات غنية بالملمس ومختارة لمتطلبات الحياة اليومية." },
              { icon: Ruler, title: "دقة القياس", copy: "يتم فحص كل بُعد وتوثيقه قبل التصنيع." },
              { icon: ShieldCheck, title: "مواصفات واضحة", copy: "توثيق الخامات وافتراضات التسعير وإرشادات العناية قبل الاعتماد." },
              { icon: Truck, title: "توصيل مُدار", copy: "تخطيط التوصيل ووضع القطع وفق متطلبات موقعك." },
            ] : [
              {
                icon: Gem,
                title: "Honest materials",
                copy: "Tactile options selected for the demands of daily life.",
              },
              {
                icon: Ruler,
                title: "Measured precision",
                copy: "Every dimension checked and documented before making.",
              },
              {
                icon: ShieldCheck,
                title: "Clear specification",
                copy: "Materials, pricing assumptions and care guidance documented before approval.",
              },
              {
                icon: Truck,
                title: "Managed delivery",
                copy: "Delivery and placement planned around your site requirements.",
              },
            ]).map((promise) => (
              <div key={promise.title} className="surface-card p-7">
                <promise.icon className="text-sage" />
                <h3 className="mt-6 text-lg font-medium">{promise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {promise.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-site">
          <SectionHeading
            eyebrow={ar ? "اختر بثقة" : "Make a confident choice"}
            title={ar ? "أدوات مفيدة من دون ضغط البيع." : "Useful tools, not sales pressure."}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {(ar ? [
              ["قارن", "أضف حتى أربعة خيارات إلى قائمتك وقارن السعر والخامات وطريقة التشغيل والاستخدامات المناسبة جنباً إلى جنب."],
              ["احسب", "أدخل العرض والارتفاع والكمية لعرض إجمالي تقديري مع تطبيق الحد الأدنى الصحيح."],
              ["جهّز", "أرسل الأبعاد والخيار المحدد والملاحظات معاً لتبدأ المحادثة الأولى بسياق مفيد."],
            ] : [
              [
                "Compare",
                "Shortlist up to four offerings and review price, materials, operation and ideal uses side by side.",
              ],
              [
                "Calculate",
                "Enter width, height and quantity to see an indicative total with the correct minimum bill applied.",
              ],
              [
                "Configure",
                "Send dimensions, selected option and notes together so the first conversation starts with useful context.",
              ],
            ]).map(([title, copy], index) => (
              <div key={title} className="surface-card interactive-card p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sm font-bold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-2xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow={ar ? "أسئلة مدروسة" : "Questions, considered"}
            title={ar ? "قبل أن نبدأ." : "Before we begin."}
            copy={ar ? "إجابات مفيدة حول الأعمال حسب الطلب والتوصيل وعملية الاستشارة." : "A few useful answers about custom work, delivery and the consultation process."}
          />
          <div>
            {(ar ? [
              ["هل تقدمون استشارات منزلية؟", "نعم. نقدم استشارات في المعرض أو عبر الفيديو أو في المنزل في أنحاء الإمارات بحسب المشروع والموقع."],
              ["كم يستغرق الأثاث حسب الطلب؟", "يستغرق معظم الأثاث حسب الطلب من خمسة إلى ثمانية أسابيع بعد اعتماد التصميم والخامات. وقد تتطلب أعمال النجارة المعقدة أو التشطيبات المستوردة وقتاً أطول."],
              ["هل يمكنني توفير القماش بنفسي؟", "نعم، بعد مراجعة ملاءمته. سنؤكد الكمية المطلوبة وبدل تكرار النقشة واعتبارات الأداء."],
              ["هل توصلون خارج دبي؟", "نعم. تتوفر خدمات القياس والتوصيل والتركيب في الإمارات السبع."],
              ["هل توجد رسوم للتصميم؟", "المحادثة الأولى مجانية. أما نطاقات التصميم الداخلي الأكبر فنقدم لها عرضاً واضحاً لرسوم التصميم قبل بدء العمل."],
            ] : [
              [
                "Do you offer home consultations?",
                "Yes. We offer showroom, video and in-home consultations across the UAE, depending on the project and location.",
              ],
              [
                "How long does custom furniture take?",
                "Most custom furniture takes five to eight weeks after design and material approval. Complex joinery or imported finishes may require longer.",
              ],
              [
                "Can I provide my own fabric?",
                "Yes, subject to a suitability review. We will confirm required meterage, repeat allowance and performance considerations.",
              ],
              [
                "Do you deliver outside Dubai?",
                "Yes. Measurement, delivery and installation are available in all seven Emirates.",
              ],
              [
                "Is there a design fee?",
                "The initial conversation is complimentary. For larger interior scopes, we provide a clear design-fee proposal before work begins.",
              ],
            ]).map(([question, answer]) => (
              <details
                key={question}
                className="group border-b fine-border py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium">
                  {question}
                  <span className="text-2xl font-light transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-7 text-black/60">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="consultation-gold-panel relative mx-auto max-w-[95rem] overflow-hidden rounded-3xl px-6 py-16 text-center text-white sm:px-10 md:py-24">
          <Award className="mx-auto text-brass" />
          <h2 className="heading mx-auto mt-6 max-w-3xl">
            {ar ? "لنصنع منزلاً يبدو وكأنه خُلق لك." : "Let’s make your home feel inevitable."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
            {ar ? "ابدأ بمحادثة مجانية حول غرفتك واحتياجاتك وطريقة الحياة التي تريدها." : "Begin with a complimentary conversation about your room, your needs and the way you want to live."}
          </p>
          <ConsultationButton className="button consultation-gold-cta mt-8">
            {ar ? "احجز استشارتك" : "Book your consultation"}
          </ConsultationButton>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow={ar ? "مجلة NESTRO" : "The NESTRO journal"}
              title={ar ? "ملاحظات لحياة أكثر عناية." : "Notes for considered living."}
            />
            <Link
              href={`${prefix}/journal`}
              className="hidden items-center gap-2 text-sm font-semibold sm:flex"
            >
              {ar ? "اقرأ كل المقالات" : "Read all stories"} <ArrowRight className={ar ? "rotate-180" : ""} size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {journal.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`${prefix}/journal/${post.slug}`}
                className="group"
              >
                <div className="card-image relative aspect-[4/3] rounded-2xl">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em] text-sage">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-2 text-xl font-medium">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
