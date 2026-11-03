import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface MugItemProps {
  position: [number, number, number];
}

export const MugItem: React.FC<MugItemProps> = ({ position }) => {
  const isHovered = useDeskStore((s) => s.hover === 'mug');
  const sips = useDeskStore((s) => s.mugSips);
  const steamGroup = useRef<THREE.Group>(null);

  const ceramicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ECEEF0',
      roughness: 0.15,
      metalness: 0.05,
    });
  }, []);

  const coffeeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2B1708',
      roughness: 0.1,
      metalness: 0.1,
    });
  }, []);

  const steamMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.22,
    });
  }, []);

  // Animate steam puffs drifting up
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (steamGroup.current) {
      steamGroup.current.children.forEach((child, i) => {
        const offset = i * 0.7;
        const progress = ((t * 0.8 + offset) % 2) / 2; // 0 to 1
        child.position.y = 0.5 + progress * 0.8;
        child.position.x = Math.sin(t * 1.5 + i) * 0.08;
        const scale = 0.05 + progress * 0.18;
        child.scale.set(scale, scale, scale);
        // Fade out as it climbs
        if ((child as any).material) {
          (child as any).material.opacity = Math.sin(progress * Math.PI) * 0.25;
        }
      });
    }
  });

  return (
    <group
      name="mug"
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('mug');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.sipCoffee();
      }}
    >
      {/* Outer Ceramic Wall */}
      <mesh material={ceramicMaterial} position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.3, 0.7, 32]} />
      </mesh>

      {/* Inner Cavity & Coffee Liquid (Level depends on sips) */}
      <mesh
        material={coffeeMaterial}
        position={[0, 0.65 - sips * 0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.29, 32]} />
      </mesh>

      {/* Curved Handle Loop */}
      <mesh
        material={ceramicMaterial}
        position={[0.34, 0.35, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <torusGeometry args={[0.2, 0.055, 16, 24, Math.PI * 1.2]} />
      </mesh>

      {/* Rising Steam Puffs */}
      <group ref={steamGroup}>
        {[0, 1, 2].map((i) => (
          <mesh key={`steam-${i}`} material={steamMaterial}>
            <sphereGeometry args={[1, 12, 12]} />
          </mesh>
        ))}
      </group>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
