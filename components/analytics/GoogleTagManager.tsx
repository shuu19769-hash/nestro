const GTM_ID = "GTM-KGZWD6CH";

/** Inline bootstrap + async gtm.js so static export HTML loads GTM without waiting on Next runtime. */
export function GoogleTagManagerHead() {
  const bootstrap = `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`;
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
    </>
  );
}

export function GoogleTagManagerBody() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
