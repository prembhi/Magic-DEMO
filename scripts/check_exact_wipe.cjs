const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_v3_pass");

async function checkExactWipeTime() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (const t of [2300, 2400, 2500, 2600, 2700, 2800, 2900]) {
    await new Promise(r => setTimeout(r, t - elapsed));
    elapsed = t;
    const info = await page.evaluate(() => {
      const el = document.querySelector('[class*="magic-wipe"]');
      if (!el) return "none";
      const r = el.getBoundingClientRect();
      return `class=${el.className.split(" ").slice(-1)[0]}, top=${r.top.toFixed(1)}, bottom=${r.bottom.toFixed(1)}`;
    });
    console.log(`t=${t}ms -> ${info}`);
    if (t === 2800) {
      await page.screenshot({ path: path.join(OUT_DIR, "desktop_1280x720_5_red_wipe.png") });
    }
  }
  await browser.close();
  console.log("Wipe check completed.");
}

checkExactWipeTime();
