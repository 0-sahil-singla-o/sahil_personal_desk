const fs = require("fs");

function findChunks(content) {
  const chunks = new Set();
  // Match vite chunk references like "assets/Foo-XXXX.js" or "/assets/Foo-XXXX.js"
  const regex = /(?:assets\/|\/assets\/)([a-zA-Z0-9_\-]+\.(?:js|css))/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    chunks.add(m[1]);
  }
  return [...chunks];
}

const desk = fs.readFileSync("temp_deskscene.js", "utf8");
const idx = fs.readFileSync("temp_index.js", "utf8");

const allChunks = new Set([...findChunks(desk), ...findChunks(idx)]);
console.log("Found chunks:", [...allChunks]);
