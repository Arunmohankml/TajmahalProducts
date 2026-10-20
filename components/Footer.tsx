"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Award,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white text-[#1C1C1C] border-t border-[#EBEBEB] selection:bg-[#0F2C59] selection:text-white transition-colors">
      {/* 1. Architectural Atelier Guarantee Ribbon */}
      <div className="border-b border-[#EBEBEB] bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Guarantee 1 */}
          <div className="flex items-start space-x-3.5 group">
            <div className="flex-shrink-0 pt-0.5 text-[#767676] group-hover:text-[#1C1C1C] transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375v7.125c0 1.036.84 1.875 1.875 1.875h.375a3 3 0 0 1 5.5 0h2.5a3 3 0 0 1 5.5 0h.375c1.036 0 1.875-.84 1.875-1.875V11.25a2.25 2.25 0 0 0-.659-1.591l-2.5-2.5A2.25 2.25 0 0 0 16.341 6.5H13.5V6.375C13.5 5.339 12.66 4.5 11.625 4.5h-8.25ZM16.5 8.25h1.841l2.25 2.25H16.5V8.25ZM6 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1C1C1C]">
                {t("trust_delivery")}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {t("trust_delivery_desc")}
              </p>
            </div>
          </div>

          {/* Guarantee 2 */}
          <div className="flex items-start space-x-3.5 group">
            <div className="flex-shrink-0 pt-0.5 text-[#767676] group-hover:text-[#1C1C1C] transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1C1C1C]">
                {t("trust_satisfied")}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {t("trust_satisfied_desc")}
              </p>
            </div>
          </div>

          {/* Guarantee 3 */}
          <div className="flex items-start space-x-3.5 group">
            <div className="flex-shrink-0 pt-0.5 text-[#767676] group-hover:text-[#1C1C1C] transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1C1C1C]">
                {t("trust_support")}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {t("trust_support_desc")}
              </p>
            </div>
          </div>

          {/* Guarantee 4 */}
          <div className="flex items-start space-x-3.5 group">
            <div className="flex-shrink-0 pt-0.5 text-[#767676] group-hover:text-[#1C1C1C] transition-colors duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1C1C1C]">
                {t("trust_payments")}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {t("trust_payments_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Architectural Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Brand Prestige & Coordinates (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="h-8 sm:h-9 w-auto">
                <img
                  src="/images/logo/tajmahal_logo_dark.png"
                  alt="Tajmahal Products"
                  className="h-full w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                />
              </div>
            </Link>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
              {t("footer_atelier_desc")}
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-2.5 text-xs text-zinc-600 pt-2 border-t border-zinc-200">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F2C59] flex-shrink-0" />
                <span>{t("footer_atelier_location")}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-[#0F2C59] flex-shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.phoneNumbers[0]}`} className="hover:text-[#0F2C59] transition-colors font-medium">
                  {COMPANY_PROFILE.phoneNumbers[0]}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-[#0F2C59] flex-shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.emails[0]}`} className="hover:text-[#0F2C59] transition-colors font-medium">
                  {COMPANY_PROFILE.emails[0]}
                </a>
              </div>
            </div>

            {/* Credential Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="inline-flex items-center px-3 py-1.5 border border-zinc-300 bg-white hover:border-[#1C1C1C] text-[#1C1C1C] text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-xs hover:-translate-y-0.5">
                Star Export House
              </span>
              <span className="inline-flex items-center px-3 py-1.5 border border-zinc-300 bg-white hover:border-[#1C1C1C] text-[#1C1C1C] text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-xs hover:-translate-y-0.5">
                Label STEP Certified
              </span>
              <span className="inline-flex items-center px-3 py-1.5 border border-zinc-300 bg-white hover:border-[#1C1C1C] text-[#1C1C1C] text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-xs hover:-translate-y-0.5">
                CEPC Member
              </span>
            </div>
          </div>

          {/* Column 2: Curated Collections (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1C1C] border-b border-zinc-200 pb-2.5">
              {t("footer_col_collections")}
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li>
                <Link href="/shop?collection=mughal-super" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  Mughal Super Fine Knots
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=mughal" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  Mughal Floral Medallion
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=kazzak" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  Caucasian Kazzak Tribal
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=gabbeh" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  Nomadic Tactile Gabbeh
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=moroccan" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  High-Pile Moroccan Berber
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=tufted" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  Architectural Hand-Tufted
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center justify-between w-full py-2.5 px-3.5 bg-[#1C1C1C] hover:bg-white text-white hover:text-[#1C1C1C] border border-[#1C1C1C] text-[10.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                >
                  <span>View More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 flex-shrink-0 ml-1.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Heritage & Craft (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1C1C] border-b border-zinc-200 pb-2.5">
              {t("footer_col_heritage")}
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li>
                <Link href="/about#lineage" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_lineage")}
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_founder")}
                </Link>
              </li>
              <li>
                <Link href="/about#artisans" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_artisans")}
                </Link>
              </li>
              <li>
                <Link href="/about#pillars" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_pillars")}
                </Link>
              </li>
              <li>
                <Link href="/about#welfare" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_welfare")}
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_care_manual")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#0F2C59] hover:translate-x-0.5 inline-block transition-all duration-200">
                  {t("nav_journal_art")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Client Registry & Trade Desk (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1C1C1C] border-b border-zinc-200 pb-2.5">
              {t("footer_col_trade")}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {t("footer_newsletter_desc")}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={t("footer_newsletter_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-sm text-[#1C1C1C] placeholder-zinc-400 outline-none focus:border-[#0F2C59] focus:bg-white transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full py-2.5 px-4 bg-white hover:bg-[#1C1C1C] text-[#1C1C1C] hover:text-white border border-[#1C1C1C] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex items-center justify-center space-x-2"
              >
                <span className="transition-colors duration-300 ease-out">{t("footer_newsletter_btn")}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
            </form>

            {subscribed && (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t("footer_newsletter_success")}</span>
              </div>
            )}

            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
                  "Namaste Tajmahal Products, I would like to inquire about bespoke rug weaving."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-2.5 px-3.5 rounded-sm bg-white hover:bg-[#1C1C1C] text-[#1C1C1C] hover:text-white border border-[#1C1C1C] text-xs font-medium uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#1C1C1C] group-hover:text-white transition-all duration-300 ease-out group-hover:scale-110" />
                <span className="transition-colors duration-300 ease-out">Direct WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Accreditation Ribbon */}
        <div className="mt-14 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="text-center md:text-left space-y-0.5">
            <div>
              © {new Date().getFullYear()} Tajmahal Products. {t("footer_rights")}
            </div>
            <div className="text-[10px] text-zinc-400">
              {t("footer_credentials")}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-500">
            <Link href="/privacy" className="hover:text-[#0F2C59] transition-colors">
              {t("footer_privacy")}
            </Link>
            <Link href="/returns" className="hover:text-[#0F2C59] transition-colors">
              {t("footer_terms")}
            </Link>
            <Link href="/care" className="hover:text-[#0F2C59] transition-colors">
              {t("footer_care")}
            </Link>
            <Link href="/admin" className="text-[#0F2C59] hover:underline font-medium">
              {t("footer_admin")}
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-zinc-500 hover:text-[#0F2C59] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>{t("footer_back_to_top")}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
