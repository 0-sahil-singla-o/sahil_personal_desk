const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'downloaded_site');
const files = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else {
      files.push(path.relative(root, full).replace(/\\/g, '/'));
    }
  }
}

walk(root);
console.log('Total files in downloaded_site:', files.length);

// Scan all JS and HTML files for any URL references like /assets/... or /desk/... or /work/...
const referencedUrls = new Set();
for (const f of files) {
  if (f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css')) {
    const content = fs.readFileSync(path.join(root, f), 'utf8');
    const regex = /(?:["'`])(\/(?:assets|desk|work|logos|about|fonts)\/[a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)(?:["'`])/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      referencedUrls.add(m[1].slice(1)); // strip leading slash
    }
  }
}

console.log('Total unique referenced URLs in code:', referencedUrls.size);
const missing = [];
for (const url of referencedUrls) {
  const local = path.join(root, url.replace(/\//g, path.sep));
  if (!fs.existsSync(local)) {
    missing.push(url);
  }
}

console.log('Missing files:', missing);
