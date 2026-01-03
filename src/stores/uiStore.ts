import { create } from 'zustand';
import { AudioPlayerState, ToastMessage, ModalState } from '@/types/ui';
import { generateId } from '@/utils/client-safe';

interface UIStore {
  audioPlayer: AudioPlayerState;
  toasts: ToastMessage[];
  modal: ModalState;
  
  setAudioPlaying: (isPlaying: boolean) => void;
  setAudioTime: (currentTime: number) => void;
  setAudioDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  audioPlayer: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5
  },
  toasts: [],
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
    set((state) => ({
      audioPlayer: { ...state.audioPlayer, volume }
    }));
  },

  addToast: (toast) => {
    const id = generateId('toast');
    const newToast: ToastMessage = { ...toast, id };
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));

    // Auto remove toast after duration
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration || 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
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