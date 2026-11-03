import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CAMERA_PRESETS } from './DeskLayout';
import { deskStore, useDeskStore } from '../../../store/deskStore';

export const DeskCamera: React.FC = () => {
  const { camera, size } = useThree();
  const focus = useDeskStore((s) => s.focus);
  const card = useDeskStore((s) => s.card);
  const diary = useDeskStore((s) => s.diary);

  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3(0.2, 1.25, 0.3));

  const mouse = useRef({ x: 0, y: 0 });

  // Mouse move parallax listener
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    // Determine active camera target preset based on store state
    const isPortrait = size.width < 768;

    let preset = isPortrait ? CAMERA_PRESETS.tall : CAMERA_PRESETS.wide;
    if (focus === 'laptop') preset = CAMERA_PRESETS.laptop;
    else if (focus === 'tablet') preset = CAMERA_PRESETS.tablet;
    else if (focus === 'phone') preset = CAMERA_PRESETS.phone;
    else if (focus === 'printer') preset = CAMERA_PRESETS.printer;
    else if (diary) preset = CAMERA_PRESETS.diary;
    else if (card) preset = CAMERA_PRESETS.card;

    // Add subtle parallax offset when not zoomed in
    const parallaxFactor = focus ? 0.05 : 0.45;
    const px = mouse.current.x * parallaxFactor;
    const py = mouse.current.y * parallaxFactor * 0.5;

    targetPos.current.set(
      preset.pos.x + px,
      preset.pos.y + py,
      preset.pos.z
    );
    targetLook.current.copy(preset.look);

    // Smooth lerp (damping)
    const lerpSpeed = 4.5 * delta;
    camera.position.lerp(targetPos.current, lerpSpeed);
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    camera.lookAt(currentLook.current);

    // Check if arrived close enough
    if (camera.position.distanceTo(targetPos.current) < 0.1) {
      if (!deskStore.get().arrived && focus) {
        deskStore.set({ arrived: true });
      }
    }
  });

  return null;
};
