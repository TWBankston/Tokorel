"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ParticleCanvas from "@/components/ParticleCanvas";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
}

function LoginContent() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/portal");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email.trim(), password);
    if (result.success) {
      router.push("/portal");
    } else {
      setError(result.error || "Login failed.");
      setSubmitting(false);
    }
  }

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Full-viewport galaxy background */}
      <div className="fixed inset-0 z-0">
        <ParticleCanvas />
        <div className="nebula-layer" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/20 via-transparent to-bg-dark/40" />
      </div>

      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & intro */}
          <div className="text-center">
            <Link href="/" className="inline-block drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
              <Image
                src="/logo/tokorel-logo-transparent.png"
                alt="Tokorel Series"
                width={500}
                height={200}
                className="object-contain h-36 w-auto mx-auto"
                priority
              />
            </Link>
            <h1 className="mt-8 text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Welcome Back, Agent
            </h1>
            <p className="mt-3 text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
              The archives await. Sign in to continue your journey through the Tokorel Universe.
            </p>
          </div>

          {/* Login form */}
          <div className="glass-panel p-6 rounded-xl shadow-[0_0_60px_rgba(13,242,242,0.08)] border border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5 font-medium">
                  Email
                </label>
                <div className="flex rounded-lg border border-primary/30 bg-bg-dark/80 overflow-hidden">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-600 focus:ring-0 px-5 py-4"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5 font-medium">
                  Password
                </label>
                <div className="flex rounded-lg border border-primary/30 bg-bg-dark/80 overflow-hidden">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-600 focus:ring-0 px-5 py-4"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-bg-dark font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider disabled:opacity-60"
              >
                {submitting ? "Authenticating…" : "Access Archives"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
