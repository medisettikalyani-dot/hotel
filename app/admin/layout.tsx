"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Sparkles,
  CalendarX,
  ExternalLink,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Lock,
  ArrowRight,
  AlertCircle,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Overview & Metrics",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Flat Inventory (1-5 BHK)",
    href: "/admin/inventory",
    icon: Building2,
  },
  {
    label: "Reservations & Collections",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Stay Add-On Services",
    href: "/admin/services",
    icon: Sparkles,
  },
  {
    label: "Calendar Blackouts",
    href: "/admin/calendar",
    icon: CalendarX,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, isLoading, signInWithEmail, loginAsDemoAdmin, signOut } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Admin Login Gate Form State
  const [adminEmail, setAdminEmail] = React.useState("reservation@flatel.in");
  const [adminPassword, setAdminPassword] = React.useState("");
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    const res = await signInWithEmail(adminEmail, adminPassword);
    setIsAuthenticating(false);

    if (res.error) {
      setAuthError(res.error);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121316] flex flex-col items-center justify-center text-[#D4AF37] gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-[#A1A1AA]">Verifying Executive Access...</span>
      </div>
    );
  }

  // 2. Access Denied / Admin Authentication Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex items-center justify-center p-4 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
        <div className="w-full max-w-md rounded-2xl bg-[#181A22] border border-[#2B2E38] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880]" />

          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#222530] border border-[#2E3038] text-[#D4AF37] mb-3">
                <Lock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                Owner Administration Access
              </h1>
              <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
                This portal is strictly restricted to authorized Flatel Hospitality leadership (<code className="text-[#D4AF37]">reservation@flatel.in</code>).
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50 cursor-pointer"
              >
                <span>{isAuthenticating ? "Verifying..." : "Authenticate as Administrator"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#262835] space-y-3">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="w-full py-2.5 px-3 rounded-xl bg-[#222530] hover:bg-[#2A2E3B] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>One-Click Owner Demo Login</span>
              </button>

              <Link
                href="/"
                className="flex items-center justify-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors pt-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Flatel Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Admin Canvas
  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col md:flex-row font-sans selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#181A22] border-b border-[#2B2E38] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-sm tracking-wider text-[#F5F5F7]">
            FLATEL <span className="text-[#D4AF37]">ADMIN</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-1.5 rounded-lg bg-[#222530] text-[#D4AF37] border border-[#2E3038]"
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "w-full md:w-64 bg-[#161820] border-r border-[#2B2E38] flex flex-col justify-between shrink-0 z-30 transition-all duration-300",
          "md:min-h-screen md:sticky md:top-0 md:h-screen",
          isMobileNavOpen ? "block" : "hidden md:flex"
        )}
      >
        <div className="p-5 flex flex-col gap-6">
          {/* Logo & Portal Crest */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                FLATEL <span className="text-[#D4AF37]">ADMIN</span>
              </span>
            </Link>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate">Owner: {user?.email}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider px-2 mb-1">
              Management
            </span>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#D4AF37] text-[#121316] shadow-md shadow-[#D4AF37]/20 font-bold"
                      : "text-[#A1A1AA] hover:bg-[#1E212B] hover:text-[#F5F5F7]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-[#121316]" : "text-[#D4AF37]")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#2E3038] flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#A1A1AA] hover:text-white hover:bg-[#1E212B] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>View Live Website</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#71717A]" />
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Admin</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 w-full min-h-screen bg-[#121316] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
