const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function trackTimeline() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window._startTime = performance.now();
  });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  const result = await page.evaluate(() => {
    return {
      now: performance.now(),
      loaderMounted: document.querySelector('[role="dialog"]') !== null
    };
  });
  console.log("Result at DOMContentLoaded:", result);
  await browser.close();
}
trackTimeline();
