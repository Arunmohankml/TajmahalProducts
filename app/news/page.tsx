"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Clock, Calendar, BookOpen, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO_BLOG_POSTS, getAllCategories, SeoBlogPost } from "@/lib/seo_blogs_data";

const POSTS_PER_PAGE = 9;

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => getAllCategories(), []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return SEO_BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.metaDescription.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1C1C1C] min-h-screen">
      {/* Header Banner */}
      <section className="border-b border-[#EBEBEB] py-16 sm:py-24 text-center bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F4F1EA] text-[#0F2C59] text-[10.5px] uppercase font-bold tracking-[0.25em]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Authoritative Guides · Bhadohi Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-[0.16em] text-[#1C1C1C] leading-tight">
            The Rug Journal
          </h1>

          <p className="text-xs sm:text-sm text-[#666666] max-w-2xl mx-auto leading-relaxed pt-1">
            50 definitive long-form guides on hand-knotted carpet history, Bhadohi loom craft, international export logistics, interior styling, and heirloom preservation — direct from Tajmahal Products, established 1967.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by topic, weave, material or keyword..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8F9FA] border border-[#E0E0E0] rounded-none focus:outline-none focus:border-[#0F2C59] text-[#1C1C1C] placeholder-[#8C8C8C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8C8C] hover:text-[#1C1C1C]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs text-[#767676] flex items-center justify-between md:justify-end gap-2">
              <span className="font-medium text-[#1C1C1C]">{filteredPosts.length}</span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"} found
              {selectedCategory !== "All" && (
                <span className="text-[11px] bg-[#EAE6DF] px-2 py-0.5 text-[#0F2C59] font-medium">
                  {selectedCategory}
                </span>
              )}
            </div>
          </div>

          {/* Category Pills (Scrollable) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition-all border ${
                    isActive
                      ? "bg-[#0F2C59] text-white border-[#0F2C59] shadow-sm"
                      : "bg-[#F8F9FA] text-[#555555] border-[#E8E8E8] hover:bg-[#EAE6DF] hover:text-[#1C1C1C]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EBEBEB] p-8 max-w-lg mx-auto">
            <h3 className="text-base uppercase tracking-wider font-semibold text-[#1C1C1C]">
              No articles matched your search
            </h3>
            <p className="text-xs text-[#767676] mt-2">
              Try searching for &quot;hand-knotted&quot;, &quot;wool&quot;, &quot;Bhadohi&quot;, &quot;cleaning&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 bg-[#0F2C59] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {paginatedPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white border border-[#E8E8E8] hover:border-[#0F2C59]/40 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <Link
                  href={`/news/${post.slug}`}
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-[#EBEBEB]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider text-[#0F2C59] shadow-sm">
                    {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2 text-[10.5px] text-[#767676]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#8C8C8C]" />
                        <span>{post.publishedAt}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#8C8C8C]" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <Link href={`/news/${post.slug}`} className="block">
                      <h2 className="text-base font-normal uppercase tracking-[0.08em] text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-3">
                      {post.metaDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {post.keywords.slice(0, 2).map((k) => (
                        <span
                          key={k}
                          className="text-[9px] bg-[#F5F4F0] text-[#555555] px-1.5 py-0.5 rounded-sm line-clamp-1"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-bold text-[#0F2C59] group-hover:underline"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#E0E0E0] bg-white text-[#1C1C1C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F8F9FA] transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Only show nearby pages if total is large
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      currentPage === page
                        ? "bg-[#0F2C59] text-white border-[#0F2C59]"
                        : "bg-white text-[#555555] border-[#E0E0E0] hover:bg-[#F8F9FA]"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span key={page} className="px-1 text-xs text-[#8C8C8C]">
                    …
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-[#E0E0E0] bg-white text-[#1C1C1C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F8F9FA] transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Factory Direct CTA Box */}
      <section className="bg-white border-t border-[#EBEBEB] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#0F2C59]">
            Direct Manufacturing Partnership · Established 1967
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C]">
            Require Custom Rugs or Wholesale Export?
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] max-w-xl mx-auto leading-relaxed">
            Collaborate directly with our master weaving artisans in Bhadohi. We manufacture private label collections, bespoke hospitality carpets, and luxury residential heirlooms.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#0F2C59] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#0A1F3F] transition-colors shadow-sm"
            >
              Request Trade Sourcing Pack
            </Link>
            <a
              href="mailto:tmproducts.bhadohi@gmail.com"
              className="px-6 py-3 bg-white border border-[#1C1C1C] text-[#1C1C1C] text-xs uppercase tracking-wider font-semibold hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              Email tmproducts.bhadohi@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
