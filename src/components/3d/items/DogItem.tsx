import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { deskStore, useDeskStore } from '../../../store/deskStore';

interface DogItemProps {
  position: [number, number, number];
  rotY?: number;
  size?: number;
}

// Procedural Web Audio API sound generator for Shih Tzu puppy
function playDogAudio(type: 'bark' | 'pant' | 'whimper' | 'snore' | 'happy') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const t = ctx.currentTime;

    if (type === 'bark') {
      // Soft playful Shih Tzu boof / bark
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const startFreq = 340 + (Math.random() * 40 - 20);
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, t);
      filter.Q.value = 3.2;

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } else if (type === 'pant') {
      // Breathy happy panting puff
      const bufferSize = Math.floor(ctx.sampleRate * 0.12);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100 + Math.random() * 150, t);
      filter.Q.value = 2.4;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);

      whiteNoise.connect(filter).connect(gain).connect(ctx.destination);
      whiteNoise.start(t);
    } else if (type === 'whimper') {
      // Sweet puppy whimper / yawn
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.linearRampToValueAtTime(950, t + 0.14);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.32);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.36);
    } else if (type === 'happy') {
      // Dual high chirp-bark
      for (let i = 0; i < 2; i++) {
        const delay = i * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420 + i * 80, t + delay);
        osc.frequency.exponentialRampToValueAtTime(220, t + delay + 0.09);

        gain.gain.setValueAtTime(0, t + delay);
        gain.gain.linearRampToValueAtTime(0.25, t + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.1);

        osc.connect(gain).connect(ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.11);
      }
    } else {
      // Sleepy snore / sigh
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.65);
    }
  } catch {
    // Graceful fallback if Web Audio is blocked
  }
}

export const DogItem: React.FC<DogItemProps> = ({
  position,
  rotY = 0,
  size = 0.88,
}) => {
  const { camera, pointer } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [state, setState] = useState<'asleep' | 'awake' | 'happy'>('asleep');
  const [pats, setPats] = useState(0);

  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Group>(null);
  const rightEarRef = useRef<THREE.Group>(null);
  const tailSegments = useRef<THREE.Group[]>([]);
  const tongueRef = useRef<THREE.Mesh>(null);
  const zzzRef = useRef<THREE.Group>(null);

  const wagSpeed = useRef(1.5);
  const targetHeadTilt = useRef({ yaw: 0, pitch: 0, roll: 0 });
  const currentHeadTilt = useRef({ yaw: 0, pitch: 0, roll: 0 });

  // Breed Materials for Shih Tzu (Pearl White & Honey Caramel)
  const materials = useMemo(() => {
    return {
      furWhite: new THREE.MeshStandardMaterial({
        color: '#F8F6F0', // Soft creamy pearl white
        roughness: 0.92,
        metalness: 0.02,
      }),
      furGold: new THREE.MeshStandardMaterial({
        color: '#C88A42', // Warm caramel honey patches
        roughness: 0.90,
        metalness: 0.02,
      }),
      furChest: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.95,
        metalness: 0.0,
      }),
      nose: new THREE.MeshStandardMaterial({
        color: '#18181A', // Glossy black button nose
        roughness: 0.28,
        metalness: 0.1,
      }),
      eye: new THREE.MeshStandardMaterial({
        color: '#1A110D', // Soulful puppy eyes
        roughness: 0.15,
        metalness: 0.05,
      }),
      highlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      tongue: new THREE.MeshStandardMaterial({
        color: '#FB7185', // Soft pink tongue
        roughness: 0.4,
      }),
      collar: new THREE.MeshStandardMaterial({
        color: '#E11D48', // Vibrant red leather collar
        roughness: 0.45,
      }),
      tag: new THREE.MeshStandardMaterial({
        color: '#F59E0B', // Gold bell / tag
        metalness: 0.85,
        roughness: 0.2,
      }),
    };
  }, []);

  // Handle click / tap on the puppy
  const handlePet = () => {
    setPats((p) => p + 1);
    wagSpeed.current = 14.0; // Excited wagging!

    if (state === 'asleep') {
      setState('awake');
      playDogAudio('bark');
      setTimeout(() => playDogAudio('pant'), 400);
    } else {
      setState('happy');
      playDogAudio('happy');
      setTimeout(() => setState('awake'), 2200);
    }
  };

  // Return to sleep after a while if not interacted
  useEffect(() => {
    if (state !== 'asleep') {
      const timer = setTimeout(() => {
        if (!isHovered) {
          playDogAudio('whimper');
          setState('asleep');
        }
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [state, isHovered, pats]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const isAwake = state !== 'asleep';

    // 1. Ribcage Breathing Motion
    if (bodyRef.current) {
      const breathFreq = isAwake ? 3.2 : 1.8;
      const breathAmp = isAwake ? 0.018 : 0.028;
      const breath = 1 + Math.sin(t * breathFreq) * breathAmp;
      bodyRef.current.scale.set(size, size * breath, size);
    }

    // 2. Interactive Wagging Plumed Tail
    const targetWag = isHovered ? 12.0 : isAwake ? 6.0 : 1.5;
    wagSpeed.current += (targetWag - wagSpeed.current) * Math.min(1, delta * 4.5);

    tailSegments.current.forEach((seg, i) => {
      if (!seg) return;
      const phase = t * wagSpeed.current + i * 0.4;
      seg.rotation.y = Math.sin(phase) * (0.15 + i * 0.05);
      seg.rotation.z = Math.cos(phase * 0.5) * 0.06;
    });

    // 3. Head Kinematics & Curious Head-Tilt Tracking
    if (headRef.current) {
      if (isAwake) {
        // Track mouse position with subtle Shih Tzu curious head tilt
        targetHeadTilt.current.yaw = THREE.MathUtils.clamp(pointer.x * 0.45, -0.45, 0.45);
        targetHeadTilt.current.pitch = THREE.MathUtils.clamp(-pointer.y * 0.3, -0.25, 0.25);
        // Signature curious head tilt roll!
        targetHeadTilt.current.roll = Math.sin(t * 1.4) * 0.12 + pointer.x * 0.08;
      } else {
        // Resting asleep on paws
        targetHeadTilt.current.yaw = 0.15;
        targetHeadTilt.current.pitch = 0.2;
        targetHeadTilt.current.roll = 0.05;
      }

      currentHeadTilt.current.yaw += (targetHeadTilt.current.yaw - currentHeadTilt.current.yaw) * delta * 5;
      currentHeadTilt.current.pitch += (targetHeadTilt.current.pitch - currentHeadTilt.current.pitch) * delta * 5;
      currentHeadTilt.current.roll += (targetHeadTilt.current.roll - currentHeadTilt.current.roll) * delta * 5;

      headRef.current.rotation.set(
        currentHeadTilt.current.pitch,
        currentHeadTilt.current.yaw,
        currentHeadTilt.current.roll
      );
    }

    // 4. Secondary Inertial Floppy Ear Physics
    if (leftEarRef.current && rightEarRef.current) {
      const earFlop = Math.sin(t * 2.5) * 0.05 + (isHovered ? Math.sin(t * 8) * 0.04 : 0);
      leftEarRef.current.rotation.z = 0.2 + earFlop;
      rightEarRef.current.rotation.z = -0.2 - earFlop;
    }

    // 5. Tongue panting visibility
    if (tongueRef.current) {
      const showTongue = state === 'happy' || (isAwake && isHovered);
      tongueRef.current.visible = showTongue;
      if (showTongue) {
        tongueRef.current.position.y = -0.1 + Math.sin(t * 12) * 0.015;
      }
    }

    // 6. Floating Zzz sprites when asleep
    if (zzzRef.current) {
      zzzRef.current.visible = !isAwake;
      if (!isAwake) {
        const zCycle = (t * 0.8) % 2.5;
        zzzRef.current.position.y = 0.65 + zCycle * 0.25;
        zzzRef.current.position.x = 0.2 + Math.sin(zCycle * 3) * 0.04;
      }
    }
  });

  return (
    <group
      ref={rootRef}
      name="shih-tzu-dog"
      position={position}
      rotation={[0, rotY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        deskStore.setHover('dog');
        document.body.style.cursor = 'pointer';
        if (state === 'asleep') {
          playDogAudio('snore');
        } else {
          playDogAudio('pant');
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        deskStore.setHover(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        handlePet();
      }}
    >
      <group ref={bodyRef}>
        {/* Curled / Resting Body (Cream White Base) */}
        <mesh
          material={materials.furWhite}
          position={[0, 0.32 * size, 0]}
          scale={[0.95 * size, 0.58 * size, 0.78 * size]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.65, 28, 22]} />
        </mesh>

        {/* Golden Honey Caramel Saddle Patch on Back */}
        <mesh
          material={materials.furGold}
          position={[-0.05 * size, 0.44 * size, -0.05 * size]}
          scale={[0.65 * size, 0.35 * size, 0.55 * size]}
          castShadow
        >
          <sphereGeometry args={[0.65, 24, 20]} />
        </mesh>

        {/* Fluffy White Chest Apron */}
        <mesh
          material={materials.furChest}
          position={[0.32 * size, 0.28 * size, 0.12 * size]}
          scale={[0.42 * size, 0.4 * size, 0.45 * size]}
        >
          <sphereGeometry args={[0.5, 20, 18]} />
        </mesh>

        {/* Front Resting Paws */}
        {[-0.14, 0.14].map((offsetZ, i) => (
          <mesh
            key={`paw-${i}`}
            material={materials.furWhite}
            position={[0.48 * size, 0.08 * size, (0.05 + offsetZ) * size]}
            scale={[0.18 * size, 0.1 * size, 0.14 * size]}
            castShadow
          >
            <sphereGeometry args={[0.6, 16, 14]} />
          </mesh>
        ))}

        {/* Red Collar & Gold Tag */}
        <group position={[0.42 * size, 0.36 * size, 0.18 * size]} rotation={[0, -0.3, 0.2]}>
          <mesh material={materials.collar}>
            <torusGeometry args={[0.26 * size, 0.035 * size, 12, 28]} />
          </mesh>
          <mesh material={materials.tag} position={[0.26 * size, -0.04 * size, 0]}>
            <sphereGeometry args={[0.045 * size, 14, 12]} />
          </mesh>
        </group>

        {/* Head Group (Broad round Shih Tzu skull with curious tilt) */}
        <group
          ref={headRef}
          position={[0.55 * size, 0.42 * size, 0.25 * size]}
          rotation={[0.1, -0.2, 0.05]}
        >
          {/* Main Skull (White base) */}
          <mesh material={materials.furWhite} castShadow>
            <sphereGeometry args={[0.38 * size, 28, 24]} />
          </mesh>

          {/* Golden Caramel Eye Mask Patches */}
          {[-1, 1].map((side) => (
            <mesh
              key={`mask-${side}`}
              material={materials.furGold}
              position={[0.18 * size, 0.08 * size, side * 0.16 * size]}
              scale={[0.18 * size, 0.22 * size, 0.18 * size]}
            >
              <sphereGeometry args={[0.8, 16, 16]} />
            </mesh>
          ))}

          {/* Signature Topknot / Forehead Fur Tuft */}
          <mesh
            material={materials.furWhite}
            position={[0.08 * size, 0.32 * size, 0]}
            scale={[0.22 * size, 0.18 * size, 0.24 * size]}
            castShadow
          >
            <sphereGeometry args={[0.8, 18, 16]} />
          </mesh>

          {/* Drooped Feathered Left Ear */}
          <group ref={leftEarRef} position={[0, 0.16 * size, 0.32 * size]}>
            <mesh
              material={materials.furGold}
              position={[0, -0.22 * size, 0]}
              scale={[0.14 * size, 0.36 * size, 0.16 * size]}
              castShadow
            >
              <sphereGeometry args={[0.8, 20, 18]} />
            </mesh>
            {/* White ear fringe tip */}
            <mesh
              material={materials.furWhite}
              position={[0, -0.42 * size, 0]}
              scale={[0.12 * size, 0.16 * size, 0.14 * size]}
            >
              <sphereGeometry args={[0.8, 16, 14]} />
            </mesh>
          </group>

          {/* Drooped Feathered Right Ear */}
          <group ref={rightEarRef} position={[0, 0.16 * size, -0.32 * size]}>
            <mesh
              material={materials.furGold}
              position={[0, -0.22 * size, 0]}
              scale={[0.14 * size, 0.36 * size, 0.16 * size]}
              castShadow
            >
              <sphereGeometry args={[0.8, 20, 18]} />
            </mesh>
            {/* White ear fringe tip */}
            <mesh
              material={materials.furWhite}
              position={[0, -0.42 * size, 0]}
              scale={[0.12 * size, 0.16 * size, 0.14 * size]}
            >
              <sphereGeometry args={[0.8, 16, 14]} />
            </mesh>
          </group>

          {/* Snub Muzzle & Fluffy Mustache (Chrysanthemum Face) */}
          <mesh
            material={materials.furChest}
            position={[0.28 * size, -0.06 * size, 0]}
            scale={[0.22 * size, 0.18 * size, 0.28 * size]}
            castShadow
          >
            <sphereGeometry args={[0.8, 22, 20]} />
          </mesh>

          {/* Glossy Black Button Nose */}
          <mesh
            material={materials.nose}
            position={[0.42 * size, 0.02 * size, 0]}
            scale={[0.07 * size, 0.055 * size, 0.08 * size]}
            castShadow
          >
            <sphereGeometry args={[0.8, 16, 16]} />
          </mesh>

          {/* Playful Pink Tongue */}
          <mesh
            ref={tongueRef}
            material={materials.tongue}
            position={[0.38 * size, -0.12 * size, 0]}
            scale={[0.07 * size, 0.04 * size, 0.08 * size]}
            rotation={[0.2, 0, 0]}
          >
            <sphereGeometry args={[0.8, 14, 12]} />
          </mesh>

          {/* Dark Puppy Eyes with Soulful Highlights */}
          {[-1, 1].map((side) => (
            <group key={`eye-${side}`} position={[0.29 * size, 0.09 * size, side * 0.17 * size]}>
              <mesh material={materials.eye}>
                <sphereGeometry args={[0.058 * size, 16, 16]} />
              </mesh>
              {/* White catchlight highlight */}
              <mesh material={materials.highlight} position={[0.035 * size, 0.022 * size, 0.01 * size]}>
                <sphereGeometry args={[0.016 * size, 10, 10]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Classic Curled Plumed Tail (Arcs gracefully over the rear hip) */}
        <group position={[-0.52 * size, 0.26 * size, -0.1 * size]}>
          {[0, 1, 2, 3, 4].map((i) => {
            const progress = i / 4;
            // Arcs upward and curls forward over the back
            const posX = Math.sin(progress * Math.PI * 0.8) * 0.16 * size;
            const posY = Math.sin(progress * Math.PI * 0.6) * 0.32 * size;
            const posZ = Math.cos(progress * Math.PI * 0.5) * 0.12 * size;
            const segScale = (0.16 - i * 0.015) * size;

            return (
              <group
                key={`tail-joint-${i}`}
                ref={(el) => {
                  if (el) tailSegments.current[i] = el;
                }}
                position={[posX, posY, posZ]}
              >
                <mesh
                  material={i < 3 ? materials.furGold : materials.furWhite}
                  scale={[segScale, segScale * 1.3, segScale]}
                  castShadow
                >
                  <sphereGeometry args={[0.8, 16, 14]} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* Floating Animated "Zzz" Sleep Sprite */}
      <group ref={zzzRef} position={[0.55 * size, 0.7 * size, 0.25 * size]}>
        <Html center style={{ pointerEvents: 'none' }}>
          <div className="select-none font-bold text-gray-400 opacity-75 text-sm tracking-widest animate-pulse">
            Zzz...
          </div>
        </Html>
      </group>

      {/* Interactive Hover Pill Tooltip */}
      <Html
        position={[0, 0.95 * size, 0]}
        center
        zIndexRange={[20, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`whitespace-nowrap rounded-full bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-[13px] font-medium text-white shadow-xl transition-all duration-200 border border-white/10 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          Shih Tzu Puppy{' '}
          <span className="text-white/60">
            · {state === 'asleep' ? 'give a gentle tap' : 'pat to play!'}
          </span>
        </div>
      </Html>
    </group>
  );
};
