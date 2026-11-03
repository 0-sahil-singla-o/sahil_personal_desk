const fs = require('fs');
const code = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');

// Find where material properties like roughness, metalness, color are created
const regex = /material|roughness|metalness/g;
let m;
const lines = code.split('\n');
const found = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('MeshStandardMaterial') || lines[i].includes('MeshPhysicalMaterial') || lines[i].includes('CanvasTexture')) {
    found.push(`Line ${i}: ${lines[i].trim()}`);
  }
}
console.log("Material lines found:", found.length);
console.log(found.slice(0, 30));
