import React from 'react';
import { useDeskStore } from '../../../store/deskStore';

export const DeskLighting: React.FC = () => {
  const evening = useDeskStore((s) => s.evening);
  const lampOn = useDeskStore((s) => s.lampOn);

  return (
    <>
      {/* Ambient Fill Light */}
      <ambientLight intensity={evening || lampOn ? 0.35 : 0.85} color={evening || lampOn ? '#FFD8B3' : '#FFFFFF'} />

      {/* Hemisphere Natural Sky/Ground Light */}
      <hemisphereLight
        args={[
          evening || lampOn ? '#FFE4CC' : '#F5F5F7',
          evening || lampOn ? '#3B291A' : '#E0E0E6',
          evening || lampOn ? 0.4 : 0.65,
        ]}
      />

      {/* Main Directional Sun Light */}
      <directionalLight
        position={[-8, 14, 10]}
        intensity={evening || lampOn ? 0.5 : 1.6}
        color={evening || lampOn ? '#FFAA66' : '#FFFFFF'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />

      {/* Soft Secondary Bounce Fill from opposite side */}
      <directionalLight
        position={[10, 8, -6]}
        intensity={evening || lampOn ? 0.2 : 0.4}
        color={evening || lampOn ? '#80593B' : '#E8EEF5'}
      />
    </>
  );
};
