const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_curtain_transition");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function trackTimeline() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  // Sample every 100ms from 2200ms to 4000ms
  const start = Date.now();
  for (let delay = 2200; delay <= 4000; delay += 100) {
    const elapsed = Date.now() - start;
    if (delay > elapsed) {
      await new Promise(r => setTimeout(r, delay - elapsed));
    }
    const info = await page.evaluate(() => {
      const spiceScene = document.querySelector('[role="dialog"]');
      const curtain = document.querySelector('.magic-curtain');
      const spicesCount = document.querySelectorAll('.animate-large-spice-fall').length;
      let curtainRect = null;
      if (curtain) {
        const r = curtain.getBoundingClientRect();
        curtainRect = { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) };
      }
      return {
        hasSpiceScene: !!spiceScene,
        spicesCount,
        hasCurtain: !!curtain,
        curtainRect,
        curtainClasses: curtain ? curtain.className : null
      };
    });
    console.log(`t=${delay}ms:`, JSON.stringify(info));
  }

  await browser.close();
}

trackTimeline().catch(err => {
  console.error(err);
  process.exit(1);
});
