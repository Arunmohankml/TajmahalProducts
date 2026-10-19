"use client";

import React from "react";

export const BentoFeatures: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Water Cycle / Timeline Inset (Matches AnonVote Card 1) */}
        <div className="bg-[#f4f4f6] rounded-[32px] p-8 flex flex-col justify-between space-y-8 border border-zinc-200/50">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>CYCLE PROTOCOL</span>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight leading-snug">
              See moisture balance stabilize before mold ever takes hold
            </h3>
          </div>

          {/* Inset Dark Card (AnonVote Inset 1) */}
          <div className="bg-[#18181b] rounded-2xl p-6 text-white space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">0 Misting Required</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-emerald-400 font-mono">
                100% CLOSED LOOP
              </span>
            </div>

            {/* Wave SVG Illustration (AnonVote Exact Wave) */}
            <div className="h-24 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 240 70" fill="none">
                <path
                  d="M 10 35 Q 60 5, 120 40 T 230 20"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 10 50 Q 70 65, 130 25 T 230 45"
                  stroke="#fde047"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>EVAPORATION OK</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>CONDENSATION RECYCLED</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Bioactive Substrate / Review (Matches AnonVote Card 2) */}
        <div className="bg-[#f4f4f6] rounded-[32px] p-8 flex flex-col justify-between space-y-8 border border-zinc-200/50">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>BIO-SEPARATION</span>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight leading-snug">
              Understand how bioactive microfauna self-cleans the glass
            </h3>
          </div>

          {/* Inset Dark Card with PASS Badge (AnonVote Inset 2) */}
          <div className="bg-[#18181b] rounded-2xl p-6 text-white space-y-4 shadow-md">
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              Multi-tier false bottom: Drainage leca layer, mesh separation, activated coconut charcoal, and springtails consume fungal spores naturally.
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="px-3 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-bold font-mono">
                PASS
              </span>
              <span className="text-xs text-zinc-400 font-mono">0xBioLayer...89f2</span>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
              <span className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[10px]">
                ✓
              </span>
              <span>AquaTerra Natural Bio-Shield</span>
            </div>
          </div>
        </div>

        {/* Card 3: Telemetry Table (Matches AnonVote Card 3) */}
        <div className="bg-[#f4f4f6] rounded-[32px] p-8 flex flex-col justify-between space-y-8 border border-zinc-200/50">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>LIVING AUDIT</span>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight leading-snug">
              Micro-climate indicators that stay stable as seasons change
            </h3>
          </div>

          {/* Inset Table Card with Badges (AnonVote Inset 3) */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase pb-1 border-b border-zinc-100">
              <span>PARAMETER</span>
              <span>METRIC</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-800 font-medium">Relative Humidity</span>
              <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200">
                85% - 95%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-800 font-medium">CondensationCycle</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                BALANCED
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-800 font-medium">Lichen&MossViability</span>
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                OPTIMAL
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
