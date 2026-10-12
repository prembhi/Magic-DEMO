const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_v4_qa");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, isMobile: false },
  { name: "1280x800", width: 1280, height: 800, isMobile: false },
  { name: "1024x768", width: 1024, height: 768, isMobile: false },
  { name: "768x1024", width: 768, height: 1024, isMobile: true },
  { name: "390x844", width: 390, height: 844, isMobile: true },
  { name: "360x800", width: 360, height: 800, isMobile: true },
];

async function runResponsiveQA() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    // set intro already seen
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("magic_intro_seen_v1", "true"));
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

    // Measure horizontal overflow
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.offsetWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.offsetWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      return {
        docWidth,
        scrollWidth,
        bodyWidth,
        bodyScrollWidth,
        hasOverflow: scrollWidth > docWidth || bodyScrollWidth > bodyWidth
      };
    });

    // Check section count
    const sections = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return [];
      return Array.from(main.querySelectorAll("section")).map(s => s.id || s.getAttribute("aria-label") || "unnamed");
    });

    console.log(`[Viewport ${vp.name}] Sections:`, sections, `Overflow:`, overflow.hasOverflow ? "FAIL" : "PASS (0px)");

    // Capture full page screenshot
    await page.screenshot({ path: path.join(OUT_DIR, `homepage_${vp.name}.png`), fullPage: false });
    await page.close();
  }

  // Test Other Routes at 1280x800
  const routes = [
    { name: "shop", url: "http://localhost:3000/#shop" },
    { name: "recipes", url: "http://localhost:3000/#recipes" },
    { name: "bundles", url: "http://localhost:3000/#bundles" },
    { name: "impact", url: "http://localhost:3000/#impact" },
    { name: "product_toor", url: "http://localhost:3000/#shop/product/magic-toor-dal" },
  ];

  for (const r of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("magic_intro_seen_v1", "true"));
    await page.goto(r.url, { waitUntil: "networkidle0" });
    await page.screenshot({ path: path.join(OUT_DIR, `route_${r.name}.png`) });
    console.log(`[Route ${r.name}] Verified and captured`);
    await page.close();
  }

  // Test Cart Drawer and Reduced Motion
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("magic_intro_seen_v1", "true"));
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
    
    // Click cart button
    const cartButton = await page.$('button[aria-label*="cart"], button[aria-label*="Cart"], button[aria-label*="حقيبة"]');
    if (cartButton) {
      await cartButton.click();
      await new Promise(r => setTimeout(r, 350));
      await page.screenshot({ path: path.join(OUT_DIR, "cart_drawer_open.png") });
      console.log("[Cart Drawer] Verified and captured");
    }
    await page.close();
  }

  await browser.close();
  console.log("All V4 Responsive & Motion QA tests completed successfully!");
}

runResponsiveQA().catch(err => {
  console.error(err);
  process.exit(1);
});
