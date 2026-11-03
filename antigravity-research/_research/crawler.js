const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE_URL = "https://www.pradiplabs.dev";
const DOWNLOAD_DIR = path.join(__dirname, "downloaded_site");

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

function downloadFile(relPath) {
  return new Promise((resolve) => {
    let cleanPath = relPath.startsWith("/") ? relPath : "/" + relPath;
    if (cleanPath === "/") cleanPath = "/index.html";
    const dest = path.join(DOWNLOAD_DIR, cleanPath.replace(/\//g, path.sep));
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve({ path: cleanPath, status: "cached" });
    }

    const file = fs.createWriteStream(dest);
    https.get(BASE_URL + cleanPath, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve({ path: cleanPath, status: 200, size: fs.statSync(dest).size });
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve({ path: cleanPath, status: res.statusCode });
      }
    }).on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ path: cleanPath, status: err.message });
    });
  });
}

async function run() {
  const queue = new Set([
    "/",
    "/index.html",
    "/assets/index-CVLljmmv.js",
    "/assets/index-ZJqfgMEj.css",
    "/assets/three.module-CUjkK1mn.js",
    "/assets/DeskScene-tZGhJadU.js",
    "/assets/XRayPanel-qcYqyndW.js",
    "/assets/xrayParts-BGXHN5ie.js",
    "/assets/voice-09bKMOdm.js",
    "/assets/CatFace-CbD7fJJW.js",
    "/assets/snapshot-DTyrC_Il.js",
    "/assets/sleeve-DGAWclPB.js",
    "/assets/pause-DxWOoMlk.js",
    "/assets/play-j_2k2-ao.js",
    "/assets/plus-vk532uRI.js",
    "/assets/poll-tgD12__Z.js",
    "/assets/ScreenOverlay-BcVxfGAm.js",
    "/assets/loader-circle-DN6uYraU.js",
    "/assets/search-jow8XQHv.js",
    "/assets/sparkles-Co_2M5nk.js",
    "/assets/check-BS3qalfJ.js",
    "/assets/download-BBs_Qca8.js",
    "/assets/feed-oeDbU_yY.js",
    "/assets/index-C-avJtwM.js",
    "/assets/Diary-Bu_qcXI-.js",
    "/assets/api-7aHxDYRU.js",
    "/assets/SongRequest-C4Se6cC2.js",
    "/assets/shield-check-CK4hTAqH.js",
    "/assets/PollCard-Diw503Mu.js",
    "/assets/pollIcons-DlQMWJAm.js",
    "/assets/ShareSheet-ojbsBLLB.js",
    "/assets/FeedCard-D5dTpc6S.js",
    "/assets/DiaryAdmin-fEDS8Erh.js",
    "/desk/laptop.webp",
    "/desk/tablet.webp",
    "/desk/phone.webp",
    "/desk/poster.webp",
    "/desk/poster-tall.webp",
    "/about/pradip.webp",
    "/fonts/inter-latin.woff2",
    "/favicon.ico",
    "/pd-favicon.png",
    "/og-desk.png"
  ]);

  const processed = new Set();

  while (queue.size > 0) {
    const batch = [...queue].slice(0, 10);
    for (const item of batch) {
      queue.delete(item);
      if (processed.has(item)) continue;
      processed.add(item);
      const res = await downloadFile(item);
      console.log(`[${res.status}] ${item} (${res.size || 0} bytes)`);

      // If it's a JS or CSS file, scan for more assets
      const scanItem = item === "/" ? "/index.html" : item;
      const localPath = path.join(DOWNLOAD_DIR, scanItem.replace(/\//g, path.sep));
      if (fs.existsSync(localPath) && (scanItem.endsWith(".js") || scanItem.endsWith(".css") || scanItem.endsWith(".html"))) {
        const content = fs.readFileSync(localPath, "utf8");
        // find assets
        const assetRegex = /(?:assets\/|\/assets\/|\/desk\/|\/about\/|\/work\/|\/logos\/|\/audio\/|\/models\/|\/fonts\/)([a-zA-Z0-9_\-\.\/]+\.(?:js|css|webp|png|jpg|jpeg|svg|mp3|wav|ogg|woff2|woff|json|glb|gltf))/g;
        let m;
        while ((m = assetRegex.exec(content)) !== null) {
          const found = "/" + m[0].replace(/^\//, "");
          if (!processed.has(found)) {
            queue.add(found);
          }
        }
      }
    }
  }

  console.log("Finished downloading! Total items processed:", processed.size);
}

run();
