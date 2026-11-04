import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface SanjiItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  arriveOrder?: number;
}

const vinyl = (color: string, roughness = 0.4) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

const SKIN = '#EBCBA8';
const HAIR_BLONDE = '#F5D061';
const SUIT_BLACK = '#18181B';
const SHIRT_BLUE = '#38BDF8';
const TIE_BLACK = '#09090B';
const SHOE_BLACK = '#09090B';
const CIGARETTE_WHITE = '#F8FAFC';
const CIGARETTE_EMBER = '#EF4444';

export const SanjiItem: React.FC<SanjiItemProps> = ({
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
      hair: vinyl(HAIR_BLONDE, 0.45),
      suit: vinyl(SUIT_BLACK, 0.35),
      shirt: vinyl(SHIRT_BLUE, 0.5),
      tie: vinyl(TIE_BLACK, 0.25),
      shoes: vinyl(SHOE_BLACK, 0.15),
      eye: vinyl('#0E0E10', 0.1),
      white: vinyl('#FFFFFF', 0.1),
      gold: vinyl('#EAB308', 0.2),
      cigarette: vinyl(CIGARETTE_WHITE, 0.6),
      ember: new THREE.MeshStandardMaterial({
        color: CIGARETTE_EMBER,
        emissive: new THREE.Color('#FF3300'),
        emissiveIntensity: 1.5,
        roughness: 0.2,
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
        {/* Legs: Tailored black suit trousers & shiny dress shoes */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* Patent leather dress shoes */}
            <mesh
              material={materials.shoes}
              position={[side * 0.075, 0.03, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.09, 0.045, 0.17]} />
            </mesh>
            {/* Trouser legs */}
            <mesh
              material={materials.suit}
              position={[side * 0.072, 0.15, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.05, 0.055, 0.22, 16]} />
            </mesh>
          </group>
        ))}

        {/* Suit Hips / Pelvis */}
        <mesh
          material={materials.suit}
          position-y={0.29}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.145, 0.16, 0.12, 28]} />
        </mesh>

        {/* Belt & Gold Buckle */}
        <mesh
          material={materials.shoes}
          position-y={0.36}
          scale={[1, 1, 0.8]}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.03, 28]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.36, 0.122]}>
          <boxGeometry args={[0.04, 0.025, 0.01]} />
        </mesh>

        {/* Torso: Black suit jacket with lapels */}
        <mesh
          material={materials.suit}
          position-y={0.48}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.14, 0.148, 0.22, 28]} />
        </mesh>

        {/* Blue Dress Shirt V-opening */}
        <mesh material={materials.shirt} position={[0, 0.52, 0.115]}>
          <planeGeometry args={[0.08, 0.12]} />
        </mesh>

        {/* Black Tie */}
        <mesh material={materials.tie} position={[0, 0.49, 0.118]}>
          <boxGeometry args={[0.022, 0.11, 0.006]} />
        </mesh>
        {/* Tie Knot */}
        <mesh material={materials.tie} position={[0, 0.54, 0.119]}>
          <boxGeometry args={[0.03, 0.025, 0.008]} />
        </mesh>

        {/* Jacket Lapels (Left and Right) */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            material={materials.suit}
            position={[side * 0.055, 0.50, 0.118]}
            rotation-z={side * 0.25}
            castShadow
          >
            <boxGeometry args={[0.035, 0.14, 0.008]} />
          </mesh>
        ))}

        {/* Double-breasted Gold Buttons */}
        {[-0.03, 0.03].map((x) =>
          [0.44, 0.40].map((y) => (
            <mesh
              key={`${x}-${y}`}
              material={materials.gold}
              position={[x, y, 0.119]}
            >
              <sphereGeometry args={[0.009, 8, 8]} />
            </mesh>
          ))
        )}

        {/* Arms: Hands casually tucked in trouser pockets pose */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.165, 0.52, 0]}
            rotation-z={side * 0.28}
          >
            {/* Suit upper arm */}
            <mesh material={materials.suit} position-y={-0.08} castShadow>
              <cylinderGeometry args={[0.045, 0.05, 0.15, 14]} />
            </mesh>
            {/* Forearm angled down toward pocket */}
            <mesh
              material={materials.suit}
              position={[side * -0.015, -0.19, 0.02]}
              rotation-z={side * -0.4}
              castShadow
            >
              <cylinderGeometry args={[0.04, 0.044, 0.12, 14]} />
            </mesh>
          </group>
        ))}

        {/* Head & Blonde Hair (Bobbling Group) */}
        <group ref={headRef} position-y={0.6}>
          {/* Head Shape */}
          <mesh material={materials.skin} position-y={0.22} castShadow>
            <boxGeometry args={[0.54, 0.42, 0.44]} />
          </mesh>

          {/* Blonde Hair Base Dome */}
          <mesh
            material={materials.hair}
            position={[0, 0.38, -0.02]}
            scale={[0.31, 0.17, 0.26]}
            castShadow
          >
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>

          {/* Sleek Blonde Bangs swept over right eye (viewer's left) */}
          {/* Side-swept curtain hair covering right side */}
          <mesh
            material={materials.hair}
            position={[-0.14, 0.28, 0.21]}
            rotation={[0.1, -0.2, 0.45]}
            castShadow
          >
            <boxGeometry args={[0.14, 0.26, 0.06]} />
          </mesh>
          <mesh
            material={materials.hair}
            position={[-0.08, 0.22, 0.22]}
            rotation={[0.1, -0.15, 0.3]}
            castShadow
          >
            <boxGeometry args={[0.10, 0.22, 0.05]} />
          </mesh>
          {/* Parting swoops across the forehead */}
          <mesh
            material={materials.hair}
            position={[0.08, 0.36, 0.21]}
            rotation-z={-0.35}
            castShadow
          >
            <boxGeometry args={[0.18, 0.08, 0.05]} />
          </mesh>
          <mesh
            material={materials.hair}
            position={[0.22, 0.30, 0.18]}
            rotation-z={-0.6}
            castShadow
          >
            <boxGeometry args={[0.12, 0.18, 0.05]} />
          </mesh>
          {/* Sideburns */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.hair}
              position={[side * 0.27, 0.20, 0.06]}
              castShadow
            >
              <boxGeometry args={[0.04, 0.18, 0.12]} />
            </mesh>
          ))}

          {/* Left Eye Visible (viewer's right, x = +0.115) */}
          <mesh
            material={materials.eye}
            position={[0.115, 0.205, 0.233]}
            scale={[1, 1.08, 0.4]}
          >
            <sphereGeometry args={[0.056, 20, 14]} />
          </mesh>
          <mesh
            material={materials.white}
            position={[0.132, 0.222, 0.238]}
            scale={[1, 1, 0.3]}
          >
            <sphereGeometry args={[0.015, 10, 8]} />
          </mesh>

          {/* Sanji's Iconic Curly Spiral Eyebrow */}
          <mesh
            material={materials.eye}
            position={[0.12, 0.28, 0.234]}
            rotation-z={-0.1}
          >
            <torusGeometry args={[0.022, 0.005, 6, 16, Math.PI * 1.5]} />
          </mesh>
          <mesh
            material={materials.eye}
            position={[0.09, 0.27, 0.234]}
            rotation-z={0.2}
          >
            <boxGeometry args={[0.045, 0.008, 0.004]} />
          </mesh>

          {/* Cute Button Nose */}
          <mesh
            material={materials.skin}
            position={[0, 0.165, 0.236]}
            scale={[0.8, 1, 0.5]}
          >
            <sphereGeometry args={[0.018, 10, 8]} />
          </mesh>

          {/* Smirk */}
          <mesh
            material={materials.eye}
            position={[0.02, 0.11, 0.234]}
            rotation-z={Math.PI * 1.1}
          >
            <torusGeometry args={[0.045, 0.006, 6, 16, Math.PI * 0.5]} />
          </mesh>

          {/* Trademark Cigarette with glowing ember */}
          <group position={[0.03, 0.10, 0.24]} rotation={[0.15, 0.4, -0.2]}>
            <mesh material={materials.cigarette} position-z={0.035}>
              <cylinderGeometry args={[0.008, 0.008, 0.07, 8]} />
            </mesh>
            <mesh material={materials.ember} position={[0, 0.038, 0.035]}>
              <sphereGeometry args={[0.009, 8, 8]} />
            </mesh>
          </group>

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
          <Html position={[0, 1.25, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="whitespace-nowrap rounded-full bg-black/80 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm">
              Vinsmoke Sanji <span className="text-white/60">· give him a tap</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
