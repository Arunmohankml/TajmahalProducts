"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Package,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Lock,
} from "lucide-react";
import {
  getAdminSession,
  setAdminSession,
  clearAdminSession,
} from "@/lib/admin_auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const s = getAdminSession();
    if (s) {
      setSession(s);
    }
    setLoading(false);

    const onAuthChange = () => {
      setSession(getAdminSession());
    };
    window.addEventListener("tajmahal_admin_auth_changed", onAuthChange);
    return () => window.removeEventListener("tajmahal_admin_auth_changed", onAuthChange);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const inputClean = emailInput.trim().toLowerCase();

    // Access strictly restricted to correct password: naween20988
    if (passcodeInput === "naween20988") {
      const emailToUse = inputClean || "tmproducts.bhadohi@gmail.com";
      setAdminSession(emailToUse, "Tajmahal Admin");
      setSession({ email: emailToUse, name: "Tajmahal Admin" });
    } else {
      setAuthError("Invalid password. Access restricted to authorized administration.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-white/10 border border-[#0F2C59] flex items-center justify-center text-white animate-pulse">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-white">
          Authenticating Administrative Console...
        </p>
      </div>
    );
  }

  // Not signed in
  if (!session) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white text-[#1C1C1C] border border-[#EBEBEB] p-8 shadow-2xl relative">
          <div className="h-1 bg-[#0F2C59] -mt-8 -mx-8 mb-6" />

          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F8F9FA] border border-[#EBEBEB] text-[#0F2C59] mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
              Tajmahal Products
            </h1>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
              Executive Administration & Catalogue Control
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#767676] mb-1">
                Staff Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. tmproducts.bhadohi@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] text-[#1C1C1C] text-xs focus:outline-none focus:border-[#0F2C59]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#767676] mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] text-[#1C1C1C] text-xs focus:outline-none focus:border-[#0F2C59]"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 border border-rose-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0F2C59] hover:bg-[#0A1C38] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm mt-2"
            >
              Access Admin Management
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#EBEBEB] text-center">
            <Link
              href="/"
              className="text-xs text-[#767676] hover:text-[#1C1C1C] transition-colors uppercase tracking-wider"
            >
              ← Return to Public Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Admin View
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1C] flex flex-col font-sans">
      {/* Top Heritage Admin Bar */}
      <header className="bg-[#1C1C1C] text-white border-b border-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/10 border border-[#0F2C59] flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#E8D39D]" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base uppercase tracking-[0.16em] font-normal leading-tight">
                Tajmahal Products
              </div>
              <div className="text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#E8D39D] truncate max-w-[170px] sm:max-w-none">
                Admin Console · {session.email}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors uppercase tracking-wider text-[10px] sm:text-[11px]"
            >
              <span className="hidden sm:inline">View </span>
              <span>Store</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <button
              onClick={clearAdminSession}
              className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 bg-red-900/60 hover:bg-red-900 text-rose-200 transition-colors uppercase tracking-wider text-[10px] sm:text-[11px]"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Shortened on Mobile as requested */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 border-t border-white/10 pt-1 overflow-x-auto no-scrollbar">
          <Link
            href="/admin"
            className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 ${
              pathname === "/admin"
                ? "border-[#0F2C59] text-white bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              <span className="hidden sm:inline">Manage </span>Products
            </span>
          </Link>

          <Link
            href="/admin/users"
            className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 ${
              pathname === "/admin/users"
                ? "border-[#0F2C59] text-white bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              Staff<span className="hidden sm:inline"> Emails</span>
            </span>
          </Link>

          <Link
            href="/admin/orders"
            className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 ${
              pathname === "/admin/orders"
                ? "border-[#0F2C59] text-white bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              <span className="hidden sm:inline">Buyer </span>Inquiries
            </span>
          </Link>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
