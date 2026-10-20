"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Globe,
  Sparkles,
  Calendar,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";

export default function FounderBiographyPage() {
  const leadershipRoles = [
    {
      period: "4 Consecutive Years",
      role: "Honorary Secretary",
      organization: "All India Carpet Manufacturers Association (AICMA)",
      description:
        "Led national advocacy for Indian carpet artisans, established standardized knot-density benchmarks, and championed rural weaving community welfare across the Bhadohi-Mirzapur belt.",
      bgImage: "/hmc_assets/1a.jpg",
    },
    {
      period: "6 Consecutive Years",
      role: "President",
      organization: "All India Carpet Trade Fair Committee",
      description:
        "Transformed regional exhibitions into premier international trade expos, creating direct bridges between Bhadohi loom masters and major overseas home-furnishing importers across Europe, North America, and the Middle East.",
      bgImage: "/hmc_assets/art-of-hmc-handmade-carpets.jpg",
    },
    {
      period: "Over 18 Years",
      role: "Elected Member, Committee of Administration",
      organization: "Carpet Export Promotion Council (CEPC), New Delhi",
      description:
        "Formulated export policy frameworks, represented India at bilateral trade forums, and protected the intellectual provenance of authentic Indian hand-knotted and hand-tufted carpets worldwide.",
      bgImage: "/images/site/tajmahal_master_loom.jpg",
    },
  ];

  const craftStages = [
    {
      step: "01",
      title: "Design & Talim Interpretation",
      text: "Mastered the classical craft of translating courtly Mughal and Persian artwork into exact hand-drawn graph plans, guiding weavers through the musical recitation of the Talim.",
    },
    {
      step: "02",
      title: "Fleece Grading & Hand-Spinning",
      text: "Personally evaluated raw mountain fleeces, selecting high-altitude wools rich in natural lanolin to ensure resilient yarn elasticity and inherent soil resistance.",
    },
    {
      step: "03",
      title: "Botanical & Mineral Dyeing",
      text: "Refined proprietary dye recipes in open copper vats, formulating colorfast tones that age into rich, expressive abrash without losing pile luster over generations.",
    },
    {
      step: "04",
      title: "Vertical Timber Loom Knotting",
      text: "Proficient in both Persian asymmetrical and Turkish symmetrical knot structures, tying intricate patterns up to 400 knots per square inch with millimeter precision.",
    },
    {
      step: "05",
      title: "Herbal Washing & Sun Patination",
      text: "Pioneered specialized natural river-water and herbal washing baths, followed by open-air courtyard drying under the Bhadohi sun to cure the natural wool oils.",
    },
    {
      step: "06",
      title: "Shearing, Embossing & Finishing",
      text: "Mastered hand-clipping with traditional curved shears, carving relief definition around intricate medallions and securing hand-tied fringe roots that endure for decades.",
    },
  ];

  return (
    <div className="bg-white text-[#1C1C1C]">
      {/* =========================================================================
          1. BREADCRUMBS & HERO BANNER
         ========================================================================= */}
      <section className="relative bg-[#F8F9FA] border-b border-[#EBEBEB] pt-8 sm:pt-10 pb-12 sm:pb-16 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center space-x-2 text-[10.5px] uppercase tracking-[0.2em] text-[#767676] pb-1">
            <Link href="/" className="hover:text-[#1C1C1C] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <Link href="/about" className="hover:text-[#1C1C1C] transition-colors">
              About
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-[#0F2C59] font-semibold">Founder Biography</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C] leading-tight">
            Late Haji Jalil Ahmad Ansari
          </h1>

          <p className="text-xs sm:text-sm text-[#767676] max-w-2xl mx-auto leading-relaxed pt-1">
            Six decades of ancestral loom mastery, institutional leadership, and the enduring foundation of Tajmahal Products in Bhadohi, India.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. PORTRAIT & CORE BIOGRAPHICAL NARRATIVE
         ========================================================================= */}
      <section className="pt-10 sm:pt-14 pb-8 sm:pb-10 border-b border-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Framed Archival Portrait */}
            <div className="lg:col-span-5 text-center lg:sticky lg:top-28">
              <div className="max-w-md mx-auto border-4 border-white shadow-2xl bg-white p-4 border border-[#EBEBEB]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 border border-zinc-200">
                  <img
                    src="/images/site/Late_Haji_Jalil_Ahmad_Ansari__found.jpg"
                    alt="Late Haji Jalil Ahmad Ansari, Founder of Tajmahal Products"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="pt-4 pb-2 text-center space-y-1">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]">
                    Late Haji Jalil Ahmad Ansari
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-medium">
                    Master Craftsman & Founder · Tajmahal Products
                  </div>
                  <p className="text-[11px] text-[#767676] font-mono pt-1">
                    Bhadohi, Uttar Pradesh, India
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EBEBEB] grid grid-cols-2 gap-2 text-center text-[10.5px] uppercase tracking-wider text-[#767676]">
                  <div className="p-2 bg-[#F8F9FA]">
                    <span className="block font-semibold text-[#1C1C1C]">6th Gen</span>
                    <span>Lineage</span>
                  </div>
                  <div className="p-2 bg-[#F8F9FA]">
                    <span className="block font-semibold text-[#1C1C1C]">1967</span>
                    <span>Founded</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Biography & Technical Mastery */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
                  Biographical Memoir
                </div>
                <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-snug">
                  The Hands That Built a Generation of Weaving
                </h2>
                <div className="w-16 h-0.5 bg-[#0F2C59]" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4a4a4a] leading-relaxed sm:leading-loose">
                <p>
                  Born into a revered family of hereditary Bhadohi weavers, Late Haji Jalil Ahmad Ansari spent his earliest childhood amidst the rhythmic click of timber beaters and the melodic chants of the Talim. In an era where many entered the carpet industry as purely commercial brokers, Mr. Ansari was, first and foremost, a true artisan.
                </p>
                <p>
                  He believed that to lead a loom workshop, one must possess hands that have tied knots until they calloused, eyes that can discern a single mis-dyed skein of wool in natural sunlight, and a mind that understands the structural physics of warp tension under varying seasonal humidity.
                </p>
                <p>
                  In 1967, he founded Tajmahal Products with a singular vision: to liberate Bhadohi handcraftsmanship from anonymous intermediary exploitation and establish direct, dignified relationships with discerning carpet buyers, gallery curators, and architectural projects around the globe.
                </p>
              </div>

              {/* Quote Highlight */}
              <div className="p-6 bg-[#F8F9FA] border-l-4 border-[#0F2C59] space-y-2">
                <blockquote className="text-sm sm:text-base italic text-[#1C1C1C] font-serif leading-relaxed">
                  &ldquo;A genuine handmade rug is not manufactured. It is grown row by row through human devotion. When you walk upon a hand-knotted carpet, you are walking upon months of someone&apos;s life, patience, and ancestral memory.&rdquo;
                </blockquote>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#0F2C59]">
                  Late Haji Jalil Ahmad Ansari · Founding Credo
                </div>
              </div>

              {/* Technical Mastery over All Six Stages */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base sm:text-lg font-normal uppercase tracking-[0.14em] text-[#1C1C1C]">
                  Complete Mastery Across Every Production Phase
                </h3>
                <p className="text-xs text-[#767676] leading-relaxed">
                  Unlike conventional factory owners, Mr. Ansari was universally respected across Bhadohi because he could step onto any loom and weave alongside his master craftsmen.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {craftStages.map((cs) => (
                    <div
                      key={cs.step}
                      className="p-4 bg-white border border-[#EBEBEB] hover:border-[#0F2C59]/40 transition-colors space-y-1.5"
                    >
                      <div className="text-[11px] font-mono font-semibold text-[#0F2C59]">
                        Stage {cs.step}
                      </div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1C]">
                        {cs.title}
                      </h4>
                      <p className="text-[11.5px] text-[#767676] leading-relaxed">
                        {cs.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INSTITUTIONAL LEADERSHIP & NATIONAL SERVICE
         ========================================================================= */}
      <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 bg-[#F8F9FA] border-b border-[#EBEBEB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="text-center space-y-2.5 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C]">
              Decades of Leadership in Indian Carpet Trade
            </h2>
            <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
              Beyond his own looms, Late Haji Jalil Ahmad Ansari dedicated his life to organizing the Indian handmade carpet industry, defending weavers&apos; rights, and securing India&apos;s preeminent reputation in global commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {leadershipRoles.map((role) => (
              <div
                key={role.organization}
                className="group relative overflow-hidden min-h-[420px] sm:min-h-[460px] p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-zinc-700/60"
              >
                {/* Background Image with Balanced Overlay (Less Dark) */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={role.bgImage}
                    alt={role.role}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/75 group-hover:from-black/45 group-hover:via-black/50 group-hover:to-black/65 transition-colors duration-500" />
                </div>

                {/* Centered Content */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                  {/* Period Badge */}
                  <span className="inline-block px-3.5 py-1 bg-black/40 backdrop-blur-md border border-white/30 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-sm">
                    {role.period}
                  </span>

                  {/* Role Title */}
                  <h3 className="text-lg sm:text-xl font-normal uppercase tracking-[0.14em] text-white leading-snug drop-shadow-md">
                    {role.role}
                  </h3>

                  {/* Organization */}
                  <div className="text-xs sm:text-[13px] font-medium tracking-wide text-[#F3E5AB] drop-shadow-sm">
                    {role.organization}
                  </div>

                  {/* Subtle Separator */}
                  <div className="w-12 h-px bg-white/30 my-1" />

                  {/* Description */}
                  <p className="text-xs sm:text-[12.5px] text-zinc-100 leading-relaxed font-normal pt-1 drop-shadow-sm">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE SIX GENERATIONS LINEAGE & LIVING CONTINUITY
         ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
                The Living Heritage
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-tight">
                Carrying the Torch into the Modern Architectural Era
              </h2>
              <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed sm:leading-loose">
                Today, the sixth generation of the Ansari family oversees Tajmahal Products, guided by the immutable tenets instilled by Late Haji Jalil Ahmad Ansari: unhurried craftsmanship, honest raw materials, and an unwavering loyalty to the weaving families of Bhadohi.
              </p>
              <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed sm:leading-loose">
                While our design archive now encompasses contemporary minimalist textures, high-pile Moroccan Berber pieces, and bespoke hospitality commissions, every rug continues to be knotted by hand in our certified Label STEP workshops. The discipline of the master founder lives on in every knot we tie.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/shop"
                    className="group inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1C1C1C] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition-all duration-300"
                  >
                    <span>Explore Current Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </motion.div>
                <Link
                  href="/contact"
                  className="btn-stroke-dark px-8 py-3.5 text-xs font-semibold uppercase tracking-wider inline-block shadow-xs"
                >
                  Contact Bhadohi Atelier
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="overflow-hidden bg-zinc-100 border border-[#EBEBEB] aspect-[4/5] group">
                  <img
                    src="/hmc_assets/women-empowring-hmc.jpg"
                    alt="Artisans at the vertical timber loom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="overflow-hidden bg-zinc-100 border border-[#EBEBEB] aspect-[4/5] group">
                  <img
                    src="/hmc_assets/weaver-hmc.jpg"
                    alt="Master weaver hand-tying knots"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOOTER CALLOUT / BACK NAVIGATION
         ========================================================================= */}
      <section className="py-12 bg-[#F8F9FA] text-center border-t border-[#EBEBEB]">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="text-lg sm:text-xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
            Honor the Craft. Discover the Rugs.
          </h3>
          <p className="text-xs text-[#767676] leading-relaxed">
            Every piece in our collection is an authentic reflection of Late Haji Jalil Ahmad Ansari&apos;s life work and Bhadohi&apos;s weaving history.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                href="/"
                className="group inline-flex items-center space-x-2.5 px-8 py-3.5 border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs hover:shadow-md"
              >
                <span>Return to Home Page</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
