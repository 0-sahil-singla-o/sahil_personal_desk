const fs = require('fs');

const code = fs.readFileSync('deskscene_formatted.js', 'utf8');

// Find function definitions that return JSX or r.jsx / r.jsxs
const lines = code.split('\n');
const components = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Look for React component definitions like `function X(` or `const X = (`
  const m1 = line.match(/^function\s+([A-Za-z0-9_$]+)\s*\(/);
  const m2 = line.match(/^(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/);
  const name = m1 ? m1[1] : (m2 ? m2[1] : null);
  if (name) {
    // peek ahead 30 lines to see if it returns JSX or Three object
    const peek = lines.slice(i, i + 35).join('\n');
    if (peek.includes('r.jsx(') || peek.includes('r.jsxs(') || peek.includes('useFrame') || peek.includes('useThree')) {
      components.push({ name, line: i + 1 });
    }
  }
}

console.log("Detected components in DeskScene:", components.length);
console.log(components.slice(0, 30));
