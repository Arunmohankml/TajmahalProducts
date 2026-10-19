"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  Globe,
  Clock,
  Building2,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";
import { useLanguage } from "@/context/LanguageContext";

const CARPET_FAQS = [
  {
    q: "How does the bespoke commission process work for custom sizes?",
    a: "We work directly with architects, interior designers, and collectors. You provide room measurements, preferred palette (or Pantone references), and construction grade (hand-knotted or hand-tufted). We provide a scaled artwork strike-off for approval before loom warping.",
  },
  {
    q: "Why are prices not listed directly with automated cart checkout?",
    a: "Authentic handmade carpets are high-value artisanal heirlooms ranging into lakhs of rupees. Prices depend on exact knot density, natural fiber composition (wool/silk blend), custom dimensions, and export freight. We provide customized, transparent quotations tailored to each commission.",
  },
  {
    q: "What international freight and export shipping methods are available?",
    a: "As a Star Export House, we ship globally via air cargo (for urgent or individual room commissions) and ocean container freight (FCL/LCL for volume container programs). All rugs are moisture-barrier wrapped and packed in reinforced export bales or wooden crates.",
  },
  {
    q: "Can you reproduce antique Persian or Caucasian tribal designs from archives?",
    a: "Yes. Our archive collection spans museum-grade Kashan, Kazzak, Gabbeh, and imperial Mughal patterns preserved across six generations in Bhadohi. Our master weavers can re-create historical motifs to custom scales.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await tajmahalDb.createInquiry({
      clientName: formData.name || "Website Inquirer",
      email: formData.email,
      phone: "",
      productId: "contact-form",
      productTitle: "Direct Contact Inquiry",
      collectionName: "Trade Consultation",
      productCode: "TM-CONTACT",
      requestedSize: "To be confirmed",
      notes: formData.message,
      channel: "website_form",
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  return (
    <div className="bg-white text-[#1C1C1C]">
      {/* Top Banner with Background Image (Padded for transparent header overlay) */}
      <section className="relative w-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden bg-[#1C1C1C] border-b border-[#EBEBEB] pt-28 sm:pt-36 pb-16 sm:pb-24">
        <img
          src="/hmc_assets/hedaer85.jpg"
          alt="Tajmahal Carpets Weaving Facility & Export Office"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.62] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-3">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#E8D39D]">
            {t("contact_tag")}
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-white">
            {t("contact_title")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-200 max-w-2xl mx-auto leading-relaxed pt-1">
            {t("contact_desc")}
          </p>
        </div>
      </section>

      {/* Main Unified Contact Section — Full width to both sides with matching grey background */}
      <section className="w-full bg-[#F8F9FA] border-y border-[#EBEBEB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Column: Corporate Headquarters (Simplified Labels) */}
            <div className="lg:w-5/12 p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="border-b border-[#E5E5E5] pb-4 space-y-1">
                <h2 className="text-lg sm:text-xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
                  {t("contact_hq")}
                </h2>
                <p className="text-xs text-[#767676]">
                  {t("contact_capital")}
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#0F2C59] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-[#1C1C1C] block mb-0.5 font-semibold">
                      {t("contact_address")}
                    </strong>
                    <span className="text-[#666666] leading-relaxed block">
                      Chauri Road, Bhadohi — 221401<br />
                      Uttar Pradesh, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#0F2C59] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-[#1C1C1C] block mb-0.5 font-semibold">
                      {t("contact_phone")}
                    </strong>
                    <div className="text-[#666666] font-mono space-y-0.5">
                      <div>+91 82995 01435</div>
                      <div>+91 89896 97814</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#0F2C59] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-[#1C1C1C] block mb-0.5 font-semibold">
                      {t("contact_mail")}
                    </strong>
                    <div className="text-[#666666] font-mono space-y-0.5">
                      <div>tmproducts.bhadohi@gmail.com</div>
                      <div>hasxxann@gmail.com</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#0F2C59] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-[#1C1C1C] block mb-0.5 font-semibold">
                      {t("contact_hours")}
                    </strong>
                    <span className="text-[#666666]">
                      {t("contact_hours_val")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inset Divider Line in the Middle (Does NOT touch top or bottom) */}
            <div className="hidden lg:block w-[1px] bg-[#E5E5E5] my-6 self-stretch flex-shrink-0" />
            <div className="block lg:hidden h-[1px] bg-[#E5E5E5] mx-6" />

            {/* Right Column: Send Formal RFQ (Clean Form with Labels Inside Inputs) */}
            <div className="lg:w-7/12 p-6 sm:p-8 lg:p-10 space-y-5">
              <div className="border-b border-[#E5E5E5] pb-4 space-y-1">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#0F2C59] font-semibold">
                  {t("contact_bespoke")}
                </div>
                <h2 className="text-lg sm:text-xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
                  {t("contact_rfq")}
                </h2>
                <p className="text-xs text-[#767676]">
                  {t("contact_rfq_desc")}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-white border border-emerald-300 text-center space-y-2 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="text-sm uppercase tracking-wider font-medium text-emerald-900">
                    {t("contact_success_title")}
                  </h3>
                  <p className="text-xs text-[#767676] max-w-md mx-auto leading-relaxed">
                    {t("contact_success_desc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("contact_input_name")}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm bg-white border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#767676] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("contact_input_email")}
                      className="w-full px-4 py-3.5 text-xs sm:text-sm bg-white border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#767676] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                  </div>

                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("contact_input_msg")}
                    className="w-full px-4 py-3.5 text-xs sm:text-sm bg-white border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#767676] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#1C1C1C] hover:bg-white text-white hover:text-[#1C1C1C] border border-[#1C1C1C] text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t("contact_btn_submit")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* FAQs */}
        <div className="space-y-8 pt-8 border-t border-[#EBEBEB]">
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0F2C59] font-semibold">
              Buyer Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARPET_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F8F9FA] p-6 border border-[#EBEBEB] space-y-2"
              >
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1C1C]">
                  {faq.q}
                </h3>
                <p className="text-xs text-[#767676] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
