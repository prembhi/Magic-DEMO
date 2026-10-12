const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const srcDir = "C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\3d34dfd3-d8a0-44e7-adcd-95f2954c0dd0";
const destDir = path.resolve("public/assets/magic/loader");

const images = [
  { src: "chilli_white_bg_1791736020630.jpg", dest: "spice-chilli.png" },
  { src: "turmeric_white_bg_1791736039726.jpg", dest: "spice-turmeric.png" },
  { src: "cinnamon_white_bg_1791736060552.jpg", dest: "spice-cinnamon.png" },
  { src: "cardamom_pods_solo_1791736118395.jpg", dest: "spice-cardamom.png" },
  { src: "star_anise_white_bg_1791736164114.jpg", dest: "spice-star-anise.png" },
  { src: "spice_seed_cluster_1791736190043.jpg", dest: "spice-seed-cluster.png" },
];

async function processImagesTight() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  for (const item of images) {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(destDir, item.dest);
    const base64 = fs.readFileSync(srcPath).toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;

    const pngBase64 = await page.evaluate(async (uri) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const i = (y * canvas.width + x) * 4;
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // White background threshold: very light grey/white
              const isBg = (r >= 235 && g >= 235 && b >= 235);

              if (isBg) {
                data[i + 3] = 0;
              } else {
                // Keep smooth edge
                if (r > 215 && g > 215 && b > 215) {
                  const brightness = (r + g + b) / 3;
                  data[i + 3] = Math.max(0, Math.min(255, (240 - brightness) * 10));
                }
                if (data[i + 3] > 10) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);

          minX = Math.max(0, minX - 4);
          minY = Math.max(0, minY - 4);
          maxX = Math.min(canvas.width, maxX + 4);
          maxY = Math.min(canvas.height, maxY + 4);

          const cropW = Math.max(1, maxX - minX);
          const cropH = Math.max(1, maxY - minY);

          const cropCanvas = document.createElement("canvas");
          cropCanvas.width = cropW;
          cropCanvas.height = cropH;
          const cropCtx = cropCanvas.getContext("2d");
          cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

          resolve({
            data: cropCanvas.toDataURL("image/png").split(",")[1],
            width: cropW,
            height: cropH
          });
        };
        img.src = uri;
      });
    }, dataUri);

    fs.writeFileSync(destPath, Buffer.from(pngBase64.data, "base64"));
    console.log(`Saved ${item.dest}: ${pngBase64.width}x${pngBase64.height} (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
}

processImagesTight();
