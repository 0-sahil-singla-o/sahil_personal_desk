import React from 'react';
import { useDeskStore } from '../../store/deskStore';

export const HeroHeader: React.FC = () => {
  const evening = useDeskStore((s) => s.evening || s.lampOn);
  const focus = useDeskStore((s) => s.focus);
  const diary = useDeskStore((s) => s.diary);
  const xray = useDeskStore((s) => s.xray);

  // Hide or fade when zoomed into a device
  const isZoomed = focus !== null || diary || xray;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 pt-[calc(2.5rem+env(safe-area-inset-top))] sm:pt-14 text-center transition-opacity duration-500 z-10 ${
        isZoomed ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1
          className={`text-[clamp(36px,4.4vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] transition-colors duration-700 ${
            evening ? 'text-[#F3E9DA]' : 'text-[#111111]'
          }`}
        >
          Hi, I'm Sahil.
        </h1>
        <p
          className={`mt-3 max-w-[34rem] mx-auto text-[clamp(15px,1.4vw,18px)] leading-relaxed transition-colors duration-700 ${
            evening ? 'text-[#CDBBA5]' : 'text-[#666666]'
          }`}
        >
          I build the software businesses run on. Everything on this desk is real and interactive.
        </p>
      </div>
    </div>
  );
};
