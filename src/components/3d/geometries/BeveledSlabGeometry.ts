import * as THREE from 'three';
import { createRoundedRectShape } from './RoundedShape';

/**
 * Creates an extruded, beveled 3D slab oriented horizontally (XZ plane)
 * with normalized UVs.
 */
export function createBeveledSlabGeometry(
  width: number,
  depth: number,
  height: number,
  radius: number,
  bevel: number = Math.min(0.03, height / 3)
): THREE.BufferGeometry {
  const shape = createRoundedRectShape(
    width - bevel * 2,
    depth - bevel * 2,
    Math.max(0.001, radius - bevel)
  );

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: height - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 20,
  });

  geom.rotateX(-Math.PI / 2);
  geom.translate(0, -(height - bevel), 0);

  // Normalize top-down UVs so wood grain and textures align perfectly
  const uv = geom.attributes.uv;
  if (uv) {
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, uv.getX(i) / width + 0.5, uv.getY(i) / depth + 0.5);
    }
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a flat 2D rounded rectangle geometry.
 */
export function createFlatRoundedGeometry(
  width: number,
  height: number,
  radius: number
): THREE.BufferGeometry {
  const shape = createRoundedRectShape(width, height, radius);
  const geom = new THREE.ShapeGeometry(shape, 24);
  const pos = geom.attributes.position;
  const uv = geom.attributes.uv;

  if (pos && uv) {
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, pos.getX(i) / width + 0.5, pos.getY(i) / height + 0.5);
    }
  }

  return geom;
}
