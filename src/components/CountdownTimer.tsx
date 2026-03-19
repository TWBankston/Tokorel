"use client";

import { useState, useEffect } from "react";

// Saturday March 21, 2026 at 12:00 PM MST (UTC-7) = 19:00 UTC
const TARGET_DATE = new Date("2026-03-21T19:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft | null {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UPCOMING_FEATURES = [
  { icon: "🪐", label: "Tokorel Universe Explorer" },
  { icon: "👤", label: "Character Bios & Dossiers" },
  { icon: "📜", label: "Lore & Timeline Archives" },
  { icon: "🔮", label: "Interactive Story Map" },
];

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-bg-dark/90 border border-primary/30 rounded-lg px-3 py-3 sm:px-5 sm:py-4 min-w-[60px] sm:min-w-[80px] text-center shadow-[0_0_20px_rgba(13,242,242,0.1)]">
          <span className="text-3xl sm:text-5xl font-bold text-primary tabular-nums tracking-wider">
            {display}
          </span>
        </div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-primary/10" />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft());
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center h-[400px]" />
      </section>
    );
  }

  const expired = timeLeft === null;

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(13,242,242,0.08)_0%,transparent_60%)]" />

      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.4em] text-accent/80 border border-accent/20 px-4 py-1.5 rounded-full">
            Incoming Transmission
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-100">
            {expired ? (
              <>The Archives Are <span className="text-primary">Open</span></>
            ) : (
              <>New Intel <span className="text-primary">Inbound</span></>
            )}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            {expired
              ? "Explore everything the Tokorel Universe has to offer."
              : "The Tokorel Universe is expanding. New features are being decoded and will be available in:"}
          </p>
        </div>

        {!expired && (
          <div className="flex justify-center gap-3 sm:gap-6">
            <Digit value={timeLeft.days} label="Days" />
            <div className="flex items-center text-primary/40 text-3xl sm:text-5xl font-light pb-6">:</div>
            <Digit value={timeLeft.hours} label="Hours" />
            <div className="flex items-center text-primary/40 text-3xl sm:text-5xl font-light pb-6">:</div>
            <Digit value={timeLeft.minutes} label="Minutes" />
            <div className="flex items-center text-primary/40 text-3xl sm:text-5xl font-light pb-6">:</div>
            <Digit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {UPCOMING_FEATURES.map((f) => (
            <div
              key={f.label}
              className="border border-primary/10 bg-primary/5 rounded-lg p-4 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
            >
              <span className="text-2xl mb-2 block">{f.icon}</span>
              <span className="text-xs text-slate-300 font-medium tracking-wide">
                {f.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-xs tracking-widest uppercase">
          {expired ? "Transmission Complete" : "Estimated Signal Arrival — March 21, 2026"}
        </p>
      </div>
    </section>
  );
}
