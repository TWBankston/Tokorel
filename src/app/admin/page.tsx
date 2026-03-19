"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";

interface UserRecord {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="admin">
        <AdminContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function AdminContent() {
  const { logout } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resetModal, setResetModal] = useState<UserRecord | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/auth/admin/users.php?action=list", { credentials: "include" });
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      } else {
        setError(data.error || "Failed to load users.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function handleDelete(userId: number, email: string) {
    if (!confirm(`Delete user ${email}? This cannot be undone.`)) return;

    const res = await fetch("/auth/admin/users.php?action=delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setActionMsg(`Deleted ${email}`);
      fetchUsers();
    } else {
      setActionMsg(data.error || "Delete failed.");
    }
    setTimeout(() => setActionMsg(""), 3000);
  }

  async function handleResetPassword() {
    if (!resetModal || newPassword.length < 8) return;

    const res = await fetch("/auth/admin/users.php?action=reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_id: resetModal.id, new_password: newPassword }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setActionMsg(`Password reset for ${resetModal.email}`);
      setResetModal(null);
      setNewPassword("");
    } else {
      setActionMsg(data.error || "Reset failed.");
    }
    setTimeout(() => setActionMsg(""), 3000);
  }

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="relative z-30 w-full pt-6 pb-8">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className="drop-shadow-[0_0_40px_rgba(13,242,242,0.25)]">
              <Image
                src="/logo/tokorel-logo-transparent.png"
                alt="Tokorel Series"
                width={400}
                height={160}
                className="object-contain h-28 w-auto"
                priority
              />
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/portal" className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                Books
              </Link>
              <Link href="/admin" className="text-xs font-medium uppercase tracking-widest text-primary">
                Admin
              </Link>
              <button onClick={logout} className="text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer">
                Logout
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-100">User Management</h1>
            <span className="text-sm text-slate-500">{users.length} users</span>
          </div>

          {actionMsg && (
            <div className="bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-lg text-sm">
              {actionMsg}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
              <p className="text-slate-500 text-sm mt-4">Loading users...</p>
            </div>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className="overflow-x-auto border border-primary/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/5 text-left">
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Name</th>
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Email</th>
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Role</th>
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Signed Up</th>
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Last Login</th>
                    <th className="px-4 py-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-4 py-3 text-slate-200">{u.name}</td>
                      <td className="px-4 py-3 text-slate-300">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold uppercase tracking-widest ${u.role === "admin" ? "text-accent" : "text-slate-500"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setResetModal(u); setNewPassword(""); }}
                            className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
                          >
                            Reset PW
                          </button>
                          {u.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(u.id, u.email)}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {resetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-dark border border-primary/20 rounded-xl p-8 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-lg font-bold text-slate-100">
              Reset Password for {resetModal.email}
            </h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (8+ characters)"
              className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-0 focus:border-primary"
              minLength={8}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setResetModal(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={newPassword.length < 8}
                className="px-4 py-2 text-sm bg-primary text-bg-dark font-bold rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
