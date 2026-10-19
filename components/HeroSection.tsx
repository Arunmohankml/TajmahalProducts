"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Sprout, ShieldCheck, Droplets, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    // Calibrated for ultra-smooth, slow, meditative crafting motion
    video.playbackRate = 0.85;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Safe fallback for autoplay policies
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-14 sm:pt-20 pb-14">
      
      {/* ============================================================ */}
      {/* BACKGROUND VIDEO: Ultra-Smooth Terrarium Crafting Video      */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" 
        aria-hidden="true"
      >
        {/* Hardware-accelerated Video Layer with CSS Gradient Mask */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            isVideoLoaded ? "opacity-[0.22]" : "opacity-0"
          }`}
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.85) 72%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.85) 72%, transparent 100%)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover object-center transform-gpu will-change-transform scale-[1.04]"
          >
            <source src="/videos/makingvideo1.mp4" type="video/mp4" />
            <source src="/videos/makingvideo2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Top Smooth Gradient Fade (Seamless into White Background) */}
        <div className="absolute top-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />

        {/* Bottom Smooth Gradient Fade (Seamless into White Canvas) */}
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10" />

        {/* Subtle radial center light to keep text 100% crisp and readable */}
        <div className="absolute inset-0 bg-radial-gradient from-white/40 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* ============================================================ */}
      {/* FOREGROUND HERO CONTENT (AnonVote Signature Architecture)   */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-7">
        
        {/* Top Pill Tag (AnonVote Signature Style) */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-50/90 backdrop-blur-xs border border-zinc-200/80 text-[13px] font-medium text-zinc-600 shadow-2xs">
          <span className="w-2 h-2 rounded-xs bg-[#f87171]" />
          <span className="tracking-wide uppercase font-semibold text-xs">BIOPHILIC LIVING ECOSYSTEMS</span>
        </div>

        {/* Hero Main Heading (AnonVote Typography) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-950 leading-[1.08] max-w-4xl mx-auto drop-shadow-xs">
          From wild botanicals to self-sustaining glass sanctuaries
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-500 font-normal max-w-2xl mx-auto leading-relaxed">
          Handcrafted closed terrariums, living moss bowls, and tabletop aquatic biotope kits. Self-regulating micro-ecosystems designed for calm, modern indoor living.
        </p>

        {/* Quick CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="px-7 py-3.5 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-[15px] font-medium transition-all shadow-sm flex items-center space-x-2 cursor-pointer group"
          >
            <span>Explore Living Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/build"
            className="px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[15px] font-medium transition-all cursor-pointer flex items-center space-x-2"
          >
            <Compass className="w-4 h-4 text-zinc-600" />
            <span>Launch Custom Studio Builder</span>
          </Link>
        </div>

        {/* Trust & Craft Indicators */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-zinc-600 font-semibold">100% Live Arrival Guaranteed</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-zinc-600 font-semibold">Self-Contained Water Cycle</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="text-zinc-600 font-semibold">Bioactive Soil & Microfauna</span>
          </div>
        </div>

      </div>

    </section>
  );
};
