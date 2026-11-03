import React, { useState } from 'react';
import { X, Disc, Music, Play, Pause } from 'lucide-react';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const SongRequestModal: React.FC = () => {
  const isRequestOpen = useDeskStore((s) => s.songRequest);
  const music = useDeskStore((s) => s.music);
  const [songName, setSongName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isRequestOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSongName('');
      deskStore.setSongRequest(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-neutral-900 text-white rounded-3xl shadow-2xl p-8 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-rose-500 animate-spin" />
            <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
              Desk Vinyl Player
            </span>
          </div>
          <button
            onClick={() => deskStore.setSongRequest(false)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currently Playing Card */}
        <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-700 flex items-center justify-center text-rose-400">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{music?.title}</h4>
              <p className="text-xs text-neutral-400">{music?.artist}</p>
            </div>
          </div>

          <button
            onClick={() => deskStore.toggleMusic()}
            className="p-2.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white transition-colors shadow-md"
          >
            {music?.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>

        {/* Song Request Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="text-xs font-medium text-neutral-300 block">
            Queue a song for the next desk visitor:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Tycho - A Walk"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-100 transition-colors"
            >
              {submitted ? 'Queued!' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
