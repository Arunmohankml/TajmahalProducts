"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CarpetProduct, COMPANY_PROFILE } from "@/lib/tajmahal_data";

interface ShortlistContextType {
  shortlist: CarpetProduct[];
  addToShortlist: (product: CarpetProduct) => void;
  removeFromShortlist: (productId: string) => void;
  isInShortlist: (productId: string) => boolean;
  clearShortlist: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  getConsolidatedWhatsAppLink: (customNotes?: string) => string;
  getConsolidatedEmailLink: (customNotes?: string) => string;
  activeInquiryProduct: CarpetProduct | null;
  openInquiryModal: (product: CarpetProduct) => void;
  closeInquiryModal: () => void;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

const SHORTLIST_STORAGE_KEY = "tajmahal_shortlist_v1";

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<CarpetProduct[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeInquiryProduct, setActiveInquiryProduct] = useState<CarpetProduct | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHORTLIST_STORAGE_KEY);
      if (saved) {
        setShortlist(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveToStorage = (items: CarpetProduct[]) => {
    try {
      localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  };

  const addToShortlist = (product: CarpetProduct) => {
    setShortlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const updated = [...prev, product];
      saveToStorage(updated);
      return updated;
    });
    setIsDrawerOpen(true);
  };

  const removeFromShortlist = (productId: string) => {
    setShortlist((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      saveToStorage(updated);
      return updated;
    });
  };

  const isInShortlist = (productId: string) => {
    return shortlist.some((p) => p.id === productId);
  };

  const clearShortlist = () => {
    setShortlist([]);
    saveToStorage([]);
  };

  const openInquiryModal = (product: CarpetProduct) => {
    setActiveInquiryProduct(product);
  };

  const closeInquiryModal = () => {
    setActiveInquiryProduct(null);
  };

  const getConsolidatedWhatsAppLink = (customNotes?: string) => {
    const phone = COMPANY_PROFILE.whatsappNumber;
    let message = `*Namaste Tajmahal Products,*\n\n` +
      `I would like to request an official quotation and availability for the following shortlisted handmade carpets:\n\n`;

    shortlist.forEach((p, idx) => {
      message += `${idx + 1}. *${p.title}*\n` +
        `   • SKU / Code: ${p.order_code}\n` +
        `   • Collection: ${p.collection_name}\n` +
        `   • Colorway: ${p.color}\n` +
        `   • Weave / Material: ${p.weave} | ${p.material}\n\n`;
    });

    if (customNotes) {
      message += `*Project / Dimension Requirements:*\n${customNotes}\n\n`;
    }

    message += `Please provide dispatch estimates from your Bhadohi manufacturing house and pricing.\n\nThank you.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const getConsolidatedEmailLink = (customNotes?: string) => {
    const email = COMPANY_PROFILE.emails[0];
    const subject = `Bespoke Carpet Quotation Request (${shortlist.length} Shortlisted Pieces)`;

    let body = `Dear Tajmahal Products Team,\n\n` +
      `I am requesting a formal quotation and production lead-times for the following shortlisted handmade carpet pieces:\n\n`;

    shortlist.forEach((p, idx) => {
      body += `${idx + 1}. ${p.title}\n` +
        `   Code: ${p.order_code}\n` +
        `   Collection: ${p.collection_name}\n` +
        `   Colorway: ${p.color}\n` +
        `   Weave & Material: ${p.weave} | ${p.material}\n\n`;
    });

    if (customNotes) {
      body += `Project Specifications & Dimensions:\n${customNotes}\n\n`;
    }

    body += `Please provide quotation, dispatch timeline from Bhadohi, and freight options.\n\nKind regards,`;

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <ShortlistContext.Provider
      value={{
        shortlist,
        addToShortlist,
        removeFromShortlist,
        isInShortlist,
        clearShortlist,
        isDrawerOpen,
        setIsDrawerOpen,
        getConsolidatedWhatsAppLink,
        getConsolidatedEmailLink,
        activeInquiryProduct,
        openInquiryModal,
        closeInquiryModal,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }
  return context;
}
