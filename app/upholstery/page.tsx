import type { Metadata } from "next";
import { CatalogServiceHub } from "@/components/services/CatalogServiceHub";
export const metadata: Metadata = { title: "Indoor & Outdoor Upholstery UAE", description: "Explore NESTRO sofa, bed, chair, wall-panel and outdoor upholstery services across the UAE." };
export default function Page(){return <CatalogServiceHub kind="upholstery"/>}
