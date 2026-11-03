import React from 'react';
import { Volume2, VolumeX, Eye, Sun, Moon, Droplets } from 'lucide-react';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const Navigation: React.FC = () => {
  const lampOn = useDeskStore((s) => s.lampOn);
  const xray = useDeskStore((s) => s.xray);
  const isPlaying = useDeskStore((s) => s.music?.playing ?? false);
  const plantCount = useDeskStore((s) => s.plantWateredCount);

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
      {/* Open to Work Status */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/5 shadow-sm text-xs font-medium text-neutral-800">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Open to work
      </div>

      {/* Water Plant Action */}
      <button
        onClick={() => deskStore.waterPlant()}
        title="Water the desk plant"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-black/5 shadow-sm text-xs font-medium text-neutral-700 transition-all hover:scale-105 active:scale-95"
      >
        <Droplets className="w-3.5 h-3.5 text-blue-500" />
        <span>{plantCount}</span>
      </button>

      {/* Desk Lamp Switch */}
      <button
        onClick={() => deskStore.toggleLamp()}
        title={lampOn ? 'Turn lamp off' : 'Turn lamp on'}
        className={`p-2 rounded-full backdrop-blur-md border border-black/5 shadow-sm transition-all hover:scale-105 active:scale-95 ${
          lampOn
            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            : 'bg-white/80 text-neutral-700 hover:bg-white'
        }`}
      >
        {lampOn ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* X-Ray Mode Toggle */}
      <button
        onClick={() => deskStore.toggleXRay()}
        title="Toggle 3D X-Ray inspection mode"
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-sm text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
          xray
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-white/80 hover:bg-white text-neutral-700 border-black/5'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
        <span>X-Ray</span>
      </button>

      {/* Audio / Music Toggle */}
      <button
        onClick={() => deskStore.toggleMusic()}
        title={isPlaying ? 'Pause music' : 'Play Sydney lo-fi music'}
        className="p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 backdrop-blur-md border border-black/5 shadow-sm transition-all hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-blue-500" />
        ) : (
          <VolumeX className="w-4 h-4 text-neutral-400" />
        )}
      </button>
    </div>
  );
};
