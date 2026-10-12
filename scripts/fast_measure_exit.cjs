const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function measureFast() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  // Poll every 25ms from 2900ms to 3700ms
  const start = Date.now();
  while (Date.now() - start < 4000) {
    const elapsed = Date.now() - start;
    if (elapsed >= 2800) {
      const state = await page.evaluate(() => {
        const c = document.querySelector('.magic-curtain');
        if (!c) return { exists: false };
        const r = c.getBoundingClientRect();
        return {
          exists: true,
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          cls: c.className
        };
      });
      console.log(`${elapsed}ms:`, JSON.stringify(state));
    }
    await new Promise(r => setTimeout(r, 25));
  }

  await browser.close();
}

measureFast().catch(console.error);
