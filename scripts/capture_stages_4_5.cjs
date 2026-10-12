const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_correction_pass");

async function captureAccAndRed() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  
  // Capture Stage 4: at exactly t=2400ms from DOMContentLoaded (when all 42 spices have landed, before wipeIn starts at 2520ms)
  const page4 = await browser.newPage();
  await page4.setViewport({ width: 1280, height: 720 });
  await page4.evaluateOnNewDocument(() => sessionStorage.clear());
  await page4.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 2400));
  await page4.screenshot({ path: path.join(OUT_DIR, "stage4_final_accumulation_1280x720.png") });
  await page4.close();
  console.log("Stage 4 captured at 2400ms");

  // Capture Stage 5: at exactly t=3100ms from DOMContentLoaded (when wipeIn is 100% at matrix(1, 0, 0, 1, 0, 0))
  const page5 = await browser.newPage();
  await page5.setViewport({ width: 1280, height: 720 });
  await page5.evaluateOnNewDocument(() => sessionStorage.clear());
  await page5.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 3100));
  await page5.screenshot({ path: path.join(OUT_DIR, "stage5_full_red_coverage_1280x720.png") });
  await page5.close();
  console.log("Stage 5 captured at 3100ms");

  await browser.close();
}

captureAccAndRed();
