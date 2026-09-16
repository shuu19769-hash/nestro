import type { MetadataRoute } from "next";
import { catalog, catalogCollections } from "@/lib/catalog";
import projects from "@/data/projects.json";
import journal from "@/data/journal.json";
import { CONTACT } from "@/lib/constants";

export const dynamic = "force-static";

const hubs = [
  "",
  "/shop",
  "/collections",
  "/projects",
  "/interior-solutions",
  "/custom-furniture",
  "/blinds-curtains",
  "/upholstery",
  "/kitchens",
  "/washroom-tiles",
  "/about",
  "/journal",
  "/contact",
];

const customFurnitureCategories = ["sofas", "beds", "wardrobes"];
const upholsteryServices = [
  "sofa-restoration",
  "headboards",
  "outdoor-cushions",
  "majlis",
  "leather-restoration",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...hubs,
    ...catalog.map((item) => `/shop/${item.slug}`),
    ...catalog.map((item) => `/services/${item.slug}`),
    ...catalogCollections.map((collection) => `/collections/${collection.slug}`),
    ...customFurnitureCategories.map((category) => `/custom-furniture/${category}`),
    ...upholsteryServices.map((service) => `/interior-solutions/upholstery/${service}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...journal.map((post) => `/journal/${post.slug}`),
  ];

  return paths.flatMap((path) =>
    ["", "/ar"].map((localePrefix) => ({
      url: `${CONTACT.siteUrl}${localePrefix}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path.startsWith("/shop/") ? 0.75 : 0.8,
      alternates: {
        languages: {
          en: `${CONTACT.siteUrl}${path}`,
          ar: `${CONTACT.siteUrl}/ar${path}`,
        },
      },
    })),
  );
}
