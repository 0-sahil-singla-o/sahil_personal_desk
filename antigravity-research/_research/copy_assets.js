const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'downloaded_site');
const destDir = path.join(__dirname, 'sahil_desk', 'public');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    // Skip .js and .css in root assets for now, or copy them if needed
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(srcDir, destDir);
console.log('Copied all downloaded assets to sahil_desk/public');
