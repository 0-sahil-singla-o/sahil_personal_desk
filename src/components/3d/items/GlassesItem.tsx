import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface GlassesItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const GlassesItem: React.FC<GlassesItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'glasses');

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1C1917', // Dark tortoise/acetate
      roughness: 0.2,
      metalness: 0.1,
    });
  }, []);

  const lensMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
    });
  }, []);

  return (
    <group
      name="glasses"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('glasses');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
    >
      {/* Left Rim */}
      <mesh
        material={frameMaterial}
        position={[-0.32, 0.14, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <torusGeometry args={[0.22, 0.025, 12, 24]} />
      </mesh>

      {/* Left Lens */}
      <mesh
        geometry={new THREE.CircleGeometry(0.21, 24)}
        material={lensMaterial}
        position={[-0.32, 0.14, 0]}
      />

      {/* Right Rim */}
      <mesh
        material={frameMaterial}
        position={[0.32, 0.14, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <torusGeometry args={[0.22, 0.025, 12, 24]} />
      </mesh>

      {/* Right Lens */}
      <mesh
        geometry={new THREE.CircleGeometry(0.21, 24)}
        material={lensMaterial}
        position={[0.32, 0.14, 0]}
      />

      {/* Bridge between lenses */}
      <mesh material={frameMaterial} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.02]} />
      </mesh>

      {/* Left & Right Folded Temple Arms */}
      {[-0.54, 0.54].map((x, i) => (
        <mesh
          key={`arm-${i}`}
          material={frameMaterial}
          position={[x, 0.14, 0.3]}
          rotation={[0.1, i === 0 ? 0.3 : -0.3, 0]}
          castShadow
        >
          <boxGeometry args={[0.02, 0.02, 0.65]} />
        </mesh>
      ))}

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 0.6]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
