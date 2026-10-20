"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Grid3X3,
  LayoutGrid,
  List,
  ChevronDown,
  RotateCcw,
  Search,
  Filter,
  X,
} from "lucide-react";
import { CarpetProduct, COLLECTIONS_DATA, COMPANY_PROFILE } from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";
import { CarpetCard } from "@/components/CarpetCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCollection = searchParams.get("collection") || "all";
  const urlQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<CarpetProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlQuery);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedWeave, setSelectedWeave] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "title-asc" | "title-desc">("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion open states (collapsed by default)
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openWeave, setOpenWeave] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const col = searchParams.get("collection");
    if (col) setSelectedCollection(col);
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const loadProducts = async () => {
    const list = await tajmahalDb.getProducts();
    setProducts(list);
    setLoading(false);
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.order_code.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.collection_name.toLowerCase().includes(q);

      const matchColl =
        selectedCollection === "all" || p.collection_id === selectedCollection;

      const matchWeave =
        selectedWeave === "all" || p.weave.toLowerCase().includes(selectedWeave.toLowerCase());

      const matchMat =
        selectedMaterial === "all" || p.material.toLowerCase().includes(selectedMaterial.toLowerCase());

      const matchCol =
        selectedColor === "all" || p.color.toLowerCase().includes(selectedColor.toLowerCase());

      return matchSearch && matchColl && matchWeave && matchMat && matchCol;
    }).sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, search, selectedCollection, selectedWeave, selectedMaterial, selectedColor, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCollection("all");
    setSelectedWeave("all");
    setSelectedMaterial("all");
    setSelectedColor("all");
    setSortBy("featured");
  };

  return (
    <div className="space-y-0 bg-white text-[#1C1C1C]">
      {/* =========================================================================
          1. PRODUCTS HERO BANNER
         ========================================================================= */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
        <img
          src="/hmc_assets/hmc-header-image.jpg"
          alt="Artisan with vibrant handcrafted rug"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-105"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center text-white space-y-2">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#E8D39D]">
            Authentic Hand-Knotted & Hand-Tufted Portfolio
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal uppercase tracking-[0.22em] text-white">
            Products
          </h1>
        </div>
      </section>

      {/* =========================================================================
          2. THE ATELIER COMPENDIUM HEADER
         ========================================================================= */}
      <section className="py-12 sm:py-16 text-center max-w-4xl mx-auto px-4 space-y-3">
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#0F2C59] font-semibold">
          Museum-Grade Weaves · Bhadohi Atelier
        </div>
        <h2 className="text-xl sm:text-3xl font-normal uppercase tracking-[0.18em] text-[#1C1C1C]">
          The Atelier Compendium
        </h2>
        <p className="text-xs sm:text-sm text-[#767676] leading-relaxed max-w-3xl mx-auto">
          Every rug in our portfolio is a singular testament to human patience, hand-knotted by master artisans in Bhadohi. From the dense, imperial knotting of our Mughal Super heritage collection to the expressive raw abrash of our hand-spun Gabbeh and Moroccan high-pile weaves, discover living heirlooms designed to anchor discerning architectural spaces.
        </p>
      </section>

      {/* =========================================================================
          3. MAIN PRODUCTS CATALOGUE
         ========================================================================= */}
      <section className="border-t border-[#EBEBEB] pb-24">
        {/* Top Control Bar (View Switcher, Count, Sort) - Sticky on Mobile and PC */}
        <div className="sticky top-[58px] sm:top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: View Toggles & Mobile Filter Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="btn-stroke-dark lg:hidden flex items-center space-x-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <div className="hidden sm:flex items-center space-x-1 text-zinc-400">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 hover:text-[#1C1C1C] ${gridCols === 3 ? "text-[#1C1C1C]" : ""}`}
                  title="3 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 hover:text-[#1C1C1C] ${gridCols === 4 ? "text-[#1C1C1C]" : ""}`}
                  title="4 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center: Products Count */}
            <div className="text-xs uppercase tracking-[0.18em] text-[#767676] font-medium">
              {filteredProducts.length} Products
            </div>

            {/* Right: Sort By Dropdown */}
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider">
              <span className="hidden sm:inline text-[#767676]">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs uppercase tracking-wider bg-transparent outline-none border-b border-zinc-300 py-1 cursor-pointer text-[#1C1C1C]"
              >
                <option value="featured">Featured</option>
                <option value="title-asc">Title: A-Z</option>
                <option value="title-desc">Title: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Left Sidebar + Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* =========================================================================
                LEFT FILTER ACCORDION SIDEBAR - Sticky on PC alongside products
               ========================================================================= */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 text-xs uppercase tracking-[0.14em] sticky top-[125px] sm:top-[135px] self-start max-h-[calc(100vh-150px)] overflow-y-auto no-scrollbar pr-2">
              {/* Active filters reset */}
              {(selectedCollection !== "all" || selectedWeave !== "all" || selectedMaterial !== "all" || selectedColor !== "all" || search) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center space-x-1.5 text-[#0F2C59] font-semibold tracking-wider pb-2 border-b border-zinc-200 w-full"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              )}

              {/* 1. Spaces & Styling Accordion */}
              <div className="border-b border-[#EBEBEB] pb-4">
                <button
                  onClick={() => setOpenSpaces(!openSpaces)}
                  className="w-full flex items-center justify-between font-semibold text-[#1C1C1C] py-2"
                >
                  <span>Spaces & Styling</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSpaces ? "rotate-180" : ""}`} />
                </button>
                {openSpaces && (
                  <div className="space-y-2 pt-2 text-[#767676] normal-case">
                    {["All Collections", "Gabbeh", "Kazzak", "Tufted", "Moroccan", "Mughal", "Mughal Super"].map((col) => {
                      const colKey = col === "All Collections" ? "all" : col.toLowerCase().replace(" ", "-");
                      return (
                        <label key={col} className="flex items-center space-x-2.5 cursor-pointer text-xs hover:text-[#1C1C1C]">
                          <input
                            type="radio"
                            name="colFilter"
                            checked={selectedCollection === colKey}
                            onChange={() => setSelectedCollection(colKey)}
                            className="w-3.5 h-3.5 accent-[#0F2C59]"
                          />
                          <span>{col}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Rug Material Accordion */}
              <div className="border-b border-[#EBEBEB] pb-4">
                <button
                  onClick={() => setOpenMaterial(!openMaterial)}
                  className="w-full flex items-center justify-between font-semibold text-[#1C1C1C] py-2"
                >
                  <span>Rug Material</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMaterial ? "rotate-180" : ""}`} />
                </button>
                {openMaterial && (
                  <div className="space-y-2 pt-2 text-[#767676] normal-case">
                    {["All Materials", "Wool", "Silk", "Wool-Blend"].map((mat) => {
                      const matKey = mat === "All Materials" ? "all" : mat;
                      return (
                        <label key={mat} className="flex items-center space-x-2.5 cursor-pointer text-xs hover:text-[#1C1C1C]">
                          <input
                            type="radio"
                            name="matFilter"
                            checked={selectedMaterial === matKey}
                            onChange={() => setSelectedMaterial(matKey)}
                            className="w-3.5 h-3.5 accent-[#0F2C59]"
                          />
                          <span>{mat}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Explore by Colors Accordion */}
              <div className="border-b border-[#EBEBEB] pb-4">
                <button
                  onClick={() => setOpenColors(!openColors)}
                  className="w-full flex items-center justify-between font-semibold text-[#1C1C1C] py-2"
                >
                  <span>Explore by Colors</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openColors ? "rotate-180" : ""}`} />
                </button>
                {openColors && (
                  <div className="space-y-2 pt-2 text-[#767676] normal-case">
                    {["All Colors", "Red", "Cream", "Navy", "Charcoal", "Gold", "Ivory"].map((col) => {
                      const colKey = col === "All Colors" ? "all" : col;
                      return (
                        <label key={col} className="flex items-center space-x-2.5 cursor-pointer text-xs hover:text-[#1C1C1C]">
                          <input
                            type="radio"
                            name="colColorFilter"
                            checked={selectedColor === colKey}
                            onChange={() => setSelectedColor(colKey)}
                            className="w-3.5 h-3.5 accent-[#0F2C59]"
                          />
                          <span>{col}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Weaving Type Accordion */}
              <div className="border-b border-[#EBEBEB] pb-4">
                <button
                  onClick={() => setOpenWeave(!openWeave)}
                  className="w-full flex items-center justify-between font-semibold text-[#1C1C1C] py-2"
                >
                  <span>Weaving Type</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openWeave ? "rotate-180" : ""}`} />
                </button>
                {openWeave && (
                  <div className="space-y-2 pt-2 text-[#767676] normal-case">
                    {["All Weaves", "Hand-Knotted", "Hand-Tufted"].map((w) => {
                      const wKey = w === "All Weaves" ? "all" : w;
                      return (
                        <label key={w} className="flex items-center space-x-2.5 cursor-pointer text-xs hover:text-[#1C1C1C]">
                          <input
                            type="radio"
                            name="weaveFilter"
                            checked={selectedWeave === wKey}
                            onChange={() => setSelectedWeave(wKey)}
                            className="w-3.5 h-3.5 accent-[#0F2C59]"
                          />
                          <span>{w}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            {/* =========================================================================
                RIGHT: PRODUCTS GRID
               ========================================================================= */}
            <main className="lg:col-span-9">
              {loading ? (
                <div className="py-24 text-center text-xs uppercase tracking-widest text-[#767676]">
                  Loading carpet catalogue...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-24 text-center space-y-3">
                  <p className="text-sm uppercase tracking-wider text-[#1C1C1C]">No carpets match the selected criteria.</p>
                  <button
                    onClick={handleResetFilters}
                    className="btn-stroke-dark px-5 py-2.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-x-3.5 sm:gap-x-6 gap-y-7 sm:gap-y-12 ${
                    gridCols === 3
                      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <CarpetCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination Bar */}
              <div className="mt-16 pt-8 border-t border-[#EBEBEB] flex items-center justify-center space-x-4 text-xs font-medium text-[#1C1C1C]">
                <span className="w-8 h-8 flex items-center justify-center border-b-2 border-[#1C1C1C]">1</span>
                <span className="w-8 h-8 flex items-center justify-center text-[#767676] hover:text-[#1C1C1C] cursor-pointer">2</span>
                <span className="w-8 h-8 flex items-center justify-center text-[#767676] hover:text-[#1C1C1C] cursor-pointer">3</span>
                <span className="text-[#767676]">...</span>
                <span className="w-8 h-8 flex items-center justify-center text-[#767676] hover:text-[#1C1C1C] cursor-pointer">5</span>
                <span className="text-[#767676] hover:text-[#1C1C1C] cursor-pointer">›</span>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/60 lg:hidden">
          <div className="w-80 bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs uppercase tracking-wider">
              <div>
                <span className="font-semibold block mb-2">Collection</span>
                {["all", "gabbeh", "kazzak", "tufted", "moroccan", "mughal", "mughal-super"].map((col) => (
                  <button
                    key={col}
                    onClick={() => { setSelectedCollection(col); setMobileFilterOpen(false); }}
                    className={`block py-1 ${selectedCollection === col ? "text-[#0F2C59] font-bold" : "text-[#767676]"}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-xs uppercase tracking-widest">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
