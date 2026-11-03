const fs = require('fs');
const code = fs.readFileSync('index_formatted_utf8.js', 'utf8');
const idx = code.indexOf('let ce = {');
console.log(code.slice(idx, idx + 2500));
