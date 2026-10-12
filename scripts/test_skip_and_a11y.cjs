const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function verifyInteractions() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });

  // Test 1: Escape key skip
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluateOnNewDocument(() => sessionStorage.clear());
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 600)); // during falling phase
    await page.keyboard.press("Escape");
    await new Promise(r => setTimeout(r, 200));
    const escResult = await page.evaluate(() => {
      const loader = document.querySelector('[role="dialog"]');
      const curtain = document.querySelector('.magic-curtain');
      return { loaderGone: !loader && !curtain, bodyOverflow: document.body.style.overflow };
    });
    console.log("Escape Key Test:", JSON.stringify(escResult));
    await page.close();
  }

  // Test 2: Reduced Motion
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.evaluateOnNewDocument(() => sessionStorage.clear());
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 250));
    const rmResult = await page.evaluate(() => {
      const loader = document.querySelector('[role="dialog"]');
      const curtain = document.querySelector('.magic-curtain');
      return { loaderGone: !loader && !curtain, bodyOverflow: document.body.style.overflow };
    });
    console.log("Reduced Motion Test:", JSON.stringify(rmResult));
    await page.close();
  }

  await browser.close();
}

verifyInteractions().catch(console.error);
