import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

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
const STRAW_YELLOW = '#EAB308';
const RIBBON_RED = '#DC2626';
const VEST_RED = '#DC2626';
const SASH_YELLOW = '#FACC15';
const SHORTS_BLUE = '#2563EB';
const SCAR_RED = '#B5544B';
const SANDAL_BROWN = '#854D0E';
const CUFFS_WHITE = '#FFFFFF';

/** Procedural Canvas texture for Luffy's open vest and iconic X-scar */
function createLuffyChestTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // V-neck open vest shape
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(118, 0);
  ctx.lineTo(64, 128);
  ctx.closePath();
  ctx.clip();

  // Skin base
  ctx.fillStyle = SKIN;
  ctx.fillRect(0, 0, 128, 128);

  // The iconic Akainu X-scar across the chest
  ctx.strokeStyle = SCAR_RED;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Slash 1: Top-left to bottom-right
  ctx.beginPath();
  ctx.moveTo(28, 18);
  ctx.lineTo(100, 102);
  ctx.stroke();

  // Slash 2: Top-right to bottom-left
  ctx.beginPath();
  ctx.moveTo(100, 18);
  ctx.lineTo(28, 102);
  ctx.stroke();

  // Stitches cross-hatching
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#4A2820';
  for (let i = 0; i <= 6; i++) {
    const x1 = 30 + (64 * i) / 6;
    const y1 = 20 + (76 * i) / 6;
    ctx.beginPath();
    ctx.moveTo(x1 - 4, y1 + 4);
    ctx.lineTo(x1 + 4, y1 - 4);
    ctx.stroke();

    const x2 = 98 - (64 * i) / 6;
    const y2 = 20 + (76 * i) / 6;
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
      hat: vinyl(STRAW_YELLOW, 0.65),
      ribbon: vinyl(RIBBON_RED, 0.4),
      vest: vinyl(VEST_RED, 0.5),
      sash: vinyl(SASH_YELLOW, 0.55),
      shorts: vinyl(SHORTS_BLUE, 0.55),
      cuffs: vinyl(CUFFS_WHITE, 0.6),
      sandals: vinyl(SANDAL_BROWN, 0.4),
      eye: vinyl('#0E0E10', 0.1),
      white: vinyl('#FFFFFF', 0.1),
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

  // Hair spikes framing the face from sides, keeping forehead center open
  const hairSpikes: [number, number, number, number, number][] = [
    [-0.2, 0.26, 0.14, 0.7, -0.2],
    [-0.14, 0.31, 0.18, 0.35, -0.3],
    [0.14, 0.31, 0.18, -0.35, -0.3],
    [0.2, 0.26, 0.14, -0.7, -0.2],
    [-0.28, 0.16, 0.03, 1.25, 0],
    [0.28, 0.16, 0.03, -1.25, 0],
    [-0.2, 0.25, -0.1, 0.45, 0.2],
    [0.2, 0.25, -0.1, -0.45, 0.2],
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
        {/* Legs: Bare skin shins, white fluffy cuffs, and blue denim shorts */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* Sandal Sole */}
            <mesh
              material={materials.sandals}
              position={[side * 0.08, 0.013, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.095, 0.025, 0.16]} />
            </mesh>
            {/* Bare Foot on Sandal */}
            <mesh
              material={materials.skin}
              position={[side * 0.08, 0.028, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.076, 0.022, 0.14]} />
            </mesh>
            {/* Bare Lower Leg (Shin/Calf) */}
            <mesh material={materials.skin} position={[side * 0.08, 0.095, 0]}>
              <cylinderGeometry args={[0.038, 0.042, 0.12, 14]} />
            </mesh>
            {/* Iconic Fluffy White Rolled Cuff */}
            <mesh
              material={materials.cuffs}
              position={[side * 0.08, 0.175, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.064, 0.064, 0.042, 18]} />
            </mesh>
            {/* Blue Denim Shorts Leg */}
            <mesh
              material={materials.shorts}
              position={[side * 0.08, 0.235, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.055, 0.06, 0.09, 16]} />
            </mesh>
          </group>
        ))}

        {/* Blue Denim Shorts Pelvis / Hips */}
        <mesh
          material={materials.shorts}
          position-y={0.31}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.148, 0.158, 0.12, 28]} />
        </mesh>

        {/* Yellow Tied Waist Sash */}
        <mesh
          material={materials.sash}
          position-y={0.39}
          scale={[1, 1, 0.82]}
          castShadow
        >
          <cylinderGeometry args={[0.156, 0.154, 0.06, 28]} />
        </mesh>
        {/* Sash Knot and Hanging Ribbon */}
        <mesh
          material={materials.sash}
          position={[0.12, 0.38, 0.11]}
          castShadow
        >
          <sphereGeometry args={[0.04, 12, 10]} />
        </mesh>
        <mesh
          material={materials.sash}
          position={[0.13, 0.3, 0.1]}
          rotation={[0.15, 0, -0.2]}
          castShadow
        >
          <boxGeometry args={[0.05, 0.14, 0.02]} />
        </mesh>

        {/* Upper Torso: Red sleeveless vest */}
        <mesh
          material={materials.vest}
          position-y={0.5}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.142, 0.15, 0.17, 28]} />
        </mesh>
        {/* Open Chest Panel with Akainu X-Scar */}
        <mesh material={materials.chest} position={[0, 0.505, 0.12]}>
          <planeGeometry args={[0.15, 0.16]} />
        </mesh>

        {/* Arms: Red short armholes + bare skin arms & fists */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.175, 0.54, 0]}
            rotation-z={side * 0.35}
          >
            {/* Red sleeveless armhole */}
            <mesh material={materials.vest} position-y={-0.04} castShadow>
              <cylinderGeometry args={[0.048, 0.056, 0.07, 14]} />
            </mesh>
            {/* Bare arm */}
            <mesh material={materials.skin} position-y={-0.12} castShadow>
              <cylinderGeometry args={[0.038, 0.04, 0.11, 12]} />
            </mesh>
            {/* Clenched fist */}
            <mesh material={materials.skin} position-y={-0.2} castShadow>
              <sphereGeometry args={[0.046, 14, 12]} />
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
            position={[0, 0.38, -0.03]}
            scale={[0.31, 0.17, 0.26]}
            castShadow
          >
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>

          {/* Hair Spikes framing face */}
          {hairSpikes.map(([x, y, z, leanX, leanZ], idx) => (
            <mesh
              key={idx}
              material={materials.hair}
              position={[x, y + 0.16, z]}
              rotation={[leanZ, 0, leanX]}
              castShadow
            >
              <coneGeometry args={[0.06, 0.17, 7]} />
            </mesh>
          ))}

          {/* Straw Hat: Brim, Red Ribbon, and Dome Crown */}
          <group position={[0, 0.42, -0.015]} rotation-x={-0.15}>
            {/* Wide Straw Brim */}
            <mesh material={materials.hat} castShadow receiveShadow>
              <cylinderGeometry args={[0.46, 0.46, 0.022, 36]} />
            </mesh>
            {/* Crimson Red Ribbon */}
            <mesh material={materials.ribbon} position-y={0.025} castShadow>
              <cylinderGeometry args={[0.315, 0.315, 0.042, 36]} />
            </mesh>
            {/* Straw Hat Dome Crown */}
            <mesh
              material={materials.hat}
              position-y={0.045}
              scale={[1, 0.82, 1.05]}
              castShadow
            >
              <sphereGeometry args={[0.31, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            </mesh>
          </group>

          {/* Pop Eyes with white catchlight dots */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh
                material={materials.eye}
                position={[side * 0.115, 0.205, 0.233]}
                scale={[1, 1.08, 0.4]}
              >
                <sphereGeometry args={[0.058, 20, 14]} />
              </mesh>
              <mesh
                material={materials.white}
                position={[side * 0.115 - side * 0.018, 0.222, 0.238]}
                scale={[1, 1, 0.3]}
              >
                <sphereGeometry args={[0.015, 10, 8]} />
              </mesh>
            </group>
          ))}

          {/* Left Eye Scar (Stitched scar under his left eye, viewer's right) */}
          <mesh material={materials.scar} position={[0.115, 0.128, 0.234]}>
            <boxGeometry args={[0.055, 0.008, 0.005]} />
          </mesh>
          <mesh material={materials.scar} position={[0.1, 0.128, 0.235]}>
            <boxGeometry args={[0.006, 0.02, 0.005]} />
          </mesh>
          <mesh material={materials.scar} position={[0.13, 0.128, 0.235]}>
            <boxGeometry args={[0.006, 0.02, 0.005]} />
          </mesh>

          {/* Cute Button Nose */}
          <mesh
            material={materials.skin}
            position={[0, 0.165, 0.236]}
            scale={[0.8, 1, 0.5]}
          >
            <sphereGeometry args={[0.018, 10, 8]} />
          </mesh>

          {/* Cheerful Grin */}
          <mesh
            material={materials.eye}
            position={[0, 0.12, 0.234]}
            rotation-z={Math.PI * 1.15}
          >
            <torusGeometry args={[0.065, 0.007, 8, 20, Math.PI * 0.7]} />
          </mesh>

          {/* Ears */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.skin}
              position={[side * 0.285, 0.19, 0.02]}
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
