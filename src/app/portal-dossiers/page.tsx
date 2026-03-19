"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useSoundFX } from "@/hooks/useSoundFX";
import SFXToggle from "@/components/SFXToggle";

export default function PortalDossiersPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DossiersContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

interface CharacterData {
  id: string;
  name: string;
  fullName: string;
  title: string;
  classification: string;
  origin: string;
  species: string;
  status: string;
  threatLevel: string;
  image: string | null;
  accentColor: string;
  bio: string[];
  stats: { label: string; value: number; color?: string }[];
  traits: { label: string; icon: string }[];
  tabs: { id: string; label: string; content: string[] }[];
}

const CHARACTERS: CharacterData[] = [
  {
    id: "linsora",
    name: "Linsora",
    fullName: "Linsora Anslem",
    title: "Khizaran Vanguard",
    classification: "Vanguard",
    origin: "Khizara",
    species: "Half-Terran / Half-Khizaran",
    status: "ACTIVE",
    threatLevel: "HIGH",
    image: "/images/characters/linsora.png",
    accentColor: "#0df2f2",
    bio: [
      "Born on Khizara to a Terran father and Khizaran mother, Linsora defies the typical Khizaran appearance. While most Khizarans are tall, thin, with blue eyes and clawed hands, Linsora inherited her green eyes, auburn hair, and short stature from her father.",
      "A survivor from birth — a mysterious ailment almost claimed her life as a child, but she miraculously pulled through. Her resilience was tested further by the torment of her older half-brother, Yokosh Kohl.",
      "After serving in the Khizaran Navy, Linsora left her world when situations became untenable. Like all Khizarans, she carries knives and settles all disputes using them.",
    ],
    stats: [
      { label: "Combat Proficiency", value: 96 },
      { label: "Tactical Intelligence", value: 91 },
      { label: "Resilience", value: 98 },
      { label: "Knife Mastery", value: 100, color: "#ffb347" },
    ],
    traits: [
      { label: "Blade Expert", icon: "⚔" },
      { label: "Navy Veteran", icon: "⚓" },
      { label: "Survivor", icon: "✦" },
      { label: "Khizaran Heritage", icon: "◈" },
    ],
    tabs: [
      {
        id: "background",
        label: "Background",
        content: [
          "Robert Anselm, an archaeologist, came to Khizara hoping to locate the oldest settlement on the planet. He arrived at a time when Linsora's mother, Belat, had just lost her husband.",
          "Robert was a patient man and knew Khizaran traditions well. His patience and knowledge paid off when Belat agreed to be his mate, and Linsora was born.",
          "Growing up as a half-breed on Khizara was never easy. Linsora's appearance set her apart from other Khizarans, and her half-brother Yokosh Kohl made sure she never forgot it.",
        ],
      },
      {
        id: "abilities",
        label: "Abilities",
        content: [
          "Linsora is a master of the Khizaran blade arts. Like all Khizarans, she carries knives at all times and uses them to settle disputes — a tradition deeply embedded in Khizaran culture.",
          "Her time in the Khizaran Navy honed her combat skills and tactical thinking. She is a formidable fighter and a natural strategist.",
          "Despite her small stature compared to full-blooded Khizarans, Linsora compensates with speed, precision, and a fierce determination that has kept her alive in a galaxy full of threats.",
        ],
      },
      {
        id: "intel",
        label: "Intelligence",
        content: [
          "CLASSIFICATION: RESTRICTED",
          "Subject demonstrates exceptional survival instincts. The mysterious childhood ailment and subsequent recovery suggest possible latent abilities not yet fully understood.",
          "Departure from Khizara flagged as potentially related to escalating political tensions. Current whereabouts suggest deep-space operations outside standard jurisdictions.",
        ],
      },
    ],
  },
  {
    id: "permac",
    name: "Permac",
    fullName: "Permac Sude",
    title: "Tokorellan Empath",
    classification: "Infiltrator",
    origin: "Tokorel",
    species: "Tokorellan",
    status: "ACTIVE",
    threatLevel: "SEVERE",
    image: "/images/characters/permac.png",
    accentColor: "#ffb347",
    bio: [
      "Permac Sude is a Tokorellan — the sworn enemy of Khizara. The two planets became enemies after the Great Battling 200 years ago. Because Tokorellans are descended from Khizarans, they don't differ in appearance.",
      "For the majority of his time in space, Permac has always been able to pass himself off as a Khizaran. Because of Tokorel's long-time secret nature, most of the galaxy fears them out of ignorance.",
      "While Tokorellans have the ability to sense and mentally control the emotions of others, most people don't realize when that emotional influence is taking place. Only one person in the galaxy knows when Permac is using his power.",
    ],
    stats: [
      { label: "Emotional Influence", value: 97, color: "#ffb347" },
      { label: "Deception", value: 94 },
      { label: "Psychic Sensitivity", value: 99, color: "#ffb347" },
      { label: "Combat Proficiency", value: 78 },
    ],
    traits: [
      { label: "Empath", icon: "◎" },
      { label: "Mind Control", icon: "⟡" },
      { label: "Infiltrator", icon: "⊘" },
      { label: "Tokorellan", icon: "◆" },
    ],
    tabs: [
      {
        id: "background",
        label: "Background",
        content: [
          "The Tokorellan civilization has been shrouded in secrecy since the Great Battling that severed their ties with Khizara two centuries ago. Permac carries the weight of that history wherever he goes.",
          "Moving through the galaxy under a Khizaran disguise, Permac operates in the spaces between civilizations — trusted by none who know his true nature, feared by all who suspect it.",
          "His ability to read and influence emotions makes him invaluable in negotiations and dangerous in conflict. Few have ever detected his influence at work.",
        ],
      },
      {
        id: "abilities",
        label: "Abilities",
        content: [
          "As a Tokorellan, Permac possesses the innate ability to sense the emotional states of those around him. This empathic sensitivity extends beyond mere detection — he can actively influence and manipulate the emotions of others.",
          "Most subjects remain completely unaware when Permac exerts his emotional influence. This makes him exceptionally effective in infiltration, negotiation, and extraction scenarios.",
          "His one weakness: poker. Sometimes Permac gives himself away when playing cards, his influence bleeding through and alerting perceptive opponents. He has been quickly shunned from more than one game.",
        ],
      },
      {
        id: "intel",
        label: "Intelligence",
        content: [
          "CLASSIFICATION: TOP SECRET",
          "Subject's emotional influence capabilities represent a significant strategic asset — and threat. Range and intensity of psychic abilities exceed baseline Tokorellan metrics.",
          "Of critical note: intelligence reports indicate exactly ONE individual in the known galaxy can detect when Permac is actively using his power. Identity of this individual remains UNKNOWN. Priority: Identify and monitor.",
        ],
      },
    ],
  },
];

function DossiersContent() {
  const { user, logout } = useAuth();
  const { play } = useSoundFX();
  const [mounted, setMounted] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("background");
  const [scanlineActive, setScanlineActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectCharacter = useCallback((id: string) => {
    play("dossierOpen");
    setScanlineActive(true);
    setTimeout(() => {
      setSelectedCharacter(id);
      setActiveTab("background");
      setScanlineActive(false);
    }, 300);
  }, [play]);

  const handleClose = useCallback(() => {
    play("dossierClose");
    setScanlineActive(true);
    setTimeout(() => {
      setSelectedCharacter(null);
      setScanlineActive(false);
    }, 300);
  }, [play]);

  const selected = CHARACTERS.find((c) => c.id === selectedCharacter);

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Scanline transition overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${
          scanlineActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(13,242,242,0.03) 2px, rgba(13,242,242,0.03) 4px)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="relative z-30 w-full pt-6 pb-4 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hidden md:flex items-center justify-between">
              <nav className="flex items-center gap-8">
                <Link href="/portal" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/portal-downloads" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Downloads
                </Link>
                <Link href="/portal-dossiers" className="text-sm font-medium uppercase tracking-widest text-primary">
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
                <button onClick={logout} className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  Logout
                </button>
              </nav>
            </div>

            <div className="flex flex-col items-center md:hidden gap-3">
              <Link href="/portal" className="drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                <Image src="/logo/tokorel-logo-transparent.png" alt="Tokorel Series" width={300} height={120} className="object-contain h-20 w-auto" priority />
              </Link>
              <nav className="flex items-center gap-6 flex-wrap justify-center">
                <Link href="/portal" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Dashboard</Link>
                <Link href="/portal-downloads" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Downloads</Link>
                <Link href="/portal-dossiers" className="text-xs font-medium uppercase tracking-widest text-primary">Dossiers</Link>
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Admin</Link>
                )}
                <button onClick={logout} className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer">Logout</button>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
          {/* Page Header */}
          <div
            className="mb-12 transition-all duration-700"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-12 bg-primary shadow-[0_0_15px_rgba(13,242,242,0.8)]" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-bold">
                    Classified Database
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-100">
                  Active <span className="text-primary italic">Operatives</span>
                </h1>
              </div>
            </div>
            <p className="text-slate-400 max-w-2xl text-lg ml-5">
              Accessing classified character database. Review dossiers on key figures shaping the future of the Tokorel system.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-100"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
          >
            <StatBox label="Database Sync" value="98.4%" />
            <StatBox label="Active Operatives" value="2" />
            <StatBox label="Threat Level" value="SEVERE" valueClass="text-red-400 uppercase italic" />
            <StatBox label="Clearance" value="Granted" valueClass="text-primary" />
          </div>

          {/* Character Grid / Detail View */}
          {!selectedCharacter ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 transition-all duration-500"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
            >
              {CHARACTERS.map((char, i) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  index={i}
                  mounted={mounted}
                  onSelect={handleSelectCharacter}
                  onHover={() => play("cardHover")}
                />
              ))}
            </div>
          ) : selected ? (
            <DossierView
              character={selected}
              activeTab={activeTab}
              setActiveTab={(tab) => { play("tabSwitch"); setActiveTab(tab); }}
              onClose={handleClose}
            />
          ) : null}

          {/* System Analytics */}
          {!selectedCharacter && (
            <AnalyticsSection mounted={mounted} />
          )}
        </main>
      </div>

      <SFXToggle />
    </>
  );
}

function StatBox({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-col">
      <span className="text-[10px] text-primary/60 uppercase font-bold tracking-widest">{label}</span>
      <span className={`text-xl font-bold ${valueClass || "text-slate-100"}`}>{value}</span>
    </div>
  );
}

interface CharacterCardProps {
  character: CharacterData;
  index: number;
  mounted: boolean;
  onSelect: (id: string) => void;
  onHover: () => void;
}

function CharacterCard({ character, index, mounted, onSelect, onHover }: CharacterCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col bg-slate-900/40 rounded-xl overflow-hidden border border-primary/20 cursor-pointer transition-all duration-500"
      style={{
        transitionDelay: `${200 + index * 150}ms`,
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateY(30px)",
        boxShadow: hovered
          ? `0 20px 60px -10px ${character.accentColor}33`
          : "none",
        borderColor: hovered ? `${character.accentColor}99` : undefined,
      }}
      onMouseEnter={() => { setHovered(true); onHover(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(character.id)}
    >
      {/* Character Image / Silhouette */}
      <div className="aspect-[4/5] overflow-hidden relative">
        {character.image ? (
          <Image
            src={character.image}
            alt={character.fullName}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <CharacterSilhouette id={character.id} color={character.accentColor} hovered={hovered} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent" />

        {/* Classification badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-wider"
          style={{ backgroundColor: character.accentColor, color: "#080c0c" }}
        >
          {character.classification}
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3 py-1.5 rounded">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">{character.status}</span>
        </div>
      </div>

      <div className="p-6 relative flex-1 flex flex-col">
        {/* Name overlay */}
        <div className="absolute -top-10 left-6">
          <h3 className="text-3xl font-black italic uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {character.name}
          </h3>
        </div>

        <p
          className="text-sm font-bold uppercase tracking-widest mb-1 flex items-center gap-2"
          style={{ color: character.accentColor }}
        >
          {character.title}
        </p>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">
          {character.species} &mdash; {character.origin}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {character.bio[0]}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 mb-6">
          {character.traits.map((trait) => (
            <span
              key={trait.label}
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-slate-300"
            >
              {trait.icon} {trait.label}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="flex gap-1.5">
            {character.stats.slice(0, 3).map((s, i) => (
              <div key={i} className="w-8 h-1.5 rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: mounted ? `${s.value}%` : "0%",
                    backgroundColor: s.color || character.accentColor,
                    transitionDelay: `${800 + i * 200}ms`,
                  }}
                />
              </div>
            ))}
          </div>
          <span
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-300"
            style={{ color: character.accentColor, gap: hovered ? "8px" : "4px" }}
          >
            View Dossier &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

interface DossierViewProps {
  character: CharacterData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
}

function DossierView({ character, activeTab, setActiveTab, onClose }: DossierViewProps) {
  const [revealed, setRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setRevealed(false);
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabContent = character.tabs.find((t) => t.id === activeTab);

  return (
    <div className="mb-16">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors mb-8 cursor-pointer group"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
        <span className="uppercase tracking-widest font-bold text-xs">Back to Operatives</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Left Panel: Character Card */}
        <div
          className="rounded-xl overflow-hidden border transition-all duration-700"
          style={{
            borderColor: `${character.accentColor}33`,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          {/* Image */}
          <div className="aspect-[3/4] relative overflow-hidden">
            {character.image ? (
              <Image src={character.image} alt={character.fullName} fill className="object-cover object-top" />
            ) : (
              <CharacterSilhouette id={character.id} color={character.accentColor} hovered={false} large />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />

            <div
              className="absolute top-4 right-4 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-wider"
              style={{ backgroundColor: character.accentColor, color: "#080c0c" }}
            >
              {character.classification}
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 bg-card-dark space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Performance Metrics
            </h4>
            {character.stats.map((stat, i) => (
              <AnimatedStat key={stat.label} stat={stat} index={i} color={character.accentColor} />
            ))}
          </div>

          {/* Traits */}
          <div className="px-6 pb-6 bg-card-dark">
            <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
              {character.traits.map((trait) => (
                <span
                  key={trait.label}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-slate-300"
                >
                  {trait.icon} {trait.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Dossier Content */}
        <div
          className="transition-all duration-700 delay-200"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateX(0)" : "translateX(20px)",
          }}
        >
          {/* Name & Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: character.accentColor }} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: `${character.accentColor}aa` }}>
                Dossier File #{character.id === "linsora" ? "KHZ-0417" : "TKR-0892"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-100 mb-2">
              {character.fullName}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>{character.title}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{character.species}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Origin: {character.origin}</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-green-500/30 bg-green-500/10 text-green-400">
                {character.status}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400">
                Threat: {character.threatLevel}
              </span>
            </div>
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4 mb-10">
            {character.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-300 leading-relaxed transition-all duration-500"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-primary/10 mb-8">
            <div className="flex gap-0">
              {character.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "text-slate-100"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: character.accentColor }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div ref={contentRef} className="space-y-4 min-h-[200px]">
            {tabContent?.content.map((paragraph, i) => (
              <p
                key={`${activeTab}-${i}`}
                className={`leading-relaxed transition-all duration-500 ${
                  paragraph.startsWith("CLASSIFICATION:")
                    ? "text-red-400/80 font-bold text-xs uppercase tracking-[0.2em] border border-red-500/20 bg-red-500/5 px-4 py-3 rounded-lg"
                    : "text-slate-400"
                }`}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${150 + i * 100}ms`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedStat({ stat, index, color }: { stat: CharacterData["stats"][number]; index: number; color: string }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-400">{stat.label}</span>
        <span style={{ color: stat.color || color }}>{stat.value}%</span>
      </div>
      <div className="w-full h-1.5 bg-bg-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${stat.value}%` : "0%",
            backgroundColor: stat.color || color,
            boxShadow: `0 0 10px ${stat.color || color}80`,
          }}
        />
      </div>
    </div>
  );
}

function AnalyticsSection({ mounted }: { mounted: boolean }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/10 transition-all duration-700 delay-300"
      style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 uppercase italic text-slate-100">
          <span className="text-primary text-3xl">◈</span>
          System Analytics
        </h2>
        <div className="space-y-5">
          <ProgressBar label="Khizaran Database" value={94} delay={500} mounted={mounted} />
          <ProgressBar label="Tokorellan Intelligence" value={82} delay={650} mounted={mounted} />
          <ProgressBar label="Cross-Reference Index" value={99} delay={800} mounted={mounted} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: "⚡", title: "Power Surge", desc: "Enhanced ability cooldown reduction active." },
          { icon: "◎", title: "Deep Scan", desc: "Identifying hidden enemy signatures." },
          { icon: "◇", title: "Defense Array", desc: "Kinetic shielding at maximum capacity." },
          { icon: "⟐", title: "Neural Hub", desc: "Shared visual feed across all operatives." },
        ].map((item) => (
          <div key={item.title} className="bg-bg-dark/50 p-5 rounded-xl border border-primary/20 text-center hover:border-primary/40 transition-colors">
            <span className="text-primary text-2xl">{item.icon}</span>
            <h4 className="text-sm font-bold uppercase mt-2 mb-1 text-slate-200">{item.title}</h4>
            <p className="text-[10px] text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ label, value, delay, mounted }: { label: string; value: number; delay: number; mounted: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(timer);
    }
  }, [mounted, delay]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-300">{label}</span>
        <span className="text-primary">{value}%</span>
      </div>
      <div className="w-full h-2 bg-bg-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${value}%` : "0%",
            boxShadow: "0 0 10px rgba(13,242,242,0.5)",
          }}
        />
      </div>
    </div>
  );
}

function CharacterSilhouette({ id, color, hovered, large }: { id: string; color: string; hovered: boolean; large?: boolean }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-700"
      style={{
        background: `linear-gradient(135deg, ${color}08 0%, #080c0c 40%, ${color}05 100%)`,
      }}
    >
      {/* Abstract geometric pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at ${id === "linsora" ? "40% 30%" : "60% 35%"}, ${color}15 0%, transparent 50%)`,
      }} />

      {/* Centered icon */}
      <div
        className={`relative transition-all duration-700 ${large ? "w-40 h-40" : "w-32 h-32"}`}
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full border-2 transition-all duration-700"
          style={{
            borderColor: `${color}${hovered ? "60" : "20"}`,
            boxShadow: hovered ? `0 0 40px ${color}20, inset 0 0 40px ${color}10` : "none",
          }}
        />
        <div
          className="absolute inset-3 rounded-full border transition-all duration-700"
          style={{ borderColor: `${color}${hovered ? "40" : "10"}` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-5xl font-black italic uppercase transition-all duration-500"
            style={{
              color: `${color}${hovered ? "80" : "40"}`,
              textShadow: hovered ? `0 0 20px ${color}40` : "none",
            }}
          >
            {id === "linsora" ? "L" : "P"}
          </span>
        </div>
      </div>

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(13,242,242,0.02) 3px, rgba(13,242,242,0.02) 4px)",
        }}
      />

      {/* Corner markers */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 transition-colors duration-500" style={{ borderColor: `${color}30` }} />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 transition-colors duration-500" style={{ borderColor: `${color}30` }} />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 transition-colors duration-500" style={{ borderColor: `${color}30` }} />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 transition-colors duration-500" style={{ borderColor: `${color}30` }} />
    </div>
  );
}
