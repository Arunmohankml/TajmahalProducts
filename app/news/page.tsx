"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/journal_data";

export default function NewsPage() {
  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      {/* Header Banner */}
      <section className="border-b border-[#EBEBEB] py-16 sm:py-24 text-center bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
            Artisan Stories & Insights · Bhadohi
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-[#1C1C1C]">
            The Rug Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#767676] max-w-2xl mx-auto leading-relaxed pt-2">
            Dispatches from our loom sheds in Bhadohi: craftsmanship techniques, history of the six generations, heirloom preservation guides, and weaver profiles.
          </p>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-14">
          {JOURNAL_ARTICLES.map((art) => (
            <article key={art.slug} className="group flex flex-col space-y-4">
              <Link href={`/news/${art.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[9.5px] uppercase font-semibold tracking-wider text-[#0F2C59]">
                  {art.category}
                </div>
              </Link>

              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-[11px] text-[#767676]">
                  <span>{art.date}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <Link href={`/news/${art.slug}`} className="block">
                  <h2 className="text-lg sm:text-xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors leading-snug">
                    {art.title}
                  </h2>
                </Link>

                <p className="text-xs text-[#767676] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/news/${art.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
