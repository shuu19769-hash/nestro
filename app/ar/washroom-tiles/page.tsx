import type { Metadata } from "next";
import { InteriorCategoryHub } from "@/components/services/InteriorCategoryHub";
export const metadata:Metadata={title:"بلاط وتجديد الحمامات في الإمارات",description:"استكشف بلاط الحمامات وخدمات المعاينة والتحضير والتركيب والجراوت والتشطيب من NESTRO.",alternates:{canonical:"/ar/washroom-tiles/",languages:{en:"/washroom-tiles/",ar:"/ar/washroom-tiles/"}}};
export default function Page(){return <InteriorCategoryHub kind="washrooms" locale="ar"/>}
