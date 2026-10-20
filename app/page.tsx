"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  MessageCircle,
  Mail,
  ShieldCheck,
  Check,
  Award,
  Globe,
  Sparkles,
} from "lucide-react";
import {
  COMPANY_PROFILE,
  COLLECTIONS_DATA,
  CarpetProduct,
} from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";
import { CarpetCard } from "@/components/CarpetCard";
import { useShortlist } from "@/context/ShortlistContext";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<CarpetProduct[]>([]);
  const [activeTab, setActiveTab] = useState<"traditional" | "modern">("traditional");
  const { openInquiryModal } = useShortlist();

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    const list = await tajmahalDb.getProducts();
    setProducts(list);
  };

  const traditionalProducts = products.filter((p) =>
    ["mughal-super", "mughal", "kazzak"].includes(p.collection_id)
  );

  const modernProducts = products.filter((p) =>
    ["gabbeh", "moroccan", "tufted"].includes(p.collection_id)
  );

  return (
    <div className="space-y-0 bg-white text-[#1C1C1C]">
      {/* =========================================================================
          1. ARCHIVAL HERO SECTION
         ========================================================================= */}
      <section className="relative w-full min-h-[680px] sm:min-h-[780px] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-[#1C1C1C] pt-24 sm:pt-32 pb-14 sm:pb-20">
        {/* Loom Video / Image Background */}
        <div className="absolute inset-0">
          <img
            src="/hmc_assets/handmadecarept---Connection-with-Customers.jpg"
            alt="Artisans at the Loom"
            className="w-full h-full object-cover filter brightness-[0.72] contrast-105"
          />
        </div>
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white space-y-7">
          <div className="space-y-3.5 max-w-4xl mx-auto">
            <div className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-[#E8D39D]">
              {t("hero_tag")}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.16em] leading-[1.2] text-white">
              {t("hero_title")}
            </h1>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <Link
              href="/shop"
              className="btn-stroke-white px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] shadow-xl inline-block"
            >
              {t("hero_btn_explore")}
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE ATELIER CHRONICLES SECTION
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Eyebrow Header: The Atelier Chronicles */}
          <div className="text-center space-y-1.5">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#0F2C59] font-semibold">
              The Genesis of Every Rug
            </div>
            <h2 className="text-xl sm:text-2xl font-normal uppercase tracking-[0.18em] text-[#1C1C1C]">
              The Atelier Chronicles
            </h2>
          </div>

          {/* 4 Tall Vertical Portrait Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {/* Card 1: Trimming / Cutting on Loom */}
            <div className="relative aspect-[3/5] w-full overflow-hidden bg-zinc-100 group">
              <img
                src="/hmc_assets/1a.jpg"
                alt="Artisan weaving threads on the loom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 2: Spun Yarn Skeins */}
            <div className="relative aspect-[3/5] w-full overflow-hidden bg-zinc-100 group">
              <img
                src="/hmc_assets/legacy-in-everythread.jpg"
                alt="Pure virgin spun yarn spools"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 3: Hands Tying Knots with Beater */}
            <div className="relative aspect-[3/5] w-full overflow-hidden bg-zinc-100 group">
              <img
                src="/hmc_assets/weaver-hmc.jpg"
                alt="Master hands knotting pile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 4: Female Artisan at Loom */}
            <div className="relative aspect-[3/5] w-full overflow-hidden bg-zinc-100 group">
              <img
                src="/hmc_assets/women-empowring-hmc.jpg"
                alt="Empowered artisan weaving master carpet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* 3 Columns of Storytelling Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4 max-w-6xl mx-auto">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0F2C59]">
                01 · High-Altitude Fleece Grading
              </div>
              <p className="text-xs text-[#767676] leading-relaxed">
                Hand-sorting raw mountain fleece rich in natural lanolin, ensuring our spun yarns offer inherent soil resilience and a supple, velvet touch.
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0F2C59]">
                02 · Knot Density & Talim Chants
              </div>
              <p className="text-xs text-[#767676] leading-relaxed">
                Guided by the melodic recitation of the Talim, master artisans hand-tie up to 400 Persian knots per square inch on upright timber looms.
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0F2C59]">
                03 · Botanical Wash & Sun Oxidation
              </div>
              <p className="text-xs text-[#767676] leading-relaxed">
                Conditioned in botanical herb baths and cured under the open Bhadohi sun, producing an organic patina that enriches over decades of living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ARTISANAL MASTERY & LOOM HERITAGE BANNER
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5 mb-10 sm:mb-12">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#0F2C59] font-semibold">
            The Philosophy of Authentic Craft
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-normal uppercase tracking-[0.10em] sm:tracking-[0.14em] text-[#1C1C1C] sm:whitespace-nowrap">
            Distinct by Nature · Mastered by Hand
          </h2>
          <p className="text-xs sm:text-sm text-[#767676] max-w-3xl mx-auto leading-relaxed">
            In a world of mass mechanical production, true luxury resides in human patience and generational artistry. In the organic shifts of vegetal abrash, the rhythmic precision of the master weaver&apos;s fingers, and the rich lanolin of mountain wool lies the irreplaceable character of every Tajmahal creation.
          </p>
        </div>

        {/* Master Artisan Banner (Elevated Architectural Luxury Showcase with Original Photography) */}
        <div className="relative w-full min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
          <img
            src="/images/site/tajmahal_master_loom.jpg"
            alt="Master craftsman hand-knotting traditional rug on vertical loom in Bhadohi"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.80] contrast-105"
          />
          {/* Dual-layered cinematic vignette for depth and high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 sm:space-y-8 py-12 sm:py-16">
            <div className="space-y-3.5 max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.18em] text-white leading-[1.2]">
                Generational Artistry in Every Hand-Tied Knot
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
                Hundreds of thousands of individual knots tied by hand over months of exacting discipline, preserving India&apos;s most revered carpet-weaving heritage.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/about#founder"
                className="px-8 sm:px-9 py-3.5 bg-white hover:bg-zinc-100 text-[#1C1C1C] text-xs font-semibold uppercase tracking-[0.2em] shadow-xl transition-all duration-200"
              >
                Discover Founder Lineage
              </Link>
              <Link
                href="/shop"
                className="px-8 sm:px-9 py-3.5 border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 backdrop-blur-sm"
              >
                Browse Masterpieces
              </Link>
            </div>

            {/* Refined Architectural Stats Ribbon at Base of Banner */}
            <div className="pt-8 sm:pt-10 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto text-center">
              <div>
                <div className="text-xl sm:text-2xl font-light text-white tracking-wider">1967</div>
                <div className="text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mt-0.5">Established Lineage</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-white tracking-wider">100%</div>
                <div className="text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mt-0.5">Hand-Knotted & Tufted</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-white tracking-wider">Star</div>
                <div className="text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mt-0.5">Govt Export House</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-white tracking-wider">Label STEP</div>
                <div className="text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 mt-0.5">Ethical Fair Trade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED COLLECTIONS SHOWCASE (Traditional & Modern Tabs)
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EBEBEB] pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                Curated Heirloom Pieces
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C] mt-1">
                Featured Rug Collections
              </h2>
            </div>

            {/* Collection Tabs with Gliding Navy Bar */}
            <div className="flex items-center space-x-6 text-xs uppercase tracking-[0.18em]">
              <button
                onClick={() => setActiveTab("traditional")}
                className={`relative py-2 px-1 transition-colors ${
                  activeTab === "traditional"
                    ? "text-[#0F2C59] font-semibold"
                    : "text-[#767676] hover:text-[#1C1C1C]"
                }`}
              >
                <span>Traditional Rugs</span>
                {activeTab === "traditional" && (
                  <motion.div
                    layoutId="collectionTabIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#0F2C59] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("modern")}
                className={`relative py-2 px-1 transition-colors ${
                  activeTab === "modern"
                    ? "text-[#0F2C59] font-semibold"
                    : "text-[#767676] hover:text-[#1C1C1C]"
                }`}
              >
                <span>Modern & Berber Rugs</span>
                {activeTab === "modern" && (
                  <motion.div
                    layoutId="collectionTabIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#0F2C59] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Grid of Carpet Cards with Smooth Section Switch Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {(activeTab === "traditional" ? traditionalProducts : modernProducts)
                .slice(0, 8)
                .map((product) => (
                  <CarpetCard key={product.id} product={product} />
                ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center pt-4 sm:pt-6">
            <Link
              href="/shop"
              className="btn-stroke-navy inline-flex items-center space-x-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm"
            >
              <span>View All 56 Exclusive Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOUNDER TRIBUTE: LATE HAJI JALIL AHMAD ANSARI
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F8F9FA] border-b border-[#EBEBEB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 text-center">
              <div className="max-w-xs mx-auto border border-[#EBEBEB] bg-white p-3 shadow-md">
                <img
                  src="/images/site/Late_Haji_Jalil_Ahmad_Ansari__found.jpg"
                  alt="Late Haji Jalil Ahmad Ansari"
                  className="w-full h-auto object-cover"
                />
                <div className="pt-3 pb-1 text-center">
                  <div className="text-xs uppercase tracking-[0.16em] font-semibold text-[#1C1C1C]">
                    Late Haji Jalil Ahmad Ansari
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#0F2C59] font-medium">
                    Founder & Master Craftsman · Bhadohi
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                In Honour of Our Founder
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
                Six Generations of Craftsmanship & Leadership
              </h2>
              <p className="text-xs sm:text-sm text-[#767676] leading-relaxed">
                The foundation of Tajmahal Products was established through the dedication and leadership of Late Mr. Jalil Ahmad Ansari. Acquiring mastery across every stage of carpet production — design development, wool dyeing, knotting, washing, clipping, and finishing — he represented Bhadohi weaving internationally for decades.
              </p>
              <div className="space-y-2 text-xs text-[#1C1C1C] pt-2 border-t border-zinc-200">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]" />
                  <span><strong>Honorary Secretary:</strong> All India Carpet Manufacturers Association (AICMA) — 4 consecutive years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]" />
                  <span><strong>President:</strong> All India Carpet Trade Fair Committee — 6 consecutive years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]" />
                  <span><strong>Elected Member:</strong> Committee of Administration, CEPC New Delhi — over 18 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. THE AUTHENTICITY PROMISE & OFFICIAL ACCREDITATIONS
         ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#EBEBEB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#0F2C59] font-semibold">
              The Authenticity Promise
            </h2>
            <h3 className="text-xl sm:text-2xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
              Recognised & Accredited Globally
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-4">
            {COMPANY_PROFILE.certifications.map((c) => (
              <div
                key={c.id}
                className="p-5 border border-[#EBEBEB] bg-[#F8F9FA] flex flex-col items-center text-center space-y-3"
              >
                <div className="h-14 w-28 relative flex items-center justify-center">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain filter contrast-125"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider">{c.name}</h4>
                  <p className="text-[10px] text-[#767676] mt-0.5">{c.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
