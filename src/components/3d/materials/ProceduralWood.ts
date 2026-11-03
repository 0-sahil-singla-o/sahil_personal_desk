import * as THREE from 'three';

/**
 * Seeded pseudo-random number generator (Mulberry32).
 */
export function createMulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let cachedWoodTexture: THREE.CanvasTexture | null = null;

/**
 * Generates an ultra-crisp procedural oak wood canvas texture:
 * Base tone, 26 gradient bands, and 340 wavy wood grain lines.
 */
export function getProceduralWoodTexture(): THREE.CanvasTexture {
  if (cachedWoodTexture) return cachedWoodTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const rng = createMulberry32(7);

  // Base oak color
  ctx.fillStyle = '#E3D9C7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 26 soft bands of warm and light tones
  for (let s = 0; s < 26; s++) {
    const y = rng() * canvas.height;
    const grad = ctx.createLinearGradient(0, y - 60, 0, y + 60);
    const col = rng() > 0.5 ? '255,245,225' : '150,115,75';
    grad.addColorStop(0, `rgba(${col},0)`);
    grad.addColorStop(0.5, `rgba(${col},${0.05 + rng() * 0.07})`);
    grad.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 60, canvas.width, 120);
  }

  // 340 individual wood grain lines with harmonic sine waves
  for (let s = 0; s < 340; s++) {
    const y = rng() * canvas.height;
    const amp = 2 + rng() * 9;
    const freq = 0.0015 + rng() * 0.003;
    const phase = rng() * 10;

    const r = Math.floor(110 + rng() * 40);
    const g = Math.floor(80 + rng() * 30);
    const b = Math.floor(50 + rng() * 20);
    const alpha = 0.035 + rng() * 0.09;

    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = 0.6 + rng() * 2.4;
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x += 12) {
      const wave =
        y +
        Math.sin(x * freq + phase) * amp +
        Math.sin(x * freq * 3.3 + phase * 2) * amp * 0.25;
      if (x === 0) ctx.moveTo(x, wave);
      else ctx.lineTo(x, wave);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  cachedWoodTexture = texture;
  return texture;
}
