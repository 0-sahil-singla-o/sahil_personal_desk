import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface SpeakerItemProps {
  position: [number, number, number];
}

export const SpeakerItem: React.FC<SpeakerItemProps> = ({ position }) => {
  const isHovered = useDeskStore((s) => s.hover === 'speaker');
  const isPlaying = useDeskStore((s) => s.music?.playing ?? false);

  const fabricMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3A3D42',
      roughness: 0.9,
      metalness: 0.1,
    });
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: isPlaying ? '#38BDF8' : '#64748B',
    });
  }, [isPlaying]);

  return (
    <group
      name="speaker"
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('speaker');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.toggleMusic();
      }}
    >
      {/* Cylindrical Smart Speaker Body */}
      <mesh material={fabricMaterial} position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.9, 32]} />
      </mesh>

      {/* Top Touch Glass Plate */}
      <mesh position={[0, 0.902, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.33, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Glowing LED Ring */}
      <mesh
        material={ringMaterial}
        position={[0, 0.905, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.24, 0.28, 32]} />
      </mesh>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
