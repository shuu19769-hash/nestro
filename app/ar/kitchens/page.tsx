import type { Metadata } from "next";
import { InteriorCategoryHub } from "@/components/services/InteriorCategoryHub";
export const metadata:Metadata={title:"خزائن مطابخ حسب الطلب في الإمارات",description:"اكتشف تصميم وتصنيع وتركيب خزائن المطابخ حسب الطلب من NESTRO في الإمارات.",alternates:{canonical:"/ar/kitchens/",languages:{en:"/kitchens/",ar:"/ar/kitchens/"}}};
export default function Page(){return <InteriorCategoryHub kind="kitchens" locale="ar"/>}
