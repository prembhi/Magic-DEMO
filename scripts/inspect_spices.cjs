const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function inspectSpices() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (const targetT of [400, 800, 1200, 1600, 2000, 2300]) {
    await new Promise(r => setTimeout(r, targetT - elapsed));
    elapsed = targetT;
    const stats = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll(".animate-spice-fall"));
      const visible = els.filter(el => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
      });
      return { total: els.length, visible: visible.length };
    });
    console.log(`t=${targetT}ms visible: ${stats.visible}/${stats.total}`);
  }
  await browser.close();
}
inspectSpices();
