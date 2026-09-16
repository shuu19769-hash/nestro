export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div data-motion="divider-draw" className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className={`eyebrow ${align === "center" ? "justify-center before:hidden" : ""}`}>{eyebrow}</span>
      <h2 className="heading mt-5">{title}</h2>
      {copy && <p className={`subheading mt-6 ${align === "center" ? "mx-auto" : ""}`}>{copy}</p>}
    </div>
  );
}
