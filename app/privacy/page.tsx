"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      <section className="bg-[#F8F9FA] border-b border-[#EBEBEB] py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
            Trade & Client Security
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-[#1C1C1C]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#767676] max-w-2xl mx-auto leading-relaxed pt-2">
            Tajmahal Products · Bhadohi, Uttar Pradesh, India
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#0F2C59] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Store</span>
        </Link>

        <div className="bg-[#F8F9FA] p-8 sm:p-12 border border-[#EBEBEB] space-y-8 text-xs text-[#767676] leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
              1. Client Inquiries & Trade Information
            </h2>
            <p>
              When you submit a quotation request or contact our weaving desk via WhatsApp or email, we collect only the necessary information (name, contact phone/WhatsApp, email, and project dimensions) required to prepare specifications, export paperwork, and freight calculations.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
              2. Confidentiality of Bespoke Designs
            </h2>
            <p>
              Private-label and custom architect commissioned strike-offs remain strictly confidential. We do not disclose custom Pantone specifications or proprietary client patterns to third parties.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
              3. Export Freight Partners
            </h2>
            <p>
              Contact details and delivery addresses are shared solely with authorized international logistics and customs agents (air cargo and container freight lines) to fulfill delivery from Bhadohi, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
