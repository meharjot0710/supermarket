"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Type,
  Store,
  Tags,
  Package,
  Users,
  Briefcase,
  Mail,
  FileText,
  Search,
  Key,
  LogOut,
  Inbox,
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/submissions", label: "Form submissions", icon: Inbox },
  { href: "/hero", label: "Hero Banner", icon: Type },
  { href: "/stores", label: "Store Listings", icon: Store },
  { href: "/brands", label: "Brand Listings", icon: Tags },
  { href: "/products", label: "Products", icon: Package },
  { href: "/leadership", label: "Leadership", icon: Users },
  { href: "/careers", label: "Careers / Jobs", icon: Briefcase },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
  { href: "/forms", label: "Forms & Contact", icon: FileText },
  { href: "/seo", label: "SEO", icon: Search },
  { href: "/change-password", label: "Change password", icon: Key },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-zinc-100 flex flex-col border-r border-zinc-800">
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
