import Link from "next/link";
import {
  Type,
  Store,
  Tags,
  Package,
  Users,
  Briefcase,
  Mail,
  FileText,
  Search,
} from "lucide-react";

const sections = [
  { href: "/hero", label: "Hero Banner", desc: "Home page hero text only", icon: Type },
  { href: "/stores", label: "Store Listings", desc: "Names & ordering", icon: Store },
  { href: "/brands", label: "Brand Listings", desc: "Names & ordering", icon: Tags },
  { href: "/products", label: "Products", desc: "Add / edit / remove, descriptions", icon: Package },
  { href: "/leadership", label: "Leadership", desc: "Names, titles, short messages", icon: Users },
  { href: "/careers", label: "Careers / Jobs", desc: "Job listings", icon: Briefcase },
  { href: "/newsletter", label: "Newsletter", desc: "Newsletter content", icon: Mail },
  { href: "/forms", label: "Forms & Contact", desc: "Form text, confirmation messages", icon: FileText },
  { href: "/seo", label: "SEO", desc: "Page titles, meta descriptions", icon: Search },
];

export default function Home() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">CMS Dashboard</h1>
        <p className="text-zinc-600 mb-8">
          Edit operational and frequently updated content only. Layout, images, and design are fixed.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ href, label, desc, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 p-5 rounded-xl border border-zinc-200 bg-white hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="rounded-lg bg-zinc-100 p-2.5">
                <Icon size={22} className="text-zinc-600" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900">{label}</h2>
                <p className="text-sm text-zinc-500 mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
