import React from 'react';
import { X, Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { deskStore, useDeskStore } from '../../store/deskStore';

export const CardModal: React.FC = () => {
  const isCardOpen = useDeskStore((s) => s.card);
  const [copied, setCopied] = React.useState(false);

  if (!isCardOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sahilsingla.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-neutral-900 text-white rounded-3xl shadow-2xl p-8 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
            Titanium Business Card
          </span>
          <button
            onClick={() => deskStore.putDown()}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Mockup */}
        <div className="aspect-[1.75/1] rounded-2xl bg-gradient-to-tr from-neutral-800 via-neutral-700 to-neutral-800 p-8 flex flex-col justify-between shadow-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Sahil Singla
            </h2>
            <p className="text-sm text-neutral-400 mt-0.5">
              Full Stack · 3D Web Architect
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Sydney, Australia</span>
            <span className="font-mono">sahilsingla.dev</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors text-neutral-200"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors text-neutral-200"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
