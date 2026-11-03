import React, { useMemo } from 'react';
import * as THREE from 'three';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface ParcelItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
}

export const ParcelItem: React.FC<ParcelItemProps> = ({
  position,
  rotY = 0,
  scale = 1,
}) => {
  const isHovered = useDeskStore((s) => s.hover === 'parcel');

  const cardboardMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#C29867', // Kraft cardboard
      roughness: 0.9,
      metalness: 0.0,
    });
  }, []);

  const tapeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#A87948', // Brown packing tape
      roughness: 0.4,
      metalness: 0.1,
    });
  }, []);

  const labelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FAFAFA', // White shipping barcode label
      roughness: 0.7,
    });
  }, []);

  const w = 1.3 * scale;
  const h = 0.7 * scale;
  const d = 1.0 * scale;

  return (
    <group
      name="parcel"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        deskStore.setHover('parcel');
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        deskStore.setHover(null);
      }}
    >
      {/* Main Cardboard Box */}
      <mesh material={cardboardMaterial} position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* Top Center Seam Packing Tape */}
      <mesh material={tapeMaterial} position={[0, h + 0.001, 0]}>
        <boxGeometry args={[w * 1.002, 0.002, 0.18]} />
      </mesh>

      {/* White Shipping Label */}
      <mesh
        material={labelMaterial}
        position={[w * 0.2, h + 0.002, d * 0.15]}
        rotation={[-Math.PI / 2, 0, 0.1]}
      >
        <planeGeometry args={[0.35, 0.48]} />
      </mesh>

      {/* Hover Ring */}
      {isHovered && (
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.2, d + 0.2]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
};
