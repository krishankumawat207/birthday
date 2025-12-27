"use client";

import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import CardGrid from "./components/CardGrid";
import MusicPlayer from "./components/MusicPlayer";
import ConfettiEffect from "./components/ConfettiEffect";

console.log("Home page loaded");

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showWelcomeConfetti, setShowWelcomeConfetti] = useState(false);

  const handleStart = () => {
    setShowWelcomeConfetti(true);
    setTimeout(() => {
      setHasStarted(true);
      setShowWelcomeConfetti(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen">
      {!hasStarted ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <>
          <CardGrid />
          <MusicPlayer />
        </>
      )}

      <ConfettiEffect trigger={showWelcomeConfetti} />
    </main>
  );
}
