"use client";

import React from "react";
import Link from "next/link";

interface HmcLogoProps {
  variant?: "dark" | "light";
  className?: string;
  showSubtitle?: boolean;
}

export function HmcLogo({ variant = "dark", className = "", showSubtitle = false }: HmcLogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={`inline-flex flex-col items-center group transition-transform ${className}`}>
      <div className="relative h-7 sm:h-9 w-auto flex items-center justify-center">
        <img
          src={isLight ? "/images/logo/tajmahal_logo_light.png" : "/images/logo/tajmahal_logo_dark.png"}
          alt="Tajmahal Products - Mark of Authenticity Since 1967"
          className="h-full w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
        />
      </div>

      {showSubtitle && (
        <span
          className={`text-[7.5px] uppercase font-medium tracking-[0.24em] mt-0.5 text-center select-none transition-colors ${
            isLight ? "text-white/80" : "text-[#767676]"
          }`}
        >
          Since 1967 · Bhadohi
        </span>
      )}
    </Link>
  );
}

