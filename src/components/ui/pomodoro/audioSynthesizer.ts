import { AlarmSound } from './types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playClick(volume: number = 0.4): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not permitted yet
    }
  }

  public playAlarm(sound: AlarmSound, volume: number = 0.8): void {
    if (sound === 'none' || volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (sound === 'digital') {
      this.playDigitalArpeggio(ctx, masterGain);
    } else if (sound === 'chime') {
      this.playZenChime(ctx, masterGain);
    } else if (sound === 'bell') {
      this.playTibetanBell(ctx, masterGain);
    }
  }

  private playDigitalArpeggio(ctx: AudioContext, destination: AudioNode): void {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const start = ctx.currentTime + index * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.35, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(start);
      osc.stop(start + 0.4);
    });
  }

  private playZenChime(ctx: AudioContext, destination: AudioNode): void {
    const freqs = [880, 1760, 2640]; // A5 with harmonics
    const weights = [0.5, 0.25, 0.1];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(weights[idx], ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    });
  }

  private playTibetanBell(ctx: AudioContext, destination: AudioNode): void {
    // 528 Hz DNA / Solfeggio frequency + subharmonics
    const baseFreq = 528;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    // Slight detune for hypnotic beating
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 1.503, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 3.1);
    osc2.stop(ctx.currentTime + 3.1);
  }
}

export const soundSynth = new SoundSynthesizer();
