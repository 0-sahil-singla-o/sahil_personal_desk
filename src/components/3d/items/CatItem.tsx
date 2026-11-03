import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface CatItemProps {
  position: [number, number, number];
  rotY?: number;
  size?: number;
  edge?: number;
}

export const CatItem: React.FC<CatItemProps> = ({
  position,
  rotY = 0,
  size = 1,
}) => {
  const isHovered = useDeskStore((s) => s.hover === 'cat');
  const bodyRef = useRef<THREE.Group>(null);
  const tailSegments = useRef<THREE.Mesh[]>([]);

  // Tabby cat materials
  const furMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D97736', // Warm ginger orange
      roughness: 0.9,
      metalness: 0.05,
    });
  }, []);

  const stripeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#9C4215', // Darker ginger stripe
      roughness: 0.9,
      metalness: 0.05,
    });
  }, []);

  const whiteFurMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FBF5EE', // Cream belly/paws
      roughness: 0.95,
      metalness: 0.0,
    });
  }, []);

  const noseMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F4A7B9', // Pink nose
      roughness: 0.5,
    });
  }, []);

  // 10 tail links
  const tailLinksCount = 10;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle breathing scale
    if (bodyRef.current) {
      const breath = 1 + Math.sin(t * 1.5) * 0.025;
      bodyRef.current.scale.set(size, size * breath, size);
    }

    // Swaying tail over desk edge
    tailSegments.current.forEach((mesh, index) => {
      if (!mesh) return;
      const phase = t * 1.8 + index * 0.35;
      mesh.rotation.y = Math.sin(phase) * 0.12;
      mesh.rotation.z = Math.cos(phase * 0.5) * 0.05;
    });
  });

  return (
    <group
      name="cat"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('cat');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Pet the cat!
        deskStore.setHover('cat');
      }}
    >
      <group ref={bodyRef}>
        {/* Curled Body Torso (Main egg of fur) */}
        <mesh
          material={furMaterial}
          position={[0, 0.42 * size, 0]}
          scale={[1.1 * size, 0.65 * size, 0.85 * size]}
          castShadow
        >
          <sphereGeometry args={[0.7, 32, 24]} />
        </mesh>

        {/* Tabby stripes on back */}
        {[-0.2, 0, 0.2].map((xOffset, i) => (
          <mesh
            key={`stripe-${i}`}
            material={stripeMaterial}
            position={[xOffset * size, 0.55 * size, 0]}
            scale={[0.12 * size, 0.45 * size, 0.86 * size]}
          >
            <sphereGeometry args={[0.7, 16, 16]} />
          </mesh>
        ))}

        {/* Head curled against paws */}
        <group position={[0.75 * size, 0.38 * size, 0.35 * size]} rotation={[0, -0.4, 0.2]}>
          <mesh material={furMaterial} castShadow>
            <sphereGeometry args={[0.42 * size, 24, 20]} />
          </mesh>

          {/* Left Ear */}
          <mesh
            material={furMaterial}
            position={[-0.1 * size, 0.4 * size, 0.15 * size]}
            rotation={[-0.2, 0, 0.3]}
            castShadow
          >
            <coneGeometry args={[0.15 * size, 0.28 * size, 4]} />
          </mesh>

          {/* Right Ear */}
          <mesh
            material={furMaterial}
            position={[0.22 * size, 0.38 * size, -0.15 * size]}
            rotation={[0.2, 0, -0.2]}
            castShadow
          >
            <coneGeometry args={[0.15 * size, 0.28 * size, 4]} />
          </mesh>

          {/* Pink Nose */}
          <mesh
            material={noseMaterial}
            position={[0.35 * size, -0.05 * size, 0]}
            scale={[0.06 * size, 0.05 * size, 0.07 * size]}
          >
            <sphereGeometry args={[1, 12, 12]} />
          </mesh>

          {/* White muzzle patch */}
          <mesh
            material={whiteFurMaterial}
            position={[0.28 * size, -0.12 * size, 0]}
            scale={[0.18 * size, 0.12 * size, 0.25 * size]}
          >
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        </group>

        {/* 10-link segmented tail swaying off the desk edge */}
        <group position={[-0.7 * size, 0.25 * size, -0.2 * size]}>
          {Array.from({ length: tailLinksCount }).map((_, i) => {
            const linkRadius = (0.1 - i * 0.005) * size;
            const linkLength = 0.16 * size;
            const zStep = (i + 1) * linkLength;
            // Arc downwards over the desk edge
            const yStep = -Math.pow(i / tailLinksCount, 1.8) * 0.7 * size;

            return (
              <mesh
                key={`tail-${i}`}
                ref={(el) => {
                  if (el) tailSegments.current[i] = el;
                }}
                material={i % 2 === 0 ? furMaterial : stripeMaterial}
                position={[-i * 0.04 * size, yStep, zStep]}
                castShadow
              >
                <capsuleGeometry args={[linkRadius, linkLength, 8, 12]} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Hover effect */}
      {isHovered && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.3 * size, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
