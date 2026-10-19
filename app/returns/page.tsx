"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      <section className="bg-[#F8F9FA] border-b border-[#EBEBEB] py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
            Export Quality & Assurance
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-[#1C1C1C]">
            Guarantee & Inspection Terms
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
              1. Pre-Dispatch Master Inspection & Photographic Proof
            </h2>
            <p>
              Prior to bale packing or timber crating, each completed rug is inspected by our senior master weavers in Bhadohi. High-resolution macro photos and video walk-throughs of pile density, selvedge binding, and fringe trimming are sent to the client for sign-off prior to dispatch.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
              2. Transit Protection Guarantee
            </h2>
            <p>
              All international shipments are secured with heavy-gauge moisture-barrier lining and dispatched under comprehensive cargo transit insurance. In the rare event of transit damage or loss, our export office handles the full replacement or insurance claims procedure.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
              3. Custom & Bespoke Commissions
            </h2>
            <p>
              Hand-knotted rugs woven to custom client dimensions and customized color strike-offs are commissioned as unique bespoke works. If any craftsmanship defect arises upon arrival, please contact our export desk within 48 hours for immediate resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
