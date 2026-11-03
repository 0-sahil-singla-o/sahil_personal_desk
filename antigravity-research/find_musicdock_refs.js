const fs = require('fs');
const path = require('path');

const root = 'sahil_desk/assets';
for (const file of fs.readdirSync(root)) {
  if (file.endsWith('.js')) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    if (text.includes('MusicDock')) {
      console.log(`Found MusicDock in ${file}`);
      const idx = text.indexOf('MusicDock');
      console.log(text.slice(Math.max(0, idx - 80), idx + 100));
    }
  }
}
