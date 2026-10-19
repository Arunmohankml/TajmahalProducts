"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export default function ShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://tajmahalproducts.com/news/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        // user cancelled or share unsupported, fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#F5F4F0] hover:bg-[#EAE6DF] text-[#1C1C1C] text-[11px] uppercase tracking-wider font-semibold border border-[#E0E0E0] transition-colors"
      title="Share or Copy Link"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700">Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Guide</span>
        </>
      )}
    </button>
  );
}
