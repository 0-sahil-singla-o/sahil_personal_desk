import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { DeskScene } from './DeskScene';
import { deskStore } from '../../../store/deskStore';

export const DeskCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 30, near: 0.3, far: 120, position: [-4.5, 10.5, 17.5] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        onPointerMissed={() => {
          deskStore.putDown();
          if (deskStore.get().focus) {
            deskStore.close();
          }
        }}
      >
        <Suspense fallback={null}>
          <DeskScene />
        </Suspense>
      </Canvas>
    </div>
  );
};
