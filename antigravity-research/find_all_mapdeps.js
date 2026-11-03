const fs = require('fs');
const path = require('path');

const root = 'sahil_desk/assets';
const allDeps = new Set();

for (const file of fs.readdirSync(root)) {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(root, file), 'utf8');
    // Vite chunk map regex: __vite__mapDeps(...) or array of assets/foo.js
    const regex = /"assets\/[a-zA-Z0-9_\-\.]+\.js"/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      allDeps.add(m[0].replace(/"/g, ''));
    }
    const regex2 = /'assets\/[a-zA-Z0-9_\-\.]+\.js'/g;
    while ((m = regex2.exec(content)) !== null) {
      allDeps.add(m[0].replace(/'/g, ''));
    }
  }
}

console.log('Total discovered chunks from mapDeps:', allDeps.size);
console.log([...allDeps]);

// Check which ones are missing locally
const missing = [];
for (const dep of allDeps) {
  const localFile = path.join('sahil_desk', dep);
  if (!fs.existsSync(localFile)) {
    missing.push(dep);
  }
}

console.log('MISSING CHUNKS LOCALLY:', missing);
