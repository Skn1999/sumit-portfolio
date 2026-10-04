import { create } from 'zustand';
import type { LevelId } from './timeline';

export type Mode = 'A' | 'toB' | 'B' | 'toA';

export interface AssetsReady {
  line: boolean;
  photo: boolean;
  plates: boolean;
}

export interface SpiralStoreState {
  mode: Mode;
  activeLevel: LevelId;
  hoverLevel: string | null;
  progress: number;
  isJumping: boolean;
  reducedMotion: boolean;
  assetsReady: AssetsReady;

  setMode: (mode: Mode) => void;
  setActiveLevel: (level: LevelId) => void;
  setHoverLevel: (level: string | null) => void;
  setProgress: (progress: number) => void;
  setIsJumping: (isJumping: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setAssetsReady: (assets: Partial<AssetsReady>) => void;
  reset: () => void;
}

const initialState = {
  mode: 'A' as Mode,
  activeLevel: 'L1' as LevelId,
  hoverLevel: null as string | null,
  progress: 0,
  isJumping: false,
  reducedMotion: false,
  assetsReady: {
    line: false,
    photo: false,
    plates: false,
  },
};

export const useSpiralStore = create<SpiralStoreState>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setActiveLevel: (activeLevel) => set({ activeLevel }),
  setHoverLevel: (hoverLevel) => set({ hoverLevel }),
  setProgress: (progress) => set({ progress }),
  setIsJumping: (isJumping) => set({ isJumping }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setAssetsReady: (assets) =>
    set((state) => ({
      assetsReady: {
        ...state.assetsReady,
        ...assets,
      },
    })),
  reset: () => set(initialState),
}));

export const useStore = useSpiralStore;
