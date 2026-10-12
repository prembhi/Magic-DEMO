const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function findExactWipeStartTime() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());

  // Listen to console
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));

  await page.evaluateOnNewDocument(() => {
    const origSetTimeout = window.setTimeout;
    window._startTime = performance.now();
  });

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let elapsed = 0;
  for (let t = 1000; t <= 2400; t += 200) {
    await new Promise(r => setTimeout(r, t - elapsed));
    elapsed = t;
    const isWiping = await page.evaluate(() => {
      const red = document.querySelector('[class*="magic-wipe"]');
      return red !== null;
    });
    console.log(`t=${t}ms hasWipe:`, isWiping);
  }
  await browser.close();
}
findExactWipeStartTime();
