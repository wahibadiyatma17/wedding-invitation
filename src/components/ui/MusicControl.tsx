'use client';

import { useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAudioFade } from '@/hooks/useAudioFade';

interface MusicControlProps {
  src: string;
}

export function MusicControl({ src }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { fadeIn, fadeOut, isFading } = useAudioFade();
  const {
    audioPlayer,
    setAudioPlaying,
    setAudioTime,
    setAudioDuration,
    setFading,
    setAutoplayAttempted,
    setAutoplayBlocked,
    addToast
  } = useUIStore();

  // Auto-play on opening animation complete
  useEffect(() => {
    const handleOpeningComplete = async () => {
      if (!audioRef.current || audioPlayer.autoplayAttempted) return;

      setAutoplayAttempted(true);

      try {
        audioRef.current.volume = 0;
        await audioRef.current.play();
        setAudioPlaying(true);
        await fadeIn(audioRef.current, audioPlayer.volume, 1500);
      } catch (error) {
        console.warn('Auto-play blocked:', error);
        setAutoplayBlocked(true);
        addToast({
          type: 'info',
          message: 'Tap the music icon to enable sound',
          duration: 4000
        });
      }
    };

    window.addEventListener('openingAnimationComplete', handleOpeningComplete);
    return () => window.removeEventListener('openingAnimationComplete', handleOpeningComplete);
  }, [audioPlayer.autoplayAttempted, audioPlayer.volume, fadeIn, setAudioPlaying, setAutoplayAttempted, setAutoplayBlocked, addToast]);

  // Page Visibility API - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!audioRef.current || audioPlayer.isMuted) return;

      if (document.hidden) {
        // Pause immediately when user leaves the tab
        if (audioPlayer.isPlaying && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      } else {
        // Resume with fade-in when user returns to the tab
        if (audioPlayer.isPlaying && audioRef.current.paused) {
          audioRef.current.volume = 0;
          await audioRef.current.play();
          await fadeIn(audioRef.current, audioPlayer.volume, 1000);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [audioPlayer.isPlaying, audioPlayer.isMuted, audioPlayer.volume, fadeIn]);

  // Sync playing state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setAudioTime(audio.currentTime);
    };

    const handleEnded = () => {
      // Loop is set on audio element, but handle as fallback
      audio.currentTime = 0;
      audio.play().catch(console.error);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setAudioDuration, setAudioTime]);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current && !isFading) {
      audioRef.current.volume = audioPlayer.volume;
    }
  }, [audioPlayer.volume, isFading]);

  // Sync fading state to store
  useEffect(() => {
    setFading(isFading);
  }, [isFading, setFading]);

  // Manual toggle handler
  const handleToggle = async () => {
    if (!audioRef.current || isFading) return;

    if (audioPlayer.isPlaying) {
      await fadeOut(audioRef.current, 1500);
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      try {
        audioRef.current.volume = 0;
        await audioRef.current.play();
        await fadeIn(audioRef.current, audioPlayer.volume, 1500);
      } catch (error) {
        console.error('Failed to play audio:', error);
        setAudioPlaying(false);
        addToast({
          type: 'error',
          message: 'Could not play music',
          duration: 3000
        });
      }
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={isFading}
        className={`
          fixed bottom-4 right-4 z-40
          w-12 h-12 rounded-full shadow-lg
          bg-wedding-primary/90 backdrop-blur-sm
          text-wedding-cream
          hover:bg-wedding-primary hover:scale-110
          active:scale-95
          transition-all duration-300
          flex items-center justify-center
          ${audioPlayer.isPlaying ? 'animate-pulse' : ''}
          ${isFading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={audioPlayer.isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={audioPlayer.isPlaying}
      >
        <Music
          className={`w-6 h-6 ${audioPlayer.isPlaying ? '' : 'opacity-60'}`}
          strokeWidth={2}
        />
      </button>

      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
      />
    </>
  );
}
