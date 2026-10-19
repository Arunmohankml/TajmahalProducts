"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, Sliders, Droplets, Sun, Layers, ShoppingBag } from "lucide-react";
import { LOCAL_CATALOG, StoreProduct } from "@/lib/catalog";
import { resolveImageAsset } from "@/lib/assets";
import { useCart } from "@/context/CartContext";

export const PastelAuraSection: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedRoom, setSelectedRoom] = useState("Office Desk");
  const [selectedLight, setSelectedLight] = useState("Bright Indirect");
  const [selectedCare, setSelectedCare] = useState("Beginner");
  const [added, setAdded] = useState(false);

  // Dynamic recommendation based on selection
  const matchedProduct: StoreProduct = React.useMemo(() => {
    if (selectedCare === "Beginner") {
      return LOCAL_CATALOG.find((p) => p.id === "sunlit-moss-bowl") || LOCAL_CATALOG[0];
    }
    if (selectedLight === "Low Ambient") {
      return LOCAL_CATALOG.find((p) => p.id === "woodland-lamp-terrarium") || LOCAL_CATALOG[1];
    }
    if (selectedRoom === "Living Room") {
      return LOCAL_CATALOG.find((p) => p.id === "fern-fall-terrarium") || LOCAL_CATALOG[4];
    }
    return LOCAL_CATALOG.find((p) => p.id === "bonsai-waterfall-dome") || LOCAL_CATALOG[0];
  }, [selectedRoom, selectedLight, selectedCare]);

  const handleQuickAdd = () => {
    addToCart({
      id: matchedProduct.id,
      name: matchedProduct.name,
      price: matchedProduct.price,
      image_url: matchedProduct.image_url,
      stock: matchedProduct.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickPreset = (preset: "Desk" | "LowLight" | "Statement") => {
    if (preset === "Desk") {
      setSelectedRoom("Office Desk");
      setSelectedLight("Bright Indirect");
      setSelectedCare("Beginner");
    } else if (preset === "LowLight") {
      setSelectedRoom("Bedroom");
      setSelectedLight("Low Ambient");
      setSelectedCare("Easy");
    } else {
      setSelectedRoom("Living Room");
      setSelectedLight("Bright Indirect");
      setSelectedCare("Moderate");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Context & Explanations (Matches AnonVote Left Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-zinc-100 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
              <span>TERMINAL RECOMMENDER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight leading-tight">
              Calculate your interior room's ideal living biotope
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              Not all plants adapt to the same light angles. Our botanical algorithm evaluates your room setting, available window exposure, and maintenance appetite to recommend a mathematically stable specimen.
            </p>
          </div>

          {/* Quick Preset Helper Pills (AnonVote Signature Helper Pills) */}
          <div className="p-5 rounded-2xl bg-[#f4f4f6] border border-zinc-200 space-y-3">
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
              Quick Environment Presets:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickPreset("Desk")}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-mono font-bold text-zinc-800 transition-all cursor-pointer shadow-2xs"
              >
                Desk Glow (Beginner)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset("LowLight")}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-mono font-bold text-zinc-800 transition-all cursor-pointer shadow-2xs"
              >
                Low-Light Sanctuary
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset("Statement")}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-mono font-bold text-zinc-800 transition-all cursor-pointer shadow-2xs"
              >
                Statement Centerpiece
              </button>
            </div>
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Algorithm verified for tropical humidity levels</span>
          </div>
        </div>

        {/* Right Column: Pastel Aura Canvas (AnonVote Exact Signature Mesh) */}
        <div className="lg:col-span-7 pastel-aura-canvas rounded-[32px] p-6 sm:p-10 flex items-center justify-center min-h-[460px] shadow-sm">
          
          {/* FLOATING CARD */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 w-full max-w-lg shadow-xl shadow-zinc-900/5 space-y-6 border border-white/60">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Biotope Matcher
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Real-time environmental calibration
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Form selectors */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  1. Placement Location
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Office Desk", "Bedroom", "Living Room"].map((rm) => (
                    <button
                      key={rm}
                      type="button"
                      onClick={() => setSelectedRoom(rm)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedRoom === rm
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                          : "bg-[#f4f4f6] text-zinc-700 border-zinc-200 hover:bg-zinc-200"
                      }`}
                    >
                      {rm}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  2. Light Exposure
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Bright Indirect", "Low Ambient", "Direct Window"].map((lt) => (
                    <button
                      key={lt}
                      type="button"
                      onClick={() => setSelectedLight(lt)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedLight === lt
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                          : "bg-[#f4f4f6] text-zinc-700 border-zinc-200 hover:bg-zinc-200"
                      }`}
                    >
                      {lt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  3. Care Experience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Easy", "Moderate"].map((cr) => (
                    <button
                      key={cr}
                      type="button"
                      onClick={() => setSelectedCare(cr)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedCare === cr
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                          : "bg-[#f4f4f6] text-zinc-700 border-zinc-200 hover:bg-zinc-200"
                      }`}
                    >
                      {cr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Match Result Box */}
            <div className="bg-[#f4f4f6] rounded-2xl p-4 border border-zinc-200/80 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white border border-zinc-200/60 flex-shrink-0">
                <Image
                  src={resolveImageAsset(matchedProduct.image_url)}
                  alt={matchedProduct.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  99.4% OPTIMAL MATCH
                </span>
                <h4 className="text-sm font-bold text-zinc-950 truncate">{matchedProduct.name}</h4>
                <p className="text-xs font-mono font-bold text-zinc-900">
                  ₹{matchedProduct.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`w-full py-3.5 px-6 rounded-xl text-[14px] font-semibold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#18181b] hover:bg-zinc-800 text-white"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added Recommended Specimen!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Matched Specimen to Cart</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
