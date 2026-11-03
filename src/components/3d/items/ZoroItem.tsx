import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface ZoroItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const ZoroItem: React.FC<ZoroItemProps> = ({ position, rotY = 0 }) => {
  const isHovered = useDeskStore((s) => s.hover === 'zoro');
  const headRef = useRef<THREE.Group>(null);
  const wobbleVelocity = useRef({ x: 0, z: 0 });
  const wobblePos = useRef({ x: 0, z: 0 });

  const hairMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#43A047', // Marimo green hair
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F4CBB2', // Anime skin tone
      roughness: 0.6,
    });
  }, []);

  const outfitMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1F3A2B', // Dark green robe
      roughness: 0.8,
    });
  }, []);

  const haramakiMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#66BB6A', // Bright green waist wrap
      roughness: 0.7,
    });
  }, []);

  const springMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#C0C0C0',
      metalness: 0.9,
      roughness: 0.2,
    });
  }, []);

  // Spring physics loop for bobbling head
  useFrame((_, delta) => {
    const stiffness = 85;
    const damping = 5.5;

    // Spring forces: F = -k*x - c*v
    const fx = -stiffness * wobblePos.current.x - damping * wobbleVelocity.current.x;
    const fz = -stiffness * wobblePos.current.z - damping * wobbleVelocity.current.z;

    wobbleVelocity.current.x += fx * delta;
    wobbleVelocity.current.z += fz * delta;

    wobblePos.current.x += wobbleVelocity.current.x * delta;
    wobblePos.current.z += wobbleVelocity.current.z * delta;

    if (headRef.current) {
      headRef.current.rotation.z = wobblePos.current.x;
      headRef.current.rotation.x = wobblePos.current.z;
    }
  });

  const triggerBobble = () => {
    wobbleVelocity.current.x = (Math.random() - 0.5) * 12;
    wobbleVelocity.current.z = (Math.random() - 0.5) * 12;
  };

  return (
    <group
      name="zoro"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('zoro');
        triggerBobble();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        triggerBobble();
      }}
    >
      {/* Black Circular Stand Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.04, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>

      {/* Body / Torso */}
      <mesh
        material={outfitMaterial}
        position={[0, 0.28, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.13, 0.16, 0.45, 16]} />
      </mesh>

      {/* Green Haramaki Belt */}
      <mesh material={haramakiMaterial} position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.12, 16]} />
      </mesh>

      {/* 3 Katana Sheaths on hip */}
      {[-0.04, 0, 0.04].map((offset, i) => (
        <mesh
          key={`katana-${i}`}
          position={[-0.18, 0.26, offset]}
          rotation={[0.3, 0, 0.7]}
          castShadow
        >
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
          <meshStandardMaterial color={i === 0 ? '#FFFFFF' : i === 1 ? '#C62828' : '#212121'} />
        </mesh>
      ))}

      {/* Spring Neck */}
      <mesh material={springMaterial} position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
      </mesh>

      {/* Bobbling Head Assembly */}
      <group ref={headRef} position={[0, 0.62, 0]}>
        {/* Head Box / Sphere */}
        <mesh material={skinMaterial} position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.22, 24, 20]} />
        </mesh>

        {/* Zoro Conical Spiky Hair Cluster */}
        <group position={[0, 0.22, 0]}>
          {[
            [0, 0.12, 0, 0.16, 0.22],
            [0.1, 0.08, 0.05, 0.12, 0.18],
            [-0.1, 0.08, 0.05, 0.12, 0.18],
            [0, 0.08, -0.1, 0.14, 0.18],
            [0.08, 0.05, -0.08, 0.11, 0.16],
            [-0.08, 0.05, -0.08, 0.11, 0.16],
          ].map(([x, y, z, r, h], idx) => (
            <mesh
              key={`hair-${idx}`}
              material={hairMaterial}
              position={[x, y, z]}
              castShadow
            >
              <coneGeometry args={[r, h, 6]} />
            </mesh>
          ))}
        </group>

        {/* Black Eye Bandana / Eye details */}
        <mesh position={[0, 0.15, 0.2]}>
          <planeGeometry args={[0.28, 0.04]} />
          <meshBasicMaterial color="#1A1A1A" />
        </mesh>
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
};
