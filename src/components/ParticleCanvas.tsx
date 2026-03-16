"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 150;
const COLORS = ["#0df2f2", "#ffffff", "#ffb347", "#34d399"];

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  blinkSpeed: number;
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: Math.random() * 0.5 + 0.2,
    blinkSpeed: Math.random() * 0.02,
  };
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    function init() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(w, h)
      );
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.blinkSpeed;
        if (p.opacity > 0.8 || p.opacity < 0.2) p.blinkSpeed *= -1;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();

        if (p.size > 1.2) {
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = p.color;
        } else {
          ctx!.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(animate);
    }

    function handleMouse(e: MouseEvent) {
      const dx = (e.clientX - w / 2) * 0.01;
      const dy = (e.clientY - h / 2) * 0.01;
      canvas!.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    init();
    animate();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} id="galaxy-canvas" />;
}
