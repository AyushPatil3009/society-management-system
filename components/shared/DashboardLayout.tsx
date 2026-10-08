import Link from "next/link";
import { auth, signOut } from "@/auth";
import { NAV_ITEMS, SOCIETY_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "ADMIN" | "RESIDENT" | "STAFF";
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const navLinks = NAV_ITEMS[role] || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* 1. Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/95 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Society Logo & Brand */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
                🏢
              </div>
              <div>
                <h2 className="font-bold text-sm text-white tracking-tight leading-tight">
                  {SOCIETY_CONFIG.shortName}
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">
                  {role} PANEL
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info & Sign Out Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between mb-3">
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">
                {session.user.name || "Society Member"}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {session.user.email}
              </p>
            </div>
            <Badge status={(session.user as any).status || "ACTIVE"} />
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/40 border border-slate-700/60 text-xs font-medium text-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* 2. Main Content Viewport */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}