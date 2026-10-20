import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import {
  SEO_BLOG_POSTS,
  getBlogBySlug,
} from "@/lib/seo_blogs_data";
import { JOURNAL_ARTICLES } from "@/lib/journal_data";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

interface Props {
  params: {
    slug: string;
  };
}

const BLANK_IMAGE = "/images/blank.svg";

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
            url: post.image ? `https://tajmahalproducts.com${post.image}` : BLANK_IMAGE,
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
              src={legacy.image || BLANK_IMAGE}
              alt={legacy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-6 text-sm text-[#767676] leading-relaxed">
          <p className="text-base text-[#1C1C1C] leading-relaxed font-normal">
            {legacy.excerpt}
          </p>
          <div className="pt-8 border-t border-[#EBEBEB] flex items-center justify-between">
            <Link
              href="/news"
              className="text-xs uppercase tracking-wider font-semibold text-[#0F2C59] hover:underline"
            >
              ← Back to All Articles
            </Link>
          </div>
        </article>
      </div>
    );
  }

  const imageSrc = post.image && post.image.trim() !== "" ? post.image : BLANK_IMAGE;

  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      {/* JSON-LD Structured Data Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
      />

      {/* Article Header */}
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
            {post.category}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#767676] pt-2">
            <span>By {post.author}</span>
            <span>·</span>
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 sm:-mt-8">
        <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body (Clean, Centered, Old Layout) */}
      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-8">
        <div
          className="seo-article-content prose prose-zinc max-w-none text-sm text-[#767676] leading-relaxed space-y-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQs if present */}
        {post.faq && post.faq.length > 0 && (
          <section className="pt-8 border-t border-[#EBEBEB] space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-wider text-[#1C1C1C]">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {post.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-[#F8F9FA] border border-[#EBEBEB] p-4 transition-all"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs sm:text-sm text-[#1C1C1C] list-none select-none">
                    <span className="pr-4">{item.q}</span>
                    <ChevronDown className="w-4 h-4 text-[#767676] group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-[#767676] leading-relaxed pt-2 border-t border-[#EAEAEA]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Share & Inquire Banner */}
        <div className="pt-8 border-t border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#767676]">
            Published by Tajmahal Products · Bhadohi, India
          </div>

          <a
            href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
              `Namaste Tajmahal Products, I read your article "${post.title}" and would like to inquire.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Discuss with our Team</span>
          </a>
        </div>
      </article>
    </div>
  );
}
