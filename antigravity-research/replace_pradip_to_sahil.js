const fs = require('fs');
const path = require('path');

const dir = 'sahil_desk/assets';
const files = [
  'index-CVLljmmv.js',
  'DeskScene-tZGhJadU.js',
  'cardFaces-BhqK1wyY.js',
  'Diary-Bu_qcXI-.js',
  'DiaryAdmin-fEDS8Erh.js',
  'ScreenOverlay-BcVxfGAm.js',
  'store-ePXdNfWM.js',
  'voice-09bKMOdm.js'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const beforeCount = (content.match(/Pradip/g) || []).length;
    // Replace full name first, then first name
    content = content.replace(/Pradip Dhakal/g, 'Sahil Singla');
    content = content.replace(/Pradip/g, 'Sahil');
    content = content.replace(/pradip-dhakal/g, 'sahil-singla');
    content = content.replace(/pradip/g, 'sahil');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}: replaced ${beforeCount} occurrences.`);
  }
}
