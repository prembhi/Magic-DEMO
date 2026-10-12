const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_correction_pass");

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  console.log("Capturing exact 1280x720 milestones with absolute timing...");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  // 1. Opening ivory screen at 100ms
  await new Promise(r => setTimeout(r, 100));
  await page.screenshot({ path: path.join(OUT_DIR, "stage1_opening_ivory_1280x720.png") });

  // 2. First ingredients entering at 600ms (100 + 500)
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, "stage2_first_ingredients_1280x720.png") });

  // 3. Mid-fall at 1400ms (600 + 800)
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, "stage3_mid_fall_1280x720.png") });

  // 4. Final accumulated composition at 2180ms (1400 + 780) - right before wipeIn starts at 2250ms!
  await new Promise(r => setTimeout(r, 780));
  await page.screenshot({ path: path.join(OUT_DIR, "stage4_final_accumulation_1280x720.png") });

  // 5. Full red coverage at 2800ms (2180 + 620) - wipeIn completes at 2730ms, wipeOut starts at 3000ms
  await new Promise(r => setTimeout(r, 620));
  await page.screenshot({ path: path.join(OUT_DIR, "stage5_full_red_coverage_1280x720.png") });

  // 6. Homepage revealed at 3800ms (2800 + 1000)
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, "stage6_homepage_revealed_1280x720.png") });

  await page.close();
  await browser.close();
  console.log("Absolute milestone screenshots captured successfully!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
