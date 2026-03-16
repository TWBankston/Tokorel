"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/quantum-tides.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.3;
    audioRef.current = audio;

    const events = ["click", "scroll", "keydown", "mousemove", "touchstart"];

    function tryPlay() {
      if (startedRef.current) return;
      startedRef.current = true;
      audio.play().then(() => {
        setPlaying(true);
        events.forEach((e) => window.removeEventListener(e, tryPlay));
      }).catch(() => {
        startedRef.current = false;
      });
    }

    // Always register interaction listeners first
    events.forEach((e) => window.addEventListener(e, tryPlay));

    // Then attempt autoplay
    tryPlay();

    return () => {
      events.forEach((e) => window.removeEventListener(e, tryPlay));
      audio.pause();
      audio.src = "";
    };
  }, []);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <button
      onClick={togglePlayback}
      aria-label={playing ? "Mute background music" : "Unmute background music"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2
                 rounded-full border border-primary/30 bg-bg-dark/80 backdrop-blur-md
                 text-slate-400 hover:text-primary hover:border-primary/60
                 transition-all duration-300 group cursor-pointer"
    >
      {!playing ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5L6 9H2v6h4l5 4V5z"
          />
          <line
            x1="23" y1="9" x2="17" y2="15"
            strokeLinecap="round"
          />
          <line
            x1="17" y1="9" x2="23" y2="15"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5L6 9H2v6h4l5 4V5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.54 8.46a5 5 0 010 7.07"
            className="animate-pulse"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.07 4.93a10 10 0 010 14.14"
            className="animate-pulse"
          />
        </svg>
      )}
      <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline">
        {playing ? "♫ Quantum Tides" : "Play"}
      </span>
    </button>
  );
}
