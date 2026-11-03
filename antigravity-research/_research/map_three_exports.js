const fs = require('fs');

// Read downloaded three.module
const code = fs.readFileSync('downloaded_site/assets/three.module-CUjkK1mn.js', 'utf8');

// Find the export statement at the end of three.module
const exportMatch = code.match(/export\s*\{([^}]+)\}/);
if (exportMatch) {
  const exportsStr = exportMatch[1];
  const map = {};
  const pairs = exportsStr.split(',').map(s => s.trim());
  for (const pair of pairs) {
    const parts = pair.split(/\s+as\s+/);
    if (parts.length === 2) {
      map[parts[1]] = parts[0];
    } else {
      map[parts[0]] = parts[0];
    }
  }
  
  // Now let's see what the imports in deskscene_formatted_utf8.js map to!
  const desk = fs.readFileSync('deskscene_formatted_utf8.js', 'utf8');
  const importMatch = desk.match(/import\s*\{([^}]+)\}\s*from\s*["']\.\/three\.module/);
  if (importMatch) {
    const imported = importMatch[1].split(',').map(s => s.trim());
    console.log("Three.js imports in DeskScene mapping:");
    for (const item of imported) {
      const p = item.split(/\s+as\s+/);
      const originalExport = p[0];
      const localName = p[1] || p[0];
      const threeName = map[originalExport];
      console.log(`  ${localName}: ${threeName} (exported as ${originalExport})`);
    }
  }
}
