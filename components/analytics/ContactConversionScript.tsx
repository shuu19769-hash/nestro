import { googleAdsConversionSendTo } from "@/components/analytics/GoogleAdsTag";

const contactConversion = `function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': '${googleAdsConversionSendTo}',
      'event_callback': callback
  });
  return false;
}`;

export function ContactConversionScript() {
  return (
    <script id="google-ads-contact-conversion" dangerouslySetInnerHTML={{ __html: contactConversion }} />
  );
}
