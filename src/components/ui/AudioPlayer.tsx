import { useEffect, useRef } from 'react';
import { useUIStore } from '@/stores/uiStore';

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioPlayer, setAudioPlaying, setAudioTime, setAudioDuration } = useUIStore();

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
      setAudioPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setAudioDuration, setAudioTime, setAudioPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioPlayer.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioPlayer.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = audioPlayer.volume;
  }, [audioPlayer.volume]);

  const togglePlay = () => {
    setAudioPlaying(!audioPlayer.isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center hover:bg-green-800 transition-colors"
        >
          {audioPlayer.isPlaying ? '⏸️' : '▶️'}
        </button>
        <div className="text-sm text-gray-600 hidden sm:block">
          {audioPlayer.isPlaying ? 'Playing...' : 'Play Music'}
        </div>
      </div>
      <audio ref={audioRef} src={src} loop />
    </div>
  );
}