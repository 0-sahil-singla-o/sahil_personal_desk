import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { createBeveledSlabGeometry, createFlatRoundedGeometry } from '../geometries/BeveledSlabGeometry';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface LaptopItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const LaptopItem: React.FC<LaptopItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'laptop');
  const isFocused = useDeskStore((s) => s.focus === 'laptop');

  // Screen texture
  const screenTexture = useTexture('/desk/laptop.webp');
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  const width = 2.8;
  const depth = 1.9;
  const baseThickness = 0.045;
  const screenThickness = 0.025;

  // Base chassis geometry
  const baseGeom = useMemo(() => {
    return createBeveledSlabGeometry(width, depth, baseThickness, 0.08, 0.012);
  }, [width, depth, baseThickness]);

  // Screen chassis geometry
  const screenGeom = useMemo(() => {
    return createBeveledSlabGeometry(width, depth * 0.95, screenThickness, 0.08, 0.01);
  }, [width, depth, screenThickness]);

  // Screen display quad
  const displayGeom = useMemo(() => {
    return createFlatRoundedGeometry(width * 0.93, depth * 0.88, 0.03);
  }, [width, depth]);

  // Trackpad geometry
  const trackpadGeom = useMemo(() => {
    return createFlatRoundedGeometry(0.9, 0.6, 0.02);
  }, []);

  // Materials
  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B0B3B8',
      metalness: 0.85,
      roughness: 0.28,
    });
  }, []);

  const screenBezelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#080808',
      roughness: 0.1,
      metalness: 0.9,
    });
  }, []);

  const screenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
  }, [screenTexture]);

  const keyboardWellMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1A1A1C',
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  const trackpadMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#9E9FA4',
      roughness: 0.35,
      metalness: 0.7,
    });
  }, []);

  // Lid angle: open ~108 degrees
  const lidAngle = 1.88;

  return (
    <group
      name="laptop"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('laptop');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.open('laptop', 'shine-motor');
      }}
    >
      {/* Laptop Base */}
      <mesh
        geometry={baseGeom}
        material={aluminumMaterial}
        castShadow
        receiveShadow
        position={[0, baseThickness, 0]}
      />

      {/* Keyboard recessed well */}
      <mesh
        material={keyboardWellMaterial}
        position={[0, baseThickness + 0.001, -0.22]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.5, 1.05]} />
      </mesh>

      {/* Trackpad */}
      <mesh
        geometry={trackpadGeom}
        material={trackpadMaterial}
        position={[0, baseThickness + 0.002, 0.48]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Screen Lid (Hinged at back) */}
      <group position={[0, baseThickness, -depth / 2 + 0.05]} rotation={[lidAngle, 0, 0]}>
        {/* Outer Aluminum Backing */}
        <mesh
          geometry={screenGeom}
          material={aluminumMaterial}
          position={[0, depth * 0.475, screenThickness / 2]}
          castShadow
        />

        {/* Inner Black Bezel */}
        <mesh
          material={screenBezelMaterial}
          position={[0, depth * 0.475, screenThickness + 0.001]}
        >
          <planeGeometry args={[width * 0.98, depth * 0.93]} />
        </mesh>

        {/* Display Screen */}
        <mesh
          geometry={displayGeom}
          material={screenMaterial}
          position={[0, depth * 0.475, screenThickness + 0.003]}
        />
      </group>

      {/* Subtle hover indicator glow outline */}
      {isHovered && !isFocused && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width + 0.3, depth + 0.3]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};
