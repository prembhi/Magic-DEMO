const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function measureTail() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  const start = Date.now();
  while (Date.now() - start < 4700) {
    const elapsed = Date.now() - start;
    if (elapsed >= 3950) {
      const state = await page.evaluate(() => {
        const c = document.querySelector('.magic-curtain');
        if (!c) return { exists: false };
        const r = c.getBoundingClientRect();
        return {
          exists: true,
          top: Math.round(r.top),
          bottom: Math.round(r.bottom)
        };
      });
      console.log(`${elapsed}ms:`, JSON.stringify(state));
    }
    await new Promise(r => setTimeout(r, 25));
  }

  await browser.close();
}

measureTail().catch(console.error);
