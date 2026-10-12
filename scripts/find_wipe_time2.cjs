const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function findExactWipeStartTime2() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (let t = 2400; t <= 3600; t += 100) {
    await new Promise(r => setTimeout(r, t - elapsed));
    elapsed = t;
    const isWiping = await page.evaluate(() => {
      const red = document.querySelector('[class*="magic-wipe"]');
      const dialog = document.querySelector('[role="dialog"]');
      return {
        hasWipe: red !== null,
        hasDialog: dialog !== null,
        wipeClass: red ? red.className : null
      };
    });
    console.log(`t=${t}ms:`, JSON.stringify(isWiping));
  }
  await browser.close();
}
findExactWipeStartTime2();
