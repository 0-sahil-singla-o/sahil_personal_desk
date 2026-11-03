import * as THREE from 'three';
import { createMulberry32 } from './ProceduralWood';

let cachedTitaniumTexture: THREE.CanvasTexture | null = null;

/**
 * Creates brushed titanium canvas texture with etched typography:
 * Fine horizontal anisotropic grain, bevel highlights and embossed name.
 */
export function getTitaniumCardTexture(name: string = "Sahil Singla"): THREE.CanvasTexture {
  if (cachedTitaniumTexture) return cachedTitaniumTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const rng = createMulberry32(42);

  // Titanium gradient base
  const baseGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  baseGrad.addColorStop(0, '#55575A');
  baseGrad.addColorStop(0.5, '#73767B');
  baseGrad.addColorStop(1, '#4A4C4E');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Brushed grain lines
  for (let y = 0; y < canvas.height; y += 1.5) {
    const alpha = 0.04 + rng() * 0.08;
    const light = rng() > 0.5 ? 255 : 40;
    ctx.strokeStyle = `rgba(${light},${light},${light},${alpha})`;
    ctx.lineWidth = 0.8 + rng() * 1.2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Etched Typography
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // 1. Shadow along the top of the cut
  ctx.fillStyle = 'rgba(20, 20, 22, 0.7)';
  ctx.font = '600 38px Inter, sans-serif';
  ctx.fillText(name, 80, 260 - 1);
  ctx.font = '400 20px Inter, sans-serif';
  ctx.fillText('Full Stack · 3D Web Architect', 80, 310 - 1);

  // 2. Glint along the bottom of the cut
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '600 38px Inter, sans-serif';
  ctx.fillText(name, 80, 260 + 1);
  ctx.font = '400 20px Inter, sans-serif';
  ctx.fillText('Full Stack · 3D Web Architect', 80, 310 + 1);

  // 3. Main etched text core
  ctx.fillStyle = '#C8CACD';
  ctx.font = '600 38px Inter, sans-serif';
  ctx.fillText(name, 80, 260);
  ctx.font = '400 20px Inter, sans-serif';
  ctx.fillText('Full Stack · 3D Web Architect', 80, 310);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  cachedTitaniumTexture = texture;
  return texture;
}
