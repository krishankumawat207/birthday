"use client";

import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  emoji: string;
  color: string;
  size: number;
  x: number;
  duration: number;
}

export default function BalloonEffect() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Create initial balloons
    const initialBalloons: Balloon[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: ["🎈", "🎉", "🎊", "💖", "✨"][Math.floor(Math.random() * 5)],
      color: ["#FF6B8B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFD166"][
        Math.floor(Math.random() * 5)
      ],
      size: Math.random() * 30 + 20,
      x: Math.random() * 100,
      duration: Math.random() * 5 + 5,
    }));
    setBalloons(initialBalloons);

    // Add new balloons periodically
    const interval = setInterval(() => {
      setBalloons((prev) => {
        const newBalloon: Balloon = {
          id: Date.now(),
          emoji: ["🎈", "🎉", "🎊", "💖", "✨"][Math.floor(Math.random() * 5)],
          color: ["#FF6B8B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFD166"][
            Math.floor(Math.random() * 5)
          ],
          size: Math.random() * 30 + 20,
          x: Math.random() * 100,
          duration: Math.random() * 5 + 5,
        };
        return [...prev.slice(-20), newBalloon]; // Keep max 20 balloons
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0 animate-balloon-rise"
          style={
            {
              left: `${balloon.x}%`,
              fontSize: `${balloon.size}px`,
              animationDuration: `${balloon.duration}s`,
              animationDelay: `${Math.random() * 2}s`,
              "--tx": `${(Math.random() - 0.5) * 100}px`,
            } as React.CSSProperties
          }
        >
          <div className="relative">
            <div className="text-shadow-lg" style={{ color: balloon.color }}>
              {balloon.emoji}
            </div>
            {/* String */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-20"
              style={{
                background: `linear-gradient(to bottom, ${balloon.color}, transparent)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
