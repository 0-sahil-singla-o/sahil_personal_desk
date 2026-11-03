import { useSyncExternalStore } from 'react';

export interface DeskState {
  focus: 'laptop' | 'tablet' | 'phone' | 'diary' | 'card' | 'printer' | null;
  hover: string | null;
  arrived: boolean;
  ready: boolean;
  printJob: {
    id: string;
    items: { name: string; qty: number; price: number }[];
    total: number;
    storeName: string;
    timestamp: number;
  } | null;
  printing: boolean;
  paperOut: boolean;
  holding: boolean;
  folded: boolean;
  laptopProject: string | null;
  laptopAsk: number;
  evening: boolean;
  lampOn: boolean;
  diary: boolean;
  card: boolean;
  note: number | null;
  xray: boolean;
  xrayPick: string | null;
  speaker: 'idle' | 'listening' | 'speaking';
  caption: string | null;
  music: { title: string; artist: string; playing: boolean } | null;
  songRequest: boolean;
  plantWateredCount: number;
  mugSips: number;
}

const initialState: DeskState = {
  focus: null,
  hover: null,
  arrived: false,
  ready: true,
  printJob: null,
  printing: false,
  paperOut: false,
  holding: false,
  folded: false,
  laptopProject: null,
  laptopAsk: 0,
  evening: false,
  lampOn: false,
  diary: false,
  card: false,
  note: null,
  xray: false,
  xrayPick: null,
  speaker: 'idle',
  caption: null,
  music: { title: "Sydney Sunset Lo-Fi", artist: "Sahil Singla", playing: false },
  songRequest: false,
  plantWateredCount: 14,
  mugSips: 0,
};

let currentState: DeskState = { ...initialState };
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const deskStore = {
  get: () => currentState,

  set(partial: Partial<DeskState>) {
    currentState = { ...currentState, ...partial };
    notify();
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  open(focus: DeskState['focus'], project: string | null = null) {
    if (currentState.focus === focus) {
      deskStore.set({
        laptopProject: project,
        laptopAsk: Date.now(),
        card: false,
        note: null,
      });
      return;
    }
    deskStore.set({
      focus,
      arrived: false,
      hover: null,
      laptopProject: project,
      laptopAsk: Date.now(),
      card: false,
      note: null,
      xray: false,
    });
  },

  close() {
    deskStore.set({
      focus: null,
      arrived: false,
      printing: false,
      holding: false,
      diary: false,
      card: false,
      note: null,
      xray: false,
      xrayPick: null,
      songRequest: false,
    });
  },

  setHover(part: string | null) {
    if (currentState.hover !== part) {
      deskStore.set({ hover: part });
    }
  },

  toggleXRay() {
    const next = !currentState.xray;
    deskStore.set({
      xray: next,
      xrayPick: next ? (currentState.xrayPick || 'laptop') : null,
      hover: null,
      card: false,
      note: null,
    });
  },

  setXRayPick(partId: string | null) {
    deskStore.set({ xrayPick: partId });
  },

  toggleLamp() {
    deskStore.set({ lampOn: !currentState.lampOn });
  },

  setEvening(isEvening: boolean) {
    deskStore.set({ evening: isEvening, lampOn: isEvening });
  },

  waterPlant() {
    deskStore.set({ plantWateredCount: currentState.plantWateredCount + 1 });
  },

  sipCoffee() {
    deskStore.set({ mugSips: (currentState.mugSips + 1) % 5 });
  },

  triggerPrint(job?: DeskState['printJob']) {
    const sampleJob = job || {
      id: "INV-" + Math.floor(1000 + Math.random() * 9000),
      items: [
        { name: "3D Procedural Desk", qty: 1, price: 120 },
        { name: "WebGL Engine Architecture", qty: 1, price: 340 },
        { name: "Full Stack Automation", qty: 1, price: 250 },
      ],
      total: 710,
      storeName: "Sahil's Lab docket",
      timestamp: Date.now(),
    };
    deskStore.set({
      printJob: sampleJob,
      printing: true,
      paperOut: true,
    });
    setTimeout(() => {
      deskStore.set({ printing: false });
    }, 2800);
  },

  takeCard() {
    if (currentState.focus === null && !currentState.diary) {
      deskStore.set({ card: true, note: null, hover: null });
    }
  },

  putDown() {
    if (currentState.card || currentState.note !== null) {
      deskStore.set({ card: false, note: null });
    }
  },

  toggleMusic() {
    if (!currentState.music) return;
    deskStore.set({
      music: {
        ...currentState.music,
        playing: !currentState.music.playing,
      },
    });
  },

  setSongRequest(open: boolean) {
    deskStore.set({ songRequest: open });
  },
};

export function useDeskStore<T>(selector: (state: DeskState) => T): T {
  return useSyncExternalStore(
    deskStore.subscribe,
    () => selector(deskStore.get()),
    () => selector(initialState)
  );
}
