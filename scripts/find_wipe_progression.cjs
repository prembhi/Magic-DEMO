const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function findExactWipeProgression() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (let t = 2800; t <= 3600; t += 50) {
    await new Promise(r => setTimeout(r, t - elapsed));
    elapsed = t;
    const r = await page.evaluate(() => {
      const el = document.querySelector('[class*="magic-wipe"]');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        cls: el.className.split(" ").slice(-1)[0],
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height)
      };
    });
    console.log(`t=${t}ms:`, r);
  }
  await browser.close();
}
findExactWipeProgression();
