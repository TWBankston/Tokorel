"use client";

import { useState, useCallback } from "react";
import { useSoundFX } from "@/hooks/useSoundFX";

export default function SFXToggle() {
  const { toggleMute, isMuted, play } = useSoundFX();
  const [muted, setMuted] = useState(() => isMuted());

  const handleToggle = useCallback(() => {
    const nowMuted = toggleMute();
    setMuted(nowMuted);
    if (!nowMuted) play("confirm");
  }, [toggleMute, play]);

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-20 z-40 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all cursor-pointer group"
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      title={muted ? "Sound effects: OFF" : "Sound effects: ON"}
    >
      {muted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
