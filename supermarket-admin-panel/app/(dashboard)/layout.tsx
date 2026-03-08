import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-zinc-50 text-zinc-900">
        {children}
      </main>
    </div>
  );
}
