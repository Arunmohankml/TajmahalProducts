"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { setAdminSession, MASTER_ADMIN_EMAILS } from "@/lib/admin_auth";
import { tajmahalDb } from "@/lib/tajmahal_db";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputClean = email.trim().toLowerCase();
    const staffList = await tajmahalDb.getStaffEmails();
    const isStaff = staffList.some((s) => s.email.toLowerCase() === inputClean);
    const isMaster = MASTER_ADMIN_EMAILS.some((m) => m.toLowerCase() === inputClean);

    if (
      passcode === "tajmahal" ||
      passcode === "tajmahal1967" ||
      isMaster ||
      isStaff
    ) {
      const emailToUse = inputClean || "tmproducts.bhadohi@gmail.com";
      setAdminSession(emailToUse, "Tajmahal Administrator");
      router.push(nextUrl);
    } else {
      setError("Invalid credentials. Please enter authorized staff email or passcode (tajmahal).");
    }
  };

  const handleQuickLogin = () => {
    setAdminSession("tmproducts.bhadohi@gmail.com", "Export Desk Administration");
    router.push(nextUrl);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#182620] text-[#F7F1E1] border border-[#C6A25E]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Guard Stripe accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C6A25E] via-[#E8D39D] to-[#C6A25E]" />

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#0F1713] border border-[#C6A25E]/40 text-[#E8D39D] flex items-center justify-center mx-auto mb-2">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
            Staff & Admin Sign In
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#C6A25E]">
            Tajmahal Products · Bhadohi
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#E8D39D] mb-1">
              Staff Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. tmproducts.bhadohi@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F1713] border border-[#C6A25E]/30 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C6A25E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E8D39D] mb-1">
              Admin Passcode / Master Key
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode (default: tajmahal)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F1713] border border-[#C6A25E]/30 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C6A25E]"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-rose-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#C6A25E] hover:bg-[#b5924d] text-[#0F1713] font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Authenticate & Access Portal
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#C6A25E]/20 text-center space-y-3">
          <button
            onClick={handleQuickLogin}
            className="text-xs text-[#E8D39D] hover:text-white underline underline-offset-4 flex items-center justify-center mx-auto space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A25E]" />
            <span>One-Click Quick Admin Access (Export Desk)</span>
          </button>

          <div>
            <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
              ← Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs">Loading sign in...</div>}>
      <LoginForm />
    </Suspense>
  );
}
