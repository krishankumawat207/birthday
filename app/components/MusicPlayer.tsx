"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteractedRef = useRef(false);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      // Handle audio loading
      const handleCanPlay = () => {
        setIsAudioLoaded(true);
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
        }
      };
    }
  }, [volume]);

  // Function to handle first user interaction
  const handleFirstInteraction = () => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      // Try to play audio on first interaction
      if (audioRef.current && !isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Auto-play was prevented:", error);
              // User needs to interact again
            });
        }
      }
    }
  };

  const togglePlay = () => {
    handleFirstInteraction();

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Playback failed:", error);
            // Show user they need to interact
            alert("Please click the play button again to start music");
          });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Stop music when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        // You can change this to your actual music file
        src="/music.mp3"
        // Fallback audio sources if needed
      >
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 space-y-4 min-w-[200px]">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Romantic Music
            </h3>
            <p className="text-xs text-gray-500">For a special mood</p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isPlaying
                  ? "bg-gradient-to-r from-pink-500 to-red-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              disabled={!isAudioLoaded}
            >
              {!isAudioLoaded ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <span className="text-3xl">{isPlaying ? "⏸️" : "▶️"}</span>
              )}
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm flex items-center">
                <span className="mr-2">🔊</span> Volume
              </span>
              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Status */}
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">
              {!isAudioLoaded ? (
                <span className="text-yellow-600">Loading music...</span>
              ) : isPlaying ? (
                <span className="text-green-600 flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Playing now
                </span>
              ) : (
                <span className="text-gray-600">Click to play</span>
              )}
            </div>

            {/* Music info */}
            <div className="text-xs text-gray-500 italic">
              {isPlaying ? "Romantic melody 🎶" : "Set the mood"}
            </div>
          </div>
        </div>

        {/* Floating Notes Animation */}
        {isPlaying && (
          <div className="absolute -top-10 -left-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: i * 15 }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <span className="text-2xl">
                  {i % 3 === 0 ? "🎵" : i % 3 === 1 ? "🎶" : "🎼"}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Visualizer for when music is playing */}
        {isPlaying && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-end justify-center space-x-1 h-10">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t"
                animate={{
                  height: [5, 25, 5],
                }}
                transition={{
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
