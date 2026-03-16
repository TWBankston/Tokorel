"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const REACH_API_URL = "https://api.hostinger.com/api/reach/v1/contacts";
const REACH_API_KEY = "IR5Su1tXK7vUrQKCEbswLhhUYxla8aS4qXZ9IpcZe07fa41e";

interface SignupFormProps {
  variant: "hero" | "cta";
}

export default function SignupForm({ variant }: SignupFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

    try {
      await fetch(REACH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACH_API_KEY}`,
        },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
        mode: "cors",
      }).catch(() => {});

      router.push("/download");
    } catch {
      router.push("/download");
    }
  }

  if (variant === "hero") {
    return (
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
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-primary hover:bg-primary/90 text-bg-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider disabled:opacity-60"
          >
            {status === "loading" ? "Transmitting…" : "Sign up for immediate download"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm px-4">{errorMsg}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
        <label className="block">
          <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 bg-transparent border-none text-slate-100 px-6 py-4 focus:ring-0"
            />
          </div>
        </label>
        <label className="block">
          <div className="flex rounded-lg border border-primary/40 bg-bg-dark/80 overflow-hidden">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="transmission_email@tokorel.com"
              className="flex-1 bg-transparent border-none text-slate-100 px-6 py-4 focus:ring-0"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-primary text-bg-dark px-8 font-bold uppercase hover:bg-white transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Initialize"}
            </button>
          </div>
        </label>
        {status === "error" && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}
      </form>
      <div className="flex items-center gap-4 text-slate-500 uppercase text-[10px] tracking-[0.4em]">
        <span>Secure Link</span>
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span>Zero Lag</span>
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span>Encrypted</span>
      </div>
    </div>
  );
}
