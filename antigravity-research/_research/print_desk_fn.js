const fs = require('fs');
const code = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');

const pos = 116571;
console.log(code.slice(pos, pos + 1500));
