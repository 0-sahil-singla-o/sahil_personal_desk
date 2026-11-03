const fs = require('fs');
const indexJs = fs.readFileSync('sahil_desk/assets/index-CVLljmmv.js', 'utf8');

console.log(indexJs.slice(369000, 369650));
