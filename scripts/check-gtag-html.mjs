import fs from "node:fs";
const h = fs.readFileSync("out/contact/index.html", "utf8");
console.log("has gtag js src:", h.includes('src="https://www.googletagmanager.com/gtag/js'));
console.log("has dataLayer inline:", h.includes("window.dataLayer"));
console.log("has preload only:", h.includes('rel="preload" href="https://www.googletagmanager.com/gtag/js'));
const markers = ["google-ads-tag", "google-ads-contact-conversion", "gtag_report_conversion"];
for (const m of markers) {
  const i = h.indexOf(m);
  console.log(m, i >= 0 ? h.slice(i, i + 350) : "MISSING");
}
