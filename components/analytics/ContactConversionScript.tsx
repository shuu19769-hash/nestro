import Script from "next/script";

const contactConversion = `function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-18417447403/ZyElCOax0fAcEOvjj85E',
      'event_callback': callback
  });
  return false;
}`;

export function ContactConversionScript() {
  return (
    <Script
      id="google-ads-contact-conversion"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: contactConversion }}
    />
  );
}
