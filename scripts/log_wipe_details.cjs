const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function logWipeDetails() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (const t of [2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200]) {
    await new Promise(r => setTimeout(r, t - elapsed));
    elapsed = t;
    const res = await page.evaluate(() => {
      const el = document.querySelector('[class*="magic-wipe"]');
      if (!el) return "null";
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return `class=${el.className.split(" ").slice(-1)[0]}, top=${r.top.toFixed(1)}, bottom=${r.bottom.toFixed(1)}, transform=${style.transform}`;
    });
    console.log(`t=${t}ms -> ${res}`);
  }
  await browser.close();
}
logWipeDetails();
