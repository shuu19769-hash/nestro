import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingDetail } from "@/components/shop/OfferingDetail";
import { bySlug, catalog } from "@/lib/catalog";
export function generateStaticParams(){return catalog.map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params,item=bySlug(slug);if(!item)return{};return{title:item.seo.title.ar,description:item.seo.description.ar,alternates:{canonical:`/ar/shop/${slug}`,languages:{en:`/shop/${slug}`,ar:`/ar/shop/${slug}`}}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params,item=bySlug(slug);if(!item)notFound();const related=item.related.map(bySlug).filter(Boolean);return <OfferingDetail item={item} related={related as typeof catalog} locale="ar"/>}
