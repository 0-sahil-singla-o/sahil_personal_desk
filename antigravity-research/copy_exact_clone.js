const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'downloaded_site');
const destDir = path.join(__dirname, 'sahil_desk');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// Copy everything from downloaded_site into sahil_desk
copyRecursive(srcDir, destDir);
console.log('Successfully copied all downloaded_site files into sahil_desk');
