async function main() {
  const three = await import('./downloaded_site/assets/three.module-CUjkK1mn.js');
  const desk = await import('./deskscene_formatted_utf8.js');
}
// Or let's inspect the exports of three
async function inspectThree() {
  const three = await import('./downloaded_site/assets/three.module-CUjkK1mn.js');
  console.log("Total three exports:", Object.keys(three).length);
  for (const [k, v] of Object.entries(three)) {
    if (typeof v === 'function') {
      const isProp = Object.keys(v.prototype || {}).find(p => p.startsWith('is'));
      console.log(`Export ${k}: function ${v.name} (isProp: ${isProp})`);
    } else if (typeof v === 'object' && v !== null) {
      console.log(`Export ${k}: object`);
    } else {
      console.log(`Export ${k}: ${typeof v} = ${v}`);
    }
  }
}
inspectThree();
