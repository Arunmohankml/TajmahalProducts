"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Bookmark,
  Globe,
  Check,
} from "lucide-react";
import { HmcLogo } from "./HmcLogo";
import { useShortlist } from "@/context/ShortlistContext";
import { useLanguage, LANGUAGES } from "@/context/LanguageContext";
import { COLLECTIONS_DATA, COMPANY_PROFILE } from "@/lib/tajmahal_data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [headerHovered, setHeaderHovered] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { shortlist, setIsDrawerOpen } = useShortlist();
  const { language, setLanguage, currentOption, t } = useLanguage();
  const pathname = usePathname();

  const getActiveNavKey = () => {
    if (pathname === "/about") return "explore";
    if (pathname?.startsWith("/shop")) return "collections";
    if (pathname?.startsWith("/news")) return "journal";
    if (pathname === "/contact") return "contact";
    return null;
  };

  const activeKey = getActiveNavKey();
  const currentIndicator = hoveredNav || activeKey;

  const hasTransparentHero = pathname === "/" || pathname === "/contact";
  const isTransparent =
    hasTransparentHero &&
    !scrolled &&
    !mobileOpen &&
    !searchOpen &&
    !langOpen &&
    !headerHovered &&
    !exploreOpen &&
    !collectionsOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExploreOpen(false);
    setCollectionsOpen(false);
    setSearchOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Reliable click-outside listener for language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langOpen]);

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => {
        setHeaderHovered(false);
        setHoveredNav(null);
        setExploreOpen(false);
        setCollectionsOpen(false);
      }}
      className={`transition-all duration-300 ease-out flex items-center ${
        hasTransparentHero ? "fixed top-0 left-0 right-0 z-50" : "sticky top-0 z-40 bg-white border-b border-[#EBEBEB]"
      } ${
        isTransparent
          ? "bg-transparent border-b border-transparent text-white shadow-none py-4 sm:py-5"
          : hasTransparentHero
          ? "bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] text-[#1C1C1C] shadow-sm h-14 sm:h-16"
          : `h-14 sm:h-16 ${scrolled ? "shadow-sm" : ""}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        {/* Left: Mobile hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-1.5 transition-colors ${
              isTransparent ? "text-white hover:text-white/80" : "text-[#1C1C1C] hover:text-[#0F2C59]"
            }`}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <HmcLogo variant={isTransparent ? "light" : "dark"} />
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center space-x-8 text-[11.5px] font-medium uppercase tracking-[0.18em] transition-colors ${
            isTransparent ? "text-white" : "text-[#1C1C1C]"
          }`}
          onMouseLeave={() => setHoveredNav(null)}
        >
          {/* About Us Nav Item */}
          <div
            className="relative py-2"
            onMouseEnter={() => {
              setHoveredNav("explore");
              setExploreOpen(true);
              setCollectionsOpen(false);
            }}
          >
            <Link
              href="/about"
              className={`relative flex items-center space-x-1 py-1 transition-colors ${
                currentIndicator === "explore"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-[#0F2C59] font-semibold"
                  : isTransparent
                  ? "hover:text-white text-white/90"
                  : "hover:text-[#0F2C59]"
              }`}
            >
              <span>{t("nav_explore")}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  exploreOpen ? "rotate-180" : ""
                } ${isTransparent ? "text-white" : exploreOpen ? "text-[#0F2C59]" : ""}`}
              />
              {currentIndicator === "explore" && (
                <motion.div
                  layoutId="navbar-indicator-bar"
                  className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                    isTransparent ? "bg-white" : "bg-[#0F2C59]"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Our Collections Nav Item */}
          <div
            className="relative py-2"
            onMouseEnter={() => {
              setHoveredNav("collections");
              setCollectionsOpen(true);
              setExploreOpen(false);
            }}
          >
            <Link
              href="/shop"
              className={`relative flex items-center space-x-1 py-1 transition-colors ${
                currentIndicator === "collections"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-[#0F2C59] font-semibold"
                  : isTransparent
                  ? "hover:text-white text-white/90"
                  : "hover:text-[#0F2C59]"
              }`}
            >
              <span>{t("nav_collections")}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  collectionsOpen ? "rotate-180" : ""
                } ${isTransparent ? "text-white" : collectionsOpen ? "text-[#0F2C59]" : ""}`}
              />
              {currentIndicator === "collections" && (
                <motion.div
                  layoutId="navbar-indicator-bar"
                  className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                    isTransparent ? "bg-white" : "bg-[#0F2C59]"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Blog Spot Nav Item */}
          <div
            className="relative py-2"
            onMouseEnter={() => {
              setHoveredNav("journal");
              setExploreOpen(false);
              setCollectionsOpen(false);
            }}
          >
            <Link
              href="/news"
              className={`relative block py-1 transition-colors ${
                currentIndicator === "journal"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-[#0F2C59] font-semibold"
                  : isTransparent
                  ? "hover:text-white text-white/90"
                  : "hover:text-[#0F2C59]"
              }`}
            >
              <span>{t("nav_journal")}</span>
              {currentIndicator === "journal" && (
                <motion.div
                  layoutId="navbar-indicator-bar"
                  className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                    isTransparent ? "bg-white" : "bg-[#0F2C59]"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Contact */}
          <div
            className="relative py-2"
            onMouseEnter={() => {
              setHoveredNav("contact");
              setExploreOpen(false);
              setCollectionsOpen(false);
            }}
          >
            <Link
              href="/contact"
              className={`relative block py-1 transition-colors ${
                currentIndicator === "contact"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-[#0F2C59] font-semibold"
                  : isTransparent
                  ? "hover:text-white text-white/90"
                  : "hover:text-[#0F2C59]"
              }`}
            >
              <span>{t("nav_contact")}</span>
              {currentIndicator === "contact" && (
                <motion.div
                  layoutId="navbar-indicator-bar"
                  className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                    isTransparent ? "bg-white" : "bg-[#0F2C59]"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>
        </nav>

        {/* Right: Language Switcher, Account, Search, Shortlist */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className={`h-7 sm:h-8 px-2 sm:px-2.5 rounded-full flex items-center gap-1.5 select-none border transition-all duration-200 ${
                isTransparent
                  ? "border-white/30 text-white hover:bg-white/15 bg-white/5"
                  : "border-zinc-300 text-[#1C1C1C] hover:border-[#0F2C59] hover:bg-zinc-50 bg-white"
              }`}
              title="Select Language"
              aria-label="Select Language"
            >
              <Globe className={`w-3.5 h-3.5 stroke-[1.8] flex-shrink-0 ${isTransparent ? "text-white" : "text-[#0F2C59]"}`} />
              <span className="font-semibold uppercase text-[11px] tracking-wider leading-none">
                {currentOption.code}
              </span>
              <ChevronDown
                className={`w-3 h-3 stroke-[2] transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                } ${isTransparent ? "text-white/80" : "text-zinc-500"}`}
              />
            </button>

            {langOpen && (
              <div className="dropdown-smooth absolute top-full right-0 mt-2 w-56 bg-white text-[#1C1C1C] border border-[#EBEBEB] shadow-2xl rounded-xl py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-zinc-100 mb-1">
                  <span className="text-[10px] uppercase font-semibold text-[#767676] tracking-wider">
                    Select Language
                  </span>
                  <Globe className="w-3.5 h-3.5 text-[#767676]" />
                </div>

                <div className="max-h-72 overflow-y-auto no-scrollbar py-0.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                          isSelected
                            ? "bg-[#0F2C59]/10 font-semibold text-[#0F2C59]"
                            : "text-[#1C1C1C] hover:bg-zinc-50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold font-mono uppercase flex-shrink-0 ${
                              isSelected ? "bg-[#0F2C59] text-white" : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {lang.code}
                          </span>
                          <div className="truncate">
                            <span className="font-medium">{lang.nativeName}</span>
                            {lang.label !== lang.nativeName && (
                              <span className="text-[10px] text-[#767676] ml-1.5 font-normal">
                                ({lang.label})
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-[#0F2C59] stroke-[2.5] flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-1 transition-colors ${
              isTransparent ? "text-white hover:text-white/80" : "text-[#1C1C1C] hover:text-[#0F2C59]"
            }`}
            title="Search Catalogue"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.7]" />
          </button>

          {/* Admin / Account Icon */}
          <Link
            href="/admin"
            className={`p-1 transition-colors ${
              isTransparent ? "text-white hover:text-white/80" : "text-[#1C1C1C] hover:text-[#0F2C59]"
            }`}
            title="Staff Admin Portal"
            aria-label="Admin"
          >
            <User className="w-5 h-5 stroke-[1.7]" />
          </Link>

          {/* Shortlist / Bag Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`p-1 transition-colors relative ${
              isTransparent ? "text-white hover:text-white/80" : "text-[#1C1C1C] hover:text-[#0F2C59]"
            }`}
            title="View Shortlist / Quotes"
            aria-label="Shortlist"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
            {shortlist.length > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  isTransparent ? "bg-white text-[#1C1C1C]" : "bg-[#0F2C59] text-white"
                }`}
              >
                {shortlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Full-Width Mega Menu for About Us (Architectural 2-Card + 3-Column Layout) */}
      <div
        onMouseEnter={() => {
          setHoveredNav("explore");
          setExploreOpen(true);
          setCollectionsOpen(false);
        }}
        onMouseLeave={() => {
          setExploreOpen(false);
          setHoveredNav(null);
        }}
        className={`hidden lg:block absolute top-full left-0 right-0 w-full bg-white text-[#1C1C1C] border-b border-[#EBEBEB] shadow-2xl z-50 transition-all duration-300 ease-out before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-[''] ${
          exploreOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 cols: 3 Categorized Editorial Columns with Sub-Labels */}
            <div className="col-span-8 grid grid-cols-3 gap-8">
              {/* Column 1: Heritage & Lineage */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Ancestral Heritage
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/about#lineage"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_lineage")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Ancestral history & roots in Bhadohi
                    </div>
                  </Link>
                  <Link
                    href="/founder"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_founder")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      18+ years CEPC leadership tribute
                    </div>
                  </Link>
                  <Link
                    href="/about#artisans"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_artisans")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Generational master knotters
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Craft & Standards */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Loom Craft & Ethics
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/about#artisans"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_craft")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Upright looms & the Talim chants
                    </div>
                  </Link>
                  <Link
                    href="/about#pillars"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_pillars")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Virgin wool & vegetable dye chemistry
                    </div>
                  </Link>
                  <Link
                    href="/about#welfare"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_welfare")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Label STEP & fair-living wages
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Publications & Advisory */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Publications & Trade
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/news"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_journal_art")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      50 long-form field publications
                    </div>
                  </Link>
                  <Link
                    href="/care"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_care_manual")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Lanolin preservation & cleaning
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setExploreOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_export_desk")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Direct factory container logistics
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Singular Architectural Atelier Showcase Panel */}
            <div className="col-span-4 bg-[#FAF9F5] border border-[#E8E5DD] p-5 space-y-4">
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-200 border border-zinc-200/80">
                <img
                  src="/hmc_assets/women-empowring-hmc.jpg"
                  alt="Atelier Heritage"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-[9.5px] uppercase font-bold tracking-[0.22em] text-[#0F2C59]">
                  Atelier Dispatch · Established 1967
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]">
                  Six Generations of Loom Mastery
                </h4>
                <p className="text-[10.5px] text-[#666666] leading-relaxed">
                  Bhadohi master artisans preserving centuries-old hand-knotting traditions with fair living wages.
                </p>
              </div>
              <Link
                href="/about"
                onClick={() => setExploreOpen(false)}
                className="inline-flex items-center space-x-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#1C1C1C] hover:text-[#0F2C59] transition-colors"
              >
                <span>Read Our Atelier Story</span>
                <span className="text-[#0F2C59]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Mega Menu for Our Collections (Architectural Directory + Curated Masterpiece Panel) */}
      <div
        onMouseEnter={() => {
          setHoveredNav("collections");
          setCollectionsOpen(true);
          setExploreOpen(false);
        }}
        onMouseLeave={() => {
          setCollectionsOpen(false);
          setHoveredNav(null);
        }}
        className={`hidden lg:block absolute top-full left-0 right-0 w-full bg-white text-[#1C1C1C] border-b border-[#EBEBEB] shadow-2xl z-50 transition-all duration-300 ease-out before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-[''] ${
          collectionsOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 cols: 3 Structured Collection Columns */}
            <div className="col-span-8 grid grid-cols-3 gap-8">
              {/* Column 1: Classical Heirlooms */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Classical Heirlooms
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/shop?collection=mughal-super"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_mughal_super")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Royal court flora & fine knot count
                    </div>
                  </Link>
                  <Link
                    href="/shop?collection=mughal"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_mughal")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Intricate central floral medallions
                    </div>
                  </Link>
                  <Link
                    href="/shop?collection=kazzak"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_kazzak")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Caucasian geometric bold totems
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Contemporary & Minimalist */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Modern & Tactile
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/shop?collection=gabbeh"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_gabbeh")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Nomadic thick pile & earthy tones
                    </div>
                  </Link>
                  <Link
                    href="/shop?collection=moroccan"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_moroccan")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Plush Berber high-pile comfort
                    </div>
                  </Link>
                  <Link
                    href="/shop?collection=tufted"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_tufted")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Sculpted loop & geometric tufts
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Sourcing & Specifications */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#0F2C59] pb-2 border-b border-zinc-100">
                  Custom & Trade
                </div>
                <div className="space-y-3.5">
                  <Link
                    href="/shop"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0F2C59] group-hover:underline">
                      View All 56 Catalog Pieces →
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Explore the complete archive
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_bespoke_sizes")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Custom sizes from 4x6 to 12x15 ft
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setCollectionsOpen(false)}
                    className="group block"
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors">
                      {t("nav_arch_orders")}
                    </div>
                    <div className="text-[10px] text-[#8C8C8C] tracking-wide mt-0.5">
                      Hospitality & private-label contracts
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Singular Architectural Atelier Showcase Panel */}
            <div className="col-span-4 bg-[#FAF9F5] border border-[#E8E5DD] p-5 space-y-4">
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-200 border border-zinc-200/80">
                <img
                  src="/images/mughal-super/01-kashan-p109-red-cream.jpg"
                  alt="Featured Heirloom"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-[9.5px] uppercase font-bold tracking-[0.22em] text-[#0F2C59]">
                  Curated Collection · 2026 Archive
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1C1C]">
                  Palatial Hand-Knotted Masterworks
                </h4>
                <p className="text-[10.5px] text-[#666666] leading-relaxed">
                  Pure highland virgin wool and natural vegetal dyes engineered to endure for centuries.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={() => setCollectionsOpen(false)}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] bg-white text-[#1C1C1C] border border-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 ease-out shadow-xs"
              >
                Browse Full Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out border-b border-[#EBEBEB] bg-[#F8F9FA] ${
            searchOpen
              ? "max-h-24 opacity-100 py-3 px-4 visible"
              : "max-h-0 opacity-0 py-0 px-4 border-none invisible pointer-events-none"
          }`}
        >
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-[#767676]" />
            <input
              type="text"
              placeholder="Search by collection (Kazzak, Gabbeh, Mughal), colorway, or design code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="w-full bg-transparent text-xs text-[#1C1C1C] outline-none placeholder-[#767676]"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs text-[#767676] hover:text-[#1C1C1C] uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden bg-white border-t border-[#EBEBEB] overflow-y-auto transition-all duration-300 ease-out shadow-xl ${
            mobileOpen
              ? "max-h-[85vh] opacity-100 px-6 py-6 visible"
              : "max-h-0 opacity-0 px-6 py-0 invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-[0.18em] font-medium text-[#1C1C1C]">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-zinc-100 flex items-center justify-between"
            >
              <span>{t("nav_collections")} (56 Pieces)</span>
              <span className="text-[#0F2C59]">→</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-zinc-100"
            >
              {t("nav_explore")} · Six Generations
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-zinc-100"
            >
              {t("nav_journal")} · Stories
            </Link>
            <Link
              href="/care"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-zinc-100"
            >
              Carpet Care & Restoration
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-zinc-100"
            >
              {t("nav_contact")} & Bespoke Inquiries
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-[#0F2C59] font-semibold"
            >
              {t("nav_admin")} Portal
            </Link>
          </div>

          {/* Collapsible Language Selector for Mobile - Initially Hidden */}
          <div className="pt-3 pb-1 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setMobileLangOpen(!mobileLangOpen)}
              className="w-full flex items-center justify-between py-2.5 text-left group cursor-pointer"
              aria-expanded={mobileLangOpen}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-[#0F2C59]" />
                <span className="text-[10px] uppercase font-semibold text-[#767676] group-hover:text-[#1C1C1C] tracking-wider">
                  Select Language ({currentOption?.nativeName || "English"})
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#767676] transition-transform duration-300 ${
                  mobileLangOpen ? "rotate-180 text-[#0F2C59]" : ""
                }`}
              />
            </button>

            {/* Expandable Language Grid */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                mobileLangOpen
                  ? "max-h-72 opacity-100 pt-2 pb-1 visible"
                  : "max-h-0 opacity-0 invisible pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGES.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setMobileLangOpen(false);
                      }}
                      className={`py-2 px-2.5 text-xs rounded-lg flex items-center justify-between border transition-all ${
                        isSelected
                          ? "border-[#0F2C59] bg-[#0F2C59] text-white font-semibold shadow-xs"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span
                          className={`w-4 h-4 rounded text-[9px] font-bold font-mono uppercase flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-700"
                          }`}
                        >
                          {lang.code}
                        </span>
                        <span className="truncate text-[11px]">{lang.nativeName}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
                "Namaste Tajmahal Products, I would like to inquire about your handmade carpets."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill-navy w-full py-3 px-4 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Hotline (+91 82995 01435)</span>
            </a>
          </div>
        </div>
      </header>
    );
}
