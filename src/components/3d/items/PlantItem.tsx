import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface PlantItemProps {
  position: [number, number, number];
}

export const PlantItem: React.FC<PlantItemProps> = ({ position }) => {
  const isHovered = useDeskStore((s) => s.hover === 'plant');
  const leavesGroup = useRef<THREE.Group>(null);
  const waterWiggle = useRef(0);

  const potMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D47355', // Terracotta
      roughness: 0.75,
      metalness: 0.05,
    });
  }, []);

  const soilMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#241B15', // Dark rich moist soil
      roughness: 0.95,
      metalness: 0.0,
    });
  }, []);

  const leafMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2E7D32', // Vibrant green foliage
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  const stemMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1B5E20',
      roughness: 0.6,
    });
  }, []);

  useFrame((_, delta) => {
    if (waterWiggle.current > 0) {
      waterWiggle.current = Math.max(0, waterWiggle.current - delta * 2);
    }
    if (leavesGroup.current) {
      const wobble = Math.sin(Date.now() * 0.005) * 0.03 + Math.sin(waterWiggle.current * 10) * 0.15;
      leavesGroup.current.rotation.y = wobble;
    }
  });

  return (
    <group
      name="plant"
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('plant');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        waterWiggle.current = 1.0;
        deskStore.waterPlant();
      }}
    >
      {/* Terracotta Plant Pot */}
      <mesh material={potMaterial} position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.36, 0.9, 32]} />
      </mesh>

      {/* Top Rim of Pot */}
      <mesh material={potMaterial} position={[0, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.12, 32]} />
      </mesh>

      {/* Dark Soil */}
      <mesh
        material={soilMaterial}
        position={[0, 0.86, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.46, 32]} />
      </mesh>

      {/* Stems and Leaves Group */}
      <group ref={leavesGroup} position={[0, 0.88, 0]}>
        {/* Central main stem */}
        <mesh material={stemMaterial} position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.6, 12]} />
        </mesh>

        {/* 6 Radiating Leaves */}
        {[0, 60, 120, 180, 240, 300].map((angleDeg, i) => {
          const rad = (angleDeg * Math.PI) / 180;
          const tilt = 0.5 + (i % 2) * 0.2;
          const scale = 0.8 + (i % 3) * 0.2;

          return (
            <group
              key={`leaf-${i}`}
              rotation={[0, rad, 0]}
              position={[0, 0.2 + (i * 0.06), 0]}
            >
              <group rotation={[tilt, 0, 0]}>
                {/* Stemlet */}
                <mesh material={stemMaterial} position={[0, 0.2 * scale, 0]} castShadow>
                  <cylinderGeometry args={[0.015, 0.02, 0.4 * scale, 8]} />
                </mesh>
                {/* Oval Leaf Blade */}
                <mesh
                  material={leafMaterial}
                  position={[0, 0.45 * scale, 0]}
                  scale={[0.22 * scale, 0.45 * scale, 0.02]}
                  castShadow
                >
                  <sphereGeometry args={[1, 16, 16]} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.65, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
};
