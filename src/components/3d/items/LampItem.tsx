import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface LampItemProps {
  base: [number, number, number];
  target: [number, number, number];
}

export const LampItem: React.FC<LampItemProps> = ({ base }) => {
  const isHovered = useDeskStore((s) => s.hover === 'lamp');
  const lampOn = useDeskStore((s) => s.lampOn);

  // Materials
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2B2D31',
      metalness: 0.8,
      roughness: 0.3,
    });
  }, []);

  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#E0E0E0',
      metalness: 0.95,
      roughness: 0.1,
    });
  }, []);

  const bulbMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: lampOn ? '#FFE4B5' : '#888888',
    });
  }, [lampOn]);

  return (
    <group
      name="lamp"
      position={base}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('lamp');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.toggleLamp();
      }}
    >
      {/* Heavy Circular Base */}
      <mesh material={metalMaterial} position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.45, 0.1, 32]} />
      </mesh>

      {/* Switch Button on Base */}
      <mesh material={chromeMaterial} position={[0.2, 0.11, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
      </mesh>

      {/* Lower Arm Joint */}
      <mesh material={chromeMaterial} position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>

      {/* Lower Angled Rod (leaning back-left) */}
      <group position={[0, 0.15, 0]} rotation={[0.2, 0.3, -0.3]}>
        <mesh material={metalMaterial} position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 16]} />
        </mesh>

        {/* Elbow Joint */}
        <mesh material={chromeMaterial} position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

        {/* Upper Arm Rod (reaching forward-down) */}
        <group position={[0, 1.8, 0]} rotation={[-0.8, 0, 0.6]}>
          <mesh material={metalMaterial} position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 16]} />
          </mesh>

          {/* Lamp Shade & Bulb */}
          <group position={[0, 1.6, 0]} rotation={[0.6, 0, 0]}>
            {/* Conical Shade */}
            <mesh material={metalMaterial} castShadow>
              <coneGeometry args={[0.38, 0.55, 32, 1, true]} />
            </mesh>

            {/* Glowing Bulb */}
            <mesh material={bulbMaterial} position={[0, -0.12, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>

            {/* Real Spotlight illuminating desk when lamp is on */}
            {lampOn && (
              <>
                <spotLight
                  color="#FFD199"
                  intensity={4.5}
                  distance={8}
                  angle={0.65}
                  penumbra={0.5}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                  shadow-bias={-0.0001}
                  position={[0, -0.15, 0]}
                  target-position={[0, -3.5, 0]}
                />
                <pointLight
                  color="#FFAE42"
                  intensity={1.2}
                  distance={2.5}
                  position={[0, -0.15, 0]}
                />
              </>
            )}
          </group>
        </group>
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.6, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
};
