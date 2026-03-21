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

export default function TestSignupPage() {
  return (
    <AuthProvider>
      <TestSignupContent />
    </AuthProvider>
  );
}

function TestSignupContent() {
  const router = useRouter();
  const { user, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [ctaName, setCtaName] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaPassword, setCtaPassword] = useState("");
  const [ctaStatus, setCtaStatus] = useState<"idle" | "loading" | "error">("idle");
  const [ctaErrorMsg, setCtaErrorMsg] = useState("");

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

  async function handleCtaSubmit(e: FormEvent) {
    e.preventDefault();
    setCtaStatus("loading");
    setCtaErrorMsg("");

    const trimmedName = ctaName.trim();
    const trimmedEmail = ctaEmail.trim();

    if (!trimmedName) {
      setCtaStatus("error");
      setCtaErrorMsg("Name is required.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setCtaStatus("error");
      setCtaErrorMsg("A valid email is required.");
      return;
    }
    if (ctaPassword.length < 8) {
      setCtaStatus("error");
      setCtaErrorMsg("Password must be at least 8 characters.");
      return;
    }

    const result = await register(trimmedName, trimmedEmail, ctaPassword);

    if (result.success) {
      router.push(result.redirectUrl || "/portal");
    } else {
      setCtaStatus("error");
      setCtaErrorMsg(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {/* Galaxy background covering header + hero from the very top */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ParticleCanvas />
            <div className="nebula-layer" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/30 via-transparent to-bg-dark" />
          </div>

          <div className="relative z-10">
            <header className="relative z-30 w-full flex justify-center pt-6 pb-0 -mb-16 md:-mb-24">
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
            </header>

            {/* ── Hero Section ──────────────────────────── */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
              <div className="max-w-4xl text-center space-y-8">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-100 glow-text leading-[0.9]">
                  ENTER THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">
                    TOKOREL UNIVERSE
                  </span>
                </h2>

                <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                  Two civilizations divided for 200 years. <br />
                  <span className="text-accent/80">
                    One prophecy that could change everything.
                  </span>
                </p>

                {/* Value proposition callout */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">Free Novella</span>
                  <span className="h-4 w-px bg-accent/40" />
                  <span className="text-slate-300 text-sm">
                    Get <em className="text-white font-semibold not-italic">&lsquo;The Sentence&rsquo;</em> — a Tokorel prequel — instantly when you sign up
                  </span>
                </div>

                {/* Hero signup form */}
                <div className="mt-8 mx-auto glass-panel p-2 rounded-lg shadow-[0_0_50px_rgba(13,242,242,0.15)] max-w-md">
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
                        placeholder="Enter your email"
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
                      className="bg-primary hover:bg-primary/90 text-bg-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider disabled:opacity-60"
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

                <p className="text-slate-400 text-sm mt-4 font-medium">
                  Readers who join the archives receive early lore, discoveries, and new Tokorel stories.
                </p>
              </div>
            </main>
          </div>
        </div>

        {/* Grid starts below the hero */}
        <div className="relative">
          <div className="absolute inset-0 grid-overlay pointer-events-none z-0" />

          {/* ── Forbidden Connection Section ──────────── */}
          <section className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Book Cover with Beam Effect */}
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

              {/* Story Copy */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-accent">
                  <span className="h-px w-12 bg-accent" />
                  <span className="uppercase tracking-widest text-sm font-bold">
                    Classified Files
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  A Forbidden Connection
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed">
                  The Tokorel Saga is a character-driven epic science-fiction
                  universe featuring ancient prophecy, divided worlds, and a
                  destiny that could unite the galaxy.
                </p>

                <div className="pt-4 space-y-3">
                  <h3 className="text-lg font-semibold text-slate-200">
                    What you get when you sign up:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-slate-300">
                      <span className="text-primary mt-1 text-lg">&#10003;</span>
                      <span><strong className="text-white">&lsquo;The Sentence&rsquo;</strong> — the exclusive prequel novella, delivered instantly</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <span className="text-primary mt-1 text-lg">&#10003;</span>
                      <span>Early access to new lore discoveries and Tokorel stories</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <span className="text-primary mt-1 text-lg">&#10003;</span>
                      <span>Access to character dossiers, universe archives, and more</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── Final CTA Section ────────────────────── */}
          <section className="py-32 px-6 relative z-10 text-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(13,242,242,0.1)_0%,transparent_70%)]" />

            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-100 glow-text">
                Are You Ready to <br /> Begin the Journey?
              </h2>

              <p className="text-slate-300 text-lg max-w-xl mx-auto">
                Sign up now and <strong className="text-white">get &lsquo;The Sentence&rsquo; free</strong> — 
                a prequel novella that takes you into the Tokorel universe before the saga begins.
              </p>

              {/* Bottom CTA form */}
              <div className="flex flex-col items-center gap-6">
                <form onSubmit={handleCtaSubmit} className="w-full max-w-md space-y-3">
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="text"
                      required
                      value={ctaName}
                      onChange={(e) => setCtaName(e.target.value)}
                      placeholder="Your name"
                      className="flex-1 bg-transparent border-none text-slate-100 px-6 py-4 focus:ring-0"
                    />
                  </div>
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="email"
                      required
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 bg-transparent border-none text-slate-100 px-6 py-4 focus:ring-0"
                      autoComplete="email"
                    />
                  </div>
                  <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                    <input
                      type="password"
                      required
                      value={ctaPassword}
                      onChange={(e) => setCtaPassword(e.target.value)}
                      placeholder="Create a password (8+ characters)"
                      className="flex-1 bg-transparent border-none text-slate-100 px-6 py-4 focus:ring-0"
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={ctaStatus === "loading"}
                    className="w-full bg-primary text-bg-dark px-8 py-4 font-bold uppercase rounded-lg hover:bg-white transition-colors disabled:opacity-60 tracking-wider"
                  >
                    {ctaStatus === "loading" ? "Creating Account…" : "Claim Your Free Copy"}
                  </button>
                  {ctaStatus === "error" && (
                    <p className="text-red-400 text-sm text-center">{ctaErrorMsg}</p>
                  )}
                </form>
                <p className="text-center text-xs text-slate-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Log in
                  </Link>
                </p>
                <div className="flex items-center gap-4 text-slate-500 uppercase text-[10px] tracking-[0.4em]">
                  <span>Secure Link</span>
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>Zero Lag</span>
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>Encrypted</span>
                </div>
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
