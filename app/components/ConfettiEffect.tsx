"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
  intensity?: number;
}

export default function ConfettiEffect({
  trigger,
  intensity = 1,
}: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Multiple bursts
      myConfetti({
        particleCount: 100 * intensity,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        myConfetti({
          particleCount: 50 * intensity,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
      }, 250);

      setTimeout(() => {
        myConfetti({
          particleCount: 50 * intensity,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 500);

      // Heart shape
      setTimeout(() => {
        const heart = confetti.shapeFromText({ text: "💖", scalar: 2 });
        myConfetti({
          particleCount: 20 * intensity,
          scalar: 2,
          shapes: [heart],
          spread: 100,
          origin: { y: 0.3 },
        });
      }, 750);
    }
  }, [trigger, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
