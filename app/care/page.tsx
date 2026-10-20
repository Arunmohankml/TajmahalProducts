"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  RotateCw,
  Droplets,
  Sun,
  Layers,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

const CARE_STEPS = [
  {
    num: "01",
    title: "Gentle Suction Vacuuming",
    desc: "Vacuum regularly using suction-only mode without rotating beater-bars. Always vacuum in the direction of the pile nap to preserve the hand-knotted fibers and prevent micro-fuzzing.",
    tag: "REGULAR GROOMING",
  },
  {
    num: "02",
    title: "Annual Orientation Rotation",
    desc: "Rotate your rug 180 degrees every six to twelve months. This guarantees uniform exposure to ambient room light and balances high-traffic walking pathways across the rug surface.",
    tag: "BALANCED WEAR",
  },
  {
    num: "03",
    title: "Immediate Spill Response",
    desc: "Never scrub or rub a spill. Immediately blot excess liquid with a clean, un-dyed cotton towel. Use lukewarm water with a drop of neutral pH soap, working from outer edge inwards.",
    tag: "SPOT BLOTTING",
  },
  {
    num: "04",
    title: "Breathable Rug Padding",
    desc: "Always lay hand-knotted and hand-tufted carpets over high-density, breathable non-slip felt underlay. This prevents fiber stress against hard timber or marble floors and cushions impact.",
    tag: "FOUNDATION CARE",
  },
  {
    num: "05",
    title: "Professional Herbal Washing",
    desc: "Every 3 to 5 years, commission a professional immersion wash using traditional botanical cleansers. Avoid harsh industrial chemical dry-cleaning that strips natural lanolin from wool.",
    tag: "PERIODIC RESTORATION",
  },
  {
    num: "06",
    title: "Storage & Protection",
    desc: "If storing, roll the carpet tightly with the pile facing inwards around a rigid tube. Wrap in breathable cotton or Tyvek wrap; never store in airtight plastic bags.",
    tag: "SAFE CONSERVATION",
  },
];

export default function CarpetCarePage() {
  return (
    <div className="bg-white text-[#1C1C1C]">
      {/* Top Banner / Breadcrumb */}
      <section className="relative bg-[#1C1C1C] text-white border-b border-zinc-800 py-16 sm:py-24 text-center overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/site/tajmahal_master_loom.jpg"
            alt="Artisan Rug Care and Conservation"
            className="w-full h-full object-cover object-center filter brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-300">
            Artisan Preservation · Heirloom Maintenance
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-white">
            Rug Care & Conservation
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-2">
            Hand-knotted and hand-tufted rugs from Tajmahal Products are woven from pure virgin wool and fine silk to last for generations with proper stewardship.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARE_STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-[#F8F9FA] p-8 border border-[#EBEBEB] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#0F2C59] font-semibold">{step.num}</span>
                  <span className="text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 bg-white text-[#0F2C59] font-semibold border border-[#EBEBEB]">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-base uppercase tracking-wider font-medium text-[#1C1C1C]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#767676] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="bg-[#1C1C1C] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-normal uppercase tracking-[0.16em]">
              Need Restoration or Custom Washing Advice?
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Our master finishing and repair artisans in Bhadohi are available to advise on antique re-weaving, re-fringing, stain extraction, and conservation.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
              "Namaste Tajmahal Products, I would like to consult with your team regarding carpet care and restoration."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-medium flex items-center space-x-2 flex-shrink-0 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
