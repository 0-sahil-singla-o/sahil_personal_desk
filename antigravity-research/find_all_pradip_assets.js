const fs = require('fs');
const path = require('path');

const dir = 'sahil_desk/assets';
for (const file of fs.readdirSync(dir)) {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const m1 = (content.match(/Pradip/g) || []).length;
    const m2 = (content.match(/Dhakal/g) || []).length;
    if (m1 > 0 || m2 > 0) {
      console.log(`${file}: Pradip=${m1}, Dhakal=${m2}`);
    }
  }
}
