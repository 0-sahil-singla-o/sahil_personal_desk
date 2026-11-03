const fs = require('fs');

const desk = fs.readFileSync('temp_deskscene.js', 'utf8');

// Let's find string literals in temp_deskscene.js
const strRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
const strings = new Set();
let match;
while ((match = strRegex.exec(desk)) !== null) {
  const s = match[1] || match[2];
  if (s && s.length > 3 && s.length < 50 && !s.includes("\n")) {
    strings.add(s);
  }
}

console.log("Total unique strings:", strings.size);
const interesting = [...strings].filter(s => 
  /mesh|geom|camera|light|shadow|desk|lamp|laptop|phone|tablet|screen|cat|plant|cup|mug|mouse|keyboard|paper|pen|chair|floor|wall|room|audio|click|pointer|hover/i.test(s)
);
console.log("Interesting keywords found in desk scene:", interesting);
