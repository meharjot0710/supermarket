"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function DashboardShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileNav();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, closeMobileNav]);

  return (
    <div className="min-h-screen">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileNav}
        />
      )}
      <header className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4 text-zinc-900 lg:hidden">
        <button
          type="button"
          aria-expanded={mobileNavOpen}
          aria-controls="admin-sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu size={22} aria-hidden />
        </button>
        <span className="truncate text-sm font-semibold">Supermarket CMS</span>
      </header>
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileNavOpen} onMobileClose={closeMobileNav} />
        <main className="min-h-screen min-w-0 flex-1 bg-zinc-50 pt-14 text-zinc-900 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
