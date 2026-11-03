import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface DiaryItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const DiaryItem: React.FC<DiaryItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'diary');

  const coverMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#362B28', // Dark leather
      roughness: 0.8,
      metalness: 0.05,
    });
  }, []);

  const paperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FBF8EE', // Off-white cream paper
      roughness: 0.9,
      metalness: 0.0,
    });
  }, []);

  const ribbonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#A62626', // Red bookmark ribbon
      roughness: 0.6,
    });
  }, []);

  const w = 1.6;
  const d = 2.1;
  const h = 0.08;

  return (
    <group
      name="diary"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('diary');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.set({ diary: true });
      }}
    >
      {/* Leather Cover Base */}
      <mesh material={coverMaterial} position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* Left Open Page Block */}
      <mesh
        material={paperMaterial}
        position={[-w * 0.24, h + 0.015, 0]}
        rotation={[0, 0, 0.02]}
        castShadow
      >
        <boxGeometry args={[w * 0.46, 0.04, d * 0.94]} />
      </mesh>

      {/* Right Open Page Block */}
      <mesh
        material={paperMaterial}
        position={[w * 0.24, h + 0.015, 0]}
        rotation={[0, 0, -0.02]}
        castShadow
      >
        <boxGeometry args={[w * 0.46, 0.04, d * 0.94]} />
      </mesh>

      {/* Crease / Spine Indent */}
      <mesh position={[0, h + 0.02, 0]}>
        <boxGeometry args={[0.03, 0.01, d * 0.94]} />
        <meshBasicMaterial color="#DDD6C6" />
      </mesh>

      {/* Bookmark Ribbon cascading out of page */}
      <mesh
        material={ribbonMaterial}
        position={[0.1, h + 0.03, d / 2 + 0.15]}
        rotation={[-0.4, 0.2, 0]}
        castShadow
      >
        <boxGeometry args={[0.08, 0.005, 0.4]} />
      </mesh>

      {/* Hover Outline */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.25, d + 0.25]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
