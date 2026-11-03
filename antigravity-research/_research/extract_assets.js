const fs = require("fs");

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf8");
  const matches = new Set();
  const regex = /["'`](\/[a-zA-Z0-9_\-\.\/]+\.(?:glb|gltf|bin|webp|png|jpg|jpeg|svg|mp3|wav|ogg|woff2|woff|json|wasm))["'`]/gi;
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.add(m[1]);
  }
  return [...matches];
}

console.log("DeskScene assets:\n", scanFile("temp_deskscene.js"));
console.log("Index assets:\n", scanFile("temp_index.js"));
