import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  SEO_BLOG_POSTS,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/lib/seo_blogs_data";
import { JOURNAL_ARTICLES } from "@/lib/journal_data";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";
import ShareButton from "@/components/ShareButton";

interface Props {
  params: {
    slug: string;
  };
}

// Generate static params for all 50+ blog posts for high-speed SSG
export async function generateStaticParams() {
  const seoSlugs = SEO_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
  const legacySlugs = JOURNAL_ARTICLES.map((art) => ({
    slug: art.slug,
  }));
  return [...seoSlugs, ...legacySlugs];
}

// Generate dynamic metadata for SEO, OpenGraph and Twitter
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);

  if (post) {
    return {
      title: `${post.title} | Tajmahal Products`,
      description: post.metaDescription,
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.metaDescription,
        url: `https://tajmahalproducts.com/news/${post.slug}`,
        siteName: "Tajmahal Products",
        images: [
          {
            url: `https://tajmahalproducts.com${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.metaDescription,
        images: [`https://tajmahalproducts.com${post.image}`],
      },
      alternates: {
        canonical: `https://tajmahalproducts.com/news/${post.slug}`,
      },
    };
  }

  const legacy = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);
  if (legacy) {
    return {
      title: `${legacy.title} | The Rug Journal`,
      description: legacy.excerpt,
    };
  }

  return {
    title: "Article Not Found | Tajmahal Products",
  };
}

export default function ArticlePage({ params }: Props) {
  const slug = params.slug;
  const post = getBlogBySlug(slug);

  // If not found in SEO_BLOG_POSTS, check legacy journal
  if (!post) {
    const legacy = JOURNAL_ARTICLES.find((a) => a.slug === slug);
    if (!legacy) {
      return notFound();
    }

    return (
      <div className="bg-white text-[#1C1C1C] min-h-screen">
        <section className="bg-[#F8F9FA] border-b border-[#EBEBEB] py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#0F2C59] hover:underline font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to The Rug Journal</span>
            </Link>

            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0F2C59] font-semibold pt-2">
              {legacy.category}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-tight">
              {legacy.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#767676] pt-2">
              <span>By {legacy.author}</span>
              <span>·</span>
              <span>{legacy.date}</span>
              <span>·</span>
              <span>{legacy.readTime}</span>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 -mt-6 sm:-mt-8">
          <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm">
            <img
              src={legacy.image}
              alt={legacy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-6 text-sm text-[#555555] leading-relaxed">
          <p className="text-base text-[#1C1C1C] leading-relaxed font-normal">
            {legacy.excerpt}
          </p>
          <div className="pt-8 border-t border-[#EBEBEB] flex items-center justify-between">
            <Link
              href="/news"
              className="text-xs uppercase tracking-wider font-semibold text-[#0F2C59] hover:underline"
            >
              ← Explore All 50 Field Guides
            </Link>
          </div>
        </article>
      </div>
    );
  }

  const relatedPosts = getRelatedBlogs(slug);

  return (
    <div className="bg-[#FAF9F5] text-[#1C1C1C] min-h-screen">
      {/* JSON-LD Structured Data Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
      />

      {/* Article Header */}
      <section className="bg-white border-b border-[#EBEBEB] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              href="/news"
              className="inline-flex items-center space-x-1.5 uppercase tracking-wider text-[#0F2C59] hover:underline font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to The Rug Journal</span>
            </Link>
            <ShareButton title={post.title} slug={post.slug} />
          </div>

          <div className="inline-block bg-[#F4F1EA] px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] text-[#0F2C59]">
            {post.category}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.08em] text-[#1C1C1C] leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            {post.metaDescription}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#767676] pt-2 border-t border-[#F0F0F0]">
            <span className="font-semibold text-[#1C1C1C]">By {post.author}</span>
            <span>·</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#8C8C8C]" />
              <span>{post.publishedAt}</span>
            </span>
            <span>·</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#8C8C8C]" />
              <span>{post.readTime} ({post.wordCount} words)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Hero Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8">
        <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Body */}
        <main className="lg:col-span-8 bg-white p-6 sm:p-10 border border-[#EBEBEB] space-y-8">
          {/* Keywords Tags */}
          <div className="flex flex-wrap gap-1.5 pb-4 border-b border-[#F0F0F0]">
            {post.keywords.map((k) => (
              <span
                key={k}
                className="text-[10px] bg-[#F8F9FA] border border-[#E5E5E5] text-[#555555] px-2.5 py-1 rounded-none font-medium"
              >
                #{k}
              </span>
            ))}
          </div>

          {/* Rich HTML Content with Typography Styling */}
          <div
            className="seo-article-content prose prose-zinc max-w-none text-sm text-[#444444] leading-relaxed space-y-5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Interactive FAQ Accordion */}
          {post.faq && post.faq.length > 0 && (
            <section className="pt-8 border-t border-[#EBEBEB] space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#0F2C59]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[#1C1C1C]">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {post.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-[#FBFBFA] border border-[#E8E8E8] open:border-[#0F2C59]/40 p-4 transition-all"
                  >
                    <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs sm:text-sm text-[#1C1C1C] list-none select-none">
                      <span className="pr-4">{item.q}</span>
                      <ChevronDown className="w-4 h-4 text-[#767676] group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-[#666666] leading-relaxed pt-2 border-t border-[#EAEAEA]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Direct Consultation Box */}
          <div className="p-6 bg-[#FAF9F5] border border-[#E5E2D9] space-y-3">
            <div className="flex items-center space-x-2 text-[#0F2C59]">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Direct Loom Sourcing · Tajmahal Products
              </h4>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              Have specific questions regarding knot densities, strike-off samples, custom hospitality briefs, or ocean container freight from Bhadohi? Connect with our master weaving council directly.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
                  `Namaste Tajmahal Products, I read your publication "${post.title}" and would like to discuss a custom or wholesale enquiry.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Consultation</span>
              </a>
              <a
                href="mailto:tmproducts.bhadohi@gmail.com"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Our Factory</span>
              </a>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Quick Factory Profile */}
          <div className="bg-white p-5 border border-[#EBEBEB] space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0F2C59]">
              Publisher & Manufacturer
            </div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1C1C]">
              Tajmahal Products
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              Sixth-generation family-owned carpet manufacturer and exporter in Bhadohi, India, established 1967. Specialized in hand-knotted, hand-tufted, flatweave dhurries, and bespoke designer rugs.
            </p>
            <ul className="text-xs text-[#555555] space-y-1.5 pt-1">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Star Export House (Govt. of India)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>CEPC Registered & Compliant</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Custom Private-Label Production</span>
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="bg-white p-5 border border-[#EBEBEB] space-y-4">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0F2C59]">
                Recommended Reading
              </div>

              <div className="space-y-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/news/${rel.slug}`}
                    className="group block space-y-1.5 pb-3 border-b border-[#F0F0F0] last:border-b-0 last:pb-0"
                  >
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#0F2C59]">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-medium uppercase tracking-wider text-[#1C1C1C] group-hover:text-[#0F2C59] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h5>
                    <span className="text-[10px] text-[#8C8C8C] flex items-center space-x-1">
                      <span>{rel.readTime}</span>
                      <span>·</span>
                      <span className="group-hover:underline">Read Guide →</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Guides Shortcut */}
          <div className="p-5 bg-[#0F2C59] text-white space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/90">
              Explore The 50 Guides
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Browse our complete library covering history, knot density, wholesale buying, and room placement.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-white hover:underline pt-1"
            >
              <span>View All 50 Publications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
