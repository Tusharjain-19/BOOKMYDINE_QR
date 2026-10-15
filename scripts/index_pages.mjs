/**
 * Script to verify, ping, and request indexing for all BookMyDine QR pages.
 * Run with: node scripts/index_pages.mjs
 */

const HOST = "bookmydineqr.vercel.app";
const KEY = "e5b8d21c38fa46b5a34e0628e917d2a5";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}`,
  `https://${HOST}/ahmedabad`,
  `https://${HOST}/bangalore`,
  `https://${HOST}/chennai`,
  `https://${HOST}/delhi`,
  `https://${HOST}/hyderabad`,
  `https://${HOST}/jaipur`,
  `https://${HOST}/kolkata`,
  `https://${HOST}/lucknow`,
  `https://${HOST}/menu/cafe-cozy`,
  `https://${HOST}/menu/komorebi-bistro`,
  `https://${HOST}/menu/l-orangerie`,
  `https://${HOST}/menu/neon-taproom`,
  `https://${HOST}/menu/street-express`,
  `https://${HOST}/menu/tandoori-palace`,
  `https://${HOST}/mumbai`,
  `https://${HOST}/onboard`,
  `https://${HOST}/pune`,
];

async function main() {
  console.log("=================================================");
  console.log("  BookMyDine QR — Page Indexing & Crawl Trigger  ");
  console.log("=================================================\n");

  console.log(`[1/3] Verifying HTTP Status & Canonical on all ${URLS.length} URLs...`);
  for (const url of URLS) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const canonicalMatch = text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      const canonical = canonicalMatch ? canonicalMatch[1] : "MISSING";
      const isCanonicalCorrect = canonical === url || (url === `https://${HOST}` && (canonical === `https://${HOST}` || canonical === `https://${HOST}/`));
      console.log(`  ${res.status === 200 ? "✓" : "✗"} [${res.status}] ${url.padEnd(52)} -> Canonical: ${canonical} ${isCanonicalCorrect ? "✓" : "⚠ MISMATCH"}`);
    } catch (err) {
      console.error(`  ✗ [ERR] ${url} : ${err.message}`);
    }
  }

  console.log(`\n[2/3] Submitting ${URLS.length} URLs to IndexNow (Bing, Yandex, Naver)...`);
  try {
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: URLS,
    };
    const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(`  IndexNow API response: HTTP ${indexNowRes.status} (${indexNowRes.status === 200 ? "Accepted & Queued" : indexNowRes.statusText})`);
  } catch (err) {
    console.error(`  IndexNow Submission Error: ${err.message}`);
  }

  console.log(`\n[3/3] Pinging Search Engine Sitemap Endpoints...`);
  const sitemapUrl = encodeURIComponent(`https://${HOST}/sitemap.xml`);
  const pings = [
    { name: "Google Sitemaps Ping", url: `https://www.google.com/ping?sitemap=${sitemapUrl}` },
    { name: "Bing Sitemaps Ping", url: `https://www.bing.com/ping?sitemap=${sitemapUrl}` },
  ];
  for (const p of pings) {
    try {
      const res = await fetch(p.url);
      console.log(`  ${p.name}: HTTP ${res.status}`);
    } catch (err) {
      console.log(`  ${p.name}: Handled (${err.message})`);
    }
  }

  console.log("\n=================================================");
  console.log("  Google Search Console (GSC) Action Links:      ");
  console.log("=================================================");
  console.log("To request immediate priority indexing in Google Search Console,");
  console.log("open the URL Inspection tool in GSC for each page:\n");

  const gscBase = "https://search.google.com/search-console/inspect?resource_id=" + encodeURIComponent(`https://${HOST}/`) + "&id=";
  URLS.forEach((u) => {
    console.log(`• ${u}`);
    console.log(`  GSC Inspect: ${gscBase}${encodeURIComponent(u)}\n`);
  });

  console.log("Complete! When pushed to git/Vercel, re-inspect these in GSC and click 'Request Indexing'.");
}

main();
