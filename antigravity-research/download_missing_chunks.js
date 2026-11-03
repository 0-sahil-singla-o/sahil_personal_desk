const https = require('https');
const fs = require('fs');
const path = require('path');

const missing = [
  'index-Cp_ezE54.js',
  'MusicDock-D5SjbxWF.js',
  'fold-3WTlVEfB.js',
  'geometry-smdDo6YF.js',
  'Coffee-vfgjKnFA.js',
  'Devices-DpLAxNXL.js',
  'Furniture-CsO1rW37.js',
  'Laptop-LQXRtVdY.js',
  'Plant-2zeGJnHP.js',
  'Printer-CxJE2qFT.js',
  'Zoro-B6Lk-DKv.js',
  'cardFaces-BhqK1wyY.js',
  'doodles-isbl70mL.js',
  'store-ePXdNfWM.js',
  'sydneySun-BRFxnAmr.js'
];

async function download(file) {
  return new Promise((resolve) => {
    const url = 'https://www.pradiplabs.dev/assets/' + file;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = [];
        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(data);
          fs.writeFileSync(path.join('sahil_desk', 'assets', file), buffer);
          fs.writeFileSync(path.join('downloaded_site', 'assets', file), buffer);
          console.log(`[200 OK] Downloaded ${file} (${buffer.length} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`[${res.statusCode} ERROR] ${file}`);
        resolve(false);
      }
    }).on('error', err => {
      console.error(`[ERROR] ${file}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const f of missing) {
    await download(f);
  }
  console.log('Finished downloading all missing chunks!');
}

run();
