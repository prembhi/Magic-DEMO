const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_curtain_transition_verify");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function captureTransitionStages() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"]
  });

  async function snap(targetMs, name) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluateOnNewDocument(() => sessionStorage.clear());
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, targetMs));
    await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`) });
    const info = await page.evaluate(() => {
      const spiceScene = document.querySelector('[role="dialog"]');
      const curtain = document.querySelector('.magic-curtain');
      let curtainRect = null;
      if (curtain) {
        const r = curtain.getBoundingClientRect();
        curtainRect = { top: Math.round(r.top), bottom: Math.round(r.bottom) };
      }
      return { hasSpiceScene: !!spiceScene, hasCurtain: !!curtain, curtainRect };
    });
    console.log(`Captured ${name} at ${targetMs}ms:`, JSON.stringify(info));
    await page.close();
  }

  // A: Final spices settled (counter at 100%, spices fully settled)
  await snap(2250, "stage_A_spices_settled");
  // B: Solid MAGIC Red screen (100% full coverage, spices unmounted)
  await snap(3550, "stage_B_solid_red_screen");
  // C: Red curtain approximately halfway through its exit (curtain bottom ~ 360px)
  await snap(3820, "stage_C_curtain_halfway_exit");
  // D: Red curtain almost fully outside viewport (curtain bottom ~ 40px)
  await snap(4010, "stage_D_curtain_almost_exited");
  // E: Homepage fully revealed and interactive (loader completely unmounted)
  await snap(4400, "stage_E_homepage_fully_revealed");

  await browser.close();
  console.log("All required transition stages captured successfully!");
}

captureTransitionStages().catch(err => {
  console.error(err);
  process.exit(1);
});
