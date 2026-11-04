import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface NamiItemProps {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  arriveOrder?: number;
}

const vinyl = (color: string, roughness = 0.4) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

const SKIN = '#F5D0B5';
const HAIR_ORANGE = '#F97316';
const TOP_BLUE = '#0284C7';
const TOP_WHITE = '#FFFFFF';
const JEANS_BLUE = '#2563EB';
const BELT_BROWN = '#78350F';
const GOLD = '#FACC15';
const TACT_ORANGE = '#EA580C';

export const NamiItem: React.FC<NamiItemProps> = ({
  position,
  rotY = 0,
  scale = 0.88,
}) => {
  const [hovered, setHovered] = useState(false);
  const headRef = useRef<THREE.Group>(null);
  const wobble = useRef({ angle: 0, speed: 0, tilt: 0, tiltSpeed: 0 });

  const materials = useMemo(
    () => ({
      skin: vinyl(SKIN),
      hair: vinyl(HAIR_ORANGE, 0.45),
      topBlue: vinyl(TOP_BLUE, 0.4),
      topWhite: vinyl(TOP_WHITE, 0.4),
      jeans: vinyl(JEANS_BLUE, 0.55),
      belt: vinyl(BELT_BROWN, 0.35),
      gold: vinyl(GOLD, 0.2),
      shoes: vinyl(HAIR_ORANGE, 0.3),
      eye: vinyl('#3B1F0E', 0.1),
      white: vinyl('#FFFFFF', 0.1),
      tattoo: vinyl('#1E293B', 0.5),
      tact: vinyl(TACT_ORANGE, 0.3),
      tactRing: vinyl(TOP_BLUE, 0.3),
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
        {/* Legs: Low-rise blue denim jeans & high-heeled sandals */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* High-heeled sandal sole */}
            <mesh
              material={materials.shoes}
              position={[side * 0.07, 0.02, 0.02]}
              castShadow
            >
              <boxGeometry args={[0.075, 0.025, 0.15]} />
            </mesh>
            {/* Sandal heel */}
            <mesh
              material={materials.shoes}
              position={[side * 0.07, 0.025, -0.04]}
              castShadow
            >
              <cylinderGeometry args={[0.012, 0.015, 0.04, 10]} />
            </mesh>
            {/* Jeans leg */}
            <mesh
              material={materials.jeans}
              position={[side * 0.068, 0.16, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.044, 0.048, 0.24, 16]} />
            </mesh>
          </group>
        ))}

        {/* Jeans Pelvis / Hips */}
        <mesh
          material={materials.jeans}
          position-y={0.29}
          scale={[1, 1, 0.76]}
          castShadow
        >
          <cylinderGeometry args={[0.138, 0.152, 0.11, 28]} />
        </mesh>

        {/* Brown Belt & Gold Ring Buckle */}
        <mesh
          material={materials.belt}
          position-y={0.345}
          scale={[1, 1, 0.78]}
          castShadow
        >
          <cylinderGeometry args={[0.142, 0.142, 0.025, 28]} />
        </mesh>
        <mesh
          material={materials.gold}
          position={[0, 0.345, 0.114]}
          rotation-x={Math.PI / 2}
        >
          <torusGeometry args={[0.018, 0.005, 8, 16]} />
        </mesh>

        {/* Bare Midriff Waist */}
        <mesh
          material={materials.skin}
          position-y={0.41}
          scale={[1, 1, 0.74]}
          castShadow
        >
          <cylinderGeometry args={[0.126, 0.136, 0.11, 28]} />
        </mesh>

        {/* Bikini / Halter Top (Blue & White stripes) */}
        <mesh
          material={materials.topBlue}
          position-y={0.49}
          scale={[1, 1, 0.76]}
          castShadow
        >
          <cylinderGeometry args={[0.135, 0.128, 0.09, 28]} />
        </mesh>
        {/* White Bikini Stripe Cups */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.052, 0.49, 0.08]}>
            <mesh material={materials.topWhite} scale={[1, 0.9, 0.7]} castShadow>
              <sphereGeometry args={[0.048, 14, 12]} />
            </mesh>
            <mesh
              material={materials.topBlue}
              position={[0, 0, 0.025]}
              scale={[1, 0.3, 0.8]}
            >
              <boxGeometry args={[0.08, 0.03, 0.02]} />
            </mesh>
          </group>
        ))}
        {/* Halter Neck Straps */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            material={materials.topBlue}
            position={[side * 0.04, 0.55, 0.05]}
            rotation={[0.3, 0, side * 0.3]}
          >
            <boxGeometry args={[0.012, 0.08, 0.006]} />
          </mesh>
        ))}

        {/* Arms: Left arm with tattoo & Log Pose, Right arm holding Clima-Tact */}
        {/* Left Arm: Resting gracefully on hip */}
        <group position={[-0.155, 0.52, 0]} rotation-z={-0.3}>
          {/* Shoulder with Tangerine Tattoo */}
          <mesh material={materials.skin} position-y={-0.06} castShadow>
            <cylinderGeometry args={[0.034, 0.036, 0.12, 12]} />
          </mesh>
          <mesh material={materials.tattoo} position={[-0.036, -0.04, 0]}>
            <boxGeometry args={[0.005, 0.028, 0.028]} />
          </mesh>
          {/* Forearm bent toward hip */}
          <mesh
            material={materials.skin}
            position={[0.02, -0.16, 0.02]}
            rotation-z={0.5}
            castShadow
          >
            <cylinderGeometry args={[0.032, 0.034, 0.11, 12]} />
          </mesh>
          {/* Golden Log Pose on wrist */}
          <mesh material={materials.gold} position={[0.045, -0.19, 0.03]}>
            <cylinderGeometry args={[0.024, 0.024, 0.016, 12]} />
          </mesh>
          <mesh material={materials.white} position={[0.045, -0.18, 0.03]}>
            <sphereGeometry args={[0.014, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
        </group>

        {/* Right Arm: Holding the Clima-Tact staff */}
        <group position={[0.155, 0.52, 0]} rotation-z={0.35}>
          <mesh material={materials.skin} position-y={-0.06} castShadow>
            <cylinderGeometry args={[0.034, 0.036, 0.12, 12]} />
          </mesh>
          <mesh
            material={materials.skin}
            position={[-0.01, -0.16, 0.04]}
            rotation-x={-0.5}
            castShadow
          >
            <cylinderGeometry args={[0.032, 0.034, 0.11, 12]} />
          </mesh>
          {/* Hand clasping staff */}
          <mesh material={materials.skin} position={[-0.01, -0.21, 0.08]} castShadow>
            <sphereGeometry args={[0.036, 12, 10]} />
          </mesh>

          {/* Sorcery Clima-Tact (Three-section staff) */}
          <group position={[-0.01, -0.12, 0.10]} rotation={[0.4, 0, -0.2]}>
            <mesh material={materials.tact} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.44, 10]} />
            </mesh>
            {/* Clima-tact sphere ends & joint rings */}
            {[-0.20, 0, 0.20].map((y, i) => (
              <mesh key={i} material={materials.tactRing} position-y={y}>
                <sphereGeometry args={[0.024, 10, 8]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Head & Long Orange Hair (Bobbling Group) */}
        <group ref={headRef} position-y={0.58}>
          {/* Head Shape (slightly more delicate Pop proportions) */}
          <mesh material={materials.skin} position-y={0.21} castShadow>
            <boxGeometry args={[0.52, 0.40, 0.42]} />
          </mesh>

          {/* Hair Base Dome */}
          <mesh
            material={materials.hair}
            position={[0, 0.36, -0.02]}
            scale={[0.29, 0.16, 0.25]}
            castShadow
          >
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>

          {/* Long Flowing Hair cascading down the back and over shoulders */}
          <mesh
            material={materials.hair}
            position={[0, 0.08, -0.18]}
            scale={[1, 1, 0.5]}
            castShadow
          >
            <cylinderGeometry args={[0.24, 0.28, 0.36, 20]} />
          </mesh>
          {/* Hair strands framing face left & right */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.24, 0.16, 0.06]}>
              <mesh material={materials.hair} rotation-z={side * -0.15} castShadow>
                <cylinderGeometry args={[0.045, 0.065, 0.26, 12]} />
              </mesh>
              {/* Strand curls */}
              <mesh
                material={materials.hair}
                position={[side * 0.02, -0.14, 0.04]}
                rotation-z={side * 0.3}
                castShadow
              >
                <coneGeometry args={[0.045, 0.14, 8]} />
              </mesh>
            </group>
          ))}
          {/* Soft swept bangs on forehead */}
          <mesh
            material={materials.hair}
            position={[-0.08, 0.34, 0.21]}
            rotation-z={0.3}
            castShadow
          >
            <boxGeometry args={[0.16, 0.07, 0.04]} />
          </mesh>
          <mesh
            material={materials.hair}
            position={[0.10, 0.33, 0.21]}
            rotation-z={-0.35}
            castShadow
          >
            <boxGeometry args={[0.15, 0.07, 0.04]} />
          </mesh>

          {/* Big Sparkling Pop Eyes */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh
                material={materials.eye}
                position={[side * 0.11, 0.20, 0.222]}
                scale={[1, 1.1, 0.4]}
              >
                <sphereGeometry args={[0.054, 20, 14]} />
              </mesh>
              {/* Highlight catchlight dots */}
              <mesh
                material={materials.white}
                position={[side * 0.11 - side * 0.016, 0.216, 0.228]}
                scale={[1, 1, 0.3]}
              >
                <sphereGeometry args={[0.016, 10, 8]} />
              </mesh>
              <mesh
                material={materials.white}
                position={[side * 0.11 + side * 0.012, 0.188, 0.228]}
                scale={[1, 1, 0.3]}
              >
                <sphereGeometry args={[0.008, 8, 6]} />
              </mesh>
            </group>
          ))}

          {/* Dainty Button Nose */}
          <mesh
            material={materials.skin}
            position={[0, 0.155, 0.225]}
            scale={[0.7, 1, 0.5]}
          >
            <sphereGeometry args={[0.015, 10, 8]} />
          </mesh>

          {/* Sweet Anime Smile */}
          <mesh
            material={materials.eye}
            position={[0, 0.11, 0.223]}
            rotation-z={Math.PI * 1.15}
          >
            <torusGeometry args={[0.05, 0.006, 6, 16, Math.PI * 0.65]} />
          </mesh>

          {/* Ears & Gold Pearl Earrings */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh
                material={materials.skin}
                position={[side * 0.27, 0.18, 0.02]}
                scale={[0.5, 1, 0.8]}
              >
                <sphereGeometry args={[0.05, 12, 10]} />
              </mesh>
              {/* Gold hoop earring */}
              <mesh
                material={materials.gold}
                position={[side * 0.28, 0.13, 0.02]}
                rotation-y={Math.PI / 2}
              >
                <torusGeometry args={[0.016, 0.004, 6, 14]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Hover Tooltip */}
        {hovered && (
          <Html position={[0, 1.25, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="whitespace-nowrap rounded-full bg-black/80 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm">
              Cat Burglar Nami <span className="text-white/60">· give her a tap</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
