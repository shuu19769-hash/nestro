export type InteractionEvent = "search"|"filter"|"compare"|"wishlist"|"quote_calculation"|"quote_add"|"quote_submit"|"consultation"|"whatsapp"|"phone";
export function track(event: InteractionEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("nestro:interaction", {
      detail: { event, properties, timestamp: Date.now() },
    }),
  );
}
