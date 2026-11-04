import React from 'react';
import { X, Settings, Volume2, Clock, Zap, RotateCcw } from 'lucide-react';
import { PomodoroSettings, AlarmSound } from './types';
import { soundSynth } from './audioSynthesizer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PomodoroSettings;
  onSave: (updates: Partial<PomodoroSettings>) => void;
  onResetDefaults: () => void;
  accentColor: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onResetDefaults,
  accentColor,
}) => {
  if (!isOpen) return null;

  const handleTestAlarm = () => {
    soundSynth.playAlarm(settings.alarmSound, settings.alarmVolume);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">Timer Settings</h3>
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

        {/* Section 1: Timer Durations */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            Interval Durations (Minutes)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-[11px] font-medium text-neutral-400">Focus</span>
              <input
                type="number"
                min="1"
                max="90"
                value={settings.focusDuration}
                onChange={(e) => onSave({ focusDuration: Math.max(1, Math.min(90, Number(e.target.value) || 25)) })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-center font-bold text-white text-base focus:outline-none focus:border-purple-400/50"
              />
            </div>

            <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-[11px] font-medium text-neutral-400">Short Break</span>
              <input
                type="number"
                min="1"
                max="45"
                value={settings.shortBreakDuration}
                onChange={(e) => onSave({ shortBreakDuration: Math.max(1, Math.min(45, Number(e.target.value) || 5)) })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-center font-bold text-white text-base focus:outline-none focus:border-purple-400/50"
              />
            </div>

            <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-[11px] font-medium text-neutral-400">Long Break</span>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.longBreakDuration}
                onChange={(e) => onSave({ longBreakDuration: Math.max(1, Math.min(60, Number(e.target.value) || 15)) })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-center font-bold text-white text-base focus:outline-none focus:border-purple-400/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/5 text-xs text-neutral-300">
            <span>Long break interval (rounds)</span>
            <select
              value={settings.longBreakInterval}
              onChange={(e) => onSave({ longBreakInterval: Number(e.target.value) })}
              className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white focus:outline-none text-xs"
            >
              {[2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num} className="bg-slate-900 text-white">
                  Every {num} focus rounds
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Automation */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Automation
          </label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <p className="text-xs font-medium text-white">Auto-start Breaks</p>
                <p className="text-[11px] text-neutral-400">Automatically begins break countdown after focus ends</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundSynth.playClick(0.2);
                  onSave({ autoStartBreaks: !settings.autoStartBreaks });
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.autoStartBreaks ? 'bg-purple-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.autoStartBreaks ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <p className="text-xs font-medium text-white">Auto-start Focus</p>
                <p className="text-[11px] text-neutral-400">Automatically begins next focus session after break ends</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundSynth.playClick(0.2);
                  onSave({ autoStartFocus: !settings.autoStartFocus });
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.autoStartFocus ? 'bg-purple-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.autoStartFocus ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Alarm Sound & Volume */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-blue-400" />
            Completion Alarm
          </label>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-300">Alarm Style</span>
              <div className="flex items-center gap-2">
                <select
                  value={settings.alarmSound}
                  onChange={(e) => onSave({ alarmSound: e.target.value as AlarmSound })}
                  className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white focus:outline-none text-xs"
                >
                  <option value="digital" className="bg-slate-900 text-white">Digital Synth</option>
                  <option value="chime" className="bg-slate-900 text-white">Zen Chime</option>
                  <option value="bell" className="bg-slate-900 text-white">Tibetan Bell</option>
                  <option value="none" className="bg-slate-900 text-white">None (Silent)</option>
                </select>
                <button
                  type="button"
                  onClick={handleTestAlarm}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Test
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 w-16">Volume: {Math.round(settings.alarmVolume * 100)}%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.alarmVolume}
                onChange={(e) => onSave({ alarmVolume: parseFloat(e.target.value) })}
                className="flex-1 accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundSynth.playClick(0.2);
              onResetDefaults();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundSynth.playClick(0.3);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-98"
            style={{ backgroundColor: accentColor }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
