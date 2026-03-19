"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
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
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="relative z-30 w-full pt-6 pb-4">
          <div className="flex justify-center">
            <Link href="/" className="drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
              <Image
                src="/logo/tokorel-logo-transparent.png"
                alt="Tokorel Series"
                width={500}
                height={200}
                className="object-contain h-40 w-auto"
                priority
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(13,242,242,0.08)_0%,transparent_60%)]" />
          </div>

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

            <div className="mt-12 mx-auto glass-panel p-2 rounded-lg shadow-[0_0_50px_rgba(13,242,242,0.15)] max-w-md">
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
                    placeholder="Enter your interstellar email"
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
                  {status === "loading" ? "Creating Account…" : "Create Account & Enter"}
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
              Create your account to access the full Tokorel Universe archives.
            </p>
          </div>
        </main>

        <Footer />
      </div>

      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </>
  );
}
