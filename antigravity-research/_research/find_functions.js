const fs = require('fs');
const code = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');

const funcs = ['xl', 'tl', 'sl', 'wl', 'ol', 'rl', 'Mc', 'Hl', 'zl', 'ul', 'bl', 'Al', 'Gc', 'Ic', 'nc', 'Kl', 'dc', 'Fe', 'va', 'c0', 'l0', '_c'];
for (const fn of funcs) {
  const reg = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
  let m = reg.exec(code);
  if (m) {
    const idx = m.index;
    const slice = code.slice(idx, idx + 400);
    const firstLine = slice.split('\n')[0];
    console.log(`Found ${fn} at pos ${idx}: ${firstLine}`);
  } else {
    // try const fn =
    const reg2 = new RegExp(`(?:const|let|var)\\s+${fn}\\s*=`, 'g');
    let m2 = reg2.exec(code);
    if (m2) {
      console.log(`Found ${fn} as var at pos ${m2.index}`);
    } else {
      console.log(`NOT found: ${fn}`);
    }
  }
}
