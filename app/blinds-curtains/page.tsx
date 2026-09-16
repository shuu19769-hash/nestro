import type { Metadata } from "next";
import { CatalogServiceHub } from "@/components/services/CatalogServiceHub";
export const metadata: Metadata = { title: "Made-to-measure Blinds & Curtains UAE", description: "Explore NESTRO blinds, curtains, motorized systems, measurement and fitting across the UAE." };
export default function Page(){return <CatalogServiceHub kind="windows"/>}
