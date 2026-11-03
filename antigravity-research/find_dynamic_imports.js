const fs = require('fs');
const path = require('path');

const root = 'sahil_desk/assets';
const dynamicImports = new Set();

for (const file of fs.readdirSync(root)) {
  if (file.endsWith('.js')) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    const regex = /import\s*\(\s*["']\.\/([^"']+)["']\s*\)/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      dynamicImports.add(m[1]);
    }
  }
}

console.log('All dynamic imports found:', [...dynamicImports]);

const missing = [];
for (const imp of dynamicImports) {
  const local = path.join(root, imp);
  if (!fs.existsSync(local)) {
    missing.push(imp);
  }
}

console.log('MISSING dynamic imports:', missing);
