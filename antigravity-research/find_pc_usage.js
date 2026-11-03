const fs = require('fs');
const indexJs = fs.readFileSync('sahil_desk/assets/index-CVLljmmv.js', 'utf8');

const regex = /<[A-Za-z0-9_$]*PC|PC\s*,\s*\{/g;
let m;
while ((m = regex.exec(indexJs)) !== null) {
  console.log('PC usage:', m[0], 'around index:', m.index);
  console.log(indexJs.slice(m.index - 80, m.index + 200));
}
