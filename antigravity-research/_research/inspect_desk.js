const fs = require("fs");
const desk = fs.readFileSync("temp_deskscene.js", "utf8");

const keywords = ["GLTFLoader", "DRACOLoader", "Mesh", "BoxGeometry", "CylinderGeometry", "CanvasTexture", "PlaneGeometry", "BufferGeometry", "ExtrudeGeometry", "Scene", "PerspectiveCamera", "WebGLRenderer"];
for (const kw of keywords) {
  const count = (desk.match(new RegExp(kw, "g")) || []).length;
  console.log(`${kw}: ${count}`);
}

// Check imports / exports in temp_deskscene.js
console.log("\nFirst 1000 characters of temp_deskscene.js:");
console.log(desk.slice(0, 1000));
