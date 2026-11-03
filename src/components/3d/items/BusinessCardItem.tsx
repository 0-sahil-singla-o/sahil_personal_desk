import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getTitaniumCardTexture } from '../materials/TitaniumCanvas';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface BusinessCardItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const BusinessCardItem: React.FC<BusinessCardItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'card');

  const cardTexture = useMemo(() => {
    return getTitaniumCardTexture("Sahil Singla");
  }, []);

  const titaniumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: cardTexture,
      metalness: 0.85,
      roughness: 0.35,
    });
  }, [cardTexture]);

  const stackMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#6E7175',
      metalness: 0.8,
      roughness: 0.4,
    });
  }, []);

  const w = 1.15;
  const d = 0.65;
  const h = 0.05;

  return (
    <group
      name="card"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('card');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.takeCard();
      }}
    >
      {/* Lower stack of cards */}
      <mesh material={stackMaterial} position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* Top Brushed Titanium Card with Etched Text */}
      <mesh
        material={titaniumMaterial}
        position={[0, h + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[w, d]} />
      </mesh>

      {/* Hover Outline */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.2, d + 0.2]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
};
