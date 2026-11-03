import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface PhotoItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
}

export const PhotoItem: React.FC<PhotoItemProps> = ({
  position,
  rotY = 0,
  scale = 1,
}) => {
  const isHovered = useDeskStore((s) => s.hover === 'photo');

  // Photo texture
  const photoTexture = useTexture('/about/pradip.webp');
  photoTexture.colorSpace = THREE.SRGBColorSpace;

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#382A21', // Dark walnut frame
      roughness: 0.6,
      metalness: 0.05,
    });
  }, []);

  const photoMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ map: photoTexture });
  }, [photoTexture]);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.1,
    });
  }, []);

  const w = 1.0 * scale;
  const h = 1.3 * scale;
  const leanAngle = -0.22; // Leaning back ~12 degrees

  return (
    <group
      name="photo"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('photo');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
    >
      <group rotation={[leanAngle, 0, 0]}>
        {/* Frame Outer Rim */}
        <mesh material={frameMaterial} position={[0, h / 2, 0]} castShadow>
          <boxGeometry args={[w, h, 0.05 * scale]} />
        </mesh>

        {/* Photo Print */}
        <mesh
          material={photoMaterial}
          position={[0, h / 2, 0.026 * scale]}
        >
          <planeGeometry args={[w * 0.84, h * 0.86]} />
        </mesh>

        {/* Glass Front Cover */}
        <mesh
          material={glassMaterial}
          position={[0, h / 2, 0.028 * scale]}
        >
          <planeGeometry args={[w * 0.84, h * 0.86]} />
        </mesh>

        {/* Rear Easel Stand Strut */}
        <mesh
          material={frameMaterial}
          position={[0, h * 0.4, -0.25 * scale]}
          rotation={[0.45, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.08 * scale, h * 0.75, 0.02 * scale]} />
        </mesh>
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.2, 0.6]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
