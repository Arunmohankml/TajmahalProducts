"use client";

import React from "react";

export const DarkTelemetrySection: React.FC = () => {
  return (
    <section className="bg-[#111113] text-white py-24 sm:py-32 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title (Matches AnonVote Dark Title) */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-semibold text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>BOTANICAL PRECISION & CERTAINTY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            Turn unpredictable nature into permanent living tranquility
          </h2>
        </div>

        {/* 3 Dark Bento Cards (Exact Match to AnonVote Dark Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dark Card 1: Layer Distribution */}
          <div className="bg-[#18181b] rounded-[32px] p-8 space-y-8 border border-zinc-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400">⏱ Bio-Layer Distribution</span>
                <p className="text-2xl font-bold font-mono text-white">4 substrate barriers</p>
              </div>

              {/* Multi-color Pill Bar (AnonVote Exact Pill Bar) */}
              <div className="h-3 w-full rounded-full bg-zinc-800 flex overflow-hidden p-0.5 gap-1">
                <div className="w-[25%] bg-emerald-400 rounded-full" />
                <div className="w-[25%] bg-blue-400 rounded-full" />
                <div className="w-[30%] bg-purple-400 rounded-full" />
                <div className="w-[20%] bg-zinc-400 rounded-full" />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>LECA BASE</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>SPHAGNUM</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>CHARCOAL</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-zinc-400" />
                  <span>SOIL BLEND</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-4 border-t border-zinc-800 font-mono">
              <strong className="text-white">Isolates standing water</strong> below the root zone to eliminate root rot and sustain constant soil humidity.
            </p>
          </div>

          {/* Dark Card 2: 0 Rot / Wave Graph (AnonVote Wave Center Inset) */}
          <div className="bg-[#18181b] rounded-[32px] p-8 space-y-8 border border-zinc-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">0 fungal infections</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                  100% CLEAN
                </span>
              </div>

              {/* Smooth Wavy Graph (AnonVote Wave Graph) */}
              <div className="h-28 flex items-center justify-center">
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

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SPRINGTAIL PATROL</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span>UV LIGHT BALANCE</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span>AIR CYCLING</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-4 border-t border-zinc-800 font-mono">
              <strong className="text-white">Maintains balanced respiration</strong> between plant photosynthesis and microfauna carbon recycling.
            </p>
          </div>

          {/* Dark Card 3: Stacked Feature Items (AnonVote Right Inset) */}
          <div className="bg-[#18181b] rounded-[32px] p-8 space-y-6 border border-zinc-800 flex flex-col justify-between">
            <div className="space-y-3">
              
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                  ✓
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Ultra-Clear Float Glass</p>
                  <p className="text-zinc-500 font-mono text-[11px]">99.2% optic light clarity</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                  ✓
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Springtail Bio-Guard</p>
                  <p className="text-zinc-500 font-mono text-[11px]">Consumes decaying leaves</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                  ✓
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Shockproof Foam Cradle</p>
                  <p className="text-zinc-500 font-mono text-[11px]">Zero transit glass breakage</p>
                </div>
              </div>

            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-4 border-t border-zinc-800 font-mono">
              <strong className="text-white">Studio tested for 14 days</strong> prior to dispatch to verify absolute biological stability.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
