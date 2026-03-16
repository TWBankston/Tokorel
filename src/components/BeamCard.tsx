"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface BeamCardProps {
  children: ReactNode;
  className?: string;
}

export default function BeamCard({ children, className = "" }: BeamCardProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    },
    []
  );

  return (
    <div
      className={`beam-wrapper ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={cursorRef} className="beam-cursor" />
      <div className="beam-inner">{children}</div>
    </div>
  );
}
