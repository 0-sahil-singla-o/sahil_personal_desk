import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { createBeveledSlabGeometry, createFlatRoundedGeometry } from '../geometries/BeveledSlabGeometry';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface TabletItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const TabletItem: React.FC<TabletItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'tablet');

  const tabletTexture = useTexture('/desk/tablet.webp');
  tabletTexture.colorSpace = THREE.SRGBColorSpace;

  const width = 1.6;
  const depth = 2.3;
  const thickness = 0.035;

  const bodyGeom = useMemo(() => {
    return createBeveledSlabGeometry(width, depth, thickness, 0.06, 0.008);
  }, [width, depth, thickness]);

  const screenGeom = useMemo(() => {
    return createFlatRoundedGeometry(width * 0.94, depth * 0.94, 0.04);
  }, [width, depth]);

  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A4C50',
      metalness: 0.8,
      roughness: 0.35,
    });
  }, []);

  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: tabletTexture,
      toneMapped: false,
    });
  }, [tabletTexture]);

  return (
    <group
      name="tablet"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('tablet');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.open('tablet');
      }}
    >
      {/* Tablet Body */}
      <mesh
        geometry={bodyGeom}
        material={aluminumMaterial}
        castShadow
        receiveShadow
        position={[0, thickness, 0]}
      />

      {/* Screen Face */}
      <mesh
        geometry={screenGeom}
        material={screenMaterial}
        position={[0, thickness + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

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
