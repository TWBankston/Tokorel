"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ParticleCanvas from "@/components/ParticleCanvas";
import BeamCard from "@/components/BeamCard";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  return (
    <AuthProvider>
      <LandingContent />
    </AuthProvider>
  );
}

const BOOKS = [
  {
    title: "Khizara",
    cover: "/images/book-covers/khizara.jpeg",
    description:
      "Where the journey begins. Linsora and Permac are forced together on a journey through the cosmos, uncovering pockets of truth that challenge everything their civilizations thought they knew.",
    label: "Book One — Available Now",
    available: true,
    links: [
      { text: "Paperback", href: "https://www.amazon.com/gp/product/0997554711?ref_=dbs_m_mng_rwt_calw_tpbk_0&storeType=ebooks" },
      { text: "Kindle", href: "https://www.amazon.com/kindle-dbs/hz/subscribe/ku?ref=dbs_p_ebk_r00_pbcb_diupu0&passThroughAsin=B0C8S4TJWW" },
      { text: "Audible", href: "https://www.audible.com/pd/Khizara-Audiobook/B0GP9Y63JS" },
    ],
  },
  {
    title: "Tokorel",
    cover: "/images/book-covers/tokorel-book-2.jpg",
    description:
      "The prophecy deepens. As the central system faces its ultimate trial, the bridge between two enemies becomes the galaxy's only hope.",
    label: "Book Two — Available Now",
    available: true,
    links: [
      { text: "Buy on Amazon", href: "https://www.amazon.com/gp/product/B0DP5HBHZS?ref_=dbs_m_mng_rwt_calw_tpbk_1&storeType=ebooks" },
    ],
  },
  {
    title: "Cornerstone",
    cover: "/images/book-covers/cornerstone.jpg",
    description:
      "The final stand. Everything must be rebuilt from the fragments of the old world — or lost forever.",
    label: "Book Three — Available Now",
    available: true,
    links: [
      { text: "Paperback", href: "https://www.amazon.com/Cornerstone-Tokorel-Mr-Drew-Bankston/dp/B0GRV9VNRL/ref=tmm_pap_swatch_0" },
      { text: "Kindle", href: "https://www.amazon.com/Cornerstone-Book-Tokorel-Drew-Bankston-ebook/dp/B0GS6FSZ67/ref=tmm_kin_swatch_0" },
    ],
  },
];

function LandingContent() {
  const router = useRouter();
  const { user, loading, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (user) {
    router.replace("/portal");
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setStatus("error");
      setErrorMsg("Name is required.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setStatus("error");
      setErrorMsg("A valid email is required.");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    const result = await register(trimmedName, trimmedEmail, password);

    if (result.success) {
      router.push(result.redirectUrl || "/portal");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* ═══════════════════════════════════════════════════
            HERO — Galaxy background, intrigue hook, no form
           ═══════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ParticleCanvas />
            <div className="nebula-layer" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/30 via-transparent to-bg-dark" />
          </div>

          <div className="relative z-10">
            <header className="relative z-30 w-full pt-6 pb-0 -mb-16 md:-mb-24">
              <div className="absolute top-6 right-6 z-40">
                {!loading && !user && (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-bg-dark/60 backdrop-blur-sm text-slate-300 hover:text-white hover:border-primary/60 hover:bg-bg-dark/80 transition-all duration-300 text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Log In
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                <Link href="/" className="relative drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
                  <Image
                    src="/logo/tokorel-logo-transparent.png"
                    alt="Tokorel Series"
                    width={600}
                    height={240}
                    className="object-contain h-40 md:h-56 w-auto"
                    priority
                  />
                </Link>
              </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-28">
              <div className="max-w-4xl text-center space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-100 glow-text leading-[0.9]">
                  ENTER THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">
                    TOKOREL UNIVERSE
                  </span>
                </h1>

                <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                  Can a 200-year-old prophecy and a non-believer <br className="hidden md:block" />
                  <span className="text-accent/80">
                    save two worlds from destruction?
                  </span>
                </p>

                <p className="text-slate-500 text-base max-w-xl mx-auto">
                  An epic sci-fi book series of mystery, love, archaeology, and enemies who can control emotions with a thought.
                </p>

                <button
                  onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-bg-dark font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider text-lg"
                >
                  Get a Free Novella
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </button>

                <p className="text-slate-600 text-xs">
                  Scroll to explore the universe
                </p>
              </div>
            </main>
          </div>
        </div>

        {/* Grid overlay starts below hero */}
        <div className="relative">
          <div className="absolute inset-0 grid-overlay pointer-events-none z-0" />

          {/* ═══════════════════════════════════════════════════
              THE UNIVERSE — What is Tokorel?
             ═══════════════════════════════════════════════════ */}
          <section className="py-24 md:py-32 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="h-px w-12 bg-primary/40" />
                  <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">The Universe</span>
                  <span className="h-px w-12 bg-primary/40" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
                  Two Worlds. One Prophecy.
                </h2>
                <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Two hundred years ago, a war called the Great Battling tore the Khizaran civilization apart. 
                  The exiled founded Tokorel — a hidden planet whose inhabitants developed the terrifying ability 
                  to sense and control the emotions of others. Now, an ancient prophecy threatens to drag 
                  both worlds back into conflict — or forge an impossible peace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="group relative bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-500">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/images/planets/khizara.png"
                      alt="Planet Khizara"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">Khizara</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      A warrior world with emerald seas. Its people settle disputes with knives 
                      — because using a blade is personal. Home to 27 centuries of tradition, 
                      and a deep, instinctive hatred of Tokorellans.
                    </p>
                  </div>
                </div>

                <div className="group relative bg-accent/5 rounded-2xl border border-accent/10 overflow-hidden hover:border-accent/30 transition-all duration-500">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/images/planets/tokorel.png"
                      alt="Planet Tokorel"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">Tokorel</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      A hidden planet of exiles. Its people can sense and manipulate emotions 
                      — a power the galaxy fears. Most Tokorellans hide in plain sight, 
                      disguised as the very civilization that cast them out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              MEET THE CHARACTERS
             ═══════════════════════════════════════════════════ */}
          <section className="py-24 md:py-32 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="h-px w-12 bg-accent/40" />
                  <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Classified Dossiers</span>
                  <span className="h-px w-12 bg-accent/40" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
                  A Forbidden Alliance
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Prophecies have a way of binding even the most stubborn of enemies. 
                  Neither believes in such things, of course. And yet...
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Linsora */}
                <div className="group relative bg-primary/5 rounded-2xl border border-primary/10 p-6 md:p-8 hover:border-primary/30 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <Image
                        src="/images/characters/linsora.png"
                        alt="Linsora Anselm"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Khizaran Vanguard</span>
                        <h3 className="text-2xl font-bold text-slate-100 mt-1">Linsora Anselm</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Half-Terran, half-Khizaran. An archaeologist who can hear the echoes of ancient civilizations. 
                        Her rare gift led her to Pak&rsquo;bor, the oldest settlement on Khizara — and into the path 
                        of the one person she was born to distrust.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-primary/20 text-primary/70 font-medium uppercase tracking-wider">Blade Expert</span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-primary/20 text-primary/70 font-medium uppercase tracking-wider">Echo Listener</span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-primary/20 text-primary/70 font-medium uppercase tracking-wider">Archaeologist</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permac */}
                <div className="group relative bg-accent/5 rounded-2xl border border-accent/10 p-6 md:p-8 hover:border-accent/30 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-accent/20 group-hover:border-accent/40 transition-colors">
                      <Image
                        src="/images/characters/permac.png"
                        alt="Permac Sude"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">Tokorellan Empath</span>
                        <h3 className="text-2xl font-bold text-slate-100 mt-1">Permac Sude</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        A Tokorellan who has spent his life passing as Khizaran. He can sense and control the emotions 
                        of anyone around him — and most never realize it. Only one person in the entire galaxy 
                        can tell when he&rsquo;s using his power.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-accent/20 text-accent/70 font-medium uppercase tracking-wider">Empath</span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-accent/20 text-accent/70 font-medium uppercase tracking-wider">Mind Control</span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-accent/20 text-accent/70 font-medium uppercase tracking-wider">Infiltrator</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              THE BOOKS — Show the series
             ═══════════════════════════════════════════════════ */}
          <section className="py-24 md:py-32 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="h-px w-12 bg-primary/40" />
                  <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">The Book Series</span>
                  <span className="h-px w-12 bg-primary/40" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
                  The Tokorel Series
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  By <strong className="text-slate-200">Drew Bankston</strong>. For fans of Isaac Asimov, Arthur C. Clarke, Ray Bradbury, and Frank Herbert.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BOOKS.map((book) => (
                  <div
                    key={book.title}
                    className={`bg-primary/5 border border-primary/10 p-6 rounded-xl hover:bg-primary/10 transition-all group ${book.available ? "" : "opacity-70"}`}
                  >
                    <div className="aspect-[2/3] mb-6 rounded-lg shadow-lg overflow-hidden border border-primary/20">
                      <Image
                        src={book.cover}
                        alt={`Book cover: ${book.title}`}
                        width={400}
                        height={600}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-slate-100 mb-2">{book.title}</h4>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">{book.description}</p>
                    <span className={`text-xs font-bold tracking-widest uppercase ${book.available ? "text-primary" : "text-slate-500"}`}>
                      {book.label}
                    </span>
                    {book.links.length > 0 && (
                      <div className="flex flex-col gap-2 mt-4">
                        {book.links.map((link) => (
                          <a
                            key={link.text}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg border border-primary/20 bg-primary/5 text-sm text-slate-300 font-medium hover:bg-primary/15 hover:border-primary/40 hover:text-white transition-all group/link"
                          >
                            {link.text}
                            <span className="text-primary text-xs opacity-60 group-hover/link:opacity-100 transition-opacity">&rarr;</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              FREE NOVELLA + PREQUEL SECTION
             ═══════════════════════════════════════════════════ */}
          <section className="py-24 md:py-32 px-6 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition duration-1000 pointer-events-none" />
                <BeamCard>
                  <Image
                    src="/images/book-covers/the-sentence-tokorel-prequel.png"
                    alt="Book cover of The Sentence — A Tokorel Prequel"
                    width={600}
                    height={900}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 block"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none" />
                </BeamCard>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-bold text-xs uppercase tracking-wider">Free with signup</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Start with the Prequel
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed">
                  <strong className="text-white">&lsquo;The Sentence&rsquo;</strong> is the prequel novella that sets the stage 
                  for the entire Tokorel saga. In the shadow of twin moons, a forbidden alliance 
                  threatens the core of the system. This is where it all begins.
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Create your free account and get:</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-primary mt-0.5 text-base">&#10003;</span>
                      <span><strong className="text-white">&lsquo;The Sentence&rsquo;</strong> — the exclusive prequel novella, delivered instantly</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-primary mt-0.5 text-base">&#10003;</span>
                      <span>Interactive character dossiers and universe archives</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-primary mt-0.5 text-base">&#10003;</span>
                      <span>Early access to new lore discoveries and Tokorel stories</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-bg-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider mt-2"
                >
                  Sign Up &amp; Get Your Copy
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SIGNUP FORM — Single CTA
             ═══════════════════════════════════════════════════ */}
          <section id="signup" className="py-24 md:py-32 px-6 relative z-10 text-center scroll-mt-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(13,242,242,0.1)_0%,transparent_70%)]" />

            <div className="max-w-lg mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-100 glow-text">
                Begin the Journey
              </h2>

              <p className="text-slate-300 text-lg max-w-md mx-auto">
                Create your free account to get the prequel novella and unlock the full Tokorel Universe experience.
              </p>

              <div className="glass-panel p-2 rounded-lg shadow-[0_0_50px_rgba(13,242,242,0.15)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 px-6 py-4 text-lg"
                    />
                  </div>
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 px-6 py-4 text-lg"
                      autoComplete="email"
                    />
                  </div>
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password (8+ characters)"
                      className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 px-6 py-4 text-lg"
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary hover:bg-primary/90 text-bg-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider disabled:opacity-60 text-lg"
                  >
                    {status === "loading" ? "Creating Account…" : "Get Your Free Novella"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm px-4">{errorMsg}</p>
                  )}
                </form>
                <p className="text-center text-xs text-slate-500 mt-3 mb-1">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Log in
                  </Link>
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-slate-500 text-xs">
                  Your password creates a free account that unlocks the novella, character dossiers, and universe archives.
                </p>
                <p className="text-slate-600 text-[11px] max-w-sm mx-auto leading-relaxed">
                  Unsubscribe at any time. We respect your privacy — your information will never be sold, shared, or distributed to third parties.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              PROPHECY QUOTE
             ═══════════════════════════════════════════════════ */}
          <section className="py-16 px-6 relative z-10">
            <div className="max-w-4xl mx-auto relative rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
              <div className="absolute inset-0 parchment-texture" />
              <div className="relative z-10 py-12 px-8 text-center space-y-4">
                <blockquote className="text-xl md:text-2xl font-light italic text-primary/80 max-w-3xl mx-auto leading-relaxed">
                  &ldquo;From the blood of two enemies, a bridge shall be born.&rdquo;
                </blockquote>
                <p className="text-xs uppercase tracking-[0.4em] text-primary/30 font-bold">
                  The Fragment of Khizara
                </p>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      {/* Background Ambient Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <AudioPlayer />
    </>
  );
}
