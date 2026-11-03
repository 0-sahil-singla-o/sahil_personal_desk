const fs = require('fs');
const indexJs = fs.readFileSync('sahil_desk/assets/index-CVLljmmv.js', 'utf8');

// Find references to DeskScene in indexJs
const regex = /DeskScene[^"'\s]*\.js/g;
let m;
while ((m = regex.exec(indexJs)) !== null) {
  console.log('DeskScene reference found:', m[0], 'around index:', m.index);
  console.log(indexJs.slice(m.index - 80, m.index + 120));
}
