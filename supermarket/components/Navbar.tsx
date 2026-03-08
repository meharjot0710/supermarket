"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About Us", href: "/about", isRoute: true },
  { label: "Products", href: "/products", isRoute: true },
  { label: "Contact Us", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-accent px-8 py-4 flex flex-col md:flex-row justify-between items-center border-b border-accent-foreground/5">
      <div className="flex w-full md:w-auto justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SuperMarketing"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        <button
          className="md:hidden text-accent-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul
        className={`${
          mobileOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-6 md:gap-10 text-[11px] font-bold tracking-tight uppercase text-accent-foreground mt-4 md:mt-0 w-full md:w-auto`}
      >
        {navItems.map((item) => {
          const isActive = item.isRoute && pathname === item.href;

          return (
            <li key={item.label}>
              {item.isRoute ? (
                <Link
                  href={item.href}
                  className={`hover:opacity-50 transition-opacity ${
                    isActive
                      ? "underline underline-offset-4 decoration-accent-foreground/20"
                      : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="hover:opacity-50 transition-opacity"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
