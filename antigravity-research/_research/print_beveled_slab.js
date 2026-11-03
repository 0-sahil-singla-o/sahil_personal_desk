const fs = require('fs');
const code = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');

const reg = /function\s+Qe\s*\(/;
const m = reg.exec(code);
if (m) {
  console.log(code.slice(m.index, m.index + 800));
}
