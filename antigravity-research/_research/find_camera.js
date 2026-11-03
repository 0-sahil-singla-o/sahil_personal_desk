const fs = require('fs');
const code = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');

// Find camera targets or focus handling
const lines = code.split('\n');
const cameraPositions = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('intro:') || lines[i].includes('laptop:') || lines[i].includes('tablet:') || lines[i].includes('phone:') || lines[i].includes('diary:')) {
    cameraPositions.push(`Line ${i}: ${lines[i]}`);
  }
}
console.log("Camera positions / references:", cameraPositions.slice(0, 30));
