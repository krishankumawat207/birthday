"use client";

import { useState } from "react";
import ConfettiEffect from "./ConfettiEffect";
import BalloonEffect from "./BalloonEffect";

const cardData = [
  {
    title: "To My Dearest Friend 💌",
    message:
      "On your special day, I want you to know how incredibly grateful I am to have you in my life. You bring so much joy and laughter to everyone around you!",
    emojis: ["💝", "✨", "🎂"],
    color: "#FF6B8B",
  },
  {
    title: "A Beautiful Memory 🫂",
    message:
      "Remember that time we stayed up all night talking and watching the sunrise? Those moments are the ones I cherish the most. Here's to many more adventures together!",
    emojis: ["🌅", "🤗", "🌟"],
    color: "#4ECDC4",
  },
  {
    title: "Your Amazing Qualities ✨",
    message:
      "Your kindness, humor, and strength inspire me every day. You have the incredible ability to make everyone feel special and loved.",
    emojis: ["💪", "😂", "❤️"],
    color: "#45B7D1",
  },
  {
    title: "Friendship Quote 💫",
    message:
      "A true friend is the greatest of all blessings. Thank you for being my confidant, my partner in crime, and my greatest supporter.",
    emojis: ["🤝", "🎭", "🏆"],
    color: "#96CEB4",
  },
  {
    title: "Wishes for You 🌈",
    message:
      "May your year be filled with love, laughter, success, and all the happiness you deserve. May all your dreams come true!",
    emojis: ["🌈", "🎯", "🎁"],
    color: "#FFD166",
  },
  {
    title: "You Are Very Special 💖",
    message:
      "You are more amazing than you know, more wonderful than you feel, and more loved than you can imagine. Happy Birthday to my incredible best friend!",
    emojis: ["💖", "🎉", "🥳"],
    color: "#C9B6E4",
    isSpecial: true,
  },
];

// BirthdayCard Component - Fixed version
function BirthdayCard({ id, isOpen, onOpen, cardData }: any) {
  return (
    <div
      className="relative w-full max-w-sm cursor-pointer transform transition-all duration-500 hover:scale-105"
      onClick={() => !isOpen && onOpen(id)}
    >
      {/* Closed Card (Gift Box) */}
      {!isOpen ? (
        <div className="relative bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl p-8 shadow-2xl h-64 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            Surprise #{id}
          </h3>
          <p className="text-white/80 text-center">Click to open!</p>
          <div className="absolute top-4 right-4 bg-white/20 rounded-full p-2">
            <span className="text-white">✨</span>
          </div>
        </div>
      ) : (
        /* Opened Card (Content) */
        <div
          className="rounded-2xl shadow-2xl p-6 h-64 transform transition-all duration-700 animate-cardOpen"
          style={{
            backgroundColor: cardData.color + "20",
            border: `3px solid ${cardData.color}`,
          }}
        >
          <div className="h-full flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-xl font-bold"
                style={{ color: cardData.color }}
              >
                {cardData.title}
              </h3>
              <span className="text-2xl">💝</span>
            </div>

            {/* Message */}
            <div
              className="flex-1 overflow-y-auto pr-2 mb-4 custom-scrollbar"
              style={{ color: "#333" }}
            >
              <p className="text-base leading-relaxed">{cardData.message}</p>
            </div>

            {/* Emojis */}
            <div className="flex justify-center space-x-4 mt-auto">
              {cardData.emojis.map((emoji: string, idx: number) => (
                <span
                  key={idx}
                  className="text-2xl animate-bounce"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            {/* Opened Badge */}
            <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold">
              Opened! ✅
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardGrid() {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCardOpen = (id: number) => {
    if (!openCards.includes(id)) {
      setOpenCards((prev) => [...prev, id]);

      // Trigger confetti for special card
      if (cardData[id - 1]?.isSpecial) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4 sm:py-12 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 px-2">
          🎁 Your Birthday Surprises 🎁
        </h1>
        <p className="text-gray-600 text-base sm:text-lg px-2">
          Click on each gift box to reveal special messages!
        </p>
        <div className="mt-4 text-gray-500">
          {openCards.length > 0 && (
            <p className="text-sm sm:text-base">
              Opened: {openCards.length} of {cardData.length} surprises
            </p>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
          {cardData.map((card, index) => (
            <div key={index + 1} className="flex justify-center">
              <BirthdayCard
                id={index + 1}
                isOpen={openCards.includes(index + 1)}
                onOpen={handleCardOpen}
                cardData={card}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Special Message for Final Card */}
      {openCards.includes(cardData.length) && (
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl sm:text-2xl md:text-3xl font-bold py-6 sm:py-8 px-6 sm:px-12 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl animate-pulse-gentle max-w-[90%] sm:max-w-none">
            🎉 You are amazing! Thank you for being you! 🎉
          </div>
        </div>
      )}

      {/* Effects */}
      <ConfettiEffect trigger={showConfetti} intensity={2} />
      {openCards.length > 0 && <BalloonEffect />}

      {/* Floating Emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float z-0"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${Math.random() * 16 + 16}px`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          >
            {["💖", "✨", "🎈", "🎂", "🥳", "🎉", "🎁", "🌟"][i % 8]}
          </div>
        ))}
      </div>

      {/* CSS for custom scrollbar and animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        @keyframes cardOpen {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-cardOpen {
          animation: cardOpen 0.5s ease-out forwards;
        }

        .text-gradient {
          background: linear-gradient(45deg, #ff6b8b, #4ecdc4, #45b7d1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Custom scrollbar for card message */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
