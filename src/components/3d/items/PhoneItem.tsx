import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { createBeveledSlabGeometry, createFlatRoundedGeometry } from '../geometries/BeveledSlabGeometry';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface PhoneItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const PhoneItem: React.FC<PhoneItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'phone');

  const phoneTexture = useTexture('/desk/phone.webp');
  phoneTexture.colorSpace = THREE.SRGBColorSpace;

  const width = 0.95;
  const depth = 1.95;
  const thickness = 0.03;

  const bodyGeom = useMemo(() => {
    return createBeveledSlabGeometry(width, depth, thickness, 0.08, 0.008);
  }, [width, depth, thickness]);

  const screenGeom = useMemo(() => {
    return createFlatRoundedGeometry(width * 0.95, depth * 0.96, 0.07);
  }, [width, depth]);

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#26282B',
      metalness: 0.9,
      roughness: 0.25,
    });
  }, []);

  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: phoneTexture,
      toneMapped: false,
    });
  }, [phoneTexture]);

  return (
    <group
      name="phone"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('phone');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.open('phone');
      }}
    >
      {/* Phone chassis */}
      <mesh
        geometry={bodyGeom}
        material={frameMaterial}
        castShadow
        receiveShadow
        position={[0, thickness, 0]}
      />

      {/* Screen display */}
      <mesh
        geometry={screenGeom}
        material={screenMaterial}
        position={[0, thickness + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Dynamic island / pill */}
      <mesh
        position={[0, thickness + 0.003, -depth / 2 + 0.16]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.22, 0.06]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Hover glow */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width + 0.25, depth + 0.25]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
