"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Bookmark,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  ZoomIn,
} from "lucide-react";
import {
  CarpetProduct,
  COMPANY_PROFILE,
  COLLECTIONS_DATA,
  createWhatsAppInquiryLink,
  createEmailInquiryLink,
} from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";
import { useShortlist } from "@/context/ShortlistContext";
import { CarpetCard } from "@/components/CarpetCard";

export default function CarpetDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [product, setProduct] = useState<CarpetProduct | null>(null);
  const [related, setRelated] = useState<CarpetProduct[]>([]);
  const [copied, setCopied] = useState(false);
  const [customSize, setCustomSize] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  // Circular Zoom Loupe State (Amazon-style, desktop only)
  const [zoomActive, setZoomActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setZoomActive(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
    setMousePos({
      x: Math.max(0, Math.min(rect.width, e.clientX - rect.left)),
      y: Math.max(0, Math.min(rect.height, e.clientY - rect.top)),
    });
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  const { isInShortlist, addToShortlist, removeFromShortlist, openInquiryModal } = useShortlist();

  useEffect(() => {
    async function loadData() {
      const all = await tajmahalDb.getProducts();
      const current = all.find((p) => p.id === id) || all[0];
      setProduct(current);

      if (current) {
        const others = all
          .filter((p) => p.id !== current.id && p.collection_id === current.collection_id)
          .slice(0, 4);
        setRelated(others);
      }
    }
    loadData();
  }, [id]);

  if (!product) {
    return (
      <div className="py-24 text-center text-xs uppercase tracking-widest text-[#767676]">
        Loading carpet details...
      </div>
    );
  }

  const isShortlisted = isInShortlist(product.id);

  const handleToggleShortlist = () => {
    if (isShortlisted) {
      removeFromShortlist(product.id);
    } else {
      addToShortlist(product);
    }
  };

  const handleCopySpecs = () => {
    const text = `*Tajmahal Products — Carpet Specification*\n` +
      `Piece: ${product.title}\n` +
      `Code: ${product.order_code}\n` +
      `Collection: ${product.collection_name}\n` +
      `Colorway: ${product.color}\n` +
      `Weave: ${product.weave}\n` +
      `Material: ${product.material}\n` +
      `Finish: ${product.finish}\n` +
      `Style: ${product.style}\n` +
      (customSize ? `Requested Size: ${customSize}\n` : `Standard Size: ${product.size}\n`) +
      (clientNotes ? `Notes: ${clientNotes}\n` : "") +
      `Origin: Bhadohi, Uttar Pradesh, India\n` +
      `Direct Hotline: +91 82995 01435 | tmproducts.bhadohi@gmail.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsAppLink = createWhatsAppInquiryLink(product, customSize, clientNotes);
  const emailLink = createEmailInquiryLink(product, customSize, clientNotes);

  const displayName = product.title.toUpperCase();
  const displaySize = product.size.toUpperCase();
  const displayColl = product.collection_name.toUpperCase();
  const displayColor = product.color.toUpperCase();

  return (
    <div className="bg-white text-[#1C1C1C] min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#EBEBEB] py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-[#767676]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/shop"
            className="flex items-center space-x-1.5 hover:text-[#1C1C1C] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>

          <div className="text-[11px] uppercase tracking-widest text-[#0F2C59] font-mono">
            {product.order_code}
          </div>
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery with Amazon-style Circular Zoom (Refined Size: lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] w-full bg-[#F5F5F5] overflow-hidden border border-zinc-200 cursor-default md:cursor-crosshair group select-none shadow-sm"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[10.5px] uppercase font-semibold tracking-wider text-[#0F2C59] border border-zinc-200 pointer-events-none">
                {product.collection_name} Collection
              </div>

              {/* Amazon Zoom Hint Badge (hidden on mobile screen) */}
              {!zoomActive && (
                <div className="hidden md:flex absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase font-semibold tracking-wider text-[#1C1C1C] border border-zinc-200 items-center space-x-1.5 shadow-sm pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-[#0F2C59]" />
                  <span>Hover to Zoom Weave</span>
                </div>
              )}

              {/* Amazon-style Circular Zoom Loupe Magnifier (hidden on mobile screen) */}
              {zoomActive && containerSize.width > 0 && (
                <div
                  className="hidden md:block absolute pointer-events-none rounded-full overflow-hidden border-2 border-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] z-30 ring-1 ring-black/20 bg-white"
                  style={{
                    width: "210px",
                    height: "210px",
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="absolute pointer-events-none select-none"
                    style={{
                      width: `${containerSize.width * 2.6}px`,
                      height: `${containerSize.height * 2.6}px`,
                      maxWidth: "none",
                      left: `${105 - mousePos.x * 2.6}px`,
                      top: `${105 - mousePos.y * 2.6}px`,
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono backdrop-blur-sm pointer-events-none shadow">
                    2.6× Weave Zoom
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-[#767676] text-center italic">
              Photographed under natural ambient light · Handcrafted in Bhadohi, India
            </p>
          </div>

          {/* Right Column: Specs & Inquiry Controls (Enlarged Text & Prominent Details: lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <div className="space-y-3 border-b border-[#EBEBEB] pb-6">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#0F2C59]">
                Handmade Carpet · Ref: {product.order_code}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-normal uppercase tracking-[0.12em] text-[#1C1C1C] leading-tight">
                {displayName} | {displaySize} | {displayColl}
              </h1>

              <div className="text-xl sm:text-2xl font-bold text-[#0F2C59] uppercase tracking-wider pt-1">
                Price on Request
              </div>

              <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Specifications Details Table */}
            <div className="space-y-4 border-b border-[#EBEBEB] pb-6">
              <div className="text-sm uppercase tracking-[0.18em] font-bold text-[#1C1C1C]">
                Artisanal Specifications
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm text-[#1C1C1C]">
                <div>
                  <dt className="text-[#666666] text-xs uppercase tracking-wider font-medium">Weave Technique</dt>
                  <dd className="font-semibold text-sm pt-0.5 text-[#1C1C1C]">{product.weave}</dd>
                </div>

                <div>
                  <dt className="text-[#666666] text-xs uppercase tracking-wider font-medium">Material</dt>
                  <dd className="font-semibold text-sm pt-0.5 text-[#1C1C1C]">{product.material}</dd>
                </div>

                <div>
                  <dt className="text-[#666666] text-xs uppercase tracking-wider font-medium">Colorway</dt>
                  <dd className="font-semibold text-sm pt-0.5 text-[#1C1C1C]">{product.color}</dd>
                </div>

                <div>
                  <dt className="text-[#666666] text-xs uppercase tracking-wider font-medium">Finish / Wash</dt>
                  <dd className="font-semibold text-sm pt-0.5 text-[#1C1C1C]">{product.finish}</dd>
                </div>

                <div className="col-span-2 pt-2 border-t border-zinc-200">
                  <dt className="text-[#666666] text-xs uppercase tracking-wider font-medium">Dimensions</dt>
                  <dd className="font-bold text-base sm:text-lg pt-0.5 text-[#0F2C59]">{product.size}</dd>
                </div>
              </dl>
            </div>

            {/* Custom Dimension Input */}
            <div className="space-y-3 bg-[#F8F9FA] p-5 border border-[#EBEBEB]">
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1C1C]">
                Custom Dimension / Project Notes:
              </div>
              <input
                type="text"
                placeholder="Required custom dimensions (e.g. 9 x 12 ft, hallway runner)"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 outline-none text-[#1C1C1C] focus:border-[#0F2C59] transition-colors"
              />
              <input
                type="text"
                placeholder="Placement / Delivery Notes (e.g. Living room, export to USA)"
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 outline-none text-[#1C1C1C] focus:border-[#0F2C59] transition-colors"
              />
            </div>

            {/* Direct Inquiry Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={async () => {
                  await tajmahalDb.createInquiry({
                    clientName: "WhatsApp Inquirer",
                    email: "direct_whatsapp@client.com",
                    phone: COMPANY_PROFILE.phoneNumbers[0],
                    productId: product.id,
                    productTitle: product.title,
                    collectionName: product.collection_name,
                    productCode: product.order_code,
                    requestedSize: customSize || product.size,
                    notes: clientNotes,
                    channel: "whatsapp_click",
                  });
                }}
                className="w-full py-4 px-6 bg-[#1C1C1C] hover:bg-white text-white hover:text-[#1C1C1C] border border-[#1C1C1C] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] flex items-center justify-center space-x-2 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire & Order on WhatsApp</span>
              </a>

              <a
                href={emailLink}
                onClick={async () => {
                  await tajmahalDb.createInquiry({
                    clientName: "Email RFQ Inquirer",
                    email: COMPANY_PROFILE.emails[0],
                    phone: "",
                    productId: product.id,
                    productTitle: product.title,
                    collectionName: product.collection_name,
                    productCode: product.order_code,
                    requestedSize: customSize || product.size,
                    notes: clientNotes,
                    channel: "email_click",
                  });
                }}
                className="btn-stroke-dark w-full py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] flex items-center justify-center space-x-2 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Request Email Quotation</span>
              </a>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleToggleShortlist}
                  className={`py-3 px-4 text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center space-x-1.5 transition-all duration-300 ${
                    isShortlisted
                      ? "bg-[#1C1C1C] text-white border border-[#1C1C1C]"
                      : "btn-stroke-dark"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
                  <span>{isShortlisted ? "Shortlisted" : "Shortlist Piece"}</span>
                </button>

                <button
                  onClick={handleCopySpecs}
                  className="btn-stroke-dark py-3 px-4 text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center space-x-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Authenticity Guarantee Note */}
            <div className="pt-4 border-t border-[#EBEBEB] text-xs sm:text-sm text-[#666666] flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0F2C59] flex-shrink-0 mt-0.5" />
              <span>
                Export-certified handmade rug from Bhadohi, India. Accompanied by official Certificate of Authenticity and CEPC clearance documents.
              </span>
            </div>
          </div>
        </div>

        {/* Related Collection Pieces */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#EBEBEB] space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg uppercase tracking-[0.18em] font-normal text-[#1C1C1C]">
                More from {product.collection_name}
              </h2>
              <Link
                href={`/shop?collection=${product.collection_id}`}
                className="text-xs uppercase tracking-wider text-[#0F2C59] font-semibold hover:underline"
              >
                View Full Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <CarpetCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
