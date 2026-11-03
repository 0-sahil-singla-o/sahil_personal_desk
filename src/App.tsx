import React, { useEffect } from 'react';
import { DeskCanvas } from './components/3d/core/DeskCanvas';
import { HeroHeader } from './components/ui/HeroHeader';
import { Navigation } from './components/ui/Navigation';
import { XRayOverlay } from './components/ui/XRayOverlay';
import { ScreenOverlay } from './components/ui/ScreenOverlay';
import { DiaryModal } from './components/ui/DiaryModal';
import { CardModal } from './components/ui/CardModal';
import { SongRequestModal } from './components/ui/SongRequestModal';
import { deskStore, useDeskStore } from './store/deskStore';
import { isSydneyEvening } from './lib/sydneySun';

export const App: React.FC = () => {
  const evening = useDeskStore((s) => s.evening || s.lampOn);
  const hover = useDeskStore((s) => s.hover);
  const focus = useDeskStore((s) => s.focus);
  const xray = useDeskStore((s) => s.xray);

  // Check Sydney local sunset on initial mount
  useEffect(() => {
    const isEve = isSydneyEvening();
    deskStore.setEvening(isEve);
  }, []);

  return (
    <div
      className={`relative w-full h-[100svh] min-h-[540px] overflow-hidden select-none transition-colors duration-1000 ${
        evening
          ? 'bg-[radial-gradient(75%_65%_at_66%_50%,#6B5442_0%,#47392F_36%,#2E2620_70%,#221C18_100%)]'
          : 'bg-[radial-gradient(120%_90%_at_50%_45%,#FFFFFF_0%,#F4F4F6_55%,#E8E8EC_100%)]'
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <DeskCanvas />

      {/* Hero Headline & Intro */}
      <HeroHeader />

      {/* Top Floating Controls */}
      <Navigation />

      {/* Interactive Overlays */}
      <XRayOverlay />
      <ScreenOverlay />
      <DiaryModal />
      <CardModal />
      <SongRequestModal />

      {/* Bottom Hint Pill */}
      {!focus && !xray && (
        <div className="pointer-events-none fixed bottom-6 inset-x-0 flex justify-center z-20">
          <div className="px-4 py-2 rounded-full bg-white/75 backdrop-blur-md border border-black/5 shadow-sm text-xs font-medium text-neutral-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            {hover ? (
              <span>
                Click to inspect <strong className="text-neutral-900 capitalize">{hover}</strong>
              </span>
            ) : (
              <span>Click on any object on the desk to interact</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
