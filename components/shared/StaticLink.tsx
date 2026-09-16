import type { ComponentPropsWithoutRef } from "react";

type StaticLinkProps = ComponentPropsWithoutRef<"a"> & {
  prefetch?: boolean;
  scroll?: boolean;
};

/**
 * Static-export-safe internal navigation.
 *
 * Next's App Router creates companion `index.txt` RSC payloads for exported
 * pages. A normal document request always resolves the public HTML route and
 * prevents a payload URL from ever becoming the browser's visible location.
 */
export default function StaticLink(props: StaticLinkProps) {
  const anchorProps = { ...props };
  delete anchorProps.prefetch;
  delete anchorProps.scroll;
  return <a {...anchorProps} />;
}
