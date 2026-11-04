import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface UsoppItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  arriveOrder?: number;
}

const vinyl = (color: string, roughness = 0.45) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

const SKIN = '#DDB288';
const HAIR_BROWN = '#3E2723';
const HAT_WHITE = '#F8FAFC';
const OVERALLS_YELLOW = '#EAB308';
const SASH_BROWN = '#5D4037';
const BAG_BROWN = '#78350F';
const BOOTS_BROWN = '#3E2723';
const GOGGLES_FRAME = '#334155';
const GOGGLES_LENS = '#84CC16';

export const UsoppItem: React.FC<UsoppItemProps> = ({
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
      hair: vinyl(HAIR_BROWN, 0.6),
      hat: vinyl(HAT_WHITE, 0.5),
      overalls: vinyl(OVERALLS_YELLOW, 0.5),
      sash: vinyl(SASH_BROWN, 0.5),
      bag: vinyl(BAG_BROWN, 0.4),
      boots: vinyl(BOOTS_BROWN, 0.3),
      goggles: vinyl(GOGGLES_FRAME, 0.3),
      lens: new THREE.MeshStandardMaterial({
        color: GOGGLES_LENS,
        roughness: 0.1,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85,
      }),
      eye: vinyl('#0E0E10', 0.1),
      white: vinyl('#FFFFFF', 0.1),
      slingshot: vinyl('#1C1917', 0.3),
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
        {/* Legs: Heavy brown boots & Yellow cargo overalls legs */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* Chunky boot */}
            <mesh
              material={materials.boots}
              position={[side * 0.08, 0.04, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.095, 0.065, 0.17]} />
            </mesh>
            {/* Cargo overalls pant legs */}
            <mesh
              material={materials.overalls}
              position={[side * 0.076, 0.17, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.054, 0.058, 0.20, 16]} />
            </mesh>
          </group>
        ))}

        {/* Yellow Overalls Pelvis */}
        <mesh
          material={materials.overalls}
          position-y={0.30}
          scale={[1, 1, 0.8]}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.165, 0.13, 28]} />
        </mesh>

        {/* Dark Brown Waist Sash */}
        <mesh
          material={materials.sash}
          position-y={0.38}
          scale={[1, 1, 0.82]}
          castShadow
        >
          <cylinderGeometry args={[0.155, 0.155, 0.055, 28]} />
        </mesh>

        {/* Muscular Bare Torso with Overalls Straps */}
        <mesh
          material={materials.skin}
          position-y={0.49}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.142, 0.15, 0.18, 28]} />
        </mesh>

        {/* Yellow Overalls Bib & Shoulder Straps */}
        <mesh
          material={materials.overalls}
          position={[0, 0.44, 0.118]}
          castShadow
        >
          <boxGeometry args={[0.14, 0.09, 0.01]} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            material={materials.overalls}
            position={[side * 0.075, 0.52, 0]}
            rotation-x={0.15}
            castShadow
          >
            <boxGeometry args={[0.028, 0.14, 0.18]} />
          </mesh>
        ))}

        {/* Crossbody Messenger Bag & Strap */}
        <mesh
          material={materials.bag}
          position={[-0.14, 0.32, 0.08]}
          rotation={[0.1, 0.2, -0.15]}
          castShadow
        >
          <boxGeometry args={[0.08, 0.14, 0.09]} />
        </mesh>
        {/* Diagonal Leather Strap across chest */}
        <mesh
          material={materials.bag}
          position={[0.01, 0.47, 0.12]}
          rotation-z={-0.65}
        >
          <boxGeometry args={[0.026, 0.28, 0.008]} />
        </mesh>

        {/* Black Kabuto Slingshot strapped to back */}
        <group position={[0.08, 0.46, -0.13]} rotation={[0.2, 0, 0.35]}>
          <mesh material={materials.slingshot} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.34, 10]} />
          </mesh>
          {/* Slingshot circular prong head */}
          <mesh material={materials.slingshot} position-y={0.17}>
            <torusGeometry args={[0.045, 0.01, 8, 16]} />
          </mesh>
        </group>

        {/* Arms: Muscular bare arms with white wrist wraps */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.175, 0.53, 0]}
            rotation-z={side * 0.32}
          >
            <mesh material={materials.skin} position-y={-0.08} castShadow>
              <cylinderGeometry args={[0.042, 0.044, 0.14, 12]} />
            </mesh>
            {/* White wrist wrap */}
            <mesh material={materials.hat} position-y={-0.16} castShadow>
              <cylinderGeometry args={[0.044, 0.044, 0.045, 12]} />
            </mesh>
            {/* Clenched fist */}
            <mesh material={materials.skin} position-y={-0.21} castShadow>
              <sphereGeometry args={[0.046, 14, 12]} />
            </mesh>
          </group>
        ))}

        {/* Head & Sniper Goggles (Bobbling Group) */}
        <group ref={headRef} position-y={0.6}>
          {/* Head Shape */}
          <mesh material={materials.skin} position-y={0.22} castShadow>
            <boxGeometry args={[0.54, 0.42, 0.44]} />
          </mesh>

          {/* Curly Brown Afro Base & Puffs */}
          <mesh
            material={materials.hair}
            position={[0, 0.35, -0.04]}
            scale={[0.33, 0.18, 0.28]}
            castShadow
          >
            <sphereGeometry args={[1, 24, 16]} />
          </mesh>
          {/* Curly side hair puffs */}
          {[-1, 1].map((side) =>
            [-0.05, 0.05].map((yOff, i) => (
              <mesh
                key={`${side}-${i}`}
                material={materials.hair}
                position={[side * 0.28, 0.18 + yOff, -0.02]}
                castShadow
              >
                <sphereGeometry args={[0.065, 12, 10]} />
              </mesh>
            ))
          )}

          {/* White Slouchy Bandana / Beanie Hat */}
          <group position={[0, 0.38, -0.02]} rotation-x={-0.1}>
            <mesh material={materials.hat} castShadow>
              <cylinderGeometry args={[0.31, 0.32, 0.08, 28]} />
            </mesh>
            <mesh material={materials.hat} position-y={0.06} castShadow>
              <sphereGeometry args={[0.30, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            </mesh>
          </group>

          {/* Sniper Goggles perched on forehead */}
          <group position={[0, 0.34, 0.18]} rotation-x={0.25}>
            {/* Goggle strap */}
            <mesh material={materials.goggles}>
              <cylinderGeometry args={[0.29, 0.29, 0.025, 24]} />
            </mesh>
            {/* Left & Right Round Goggle Lenses */}
            {[-1, 1].map((side) => (
              <group key={side} position={[side * 0.12, 0, 0.10]}>
                <mesh material={materials.goggles} castShadow>
                  <cylinderGeometry args={[0.052, 0.052, 0.035, 16]} />
                </mesh>
                <mesh material={materials.lens} position-y={0.015}>
                  <cylinderGeometry args={[0.042, 0.042, 0.01, 16]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Pop Eyes with white catchlight dots */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh
                material={materials.eye}
                position={[side * 0.115, 0.20, 0.233]}
                scale={[1, 1.08, 0.4]}
              >
                <sphereGeometry args={[0.056, 20, 14]} />
              </mesh>
              <mesh
                material={materials.white}
                position={[side * 0.115 - side * 0.018, 0.218, 0.238]}
                scale={[1, 1, 0.3]}
              >
                <sphereGeometry args={[0.015, 10, 8]} />
              </mesh>
            </group>
          ))}

          {/* === THE FAMOUS LONG NOSE === */}
          <group position={[0, 0.165, 0.23]} rotation-x={Math.PI / 2}>
            <mesh material={materials.skin} castShadow>
              <cylinderGeometry args={[0.022, 0.026, 0.28, 14]} />
            </mesh>
            {/* Rounded tip */}
            <mesh material={materials.skin} position-y={0.14}>
              <sphereGeometry args={[0.022, 12, 10]} />
            </mesh>
          </group>

          {/* Confident Smirk / Grin */}
          <mesh
            material={materials.eye}
            position={[0, 0.10, 0.234]}
            rotation-z={Math.PI * 1.15}
          >
            <torusGeometry args={[0.055, 0.007, 6, 18, Math.PI * 0.7]} />
          </mesh>

          {/* Thick Anime Eyebrows */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              material={materials.eye}
              position={[side * 0.115, 0.27, 0.234]}
              rotation-z={side * -0.2}
            >
              <boxGeometry args={[0.055, 0.01, 0.004]} />
            </mesh>
          ))}

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
              God Usopp <span className="text-white/60">· give him a tap</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
