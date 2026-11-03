const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'sahil_desk');
const allFiles = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) walk(full);
    else allFiles.push(path.relative(root, full).replace(/\\/g, '/'));
  }
}

walk(root);

console.log('Audit sahil_desk files total:', allFiles.length);

// Scan for any URLs in index.html and assets/*.js
const referenced = new Set();
for (const f of allFiles) {
  if (f === 'index.html' || f.startsWith('assets/')) {
    const text = fs.readFileSync(path.join(root, f), 'utf8');
    const matches = text.match(/(?:['"`])(\/(?:assets|desk|work|logos|about|fonts)[a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)(?:['"`])/g);
    if (matches) {
      for (const m of matches) {
        const clean = m.slice(1, -1).replace(/^\//, '');
        referenced.add(clean);
      }
    }
  }
}

console.log('Total referenced static paths in sahil_desk code:', referenced.size);

const missing = [];
for (const ref of referenced) {
  const local = path.join(root, ref.replace(/\//g, path.sep));
  const publicLocal = path.join(root, 'public', ref.replace(/\//g, path.sep));
  if (!fs.existsSync(local) && !fs.existsSync(publicLocal)) {
    missing.push(ref);
  }
}

console.log('Missing referenced files in sahil_desk:', missing);
