const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function checkLifecycle() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  for (let t = 200; t <= 3800; t += 300) {
    const info = await page.evaluate(() => {
      const wipe = document.querySelector('[class*="magic-wipe"]');
      const dialog = document.querySelector('[role="dialog"]');
      const isRed = document.querySelector('[class*="bg-[#C8102E]"]');
      return {
        hasDialog: !!dialog,
        wipeClass: wipe ? wipe.className : null,
        hasRed: !!isRed,
        rect: wipe ? wipe.getBoundingClientRect() : null
      };
    });
    console.log(`t=${t}ms:`, JSON.stringify(info));
    await new Promise(r => setTimeout(r, 300));
  }
  await browser.close();
}
checkLifecycle();
