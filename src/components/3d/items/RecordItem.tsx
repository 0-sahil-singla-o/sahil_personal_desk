import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface RecordItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
}

export const RecordItem: React.FC<RecordItemProps> = ({
  position,
  rotY = 0,
  scale = 1,
}) => {
  const isHovered = useDeskStore((s) => s.hover === 'record');

  const sleeveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1E293B', // Dark navy sleeve
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  const vinylMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0A0A0A',
      roughness: 0.25,
      metalness: 0.8,
    });
  }, []);

  const labelMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: '#E11D48' }); // Rose red center label
  }, []);

  const size = 1.8 * scale;

  return (
    <group
      name="record"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('record');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.setSongRequest(true);
      }}
    >
      {/* Vinyl Outer Square Sleeve */}
      <mesh
        material={sleeveMaterial}
        position={[0, 0.02 * scale, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[size, size]} />
      </mesh>

      {/* Vinyl Disc Poking Halfway Out of Sleeve */}
      <group position={[0.4 * scale, 0.025 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Black Vinyl Disc */}
        <mesh material={vinylMaterial} castShadow>
          <ringGeometry args={[0.15 * scale, 0.85 * scale, 48]} />
        </mesh>
        {/* Red Center Label */}
        <mesh material={labelMaterial}>
          <circleGeometry args={[0.28 * scale, 32]} />
        </mesh>
        {/* Center Spindle Hole */}
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.04 * scale, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[size * 0.75, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
