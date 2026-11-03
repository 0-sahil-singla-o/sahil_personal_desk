import React from 'react';
import { X, Layers } from 'lucide-react';
import { XRAY_PARTS } from '../3d/xray/xrayPartsData';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const XRayOverlay: React.FC = () => {
  const xray = useDeskStore((s) => s.xray);
  const selectedPartId = useDeskStore((s) => s.xrayPick) || 'laptop';

  if (!xray) return null;

  const currentPart =
    XRAY_PARTS.find((p) => p.id === selectedPartId) || XRAY_PARTS[0];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 z-50 bg-white/95 backdrop-blur-xl border-l border-neutral-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <Layers className="w-5 h-5 text-neutral-600" />
          <span>3D Architecture X-Ray</span>
        </div>
        <button
          onClick={() => deskStore.toggleXRay()}
          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Part Details Card */}
      <div className="p-6 bg-neutral-50/70 border-b border-neutral-100">
        <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
          Selected Component
        </span>
        <h2 className="text-2xl font-bold text-neutral-900 mt-1">
          {currentPart.name}
        </h2>
        <p className="mt-3 text-neutral-600 text-sm leading-relaxed">
          {currentPart.how}
        </p>
      </div>

      {/* Parts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          All Desk Components ({XRAY_PARTS.length})
        </div>
        {XRAY_PARTS.map((part) => {
          const isSelected = part.id === currentPart.id;
          return (
            <button
              key={part.id}
              onClick={() => deskStore.setXRayPick(part.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-sm font-medium'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <span className="text-sm">{part.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md ${
                  isSelected
                    ? 'bg-neutral-800 text-neutral-300'
                    : 'bg-neutral-200/60 text-neutral-500'
                }`}
              >
                Procedural
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
