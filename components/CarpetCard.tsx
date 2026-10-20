"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Bookmark,
  Eye,
  Sparkles,
} from "lucide-react";
import { CarpetProduct, createWhatsAppInquiryLink } from "@/lib/tajmahal_data";
import { useShortlist } from "@/context/ShortlistContext";

export function CarpetCard({ product }: { product: CarpetProduct }) {
  const { isInShortlist, addToShortlist, removeFromShortlist, openInquiryModal } = useShortlist();
  const isShortlisted = isInShortlist(product.id);

  const toggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isShortlisted) {
      removeFromShortlist(product.id);
    } else {
      addToShortlist(product);
    }
  };

  const handleOpenInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openInquiryModal(product);
  };

  const whatsAppLink = createWhatsAppInquiryLink(product);

  // Format title in clean uppercase spaced pipe-separated style
  // E.g. ECLIPSIA | 4' X 6' FT | MODERN RUGS | MULTI COLOR
  const displayName = product.title.toUpperCase();
  const displaySize = product.size.toUpperCase();
  const displayColl = product.collection_name.toUpperCase();
  const displayColor = product.color.toUpperCase();

  return (
    <div className="group bg-white flex flex-col text-left transition-all duration-300 relative">
      {/* Carpet Image Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#F5F5F5] overflow-hidden mb-3 border border-zinc-100 group-hover:border-zinc-300 transition-colors">
        <Link href={`/shop/${product.id}`} className="block w-full h-full">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Shortlist Bookmark Button (Bottom Right Corner) */}
        <button
          onClick={toggleShortlist}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all duration-300 z-10 border shadow-xs ${
            isShortlisted
              ? "bg-[#0F2C59] text-white border-[#0F2C59]"
              : "bg-white/90 hover:bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
          }`}
          title={isShortlisted ? "Remove from Shortlist" : "Save to Shortlist"}
          aria-label="Toggle shortlist"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? "fill-current" : ""}`} />
        </button>

        {/* Collection Pill on Top-Left */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
          <span className="px-2 py-0.5 bg-white/90 text-[#0F2C59] text-[9.5px] font-semibold uppercase tracking-wider border border-zinc-200">
            {product.weave}
          </span>
        </div>
      </div>

      {/* Typography: TITLE | SIZE | COLLECTION | COLORWAY */}
      <div className="space-y-1.5 pt-1">
        <Link href={`/shop/${product.id}`} className="block group/title">
          <h3 className="text-[11px] sm:text-xs font-normal uppercase tracking-[0.11em] sm:tracking-[0.13em] text-[#1C1C1C] group-hover/title:text-[#0F2C59] transition-colors line-clamp-2 leading-relaxed">
            {displayName} | {displaySize} | {displayColl} | {displayColor}
          </h3>
        </Link>

        {/* Clean Minimalist Spec Footer */}
        <div className="flex items-center justify-between pt-0.5 text-[#767676]">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500">
            {product.order_code}
          </span>
          <span className="text-[9.5px] uppercase tracking-widest text-zinc-400">
            {product.stock_status || "Available"}
          </span>
        </div>
      </div>
    </div>
  );
}
