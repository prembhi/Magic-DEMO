const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_v5_inspection");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function inspectSections() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument(() => sessionStorage.setItem("magic_intro_seen_v1", "true"));
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

  // Capture full page
  await page.screenshot({ path: path.join(OUT_DIR, "full_homepage_360.png"), fullPage: true });

  // Capture individual sections
  const sections = await page.$$("section, footer");
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const id = await s.evaluate(el => el.id || el.getAttribute("aria-label") || el.tagName);
    await s.screenshot({ path: path.join(OUT_DIR, `section_${i}_${id.replace(/[^a-z0-9_-]/gi, '_')}.png`) });
  }

  await browser.close();
  console.log("Inspection screenshots captured!");
}

inspectSections().catch(console.error);
