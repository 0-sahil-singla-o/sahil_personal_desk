import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useDeskStore } from '../../../store/deskStore';

interface LuffyItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  arriveOrder?: number;
}

const vinyl = (color: string, roughness = 0.45) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

const SKIN = '#EBCBA8';
const HAIR = '#1A1A1D';
const STRAW_YELLOW = '#E8C547';
const RIBBON_RED = '#C1121F';
const VEST_RED = '#D62828';
const SASH_YELLOW = '#F4D03F';
const SHORTS_BLUE = '#2B5F9E';
const SCAR_RED = '#B5544B';

/** Procedural Canvas texture for Luffy's open vest and iconic X-scar */
function createLuffyChestTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // V-neck open vest
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(114, 0);
  ctx.lineTo(64, 128);
  ctx.closePath();
  ctx.clip();

  // Skin base
  ctx.fillStyle = SKIN;
  ctx.fillRect(0, 0, 128, 128);

  // The iconic Akainu X-scar across the chest
  ctx.strokeStyle = SCAR_RED;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  // Slash 1: Top-left to bottom-right
  ctx.beginPath();
  ctx.moveTo(32, 22);
  ctx.lineTo(96, 98);
  ctx.stroke();

  // Slash 2: Top-right to bottom-left
  ctx.beginPath();
  ctx.moveTo(96, 22);
  ctx.lineTo(32, 98);
  ctx.stroke();

  // Stitches cross-hatching
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#4A2820';
  for (let i = 0; i <= 6; i++) {
    const x1 = 34 + (58 * i) / 6;
    const y1 = 24 + (70 * i) / 6;
    ctx.beginPath();
    ctx.moveTo(x1 - 4, y1 + 4);
    ctx.lineTo(x1 + 4, y1 - 4);
    ctx.stroke();

    const x2 = 94 - (58 * i) / 6;
    const y2 = 24 + (70 * i) / 6;
    ctx.beginPath();
    ctx.moveTo(x2 - 4, y2 - 4);
    ctx.lineTo(x2 + 4, y2 + 4);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const LuffyItem: React.FC<LuffyItemProps> = ({
  position,
  rotY = 0,
  scale = 0.9,
}) => {
  const [hovered, setHovered] = useState(false);
  const headRef = useRef<THREE.Group>(null);
  const wobble = useRef({ angle: 0, speed: 0, tilt: 0, tiltSpeed: 0 });

  const materials = useMemo(
    () => ({
      skin: vinyl(SKIN),
      hair: vinyl(HAIR, 0.5),
      hat: vinyl(STRAW_YELLOW, 0.6),
      ribbon: vinyl(RIBBON_RED, 0.4),
      vest: vinyl(VEST_RED, 0.5),
      sash: vinyl(SASH_YELLOW, 0.55),
      shorts: vinyl(SHORTS_BLUE, 0.55),
      cuffs: vinyl('#F6F3FB', 0.6),
      sandals: vinyl('#8D6E63', 0.4),
      eye: vinyl('#0E0E10', 0.12),
      scar: vinyl(SCAR_RED, 0.5),
      chest: new THREE.MeshStandardMaterial({
        map: createLuffyChestTexture(),
        roughness: 0.5,
        transparent: true,
      }),
    }),
    []
  );

  // Bobble spring physics
  useFrame((_, dt) => {
    const w = wobble.current;
    const step = Math.min(dt, 0.05);
    for (const [a, v] of [
      ['angle', 'speed'],
      ['tilt', 'tiltSpeed'],
    ] as const) {
      w[v] += (-90 * w[a] - 4.5 * w[v]) * step;
      w[a] += w[v] * step;
    }
    if (headRef.current) {
      headRef.current.rotation.z = w.angle;
      headRef.current.rotation.x = w.tilt;
    }
  });

  const bobble = () => {
    const w = wobble.current;
    w.speed += 3.2 * (Math.random() > 0.5 ? 1 : -1);
    w.tiltSpeed += 1.4;
  };

  // Hair spikes around forehead & sides
  const hairSpikes: [number, number, number, number, number][] = [
    [-0.2, 0.26, 0.08, 0.7, -0.2],
    [-0.11, 0.3, 0.14, 0.3, -0.35],
    [0.0, 0.32, 0.16, 0, -0.4],
    [0.11, 0.3, 0.14, -0.3, -0.35],
    [0.2, 0.26, 0.08, -0.7, -0.2],
    [-0.28, 0.14, 0.04, 1.2, 0],
    [0.28, 0.14, 0.04, -1.2, 0],
  ];

  return (
    <group position={position} rotation-y={rotY} scale={scale}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          bobble();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Legs: Blue denim shorts with rolled white cuffs and sandals */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* Sandal Sole */}
            <mesh
              material={materials.sandals}
              position={[side * 0.075, 0.02, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.09, 0.03, 0.15]} />
            </mesh>
            {/* Bare Lower Leg */}
            <mesh material={materials.skin} position={[side * 0.072, 0.09, 0]}>
              <cylinderGeometry args={[0.04, 0.042, 0.11, 12]} />
            </mesh>
            {/* White Rolled Cuff */}
            <mesh
              material={materials.cuffs}
              position={[side * 0.072, 0.16, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.055, 0.055, 0.04, 14]} />
            </mesh>
            {/* Blue Denim Shorts */}
            <mesh
              material={materials.shorts}
              position={[side * 0.072, 0.21, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.052, 0.054, 0.08, 14]} />
            </mesh>
          </group>
        ))}

        {/* Torso: Red vest with open V at chest */}
        <mesh
          material={materials.vest}
          position-y={0.29}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.185, 0.24, 28]} />
        </mesh>
        <mesh
          material={materials.vest}
          position-y={0.49}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.145, 0.15, 0.18, 28]} />
        </mesh>
        {/* Open Chest with Akainu X-Scar */}
        <mesh material={materials.chest} position={[0, 0.51, 0.119]}>
          <planeGeometry args={[0.15, 0.15]} />
        </mesh>

        {/* Yellow Tied Waist Sash */}
        <mesh
          material={materials.sash}
          position-y={0.41}
          scale={[1, 1, 0.8]}
          castShadow
        >
          <cylinderGeometry args={[0.158, 0.162, 0.065, 28]} />
        </mesh>
        {/* Sash Knot and hanging ribbon */}
        <mesh
          material={materials.sash}
          position={[0.1, 0.32, 0.1]}
          rotation={[0.15, 0, -0.18]}
          castShadow
        >
          <boxGeometry args={[0.055, 0.17, 0.025]} />
        </mesh>

        {/* Arms: Red short sleeves + bare skin arms & fists */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.17, 0.57, 0]}
            rotation-z={side * 0.35}
          >
            {/* Red short sleeve */}
            <mesh material={materials.vest} position-y={-0.04} castShadow>
              <cylinderGeometry args={[0.045, 0.055, 0.08, 14]} />
            </mesh>
            {/* Bare arm */}
            <mesh material={materials.skin} position-y={-0.12} castShadow>
              <cylinderGeometry args={[0.038, 0.04, 0.1, 12]} />
            </mesh>
            {/* Clenched fist */}
            <mesh material={materials.skin} position-y={-0.2} castShadow>
              <sphereGeometry args={[0.045, 14, 12]} />
            </mesh>
          </group>
        ))}

        {/* Head & Straw Hat (Bobbling Group) */}
        <group ref={headRef} position-y={0.6}>
          {/* Head Shape */}
          <mesh
            material={materials.skin}
            position-y={0.22}
            castShadow
          >
            <boxGeometry args={[0.54, 0.42, 0.44]} />
          </mesh>

          {/* Hair base */}
          <mesh
            material={materials.hair}
            position={[0, 0.35, -0.02]}
            scale={[0.3, 0.16, 0.26]}
            castShadow
          >
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>

          {/* Hair Spikes */}
          {hairSpikes.map(([x, y, z, leanX, leanZ], idx) => (
            <mesh
              key={idx}
              material={materials.hair}
              position={[x, y + 0.16, z]}
              rotation={[leanZ, 0, leanX]}
              castShadow
            >
              <coneGeometry args={[0.065, 0.18, 7]} />
            </mesh>
          ))}

          {/* Straw Hat: Brim, Red Ribbon, and Dome Crown */}
          <group position={[0, 0.44, -0.02]} rotation-x={-0.12}>
            {/* Wide Straw Brim */}
            <mesh material={materials.hat} castShadow receiveShadow>
              <cylinderGeometry args={[0.44, 0.44, 0.024, 32]} />
            </mesh>
            {/* Crimson Red Ribbon */}
            <mesh material={materials.ribbon} position-y={0.03} castShadow>
              <cylinderGeometry args={[0.312, 0.312, 0.042, 32]} />
            </mesh>
            {/* Straw Hat Dome Crown */}
            <mesh material={materials.hat} position-y={0.04} castShadow>
              <sphereGeometry args={[0.31, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            </mesh>
          </group>

          {/* Eyes (Round stylized vinyl Pop eyes) */}
          <mesh material={materials.eye} position={[-0.11, 0.2, 0.223]}>
            <sphereGeometry args={[0.055, 18, 12]} />
          </mesh>
          <mesh material={materials.eye} position={[0.11, 0.2, 0.223]}>
            <sphereGeometry args={[0.055, 18, 12]} />
          </mesh>

          {/* Two-stitch Eye Scar under the Left Eye */}
          <mesh material={materials.scar} position={[-0.11, 0.125, 0.224]}>
            <boxGeometry args={[0.045, 0.008, 0.004]} />
          </mesh>
          <mesh material={materials.scar} position={[-0.125, 0.115, 0.224]}>
            <boxGeometry args={[0.006, 0.025, 0.004]} />
          </mesh>
          <mesh material={materials.scar} position={[-0.095, 0.115, 0.224]}>
            <boxGeometry args={[0.006, 0.025, 0.004]} />
          </mesh>

          {/* Nose */}
          <mesh
            material={materials.skin}
            position={[0, 0.16, 0.225]}
            scale={[0.8, 1, 0.5]}
          >
            <sphereGeometry args={[0.016, 10, 8]} />
          </mesh>

          {/* Cheerful Grin */}
          <mesh
            material={materials.eye}
            position={[0, 0.09, 0.224]}
            rotation-z={Math.PI}
          >
            <torusGeometry args={[0.045, 0.006, 6, 16, Math.PI * 0.6]} />
          </mesh>

          {/* Ears */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.skin}
              position={[side * 0.28, 0.19, 0.02]}
              scale={[0.5, 1, 0.8]}
            >
              <sphereGeometry args={[0.055, 12, 10]} />
            </mesh>
          ))}
        </group>

        {/* Hover Tooltip */}
        {hovered && (
          <Html
            position={[0, 1.25, 0]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div className="whitespace-nowrap rounded-full bg-black/80 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm">
              Monkey D. Luffy <span className="text-white/60">· give him a tap</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
