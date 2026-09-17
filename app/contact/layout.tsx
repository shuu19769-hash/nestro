import type { ReactNode } from "react";
import { ContactConversionScript } from "@/components/analytics/ContactConversionScript";

export default function ContactLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <head>
        <ContactConversionScript />
      </head>
      {children}
    </>
  );
}
