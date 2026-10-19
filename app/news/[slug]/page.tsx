"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, MessageCircle } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/journal_data";
import { COMPANY_PROFILE } from "@/lib/tajmahal_data";

const ARTICLE_CONTENT: Record<string, { body: React.ReactNode }> = {
  "handmade-carpets-care-tips": {
    body: (
      <div className="space-y-6 text-sm text-[#767676] leading-relaxed">
        <p>
          A genuine hand-knotted carpet from Bhadohi is not merely an interior floor covering; it is an enduring investment piece that breathes life into living spaces and matures in luster over generations.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          Preserving Natural Lanolin
        </h3>
        <p>
          The secret behind the supple feel and soil-resistance of handmade rugs is natural lanolin retained within raw virgin sheep wool. Chemical dry-cleaning strips this protective oil, leaving wool brittle. Routine maintenance should be gentle: suction vacuuming along the pile direction without rotating brush rolls prevents surface pilling.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          Blotting & Emergency Spill Management
        </h3>
        <p>
          Accidental spills must be treated with immediate blotting rather than scrubbing. Press a clean white cotton cloth firmly against the affected area to absorb excess liquid. Sponge gently with tepid water and a drop of natural Castile soap, working inwards from the border to prevent dye bleed.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          Sunlight & Orientation Balance
        </h3>
        <p>
          Even premium vegetable dyes benefit from periodic rotation. Turning your rug 180 degrees every season ensures equal ambient daylight exposure and distributes natural room foot traffic symmetrically across the knot foundation.
        </p>
      </div>
    ),
  },
  "geometry-of-persian-knot": {
    body: (
      <div className="space-y-6 text-sm text-[#767676] leading-relaxed">
        <p>
          For over three centuries, the weaving belt around Bhadohi and Mirzapur has represented the vibrant epicenter of Indian hand-knotted carpet making. Here, craftsmanship is not an industrial trade — it is an inherited artistic language.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          From Carding to the Loom Beam
        </h3>
        <p>
          The transformation begins with the meticulous sorting of virgin long-staple wool, combed by hand and spun into sturdy, resilient yarn. In open vats, traditional dyes are blended using natural mineral and vegetal extracts that impart deep color saturation with gentle abrash shading.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          The Melody of the Talim
        </h3>
        <p>
          Sitting before vertical timber looms, master weavers follow the coded notation known as the <em>Talim</em>. Spoken as a rhythmic chant, the master calls out knot counts and color changes, guiding artisans who tie hundreds of knots per square inch with precision.
        </p>
        <p>
          A single 9x12 ft palatial rug can require anywhere from eight months to two years of daily artisanal dedication before it is lowered from the loom.
        </p>
      </div>
    ),
  },
  "threads-to-heirlooms": {
    body: (
      <div className="space-y-6 text-sm text-[#767676] leading-relaxed">
        <p>
          For over three centuries, the weaving belt around Bhadohi and Mirzapur has represented the vibrant epicenter of Indian hand-knotted carpet making. Here, craftsmanship is not an industrial trade — it is an inherited artistic language.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          From Carding to the Loom Beam
        </h3>
        <p>
          The transformation begins with the meticulous sorting of virgin long-staple wool, combed by hand and spun into sturdy, resilient yarn. In open vats, traditional dyes are blended using natural mineral and vegetal extracts that impart deep color saturation with gentle abrash shading.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          The Melody of the Talim
        </h3>
        <p>
          Sitting before vertical timber looms, master weavers follow the coded notation known as the <em>Talim</em>. Spoken as a rhythmic chant, the master calls out knot counts and color changes, guiding artisans who tie hundreds of knots per square inch with precision.
        </p>
        <p>
          A single 9x12 ft palatial rug can require anywhere from eight months to two years of daily artisanal dedication before it is lowered from the loom.
        </p>
      </div>
    ),
  },
  "women-empowerment-at-the-loom": {
    body: (
      <div className="space-y-6 text-sm text-[#767676] leading-relaxed">
        <p>
          At Tajmahal Products, our commitment to social equity is reflected in our weaving clusters throughout the rural villages surrounding Bhadohi, where female master weavers represent the vanguard of artisanal excellence.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          Fostering Economic Independence
        </h3>
        <p>
          Under our Label STEP-certified welfare programs, women weavers are provided flexible, safe workspace arrangements, healthcare benefits, and equitable living wages. Their innate dexterity and fine tactile sense are celebrated in intricate knot counts, from fine silk outlines to intricate floral rosettes.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          Generational Knowledge Transferred
        </h3>
        <p>
          Mother-daughter weaving partnerships pass down centuries of regional folk patterns and knotting techniques, ensuring that the precious art of the hand-tied knot continues to thrive in an era of rapid industrialization.
        </p>
      </div>
    ),
  },
  "legacy-of-late-haji-jalil-ansari": {
    body: (
      <div className="space-y-6 text-sm text-[#767676] leading-relaxed">
        <p>
          The story of Tajmahal Products is inextricably bound to the life and vision of our late founder, Late Haji Jalil Ahmad Ansari. Born into an ancestral weaving household in Bhadohi, his passion transformed our family workshop into an internationally acclaimed Star Export House.
        </p>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          A Titan of Industry Governance
        </h3>
        <p>
          Beyond his mastery on the loom, Late Haji Jalil Ahmad Ansari was an indefatigable advocate for the welfare of Indian weavers and the prestige of Indian hand-knotted exports worldwide:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>18+ Consecutive Years:</strong> Member, Committee of Administration, Carpet Export Promotion Council (CEPC).</li>
          <li><strong>6 Consecutive Terms:</strong> President, All India Carpet Trade Fair Committee.</li>
          <li><strong>4 Consecutive Terms:</strong> Honorary Secretary, All India Carpet Manufacturers Association.</li>
        </ul>
        <h3 className="text-lg font-normal uppercase tracking-wider text-[#1C1C1C] pt-4">
          The Sixth Generation Stepping Forward
        </h3>
        <p>
          Today, the sixth generation of the Ansari family continues to guide Tajmahal Products with the same uncompromising standard of integrity, honoring our founder&apos;s legacy with every knot tied in our looms.
        </p>
      </div>
    ),
  },
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return notFound();
  }

  const content = ARTICLE_CONTENT[slug] || {
    body: <p className="text-sm text-[#767676]">{article.excerpt}</p>,
  };

  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
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
            {article.category}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#767676] pt-2">
            <span>By {article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 sm:-mt-8">
        <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 border border-[#EBEBEB] shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-8">
        {content.body}

        {/* Share & Inquire Banner */}
        <div className="pt-8 border-t border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#767676]">
            Published by Tajmahal Products · Bhadohi, India
          </div>

          <a
            href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(
              `Namaste Tajmahal Products, I read your article "${article.title}" and would like to inquire.`
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
