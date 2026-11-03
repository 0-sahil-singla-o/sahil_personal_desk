import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ContactShadows } from '@react-three/drei';
import { DESK_DIMS } from './DeskLayout';

interface ShadowPadProps {
  w: number;
  d: number;
  opacity: number;
  position: [number, number, number];
  rotY?: number;
}

export const ShadowPad: React.FC<ShadowPadProps> = ({
  w,
  d,
  opacity,
  position,
  rotY = 0,
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh
      position={[position[0], 0.002, position[2]]}
      rotation={[-Math.PI / 2, 0, rotY]}
    >
      <planeGeometry args={[w, d]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
};

export const DeskFloorShadow: React.FC = () => {
  return (
    <ContactShadows
      position={[0, -DESK_DIMS.top - DESK_DIMS.legs, 0]}
      scale={34}
      resolution={512}
      blur={3}
      far={9}
      opacity={0.22}
      frames={1}
    />
  );
};
