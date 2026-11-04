import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface RobinItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  arriveOrder?: number;
}

const vinyl = (color: string, roughness = 0.4) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

const SKIN = '#F5D0B5';
const HAIR_BLACK = '#0F172A';
const VEST_NAVY = '#1E293B';
const SKIRT_INDIGO = '#3730A3';
const SUNGLASSES_FRAME = '#F97316';
const SUNGLASSES_LENS = '#1E293B';
const GOLD = '#FACC15';

export const RobinItem: React.FC<RobinItemProps> = ({
  position,
  rotY = 0,
  scale = 0.91,
}) => {
  const [hovered, setHovered] = useState(false);
  const headRef = useRef<THREE.Group>(null);
  const wobble = useRef({ angle: 0, speed: 0, tilt: 0, tiltSpeed: 0 });

  const materials = useMemo(
    () => ({
      skin: vinyl(SKIN),
      hair: vinyl(HAIR_BLACK, 0.35),
      vest: vinyl(VEST_NAVY, 0.4),
      skirt: vinyl(SKIRT_INDIGO, 0.5),
      sunglasses: vinyl(SUNGLASSES_FRAME, 0.2),
      lens: new THREE.MeshStandardMaterial({
        color: SUNGLASSES_LENS,
        roughness: 0.1,
        metalness: 0.6,
      }),
      shoes: vinyl(HAIR_BLACK, 0.25),
      eye: vinyl('#1E1B4B', 0.1),
      white: vinyl('#FFFFFF', 0.1),
      gold: vinyl(GOLD, 0.2),
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
        {/* Feet: High-heeled dark sandals peeking under skirt */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh
              material={materials.shoes}
              position={[side * 0.065, 0.02, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.07, 0.025, 0.14]} />
            </mesh>
            <mesh
              material={materials.shoes}
              position={[side * 0.065, 0.025, -0.035]}
              castShadow
            >
              <cylinderGeometry args={[0.01, 0.014, 0.04, 10]} />
            </mesh>
          </group>
        ))}

        {/* Long Elegant Indigo Wrap Sarong Skirt */}
        <mesh
          material={materials.skirt}
          position-y={0.22}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.138, 0.175, 0.36, 28]} />
        </mesh>
        {/* Sarong waistband / belt */}
        <mesh
          material={materials.skirt}
          position-y={0.38}
          scale={[1, 1, 0.8]}
          castShadow
        >
          <cylinderGeometry args={[0.144, 0.144, 0.04, 28]} />
        </mesh>

        {/* Upper Torso: Navy Blue Zippered Leather Vest */}
        <mesh
          material={materials.vest}
          position-y={0.48}
          scale={[1, 1, 0.76]}
          castShadow
        >
          <cylinderGeometry args={[0.135, 0.142, 0.19, 28]} />
        </mesh>

        {/* Deep V-neck Cleavage / Skin panel */}
        <mesh material={materials.skin} position={[0, 0.51, 0.11]}>
          <planeGeometry args={[0.08, 0.13]} />
        </mesh>
        {/* Gold Zipper pull on vest */}
        <mesh material={materials.gold} position={[0, 0.43, 0.116]}>
          <boxGeometry args={[0.012, 0.03, 0.008]} />
        </mesh>

        {/* === ARMS IN CIEN FLEUR CROSSED POSE === */}
        {/* Right arm crossing over to left chest */}
        <group position={[0.14, 0.52, 0.02]} rotation={[0.5, 0.2, -0.55]}>
          <mesh material={materials.skin} position-y={-0.08} castShadow>
            <cylinderGeometry args={[0.034, 0.036, 0.15, 12]} />
          </mesh>
          {/* Forearm crossing left */}
          <mesh
            material={materials.skin}
            position={[-0.08, -0.16, 0.06]}
            rotation-z={1.1}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.032, 0.15, 12]} />
          </mesh>
          {/* Elegant open palm hand */}
          <mesh material={materials.skin} position={[-0.15, -0.13, 0.08]} castShadow>
            <boxGeometry args={[0.045, 0.025, 0.015]} />
          </mesh>
        </group>

        {/* Left arm crossing under to right chest */}
        <group position={[-0.14, 0.50, 0.01]} rotation={[0.45, -0.15, 0.6]}>
          <mesh material={materials.skin} position-y={-0.08} castShadow>
            <cylinderGeometry args={[0.034, 0.036, 0.15, 12]} />
          </mesh>
          {/* Forearm crossing right */}
          <mesh
            material={materials.skin}
            position={[0.08, -0.15, 0.04]}
            rotation-z={-1.1}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.032, 0.15, 12]} />
          </mesh>
          {/* Elegant open palm hand */}
          <mesh material={materials.skin} position={[0.14, -0.12, 0.06]} castShadow>
            <boxGeometry args={[0.045, 0.025, 0.015]} />
          </mesh>
        </group>

        {/* Head & Sleek Raven Hair (Bobbling Group) */}
        <group ref={headRef} position-y={0.58}>
          {/* Head Shape */}
          <mesh material={materials.skin} position-y={0.21} castShadow>
            <boxGeometry args={[0.52, 0.40, 0.42]} />
          </mesh>

          {/* Raven Hair Base Dome */}
          <mesh
            material={materials.hair}
            position={[0, 0.36, -0.02]}
            scale={[0.29, 0.16, 0.25]}
            castShadow
          >
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>

          {/* Long Silky Hair cascading down the back */}
          <mesh
            material={materials.hair}
            position={[0, 0.06, -0.18]}
            scale={[1, 1, 0.52]}
            castShadow
          >
            <cylinderGeometry args={[0.25, 0.28, 0.40, 24]} />
          </mesh>
          {/* Side hair locks draping past shoulders */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.hair}
              position={[side * 0.24, 0.12, 0.04]}
              rotation-z={side * -0.08}
              castShadow
            >
              <cylinderGeometry args={[0.045, 0.055, 0.32, 12]} />
            </mesh>
          ))}

          {/* Chic Aviator Sunglasses pushed up on forehead */}
          <group position={[0, 0.35, 0.17]} rotation-x={0.3}>
            {/* Orange frames */}
            <mesh material={materials.sunglasses} castShadow>
              <boxGeometry args={[0.34, 0.055, 0.025]} />
            </mesh>
            {/* Left and Right smoke tinted lenses */}
            {[-1, 1].map((side) => (
              <mesh
                key={side}
                material={materials.lens}
                position={[side * 0.08, 0, 0.015]}
              >
                <boxGeometry args={[0.11, 0.05, 0.01]} />
              </mesh>
            ))}
          </group>

          {/* Serene Blue/Violet Pop Eyes */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh
                material={materials.eye}
                position={[side * 0.11, 0.195, 0.222]}
                scale={[1, 1.1, 0.4]}
              >
                <sphereGeometry args={[0.052, 20, 14]} />
              </mesh>
              {/* Highlight catchlight dots */}
              <mesh
                material={materials.white}
                position={[side * 0.11 - side * 0.016, 0.21, 0.228]}
                scale={[1, 1, 0.3]}
              >
                <sphereGeometry args={[0.015, 10, 8]} />
              </mesh>
            </group>
          ))}

          {/* Elegant Straight Nose */}
          <mesh
            material={materials.skin}
            position={[0, 0.155, 0.225]}
            scale={[0.7, 1.2, 0.5]}
          >
            <sphereGeometry args={[0.016, 10, 8]} />
          </mesh>

          {/* Poised, Calm Smile */}
          <mesh
            material={materials.eye}
            position={[0, 0.105, 0.223]}
            rotation-z={Math.PI * 1.15}
          >
            <torusGeometry args={[0.046, 0.0055, 6, 16, Math.PI * 0.6]} />
          </mesh>

          {/* Ears */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.skin}
              position={[side * 0.27, 0.18, 0.02]}
              scale={[0.5, 1, 0.8]}
            >
              <sphereGeometry args={[0.05, 12, 10]} />
            </mesh>
          ))}
        </group>

        {/* Hover Tooltip */}
        {hovered && (
          <Html position={[0, 1.25, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="whitespace-nowrap rounded-full bg-black/80 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm">
              Nico Robin <span className="text-white/60">· give her a tap</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
