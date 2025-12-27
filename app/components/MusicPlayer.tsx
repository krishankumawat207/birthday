"use client";

import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const [volume, setVolume] = useState(0.5);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteractedRef = useRef(false);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      const handleCanPlay = () => {
        setIsAudioLoaded(true);
        // Auto play after user interacts
        if (!hasInteractedRef.current) {
          const playPromise = audioRef.current?.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // User needs to interact if autoplay fails
            });
          }
        }
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        audioRef.current?.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, [volume]);

  // First user interaction to start audio
  useEffect(() => {
    const startAudio = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        audioRef.current?.play().catch(() => {});
      }
    };
    window.addEventListener("click", startAudio, { once: true });
    return () => window.removeEventListener("click", startAudio);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 min-w-[200px] space-y-2">
      <audio ref={audioRef} loop preload="metadata" src="/music.mp3">
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div className="text-center text-sm font-medium text-gray-700">
        Now Playing: Romantic Music 🎶
      </div>

      <div className="flex items-center space-x-2">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>

      {!isAudioLoaded && (
        <div className="text-xs text-yellow-600">Loading...</div>
      )}
    </div>
  );
}
