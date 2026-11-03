import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createBeveledSlabGeometry } from '../geometries/BeveledSlabGeometry';
import { getProceduralWoodTexture } from '../materials/ProceduralWood';
import { DESK_DIMS } from '../core/DeskLayout';

export const DeskTable: React.FC = () => {
  const topGeometry = useMemo(() => {
    return createBeveledSlabGeometry(
      DESK_DIMS.w,
      DESK_DIMS.d,
      DESK_DIMS.top,
      0.22,
      0.06
    );
  }, []);

  const woodMaterial = useMemo(() => {
    const tex = getProceduralWoodTexture();
    return new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.62,
      metalness: 0.02,
    });
  }, []);

  const legMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#473A2F',
      roughness: 0.7,
      metalness: 0.05,
    });
  }, []);

  const legX = DESK_DIMS.w / 2 - 0.7;
  const legZ = DESK_DIMS.d / 2 - 0.55;

  return (
    <group name="desk-table">
      {/* Oak Table Top */}
      <mesh
        geometry={topGeometry}
        material={woodMaterial}
        castShadow
        receiveShadow
      />

      {/* 4 Oak Legs */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`leg-${sx}-${sz}`}
            material={legMaterial}
            position={[sx * legX, -DESK_DIMS.top - DESK_DIMS.legs / 2, sz * legZ]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.26, DESK_DIMS.legs, 0.26]} />
          </mesh>
        ))
      )}

      {/* Transverse Cross Support Rails */}
      {[-1, 1].map((sx) => (
        <mesh
          key={`rail-${sx}`}
          material={legMaterial}
          position={[sx * legX, -DESK_DIMS.top - 0.35, 0]}
          castShadow
        >
          <boxGeometry args={[0.2, 0.5, legZ * 2]} />
        </mesh>
      ))}
    </group>
  );
};
