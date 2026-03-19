"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useSoundFX } from "@/hooks/useSoundFX";
import SFXToggle from "@/components/SFXToggle";

export default function PortalPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

const SECTIONS = [
  {
    id: "downloads",
    title: "The Archives",
    subtitle: "Books & Downloads",
    description: "Access exclusive novellas, the full book series, and companion content from the Tokorel Universe.",
    href: "/portal-downloads",
    icon: ArchiveIcon,
    status: "ONLINE",
    color: "primary",
  },
  {
    id: "universe",
    title: "Universe Guide",
    subtitle: "Tokorel Star Map",
    description: "Navigate the star systems, explore planetary data, and chart the territories of the divided civilizations.",
    href: "#",
    icon: MapIcon,
    status: "COMING SOON",
    color: "accent",
  },
  {
    id: "characters",
    title: "Dossier Files",
    subtitle: "Character Bios",
    description: "Classified intelligence on every key figure — alliances, backgrounds, and hidden agendas across the saga.",
    href: "/portal-dossiers",
    icon: UsersIcon,
    status: "ONLINE",
    color: "primary",
  },
];

function DashboardContent() {
  const { user, logout } = useAuth();
  const { play } = useSoundFX();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      {/* Ambient glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="relative z-30 w-full pt-6 pb-4 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hidden md:flex items-center justify-between">
              <nav className="flex items-center gap-8">
                <Link href="/portal" className="text-sm font-medium uppercase tracking-widest text-primary">
                  Dashboard
                </Link>
                <Link href="/portal-downloads" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Downloads
                </Link>
                <Link href="/portal-dossiers" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Dossiers
                </Link>
              </nav>

              <Link href="/portal" className="absolute left-1/2 -translate-x-1/2 drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                <Image
                  src="/logo/tokorel-logo-transparent.png"
                  alt="Tokorel Series"
                  width={300}
                  height={120}
                  className="object-contain h-20 w-auto"
                  priority
                />
              </Link>

              <nav className="flex items-center gap-8">
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </nav>
            </div>

            {/* Mobile header */}
            <div className="flex flex-col items-center md:hidden gap-3">
              <Link href="/portal" className="drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                <Image
                  src="/logo/tokorel-logo-transparent.png"
                  alt="Tokorel Series"
                  width={300}
                  height={120}
                  className="object-contain h-20 w-auto"
                  priority
                />
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/portal" className="text-xs font-medium uppercase tracking-widest text-primary">
                  Dashboard
                </Link>
                <Link href="/portal-downloads" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Downloads
                </Link>
                <Link href="/portal-dossiers" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Dossiers
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <button onClick={logout} className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
          {/* Welcome & Status Bar */}
          <div
            className="mb-16 transition-all duration-700"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.3em] text-primary/70 font-bold">
                    System Active
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-100">
                  Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {user?.name?.split(" ")[0] || "Agent"}
                  </span>
                </h1>
                <p className="text-slate-400 mt-3 text-lg max-w-xl">
                  Your command center for the Tokorel Universe. Access archives, explore the star map, and review classified dossiers.
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="glass-panel px-4 py-2.5 rounded-lg flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-slate-400 uppercase tracking-widest">
                    Clearance:
                  </span>
                  <span className="text-primary font-bold uppercase tracking-widest">
                    {user?.role === "admin" ? "Omega" : "Standard"}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {SECTIONS.map((section, i) => (
              <DashboardCard key={section.id} section={section} index={i} mounted={mounted} onHover={() => play("cardHover")} onClick={() => play("navigate")} />
            ))}
          </div>

          {/* Prophecy Banner */}
          <div
            className="relative overflow-hidden rounded-2xl border border-primary/10 transition-all duration-700 delay-500"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.04]" />
            <div className="absolute inset-0 parchment-texture opacity-50" />

            <div className="relative z-10 py-16 px-8 text-center">
              <span className="text-primary text-4xl opacity-40">&#10022;</span>
              <blockquote className="mt-6 text-xl md:text-3xl font-light italic text-primary/80 max-w-2xl mx-auto leading-relaxed">
                &ldquo;From the blood of two enemies, a bridge shall be born.&rdquo;
              </blockquote>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-6" />
              <p className="text-xs uppercase tracking-[0.4em] text-primary/30 font-bold mt-4">
                The Fragment of Khizara
              </p>
            </div>
          </div>

          {/* System Telemetry Footer */}
          <div
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.3em] text-slate-600 transition-all duration-700 delay-700"
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              Encrypted Connection
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              Archives Synced
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              Tokorel System Online
            </span>
          </div>
        </main>
      </div>

      <SFXToggle />
    </>
  );
}

interface DashboardCardProps {
  section: typeof SECTIONS[number];
  index: number;
  mounted: boolean;
  onHover: () => void;
  onClick: () => void;
}

function DashboardCard({ section, index, mounted, onHover, onClick }: DashboardCardProps) {
  const [hovered, setHovered] = useState(false);
  const isActive = section.status === "ONLINE";
  const Icon = section.icon;

  const card = (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-500 h-full ${
        isActive
          ? "border-primary/20 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(13,242,242,0.1)] cursor-pointer"
          : "border-primary/10 opacity-70"
      }`}
      style={{
        transitionDelay: `${150 + index * 100}ms`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
      }}
      onMouseEnter={() => { setHovered(true); if (isActive) onHover(); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-card-dark to-bg-dark" />
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hovered && isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: section.color === "accent"
            ? "radial-gradient(circle at 50% 0%, rgba(255,179,71,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 0%, rgba(13,242,242,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Scan line animation on hover */}
      {isActive && (
        <div
          className={`absolute left-0 right-0 h-px transition-all duration-1000 ease-out ${
            hovered ? "opacity-60" : "opacity-0"
          }`}
          style={{
            top: hovered ? "100%" : "0%",
            background: section.color === "accent"
              ? "linear-gradient(90deg, transparent, rgba(255,179,71,0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(13,242,242,0.5), transparent)",
          }}
        />
      )}

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Status + Icon row */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isActive
                ? hovered
                  ? section.color === "accent"
                    ? "bg-accent/20 shadow-[0_0_20px_rgba(255,179,71,0.2)]"
                    : "bg-primary/20 shadow-[0_0_20px_rgba(13,242,242,0.2)]"
                  : "bg-primary/10"
                : "bg-primary/5"
            }`}
          >
            <Icon active={isActive} color={section.color} />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
              isActive
                ? "text-primary border-primary/30 bg-primary/5"
                : "text-slate-500 border-slate-700 bg-slate-800/50"
            }`}
          >
            {section.status}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className={`text-xs uppercase tracking-[0.2em] font-bold mb-2 ${
            section.color === "accent" ? "text-accent/70" : "text-primary/70"
          }`}>
            {section.subtitle}
          </p>
          <h3 className="text-2xl font-bold text-slate-100 mb-3">
            {section.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Bottom action */}
        <div className="mt-8 pt-6 border-t border-primary/10">
          {isActive ? (
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Enter
              </span>
              <span
                className={`text-primary transition-transform duration-300 ${
                  hovered ? "translate-x-1" : ""
                }`}
              >
                &rarr;
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-xs uppercase tracking-widest text-slate-600 font-medium">
                In Development
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isActive) {
    return <Link href={section.href} className="block h-full" onClick={onClick}>{card}</Link>;
  }
  return card;
}

function ArchiveIcon({ active, color }: { active: boolean; color: string }) {
  const c = active
    ? color === "accent" ? "#ffb347" : "#0df2f2"
    : "#475569";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8v13H3V8" />
      <path d="M1 3h22v5H1z" />
      <path d="M10 12h4" />
    </svg>
  );
}

function MapIcon({ active, color }: { active: boolean; color: string }) {
  const c = active
    ? color === "accent" ? "#ffb347" : "#0df2f2"
    : "#475569";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function UsersIcon({ active, color }: { active: boolean; color: string }) {
  const c = active
    ? color === "accent" ? "#ffb347" : "#0df2f2"
    : "#475569";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
