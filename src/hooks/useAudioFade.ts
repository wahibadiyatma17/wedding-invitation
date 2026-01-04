import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioFadeReturn {
  fadeIn: (audioElement: HTMLAudioElement, targetVolume: number, duration: number) => Promise<void>;
  fadeOut: (audioElement: HTMLAudioElement, duration: number) => Promise<void>;
  isFading: boolean;
}

export function useAudioFade(): UseAudioFadeReturn {
  const [isFading, setIsFading] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      cancelAnimationFrame(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(async (
    audioElement: HTMLAudioElement,
    targetVolume: number,
    duration: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      clearFade();
      setIsFading(true);

      const startVolume = 0;
      const startTime = Date.now();

      audioElement.volume = startVolume;
      if (audioElement.paused) {
        audioElement.play().catch(console.error);
      }

      const fade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        audioElement.volume = startVolume + (targetVolume - startVolume) * progress;

        if (progress < 1) {
          fadeIntervalRef.current = requestAnimationFrame(fade);
        } else {
          setIsFading(false);
          resolve();
        }
      };

      fadeIntervalRef.current = requestAnimationFrame(fade);
    });
  }, [clearFade]);

  const fadeOut = useCallback(async (
    audioElement: HTMLAudioElement,
    duration: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      clearFade();
      setIsFading(true);

      const startVolume = audioElement.volume;
      const startTime = Date.now();

      const fade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        audioElement.volume = startVolume * (1 - progress);

        if (progress < 1) {
          fadeIntervalRef.current = requestAnimationFrame(fade);
        } else {
          audioElement.pause();
          setIsFading(false);
          resolve();
        }
      };

      fadeIntervalRef.current = requestAnimationFrame(fade);
    });
  }, [clearFade]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearFade();
  }, [clearFade]);

  return { fadeIn, fadeOut, isFading };
}
