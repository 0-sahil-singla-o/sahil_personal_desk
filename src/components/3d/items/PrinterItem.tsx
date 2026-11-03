import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createBeveledSlabGeometry } from '../geometries/BeveledSlabGeometry';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface PrinterItemProps {
  position: [number, number, number];
  rotY?: number;
}

export const PrinterItem: React.FC<PrinterItemProps> = ({ position, rotY = 0 }) => {
  const isPrinting = useDeskStore((s) => s.printing);
  const isHovered = useDeskStore((s) => s.hover === 'printer');
  const paperRef = useRef<THREE.Group>(null);
  const printProgress = useRef(0);

  const w = 1.1;
  const d = 1.3;
  const h = 0.9;

  const bodyGeom = useMemo(() => {
    return createBeveledSlabGeometry(w, d, h, 0.05, 0.02);
  }, [w, d, h]);

  const bodyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1E2024',
      roughness: 0.6,
      metalness: 0.2,
    });
  }, []);

  const slotMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: '#090A0B' });
  }, []);

  const paperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FAFAFA',
      roughness: 0.95,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, []);

  // Animate paper feed length when printing
  useFrame((_, delta) => {
    if (isPrinting) {
      printProgress.current = Math.min(1, printProgress.current + delta * 0.7);
    } else {
      // Keep printed receipt visible until next action
    }
    if (paperRef.current) {
      paperRef.current.scale.set(1, Math.max(0.01, printProgress.current), 1);
    }
  });

  return (
    <group
      name="printer"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('printer');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        deskStore.triggerPrint();
      }}
    >
      {/* Main Printer Body */}
      <mesh
        geometry={bodyGeom}
        material={bodyMaterial}
        castShadow
        receiveShadow
        position={[0, h, 0]}
      />

      {/* Top Paper Dispenser Slot */}
      <mesh
        material={slotMaterial}
        position={[0, h + 0.001, -0.15]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[w * 0.75, 0.08]} />
      </mesh>

      {/* Status LED Indicator */}
      <mesh position={[w / 2 - 0.15, h + 0.005, d / 2 - 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshBasicMaterial color={isPrinting ? '#3B82F6' : '#10B981'} />
      </mesh>

      {/* Animated Thermal Paper Receipt Ribbon */}
      <group
        ref={paperRef}
        position={[0, h, -0.15]}
        scale={[1, 0.01, 1]}
      >
        {/* Vertical feed section */}
        <mesh
          material={paperMaterial}
          position={[0, 0.35, 0]}
          castShadow
        >
          <planeGeometry args={[w * 0.7, 0.7]} />
        </mesh>

        {/* Curved lip section folding over the front */}
        <mesh
          material={paperMaterial}
          position={[0, 0.7, 0.2]}
          rotation={[0.6, 0, 0]}
          castShadow
        >
          <planeGeometry args={[w * 0.7, 0.5]} />
        </mesh>
      </group>

      {/* Hover Glow */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.25, d + 0.25]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
