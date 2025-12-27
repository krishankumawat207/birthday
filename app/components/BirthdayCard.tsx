"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface BirthdayCardProps {
  id: number;
  isOpen: boolean;
  onOpen: (id: number) => void;
  cardData: {
    title: string;
    message: string;
    emojis: string[];
    color: string;
    isSpecial?: boolean;
  };
}

export default function BirthdayCard({
  id,
  isOpen,
  onOpen,
  cardData,
}: BirthdayCardProps) {
  const [showSparkles, setShowSparkles] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isOpen && !flipped) {
      setFlipped(true);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }
  }, [isOpen, flipped]);

  const handleClick = () => {
    if (!isOpen) {
      onOpen(id);
    }
  };

  const cardVariants = {
    closed: { rotateY: 0 },
    open: { rotateY: 180 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="relative perspective-1000">
      {/* Card Container */}
      <motion.div
        className={`relative w-72 h-96 cursor-pointer ${
          !isOpen ? "hover:scale-105 transition-transform duration-300" : ""
        }`}
        onClick={handleClick}
        animate={isOpen ? "open" : "closed"}
        variants={cardVariants}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${cardData.color}, ${cardData.color}dd)`,
              border: "3px solid white",
            }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Gift Box Lid Animation */}
            <motion.div
              className="relative mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-6xl">🎁</div>
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Click to Open!
            </h3>
            <div className="text-4xl animate-bounce-gentle">👇</div>
            <div className="absolute bottom-4 text-white/80 text-sm">
              Gift #{id}
            </div>
          </motion.div>
        )}

        {/* Back of Card (Content) */}
        {isOpen && (
          <motion.div
            className="absolute inset-0 backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${cardData.color}dd, #ffffff)`,
              border: "3px solid white",
              transform: "rotateY(180deg)",
            }}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Sparkle Effect */}
            <AnimatePresence>
              {showSparkles && (
                <>
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="sparkle"
                      style={{
                        width: `${Math.random() * 20 + 5}px`,
                        height: `${Math.random() * 20 + 5}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 0.5, 0],
                      }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Card Content */}
            <div className="text-center space-y-6">
              <div className="text-5xl mb-4">
                {cardData.emojis.map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="inline-block mx-1"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {cardData.title}
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                {cardData.message}
              </p>

              {/* Mini Hearts */}
              <div className="flex justify-center space-x-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-2xl text-pink-500"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 text-gray-600 text-sm">
              🎉 You opened a memory! 🎉
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Glow Effect */}
      {isOpen && (
        <div className="absolute inset-0 rounded-2xl animate-pulse-gentle bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
      )}
    </div>
  );
}
