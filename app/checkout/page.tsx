"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, Phone, ArrowLeft, ShieldCheck, Award } from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#182620] text-[#E8D39D] flex items-center justify-center mx-auto border border-[#C6A25E]/40">
        <Award className="w-8 h-8 text-[#C6A25E]" />
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[#C6A25E] font-semibold">
          Artisanal Commissioning Protocol
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F1713]">
          Bespoke Export & Quotation Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6152] max-w-lg mx-auto leading-relaxed">
          At Tajmahal Products, our hand-knotted and hand-tufted carpets are luxury bespoke heirlooms. We do not utilize automated online carts. Orders are handled directly by our Bhadohi export team to tailor knot density, room dimensions, and freight options.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
            "Namaste Tajmahal Products, I would like to request an official quotation for a bespoke carpet order."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Inquire on WhatsApp (+91 82995 01435)</span>
        </a>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F1713] text-[#E8D39D] font-semibold text-xs uppercase tracking-wider border border-[#C6A25E]/40"
        >
          Browse Full Catalogue (56 Pieces)
        </Link>
      </div>
    </div>
  );
}
