export type Locale = "en" | "ar";
export type LocalizedText = { en: string; ar: string };

export type PricingOption = {
  label: LocalizedText;
  pricePerSqm: number;
  minimumBill: number;
  motorized?: boolean;
};

export type CatalogOffering = {
  slug: string;
  collection: "custom-furniture" | "blinds" | "curtains" | "indoor-upholstery" | "outdoor-upholstery" | "kitchen-cabinets" | "washroom-tiles";
  subcollection: string;
  serviceType: "product" | "service";
  name: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  benefits: LocalizedText[];
  idealUses: LocalizedText[];
  materials: { name: LocalizedText; description: LocalizedText }[];
  comparisonPoints: { feature: LocalizedText; value: LocalizedText }[];
  faqs: { question: LocalizedText; answer: LocalizedText }[];
  pricing: { mode: "per-sqm" | "tiered" | "quote"; options: PricingOption[]; tiers?: { label: LocalizedText; range: string }[] };
  images: string[];
  rooms: string[];
  badges: LocalizedText[];
  availability: "Made to order" | "Consultation required";
  motorization: boolean;
  indoorOutdoor: "indoor" | "outdoor";
  seo: { title: LocalizedText; description: LocalizedText };
  related: string[];
  care: LocalizedText;
  source: { reference: string; captured: string; note: string };
  featured?: boolean;
};

export type Product = CatalogOffering;

export type QuoteLine = {
  id: string;
  slug: string;
  option?: string;
  width?: number;
  height?: number;
  quantity: number;
  notes?: string;
  estimate?: number;
};

export type Collection = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  category: string;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  emirate: string;
  type: string;
  style: string;
  summary: string;
  image: string;
  gallery: string[];
  services: string[];
  featured?: boolean;
};

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  sections?: JournalSection[];
};

export type JournalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
  subsections?: { heading: string; paragraphs: string[] }[];
};
