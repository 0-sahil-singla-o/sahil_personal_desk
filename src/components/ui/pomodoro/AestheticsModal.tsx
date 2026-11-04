import React from 'react';
import { X, Palette, Sparkles, Check } from 'lucide-react';
import { ThemePreset, ParticleEffect, PomodoroAesthetics } from './types';
import { soundSynth } from './audioSynthesizer';

interface AestheticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aesthetics: PomodoroAesthetics;
  onChange: (updates: Partial<PomodoroAesthetics>) => void;
}

const THEMES: { id: ThemePreset; name: string; desc: string; preview: string }[] = [
  {
    id: 'fantasy',
    name: 'Fantasy',
    desc: 'Deep mystical nebula violet',
    preview: 'bg-gradient-to-br from-[#1a0b2e] via-[#0f071d] to-[#07030e]',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    desc: 'Neon high-tech night slate',
    preview: 'bg-gradient-to-br from-[#0c182b] via-[#070e1b] to-[#03060a]',
  },
  {
    id: 'lofi',
    name: 'Lofi Cafe',
    desc: 'Warm cozy midnight roasted wood',
    preview: 'bg-gradient-to-br from-[#261712] via-[#170e0a] to-[#0b0604]',
  },
  {
    id: 'pastel',
    name: 'Pastel Dreams',
    desc: 'Soft ethereal twilight mauve',
    preview: 'bg-gradient-to-br from-[#261023] via-[#160914] to-[#0b040a]',
  },
];

const ACCENT_COLORS = [
  { name: 'Violet', value: '#a855f7' },
  { name: 'Electric Blue', value: '#3b82f6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Coral', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
];

const PARTICLES: { id: ParticleEffect; name: string }[] = [
  { id: 'none', name: 'None' },
  { id: 'motes', name: 'Motes' },
  { id: 'stars', name: 'Stars' },
  { id: 'rain', name: 'Rain' },
  { id: 'bubbles', name: 'Bubbles' },
];

export const AestheticsModal: React.FC<AestheticsModalProps> = ({
  isOpen,
  onClose,
  aesthetics,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">Aesthetics & Themes</h3>
          </div>
          <button
            onClick={() => {
              soundSynth.playClick(0.3);
              onClose();
            }}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Theme Preset
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {THEMES.map((t) => {
              const active = aesthetics.theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundSynth.playClick(0.3);
                    onChange({ theme: t.id });
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    t.preview
                  } ${
                    active
                      ? 'border-purple-400 ring-2 ring-purple-400/30 scale-[1.02]'
                      : 'border-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{t.name}</span>
                    {active && <Check className="w-4 h-4 text-purple-400 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color Swatches */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Accent Color
          </label>
          <div className="flex items-center gap-3">
            {ACCENT_COLORS.map((c) => {
              const active = aesthetics.accentColor.toLowerCase() === c.value.toLowerCase();
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    soundSynth.playClick(0.3);
                    onChange({ accentColor: c.value });
                  }}
                  title={c.name}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    active ? 'scale-110 ring-4 ring-white/30 shadow-lg' : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                >
                  {active && <Check className="w-4 h-4 text-white stroke-[3] drop-shadow" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambient Particles */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Ambient Background FX
          </label>
          <div className="grid grid-cols-5 gap-2">
            {PARTICLES.map((p) => {
              const active = aesthetics.particleEffect === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundSynth.playClick(0.3);
                    onChange({ particleEffect: p.id });
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-medium text-center border transition-all ${
                    active
                      ? 'bg-white/20 border-purple-400 text-white font-bold shadow-sm'
                      : 'bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              soundSynth.playClick(0.3);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-98"
            style={{ backgroundColor: aesthetics.accentColor }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
