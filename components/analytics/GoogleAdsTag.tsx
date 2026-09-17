const GOOGLE_ADS_ID = "AW-18417447403";

const googleAdsBootstrap = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`;

/** Standard gtag in <head> so static export and Tag Assistant see an active tag. */
export function GoogleAdsTag() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
      <script id="google-ads-tag" dangerouslySetInnerHTML={{ __html: googleAdsBootstrap }} />
    </>
  );
}

export const googleAdsConversionSendTo = `${GOOGLE_ADS_ID}/ZyElCOax0fAcEOvjj85E`;

export function reportGoogleAdsContactConversion(url?: string) {
  if (typeof window === "undefined") return false;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (redirectUrl?: string) => boolean;
  };
  if (typeof w.gtag_report_conversion === "function") {
    return w.gtag_report_conversion(url);
  }
  if (typeof w.gtag !== "function") return false;
  w.gtag("event", "conversion", {
    send_to: googleAdsConversionSendTo,
    event_callback: () => {
      if (typeof url !== "undefined") {
        window.location.href = url;
      }
    },
  });
  return false;
}
