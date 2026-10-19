"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  MessageCircle,
  Mail,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";

export function ShortlistDrawer() {
  const {
    shortlist,
    removeFromShortlist,
    clearShortlist,
    isDrawerOpen,
    setIsDrawerOpen,
    getConsolidatedWhatsAppLink,
    getConsolidatedEmailLink,
  } = useShortlist();

  const [projectNote, setProjectNote] = useState("");

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-white text-[#1C1C1C] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#E5E7EB] relative">
        {/* Header */}
        <div className="p-6 border-b border-[#EBEBEB] bg-[#F8F9FA] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bookmark className="w-5 h-5 text-[#0F2C59]" />
            <div>
              <h2 className="text-base font-normal uppercase tracking-[0.16em] text-[#1C1C1C]">
                Shortlisted Pieces
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0F2C59] font-medium">
                {shortlist.length} {shortlist.length === 1 ? "Piece" : "Pieces"} Curated
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-[#767676] hover:text-[#1C1C1C] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {shortlist.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-12 h-12 bg-[#F8F9FA] text-[#0F2C59] flex items-center justify-center mx-auto border border-[#EBEBEB]">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-base uppercase tracking-[0.12em] text-[#1C1C1C]">Your Shortlist is Empty</p>
              <p className="text-xs text-[#767676] max-w-xs mx-auto leading-relaxed">
                Explore our collections and shortlist pieces to request a combined bespoke quotation for your interior architecture project.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#767676] pb-2 border-b border-[#EBEBEB]">
                <span className="uppercase tracking-wider text-[11px]">Selected Carpet Designs</span>
                <button
                  onClick={clearShortlist}
                  className="text-[#0F2C59] hover:underline text-[11px] uppercase tracking-wider"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {shortlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 bg-[#F8F9FA] p-3 border border-[#EBEBEB] relative"
                  >
                    <div className="w-16 h-20 relative overflow-hidden bg-white flex-shrink-0 border border-[#EBEBEB]">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="text-xs uppercase tracking-wider font-medium text-[#1C1C1C] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[#0F2C59]">{item.order_code}</p>
                      <p className="text-[11px] text-[#767676]">{item.collection_name} · {item.weave}</p>
                      <p className="text-[11px] text-[#1C1C1C]">{item.color}</p>
                    </div>

                    <button
                      onClick={() => removeFromShortlist(item.id)}
                      className="p-1.5 text-[#767676] hover:text-[#0F2C59] self-start"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <label className="block text-[11px] uppercase tracking-wider text-[#767676] mb-1.5">
                  Optional Project Dimensions / Room Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need 9x12 ft for living room, 8x10 for bedroom suite"
                  value={projectNote}
                  onChange={(e) => setProjectNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8F9FA] border border-[#E5E7EB] text-[#1C1C1C] placeholder-[#9E9484] focus:outline-none focus:border-[#0F2C59]"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {shortlist.length > 0 && (
          <div className="p-6 border-t border-[#EBEBEB] bg-[#F8F9FA] space-y-2.5">
            <a
              href={getConsolidatedWhatsAppLink(projectNote)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#1C1C1C] hover:bg-white text-white hover:text-[#1C1C1C] border border-[#1C1C1C] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire Shortlist on WhatsApp</span>
            </a>

            <a
              href={getConsolidatedEmailLink(projectNote)}
              className="btn-stroke-dark w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Consolidated RFQ</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
