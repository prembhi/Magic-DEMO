const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function measureWipe() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  await new Promise(r => setTimeout(r, 3100)); // when wipeIn should be at 100%

  const data = await page.evaluate(() => {
    const el = document.querySelector('[class*="magic-wipe"]');
    if (!el) return { error: "no wipe element found" };
    const r = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      top: r.top,
      bottom: r.bottom,
      height: r.height,
      windowH: window.innerHeight,
      transform: style.transform
    };
  });
  console.log("Wipe metrics at 3100ms:", data);
  await browser.close();
}
measureWipe();
