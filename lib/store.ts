"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuoteLine } from "@/types";
import { track } from "@/lib/analytics";

type UiState = {
  wishlist: string[];
  quote: QuoteLine[];
  compare: string[];
  recentlyViewed: string[];
  searchOpen: boolean;
  wishlistOpen: boolean;
  quoteOpen: boolean;
  consultationOpen: boolean;
  quickViewSlug: string | null;
  toggleWishlist: (slug: string) => void;
  addToQuote: (slug: string, configuration?: Partial<QuoteLine>) => void;
  removeFromQuote: (id: string) => void;
  toggleCompare: (slug: string) => void;
  addRecentlyViewed: (slug: string) => void;
  open: (key: "search" | "wishlist" | "quote" | "consultation") => void;
  closeAll: () => void;
  setQuickView: (slug: string | null) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      wishlist: [],
      quote: [],
      compare: [],
      recentlyViewed: [],
      searchOpen: false,
      wishlistOpen: false,
      quoteOpen: false,
      consultationOpen: false,
      quickViewSlug: null,
      toggleWishlist: (slug) => { track("wishlist",{slug}); set((state) => ({ wishlist: state.wishlist.includes(slug) ? state.wishlist.filter((item) => item !== slug) : [...state.wishlist, slug] })); },
      addToQuote: (slug, configuration = {}) => { track("quote_add",{slug,...configuration}); set((state) => ({ quote: [...state.quote, { id: `${slug}-${Date.now()}`, slug, quantity: 1, ...configuration }], quoteOpen: true })); },
      removeFromQuote: (id) => set((state) => ({ quote: state.quote.filter((item) => item.id !== id) })),
      toggleCompare: (slug) => { track("compare",{slug}); set((state) => ({ compare: state.compare.includes(slug) ? state.compare.filter((item) => item !== slug) : state.compare.length < 4 ? [...state.compare, slug] : state.compare })); },
      addRecentlyViewed: (slug) => set((state) => ({ recentlyViewed: [slug, ...state.recentlyViewed.filter((item) => item !== slug)].slice(0, 8) })),
      open: (key) => { if(key==="search")track("search");if(key==="consultation")track("consultation");set({ searchOpen: key === "search", wishlistOpen: key === "wishlist", quoteOpen: key === "quote", consultationOpen: key === "consultation" }); },
      closeAll: () => set({ searchOpen: false, wishlistOpen: false, quoteOpen: false, consultationOpen: false, quickViewSlug: null }),
      setQuickView: (quickViewSlug) => set({ quickViewSlug }),
    }),
    { name: "nestro-catalog-v2", version: 2, storage: createJSONStorage(() => localStorage), partialize: (state) => ({ wishlist: state.wishlist, quote: state.quote, compare: state.compare, recentlyViewed: state.recentlyViewed }) },
  ),
);

export type WizardData = {
  projectType: string;
  materials: string[];
  dimensions: string;
  style: string;
  reference: string;
  name: string;
  phone: string;
  email: string;
  location: string;
};

type WizardState = WizardData & {
  step: number;
  setStep: (step: number) => void;
  update: (values: Partial<WizardData>) => void;
  reset: () => void;
};

const initialWizard: WizardData = { projectType: "", materials: [], dimensions: "", style: "", reference: "", name: "", phone: "", email: "", location: "" };

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...initialWizard,
      step: 1,
      setStep: (step) => set({ step }),
      update: (values) => set(values),
      reset: () => set({ ...initialWizard, step: 1 }),
    }),
    { name: "nestro-wizard", storage: createJSONStorage(() => sessionStorage) },
  ),
);
