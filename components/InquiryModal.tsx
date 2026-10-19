"use client";

import React, { useState } from "react";
import {
  X,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  CarpetProduct,
  COMPANY_PROFILE,
  createWhatsAppInquiryLink,
  createEmailInquiryLink,
} from "@/lib/tajmahal_data";
import { useShortlist } from "@/context/ShortlistContext";
import { tajmahalDb } from "@/lib/tajmahal_db";

export function InquiryModal() {
  const { activeInquiryProduct, closeInquiryModal } = useShortlist();
  const [customSize, setCustomSize] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [copied, setCopied] = useState(false);

  if (!activeInquiryProduct) return null;

  const product = activeInquiryProduct;

  const handleCopyText = () => {
    const message = `Namaste Tajmahal Products,\n\n` +
      `I would like to inquire about the following handcrafted carpet piece:\n\n` +
      `• Carpet Name: ${product.title}\n` +
      `• Collection: ${product.collection_name}\n` +
      `• Order Code: ${product.order_code}\n` +
      `• Colorway: ${product.color}\n` +
      `• Weaving: ${product.weave}\n` +
      `• Fiber: ${product.material}\n` +
      (customSize ? `• Desired Custom Size: ${customSize}\n` : `• Dimensions: ${product.size}\n`) +
      (clientNotes ? `• Project Details: ${clientNotes}\n\n` : `\n`) +
      `Please provide bespoke quotation, availability, and high-resolution loom photos.\n\n` +
      `Buyer: ${clientName || "Discerning Client"} ${clientPhone ? `(${clientPhone})` : ""}`;

    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsAppLink = createWhatsAppInquiryLink(product, customSize, clientNotes);
  const emailLink = createEmailInquiryLink(product, customSize, clientNotes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-[#1C1C1C] max-w-lg w-full border border-[#E5E7EB] shadow-2xl relative my-6">
        {/* Top Accent Line */}
        <div className="h-1 bg-[#0F2C59] w-full" />

        {/* Close Button */}
        <button
          onClick={closeInquiryModal}
          className="absolute top-4 right-4 p-2 text-[#767676] hover:text-[#1C1C1C] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="pr-8 space-y-1">
            <div className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0F2C59]">
              Bespoke Quotation & Commission Inquiry
            </div>
            <h2 className="text-xl sm:text-2xl font-normal uppercase tracking-[0.14em] text-[#1C1C1C]">
              {product.title}
            </h2>
            <p className="text-xs text-[#767676]">
              REF: {product.order_code} · {product.collection_name} · {product.weave}
            </p>
          </div>

          {/* Carpet Summary Card */}
          <div className="flex gap-4 p-3.5 bg-[#F8F9FA] border border-[#EBEBEB]">
            <div className="w-20 h-24 relative overflow-hidden bg-white flex-shrink-0 border border-[#EBEBEB]">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs space-y-1 min-w-0 flex-1 justify-center flex flex-col">
              <div className="text-[#1C1C1C]">
                <span className="text-[#767676]">Colorway:</span> <strong className="font-medium">{product.color}</strong>
              </div>
              <div className="text-[#1C1C1C]">
                <span className="text-[#767676]">Material:</span> <span>{product.material}</span>
              </div>
              <div className="text-[#1C1C1C]">
                <span className="text-[#767676]">Standard Size:</span> <span>{product.size}</span>
              </div>
              <div className="text-[11px] text-[#0F2C59] font-medium pt-1">
                Pricing & Freight: Quoted on Request
              </div>
            </div>
          </div>

          {/* Optional Inputs */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#767676] mb-1">
                Custom Dimensions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 9 x 12 ft, 3 x 10 ft runner, or custom room size"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#9E9484] focus:outline-none focus:border-[#0F2C59]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#767676] mb-1">
                Project Notes / Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Residential master suite, wool swatch sample required"
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#9E9484] focus:outline-none focus:border-[#0F2C59]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {/* WhatsApp Direct Action */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={async () => {
                await tajmahalDb.createInquiry({
                  clientName: clientName || "WhatsApp Visitor",
                  email: "via_whatsapp@tajmahal.in",
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
              className="w-full py-3.5 px-4 bg-[#1C1C1C] hover:bg-white text-white hover:text-[#1C1C1C] border border-[#1C1C1C] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Pre-Filled Inquiry on WhatsApp</span>
            </a>

            {/* Email Direct Action */}
            <a
              href={emailLink}
              onClick={async () => {
                await tajmahalDb.createInquiry({
                  clientName: clientName || "Email Visitor",
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
              className="btn-stroke-dark w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2.5 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Formal Quote Request</span>
            </a>

            {/* Copy Inquiry Text */}
            <button
              type="button"
              onClick={handleCopyText}
              className="btn-stroke-dark w-full py-2.5 px-4 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Inquiry Text Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#1C1C1C]" />
                  <span>Copy Complete Inquiry Details</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Coordinates */}
          <div className="pt-4 border-t border-[#EBEBEB] flex flex-wrap items-center justify-between text-[11px] text-[#767676] gap-2">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>Direct Desk: <strong className="text-[#1C1C1C]">+91 82995 01435</strong></span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>Bhadohi, UP, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
