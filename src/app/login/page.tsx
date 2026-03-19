"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
              <Image
                src="/logo/tokorel-logo-transparent.png"
                alt="Tokorel Series"
                width={400}
                height={160}
                className="object-contain h-28 w-auto mx-auto"
                priority
              />
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-slate-100">
              Welcome Back
            </h1>
            <p className="mt-2 text-slate-400 text-sm">
              Enter your credentials to access the archives.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 px-6 py-4"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-500 focus:ring-0 px-6 py-4"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90 text-bg-dark font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-wider disabled:opacity-60"
            >
              {submitting ? "Authenticating..." : "Access Archives"}
            </button>
          </form>

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

