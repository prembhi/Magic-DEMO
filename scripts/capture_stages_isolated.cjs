const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_correction_pass");

async function captureStage(targetMs, filename) {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, targetMs));
  await page.screenshot({ path: path.join(OUT_DIR, filename) });
  await page.close();
  await browser.close();
  console.log(`Saved ${filename} at ${targetMs}ms`);
}

async function run() {
  await captureStage(150, "stage1_opening_ivory_1280x720.png");
  await captureStage(650, "stage2_first_ingredients_1280x720.png");
  await captureStage(1350, "stage3_mid_fall_1280x720.png");
  await captureStage(2150, "stage4_final_accumulation_1280x720.png");
  await captureStage(2850, "stage5_full_red_coverage_1280x720.png");
  await captureStage(3850, "stage6_homepage_revealed_1280x720.png");
  console.log("All 6 stages isolated and saved successfully!");
}

run();
