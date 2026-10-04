import fs from "node:fs";

const pages = ["out/index.html", "out/contact/index.html"];
for (const file of pages) {
  const h = fs.readFileSync(file, "utf8");
  const checks = {
    gtmId: h.includes("GTM-KGZWD6CH"),
    gtmStart: h.includes("gtm.start"),
    gtmJsSrc: h.includes('src="https://www.googletagmanager.com/gtm.js?id=GTM-KGZWD6CH"'),
    gtmJsLoader: h.includes("googletagmanager.com/gtm.js"),
    noscriptIframe: h.includes("googletagmanager.com/ns.html?id=GTM-KGZWD6CH"),
    headScript: /<head>[\s\S]*?gtm\.start[\s\S]*?<\/head>/.test(h),
    bodyNoscript: /<body>[\s\S]*?ns\.html\?id=GTM-KGZWD6CH[\s\S]*?/.test(h),
  };
  console.log(file, checks);
}
