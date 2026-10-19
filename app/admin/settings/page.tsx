"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Building, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

export default function AdminSettingsPage() {
  const [phone, setPhone] = useState(COMPANY_PROFILE.phoneNumbers[0]);
  const [altPhone, setAltPhone] = useState(COMPANY_PROFILE.phoneNumbers[1]);
  const [email, setEmail] = useState(COMPANY_PROFILE.emails[0]);
  const [altEmail, setAltEmail] = useState(COMPANY_PROFILE.emails[1]);
  const [address, setAddress] = useState(COMPANY_PROFILE.address);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-[#C6A25E]/20 shadow-xs">
        <h1 className="font-serif text-2xl font-semibold text-[#0F1713]">
          Company & Contact Settings
        </h1>
        <p className="text-xs text-[#6B6152] mt-1">
          Export headquarters contact information displayed across public quotation forms and footers
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Company settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-[#C6A25E]/20 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#201C15] mb-1">
              Primary Sales Telephone / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#201C15] mb-1">
              Secondary Executive Telephone
            </label>
            <input
              type="text"
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#201C15] mb-1">
              Primary Export Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#201C15] mb-1">
              Director Email
            </label>
            <input
              type="email"
              value={altEmail}
              onChange={(e) => setAltEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#201C15] mb-1">
            Manufacturing House Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#FAF6EE] border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#1F4E3D] hover:bg-[#0C2A20] text-[#F7F1E1] text-xs font-semibold flex items-center space-x-2"
          >
            <Save className="w-3.5 h-3.5 text-[#C6A25E]" />
            <span>Save Company Information</span>
          </button>
        </div>
      </form>
    </div>
  );
}
