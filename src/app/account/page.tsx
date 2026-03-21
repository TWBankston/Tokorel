"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AccountContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function AccountContent() {
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setStatus("error");
      setMessage("New password must be different from the current password.");
      return;
    }

    try {
      const res = await fetch("/auth/change-password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to update password.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
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
                <Link href="/account" className="text-sm font-medium uppercase tracking-widest text-primary">
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
                <Link href="/portal-dossiers" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  Dossiers
                </Link>
                <Link href="/account" className="text-xs font-medium uppercase tracking-widest text-primary">
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

        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
          {/* Profile Info */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100">{user?.name}</h1>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Role</span>
                <p className="text-slate-200 font-medium mt-1 capitalize">{user?.role}</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-slate-200 font-medium">Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <LockIcon />
              <h2 className="text-xl font-bold text-slate-100">Change Password</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-xs text-slate-400 uppercase tracking-widest font-medium mb-2">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:ring-0 focus:border-primary/60 transition-colors"
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-xs text-slate-400 uppercase tracking-widest font-medium mb-2">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:ring-0 focus:border-primary/60 transition-colors"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs text-slate-400 uppercase tracking-widest font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:ring-0 focus:border-primary/60 transition-colors"
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              {message && (
                <div className={`px-4 py-3 rounded-lg text-sm border ${
                  status === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary/90 text-bg-dark font-bold px-6 py-3 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? "Updating…" : "Update Password"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-primary"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
