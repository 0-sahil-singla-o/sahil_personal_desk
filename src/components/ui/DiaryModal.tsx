import React from 'react';
import { X, BookOpen, PenTool } from 'lucide-react';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const DiaryModal: React.FC = () => {
  const isDiaryOpen = useDeskStore((s) => s.diary);

  if (!isDiaryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden border border-[#E8E2D2] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D2] flex items-center justify-between bg-[#F7F2E7]/80">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold">
            <BookOpen className="w-5 h-5 text-amber-800" />
            <span>Developer's Open Notebook</span>
          </div>
          <button
            onClick={() => deskStore.close()}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lined Pages Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-6 text-neutral-800 font-hand text-2xl leading-relaxed">
          <div className="border-b border-blue-100 pb-4">
            <span className="text-sm font-sans uppercase font-bold text-neutral-400">
              Nov 2026 · Sydney, NSW
            </span>
            <p className="mt-2 text-neutral-900">
              Building things that feel alive in the browser. 3D shouldn't just be a static model someone dropped in — it should respond to touch, light, real-world time, and behave like physical objects on a real desk.
            </p>
          </div>

          <div className="border-b border-blue-100 pb-4">
            <span className="text-sm font-sans uppercase font-bold text-neutral-400">
              Design Philosophy
            </span>
            <p className="mt-2 text-neutral-900">
              • No heavy 50MB 3D model downloads: everything is constructed procedurally using math and custom 2D canvas shaders.
              <br />
              • Real astronomical sunset calculation for Sydney so evening feels authentic.
              <br />
              • The cat sleeps at 12fps to preserve mobile battery life!
            </p>
          </div>

          <div className="pt-2 text-sm font-sans text-neutral-400 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-700" />
            <span>Written with care by Sahil Singla</span>
          </div>
        </div>
      </div>
    </div>
  );
};
