"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO_BLOG_POSTS, SeoBlogPost } from "@/lib/seo_blogs_data";

const BLANK_IMAGE = "/images/blank.svg";

const POSTS_PER_PAGE = 12;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(SEO_BLOG_POSTS.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return SEO_BLOG_POSTS.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage]);

  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      {/* Header Banner */}
      <section className="border-b border-[#EBEBEB] py-16 sm:py-24 text-center bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#0F2C59]">
            Artisan Stories & Insights · Bhadohi
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.2em] text-[#1C1C1C]">
            Blog Spot
          </h1>
          <p className="text-xs sm:text-sm text-[#767676] max-w-2xl mx-auto leading-relaxed pt-2">
            Dispatches from our loom sheds in Bhadohi: craftsmanship techniques, history of the six generations, heirloom preservation guides, and weaver profiles.
          </p>
        </div>
      </section>

      {/* Main Articles Grid (2-Column Original Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-14">
          {currentPosts.map((art) => {
            const imageSrc = art.image && art.image.trim() !== "" ? art.image : BLANK_IMAGE;

            return (
              <article key={art.slug} className="group flex flex-col space-y-4">
                <Link
                  href={`/news/${art.slug}`}
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border border-zinc-200"
                >
                  <img
                    src={imageSrc}
                    alt={art.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = BLANK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[9.5px] uppercase font-semibold tracking-wider text-[#0F2C59]">
                    {art.category}
                  </div>
                </Link>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-[#767676]">
                    <span>{art.publishedAt}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <Link href={`/news/${art.slug}`} className="block">
                    <h2 className="text-lg sm:text-xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors leading-snug">
                      {art.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#767676] leading-relaxed line-clamp-3">
                    {art.metaDescription}
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
            );
          })}
        </div>

        {/* Clean Page Switcher */}
        {totalPages > 1 && (
          <div className="mt-16 pt-10 border-t border-[#EBEBEB] flex items-center justify-between text-xs text-[#767676]">
            <div>
              Showing Page <span className="font-semibold text-[#1C1C1C]">{currentPage}</span> of{" "}
              <span className="font-semibold text-[#1C1C1C]">{totalPages}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="px-3.5 py-2 border border-zinc-200 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed bg-white text-[#1C1C1C] font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 border border-zinc-200 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed bg-white text-[#1C1C1C] font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
