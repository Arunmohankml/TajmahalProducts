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

        {/* Shortlist Bookmark Button */}
        <button
          onClick={toggleShortlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors z-10 border ${
            isShortlisted
              ? "bg-[#0F2C59] text-white border-[#0F2C59]"
              : "bg-white/80 hover:bg-white text-zinc-700 border-zinc-200"
          }`}
          title={isShortlisted ? "Remove from Shortlist" : "Save to Shortlist"}
          aria-label="Toggle shortlist"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? "fill-current" : ""}`} />
        </button>

        {/* Collection Pill on Top-Left */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="px-2 py-0.5 bg-white/90 text-[#0F2C59] text-[9.5px] font-semibold uppercase tracking-wider border border-zinc-200">
            {product.weave}
          </span>
        </div>

        {/* Modern Hover Action Pill (Small rounded modern UI with cool animation, no quote option) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn relative inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white hover:bg-[#1C1C1C] text-[#1C1C1C] hover:text-white border border-[#1C1C1C] shadow-lg hover:shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 text-[11px] font-semibold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C] group-hover/btn:bg-white transition-colors" />
            <MessageCircle className="w-3.5 h-3.5 text-[#1C1C1C] group-hover/btn:text-white fill-current transition-colors" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Typography: TITLE | SIZE | COLLECTION | COLORWAY */}
      <div className="space-y-1 pt-1">
        <Link href={`/shop/${product.id}`} className="block">
          <h3 className="text-[11.5px] sm:text-xs font-normal uppercase tracking-[0.14em] text-[#1C1C1C] hover:text-[#0F2C59] transition-colors line-clamp-2 leading-relaxed">
            {displayName} | {displaySize} | {displayColl} | {displayColor}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-[#0F2C59] tracking-wider uppercase">
            Price on Request
          </span>
          <span className="text-[10px] text-[#767676] font-mono">
            {product.order_code}
          </span>
        </div>
      </div>
    </div>
  );
}
