import { create } from 'zustand';
import toast from 'react-hot-toast';
import { AudioPlayerState, ModalState } from '@/types/ui';
import { generateId } from '@/utils/client-safe';

interface UIStore {
  audioPlayer: AudioPlayerState;
  modal: ModalState;

  setAudioPlaying: (isPlaying: boolean) => void;
  setAudioTime: (currentTime: number) => void;
  setAudioDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (isMuted: boolean) => void;
  setFading: (isFading: boolean) => void;
  setAutoplayAttempted: (attempted: boolean) => void;
  setAutoplayBlocked: (blocked: boolean) => void;
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

const getStoredVolume = (): number => {
  if (typeof window === 'undefined') return 0.7;
  try {
    const stored = localStorage.getItem('wedding-music-volume');
    return stored ? parseFloat(stored) : 0.7;
  } catch {
    return 0.7;
  }
};

export const useUIStore = create<UIStore>((set, get) => ({
  audioPlayer: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: getStoredVolume(),
    isMuted: false,
    isFading: false,
    autoplayAttempted: false,
    autoplayBlocked: false
  },
  modal: {
    isOpen: false
  },

  setAudioPlaying: (isPlaying) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, isPlaying }
    }));
  },

  setAudioTime: (currentTime) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, currentTime }
    }));
  },

  setAudioDuration: (duration) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, duration }
    }));
  },

  setVolume: (volume) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wedding-music-volume', volume.toString());
      } catch (e) {
        console.warn('Failed to save volume to localStorage:', e);
      }
    }
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, volume }
    }));
  },

  setMuted: (isMuted) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, isMuted }
    }));
  },

  setFading: (isFading) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, isFading }
    }));
  },

  setAutoplayAttempted: (autoplayAttempted) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, autoplayAttempted }
    }));
  },

  setAutoplayBlocked: (autoplayBlocked) => {
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, autoplayBlocked }
    }));
  },

  openModal: (content, title) => {
    set({
      modal: {
        isOpen: true,
        content,
        title
      }
    });
  },

  closeModal: () => {
    set({
      modal: {
        isOpen: false,
        content: undefined,
        title: undefined
      }
    });
  }
}));