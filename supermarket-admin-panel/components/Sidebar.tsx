"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Type,
  Mail,
  Search,
  Key,
  LogOut,
  Inbox,
  Image as ImageIcon,
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/submissions", label: "Form submissions", icon: Inbox },
  { href: "/hero", label: "Hero Banner", icon: Type },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
  { href: "/home-media", label: "Home Media", icon: ImageIcon },
  { href: "/seo", label: "SEO", icon: Search },
  { href: "/change-password", label: "Change password", icon: Key },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    onMobileClose?.();
  }, [pathname, onMobileClose]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      id="admin-sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 max-w-[min(16rem,100vw-3rem)] shrink-0 flex-col border-r border-zinc-800 bg-zinc-900 text-zinc-100 transition-transform duration-200 ease-out lg:static lg:z-auto lg:h-auto lg:min-h-screen lg:max-w-none lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="p-6 border-b border-zinc-800">
        <h1 className="font-bold text-lg tracking-tight">Supermarket CMS</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Content only · No layout/edit</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-zinc-800 space-y-0.5">
        <Link
          href="/change-password"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 w-full"
        >
          <Key size={18} />
          Change password
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 w-full"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
