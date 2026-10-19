"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-[#0F1713]">
          Inquiry Successfully Dispatched
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6152] leading-relaxed">
          Your carpet inquiry and custom dimension requirements have been received by the Tajmahal Products export desk in Bhadohi.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
            "Namaste Tajmahal Products, I just submitted an inquiry on your website."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Follow up on WhatsApp</span>
        </a>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F1713] text-[#E8D39D] text-xs font-semibold"
        >
          Return to Catalogue
        </Link>
      </div>
    </div>
  );
}
