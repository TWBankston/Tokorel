"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function EmailPreferencesPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <EmailPreferencesContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function EmailPreferencesContent() {
  const { user, logout } = useAuth();
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/auth/email-preferences.php?action=status", { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(data.subscribed);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkStatus(); }, [checkStatus]);

  async function handleUnsubscribe() {
    if (!confirm("Are you sure you want to unsubscribe from all email communications? You can re-subscribe at any time.")) return;

    setActionLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/auth/email-preferences.php?action=unsubscribe", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribed(false);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to unsubscribe." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setActionLoading(false);
    }
  }

  async function handleResubscribe() {
    setActionLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/auth/email-preferences.php?action=resubscribe", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribed(true);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to re-subscribe." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none" />

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
                <Link href="/account" className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Account
                </Link>
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
              <nav className="flex items-center gap-6 flex-wrap justify-center">
                <Link href="/portal" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/portal-downloads" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Downloads
                </Link>
                <Link href="/account" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Account
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

        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-16 space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Email Preferences</h1>
            <p className="text-slate-400 mt-2">
              Manage your email subscription for the Tokorel Universe. We only send updates about new lore discoveries, book releases, and exclusive content.
            </p>
          </div>

          {/* Current status */}
          <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-0.5">
                <MailIcon />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-100">Email Notifications</h2>
                <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
              </div>
              <div>
                {loading ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-xs text-slate-400">
                    Checking…
                  </span>
                ) : subscribed ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-xs text-green-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Subscribed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/30 text-xs text-slate-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    Unsubscribed
                  </span>
                )}
              </div>
            </div>

            <div className="h-px bg-primary/10" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-200">What you receive:</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-primary">&#10003;</span>
                  New book and novella announcements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">&#10003;</span>
                  Lore discoveries and universe updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">&#10003;</span>
                  Exclusive content and early access opportunities
                </li>
              </ul>
            </div>

            <div className="h-px bg-primary/10" />

            {message && (
              <div className={`px-4 py-3 rounded-lg text-sm border ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                {message.text}
              </div>
            )}

            {!loading && (
              subscribed ? (
                <div className="space-y-3">
                  <button
                    onClick={handleUnsubscribe}
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/50 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading ? "Processing…" : "Unsubscribe from Emails"}
                  </button>
                  <p className="text-[11px] text-slate-600">
                    You can re-subscribe at any time from this page.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleResubscribe}
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-bg-dark text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading ? "Processing…" : "Re-subscribe to Emails"}
                  </button>
                  <p className="text-[11px] text-slate-600">
                    Start receiving Tokorel Universe updates again.
                  </p>
                </div>
              )
            )}
          </section>

          {/* Privacy notice */}
          <section className="bg-bg-dark/50 border border-primary/5 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              <h3 className="text-sm font-bold text-slate-200">Privacy &amp; Data</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your personal information is never sold, shared, or distributed to third parties. We only use your email address to send you updates about the Tokorel Universe. You can unsubscribe at any time using the button above or through any unsubscribe link in our emails. For questions, contact us at{" "}
              <a href="mailto:drew@tokorel.com" className="text-primary hover:text-primary/80 transition-colors">drew@tokorel.com</a>.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
