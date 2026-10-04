export function AnnouncementBar({ ar = false }: { ar?: boolean }) {
  const message = ar
    ? "استشارة تصميم مجانية · توصيل في جميع أنحاء الإمارات"
    : "Complimentary design consultation · Delivery across the UAE";

  return (
    <div className="brand-announcement" dir={ar ? "rtl" : "ltr"}>
      <div className="announcement-track">
        {[0, 1].map((set) => (
          <div className="announcement-set" key={set} aria-hidden={set === 1}>
            {[0, 1].map((item) => (
              <span className="contents" key={item}>
                <span className="announcement-item">{message}</span>
                <span className="announcement-separator" aria-hidden="true"><Sparkles size={14} strokeWidth={1.8} /></span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
import { Sparkles } from "lucide-react";
