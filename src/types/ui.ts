export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

export interface ScrollRevealConfig {
  threshold: number;
  rootMargin: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
  title?: string;
}