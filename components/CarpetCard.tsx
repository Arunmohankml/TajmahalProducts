"use client";

import React from "react";
import Link from "next/link";
import { CarpetProduct } from "@/lib/tajmahal_data";

export function CarpetCard({ product }: { product: CarpetProduct }) {

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
      </div>

      {/* Typography: TITLE | SIZE | COLLECTION | COLORWAY */}
      <div className="space-y-1.5 pt-1">
        <Link href={`/shop/${product.id}`} className="block group/title">
          <h3 className="text-[11px] sm:text-xs font-normal uppercase tracking-[0.11em] sm:tracking-[0.13em] text-[#1C1C1C] group-hover/title:text-[#0F2C59] transition-colors line-clamp-2 leading-relaxed">
            {displayName} | {displaySize} | {displayColl} | {displayColor}
          </h3>
        </Link>
      </div>
    </div>
  );
}
