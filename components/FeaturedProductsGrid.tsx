"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

const CATEGORIES = ["All", "Terrariums", "Aquascape Kits", "Aquatic Plants"];

export const FeaturedProductsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = React.useMemo(() => {
    if (activeCategory === "All") return LOCAL_CATALOG.slice(0, 8);
    return LOCAL_CATALOG.filter((p) => p.category === activeCategory).slice(0, 8);
  }, [activeCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Header & Category Pills (AnonVote Style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>CURATED STUDIO SELECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Featured Living Ecosystems
          </h2>
          <p className="text-sm text-zinc-500 font-normal mt-1">
            Carefully balanced botanicals potted in museum-grade high-transparency glass.
          </p>
        </div>

        {/* Category Pills Switcher */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#18181b] text-white shadow-xs"
                  : "bg-[#f4f4f6] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Collection Banner */}
      <div className="pt-4 flex justify-center">
        <Link
          href="/shop"
          className="px-8 py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer"
        >
          <span>View All 13 Botanical Specimens in Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  );
};
