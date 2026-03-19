"use client";

import { useCallback, useRef, useEffect } from "react";

let globalAudioCtx: AudioContext | null = null;
let sfxMuted = false;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    globalAudioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
}

export function setSFXMuted(muted: boolean) {
  sfxMuted = muted;
}

export function getSFXMuted() {
  return sfxMuted;
}

type SoundType =
  | "dossierOpen"
  | "dossierClose"
  | "tabSwitch"
  | "cardHover"
  | "confirm"
  | "navigate"
  | "dataReveal";

function playSound(type: SoundType) {
  if (sfxMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (type) {
    case "dossierOpen":
      playScanReveal(ctx, now);
      break;
    case "dossierClose":
      playReverseTone(ctx, now);
      break;
    case "tabSwitch":
      playBlip(ctx, now, 1200, 0.08);
      break;
    case "cardHover":
      playBlip(ctx, now, 800, 0.03);
      break;
    case "confirm":
      playConfirm(ctx, now);
      break;
    case "navigate":
      playNavigate(ctx, now);
      break;
    case "dataReveal":
      playDataReveal(ctx, now);
      break;
  }
}

function playScanReveal(ctx: AudioContext, now: number) {
  // Rising sweep with harmonics — the "accessing classified data" sound
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(200, now);
  osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.25);

  osc2.type = "sine";
  osc2.frequency.setValueAtTime(400, now);
  osc2.frequency.exponentialRampToValueAtTime(2000, now + 0.2);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(3000, now + 0.25);
  filter.Q.value = 2;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.4);
  osc2.stop(now + 0.4);
}

function playReverseTone(ctx: AudioContext, now: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

function playBlip(ctx: AudioContext, now: number, freq: number, vol: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.04);

  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

function playConfirm(ctx: AudioContext, now: number) {
  // Two-tone ascending confirmation
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(600, now);
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(900, now + 0.08);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.setValueAtTime(0.06, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.08);
  osc2.start(now + 0.08);
  osc2.stop(now + 0.22);
}

function playNavigate(ctx: AudioContext, now: number) {
  // Quick whoosh-like sweep
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

function playDataReveal(ctx: AudioContext, now: number) {
  // Staccato data-loading beeps
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const t = now + i * 0.06;
    osc.type = "square";
    osc.frequency.setValueAtTime(1500 + i * 400, t);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.03, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(g);
    g.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export function useSoundFX() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const stored = typeof localStorage !== "undefined" ? localStorage.getItem("tokorel_sfx_muted") : null;
      if (stored === "true") sfxMuted = true;
    }
  }, []);

  const play = useCallback((type: SoundType) => {
    playSound(type);
  }, []);

  const toggleMute = useCallback(() => {
    sfxMuted = !sfxMuted;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("tokorel_sfx_muted", String(sfxMuted));
    }
    return sfxMuted;
  }, []);

  return { play, toggleMute, isMuted: () => sfxMuted };
}
