const fs = require('fs');
const path = require('path');

const dir = 'sahil_desk/assets';
const endpoints = new Set();
for (const f of fs.readdirSync(dir)) {
  if (f.endsWith('.js')) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const regex = /["'`](\/api\/[a-zA-Z0-9_\-\?=&]+)["'`]/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      endpoints.add(m[1]);
    }
  }
}

console.log('Discovered API endpoints in code:', [...endpoints]);
