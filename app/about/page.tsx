"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Globe,
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1C1C1C]">
      {/* Top Banner / Breadcrumb Header */}
      <section className="relative bg-[#F8F9FA] border-b border-[#EBEBEB] py-14 sm:py-20 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
            Since 1967 · Bhadohi, India
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-[#1C1C1C]">
            Our Heritage & Legacy
          </h1>
          <p className="text-xs sm:text-sm text-[#767676] max-w-2xl mx-auto leading-relaxed pt-2">
            Tajmahal Products is a sixth-generation, family-owned manufacturer and exporter of handmade carpets and rugs, based in Bhadohi — the historic epicenter of Indian handcraftsmanship.
          </p>
        </div>
      </section>

      {/* Lineage & Handcraftsmanship Editorial Section */}
      <section id="lineage" className="w-full bg-white border-y border-[#EBEBEB] py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Handcraftsmanship Photo Composition */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Primary Hero Photograph (Artisan Weaving at Loom) */}
                <div className="col-span-7 sm:col-span-8 overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm aspect-[4/5] group">
                  <img
                    src="/hmc_assets/women-empowring-hmc.jpg"
                    alt="Master weaver tying knots at vertical loom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Two Aligned Accent Photographs */}
                <div className="col-span-5 sm:col-span-4 space-y-3 sm:space-y-4">
                  <div className="overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm aspect-square group">
                    <img
                      src="/hmc_assets/legacy-in-everythread.jpg"
                      alt="Pure virgin spun yarn spools"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm aspect-square group">
                    <img
                      src="/hmc_assets/1a.jpg"
                      alt="Precision loom finishing and trimming"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Paragraphs & Lineage Milestones */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#0F2C59] font-semibold">
                  Generational Mastery,
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C] leading-[1.15]">
                  Anchored in Legacy
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed sm:leading-loose">
                Since 1967, Tajmahal Products has operated at the nexus of ancestral Indian weaving discipline and bespoke spatial architecture. Founded by Late Haji Jalil Ahmad Ansari, our atelier approaches carpet-making not as mass assembly, but as an exacting, slow-craft art form. Every warp, weft, and knot is tied by hand in our Bhadohi loom sheds, upholding strict ethical fair-trade standards under Label STEP. A Tajmahal piece is not simply floor decor; it is an architectural foundation carrying the touch, patience, and spirit of Bhadohi&apos;s master knotters.
              </p>

              {/* Lineage & Milestones - Replacing Boring Boxes with Refined Architectural Typography */}
              <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5 pt-4 border-t border-[#EBEBEB]">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                    Lineage
                  </div>
                  <div className="text-2xl sm:text-3xl font-light text-[#1C1C1C] tracking-wide">
                    6th Gen
                  </div>
                  <p className="text-xs text-[#767676] leading-relaxed">
                    Ancestral Master Weavers
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                    Established
                  </div>
                  <div className="text-2xl sm:text-3xl font-light text-[#1C1C1C] tracking-wide">
                    1967
                  </div>
                  <p className="text-xs text-[#767676] leading-relaxed">
                    Over Half a Century of Excellence
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                    Status
                  </div>
                  <div className="text-2xl sm:text-3xl font-light text-[#1C1C1C] tracking-wide">
                    Star
                  </div>
                  <p className="text-xs text-[#767676] leading-relaxed">
                    Government Recognized Export House
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                    Presence
                  </div>
                  <div className="text-2xl sm:text-3xl font-light text-[#1C1C1C] tracking-wide">
                    Global
                  </div>
                  <p className="text-xs text-[#767676] leading-relaxed">
                    Supplying 4 Continents
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="btn-stroke-dark px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] shadow-sm inline-block"
                >
                  Browse Handcrafted Rugs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Founder Tribute (Full Width Edge-to-Edge Background) */}
      <section id="founder" className="w-full bg-[#F8F9FA] border-y border-[#EBEBEB] py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 text-center">
              <div className="relative max-w-xs mx-auto border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src="/images/site/Late_Haji_Jalil_Ahmad_Ansari__found.jpg"
                  alt="Late Haji Jalil Ahmad Ansari"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-white border-t border-[#EBEBEB]">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#1C1C1C]">
                    Late Haji Jalil Ahmad Ansari
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#0F2C59] font-medium mt-0.5">
                    Founder & Master Craftsman
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
                The Visionary Founder
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-tight">
                Six Decades of Leadership in Indian Carpet Export
              </h2>
              <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
                Beginning his journey in carpet weaving from boyhood, Late Haji Jalil Ahmad Ansari acquired complete mastery over every nuance of the craft: raw wool grading, vegetal dyeing, loom drafting, warp tensioning, clipping, washing, and finishing.
              </p>
              <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
                His leadership left an indelible mark on the Indian handmade carpet industry. He served as the Honorary Secretary of the All India Carpet Manufacturers Association for four consecutive terms, President of the All India Carpet Trade Fair Committee for six consecutive terms, and an elected member of the Committee of Administration of the Carpet Export Promotion Council (CEPC) for more than 18 years.
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs text-[#767676]">
                <span className="px-3 py-1.5 border border-zinc-300 tracking-wide font-normal">
                  CEPC Administration Member (18+ Years)
                </span>
                <span className="px-3 py-1.5 border border-zinc-300 tracking-wide font-normal">
                  All India Carpet Trade Fair President (6 Terms)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Storytelling Image Grid */}
        <section id="artisans" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0F2C59] font-semibold">
              Atelier Life & Community
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C]">
              The Rhythm of Bhadohi Looms
            </h2>
            <p className="text-xs sm:text-sm text-[#767676]">
              Every creation is a singular expression of patience, shaped by the inherited knowledge and dexterous hands of our weaving families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100 border border-[#EBEBEB]">
                <img
                  src="/hmc_assets/weaver-hmc.jpg"
                  alt="Ancestral Master Knotter"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1C1C1C]">
                Ancestral Knotting Lineage
              </h3>
              <p className="text-xs text-[#767676] leading-relaxed">
                Our master knotters preserve techniques refined over six generations, hand-tying hundreds of thousands of individual Persian knots with millimeter fidelity.
              </p>
            </div>

            <div id="welfare" className="space-y-3 scroll-mt-24">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100 border border-[#EBEBEB]">
                <img
                  src="/hmc_assets/women-empowring-hmc.jpg"
                  alt="Women Weavers of Tajmahal"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1C1C1C]">
                Fair Trade & STEP Stewardship
              </h3>
              <p className="text-xs text-[#767676] leading-relaxed">
                Partnered with Label STEP, we uphold rigorous fair-trade benchmarks, equitable living wages, and comprehensive community empowerment across all our rural workshop clusters.
              </p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100 border border-[#EBEBEB]">
                <img
                  src="/hmc_assets/legacy-in-everythread.jpg"
                  alt="Spun virgin wool skeins"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1C1C1C]">
                Natural River Wash & Sun Oxidation
              </h3>
              <p className="text-xs text-[#767676] leading-relaxed">
                Cleansed through time-honored botanical water baths and sun-patinated in open Bhadohi courtyards, unveiling rich organic abrash and self-preserving lanolin sheen.
              </p>
            </div>
          </div>
        </section>

        {/* Guiding Pillars - Flowing Editorial Style */}
        <section id="pillars" className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8 py-8 sm:py-14 scroll-mt-24">
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0F2C59] font-semibold">
              Foundational Principles · Bhadohi, India
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
              Our Guiding Pillars
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-sm sm:text-base text-[#3C3C3C] leading-relaxed">
            <p className="leading-relaxed sm:leading-loose">
              Our atelier&apos;s standards are defined by four fundamental principles: the uncompromising purity of high-altitude virgin wool, generational knot fidelity, artisan welfare through equitable trade, and bespoke precision for international trade partners. From manual raw fleece sorting to botanical immersion baths cured under the Indian sun, each step preserves the natural lanolin and luster of the fiber. We don&apos;t produce disposable furnishings; we build generational centerpieces created to endure in luxury residences, embassies, and private estates around the world.
            </p>
          </div>
        </section>

        {/* Global Export Call to Action */}
        <section id="commissions" className="bg-[#1C1C1C] text-white p-8 sm:p-14 text-center space-y-6 scroll-mt-24">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#E8D39D] font-semibold">
              Trade & Private Commissions
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.16em]">
              Partner with Tajmahal Products
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We welcome rug galleries, interior designers, and estate managers to explore our collection or request custom commissions directly from our Bhadohi workshops.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="btn-fill-navy px-8 py-3.5 text-white font-semibold text-xs uppercase tracking-wider"
            >
              Explore Exclusive Catalog
            </Link>
            <Link
              href="/contact"
              className="btn-stroke-white px-8 py-3.5 text-white font-semibold text-xs uppercase tracking-wider"
            >
              Contact Export Desk
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
