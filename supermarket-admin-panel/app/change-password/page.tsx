"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFirstTime = !!token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(token ? { setupToken: token } : {}),
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to change password");
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2 text-center">
            {isFirstTime ? "Set your password" : "Change password"}
          </h1>
          <p className="text-sm text-zinc-500 mb-8 text-center">
            {isFirstTime
              ? "You're logging in for the first time. Choose a new password (the one from .env will no longer be used)."
              : "Enter your current password and choose a new one."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-zinc-700 mb-1.5">
                {isFirstTime ? "Current password (from .env)" : "Current password"}
              </label>
              <input
                id="current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-zinc-900 bg-white placeholder:text-zinc-500"
                required
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="new" className="block text-sm font-medium text-zinc-700 mb-1.5">
                New password (min 8 characters)
              </label>
              <input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-zinc-900 bg-white placeholder:text-zinc-500"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Confirm new password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-zinc-900 bg-white placeholder:text-zinc-500"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving…" : isFirstTime ? "Set password & continue" : "Change password"}
            </button>
          </form>
          {isFirstTime && (
            <p className="text-xs text-zinc-400 mt-6 text-center">
              After this, only the new password (stored in the database) will work. You can remove ADMIN_PASSWORD from .env.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-100">Loading…</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
}
