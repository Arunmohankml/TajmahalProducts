"use client";

import {
  CarpetProduct,
  INITIAL_PRODUCTS,
  StaffEmail,
  DEFAULT_STAFF_EMAILS,
  COLLECTIONS_DATA,
} from "./tajmahal_data";

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  country?: string;
  productId: string;
  productTitle: string;
  collectionName: string;
  productCode: string;
  requestedSize?: string;
  notes?: string;
  status: "new" | "replied" | "quoted" | "archived";
  channel: "website_form" | "whatsapp_click" | "email_click";
  created_at: string;
}

const PRODUCTS_KEY = "tajmahal_products_v2";
const STAFF_KEY = "tajmahal_staff_emails_v1";
const INQUIRIES_KEY = "tajmahal_inquiries_v1";

export const tajmahalDb = {
  // --------------------------------------------------------------------------
  // PRODUCTS
  // --------------------------------------------------------------------------
  getProducts: async (): Promise<CarpetProduct[]> => {
    if (typeof window === "undefined") return INITIAL_PRODUCTS;

    try {
      const cached = localStorage.getItem(PRODUCTS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((p: CarpetProduct) => p.id !== "gabbeh-02");
          return cleaned;
        }
      }
    } catch (e) {
      console.error("Error reading cached products:", e);
    }

    // Default seed
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  getProduct: async (id: string): Promise<CarpetProduct | null> => {
    const products = await tajmahalDb.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  addProduct: async (
    newProd: Omit<CarpetProduct, "id"> & { id?: string }
  ): Promise<CarpetProduct> => {
    const collName = COLLECTIONS_DATA[newProd.collection_id]?.name || "Custom";
    const product: CarpetProduct = {
      ...newProd,
      id: newProd.id || `custom-${Date.now().toString().slice(-6)}`,
      collection_name: newProd.collection_name || collName,
      created_at: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getProducts();
      const updated = [product, ...current];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("tajmahal_db_updated"));
    }

    return product;
  },

  updateProduct: async (
    id: string,
    updates: Partial<CarpetProduct>
  ): Promise<CarpetProduct | null> => {
    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getProducts();
      const idx = current.findIndex((p) => p.id === id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...updates };
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(current));
        window.dispatchEvent(new Event("tajmahal_db_updated"));
        return current[idx];
      }
    }
    return null;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getProducts();
      const filtered = current.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("tajmahal_db_updated"));
      return true;
    }
    return false;
  },

  resetProductsToDefault: async (): Promise<CarpetProduct[]> => {
    if (typeof window !== "undefined") {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      window.dispatchEvent(new Event("tajmahal_db_updated"));
    }
    return INITIAL_PRODUCTS;
  },

  // --------------------------------------------------------------------------
  // STAFF EMAILS
  // --------------------------------------------------------------------------
  getStaffEmails: async (): Promise<StaffEmail[]> => {
    if (typeof window === "undefined") return DEFAULT_STAFF_EMAILS;

    try {
      const cached = localStorage.getItem(STAFF_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading cached staff emails:", e);
    }

    localStorage.setItem(STAFF_KEY, JSON.stringify(DEFAULT_STAFF_EMAILS));
    return DEFAULT_STAFF_EMAILS;
  },

  addStaffEmail: async (
    staffData: Omit<StaffEmail, "id" | "created_at">
  ): Promise<StaffEmail> => {
    const staff: StaffEmail = {
      ...staffData,
      id: `staff-${Date.now().toString().slice(-6)}`,
      created_at: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      let current = await tajmahalDb.getStaffEmails();
      // If new staff is primary, make others non-primary
      if (staff.is_primary) {
        current = current.map((s) => ({ ...s, is_primary: false }));
      }
      const updated = [...current, staff];
      localStorage.setItem(STAFF_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("tajmahal_staff_updated"));
    }

    return staff;
  },

  updateStaffEmail: async (
    id: string,
    updates: Partial<StaffEmail>
  ): Promise<StaffEmail | null> => {
    if (typeof window !== "undefined") {
      let current = await tajmahalDb.getStaffEmails();
      if (updates.is_primary) {
        current = current.map((s) => (s.id === id ? s : { ...s, is_primary: false }));
      }
      const idx = current.findIndex((s) => s.id === id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...updates };
        localStorage.setItem(STAFF_KEY, JSON.stringify(current));
        window.dispatchEvent(new Event("tajmahal_staff_updated"));
        return current[idx];
      }
    }
    return null;
  },

  deleteStaffEmail: async (id: string): Promise<boolean> => {
    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getStaffEmails();
      const filtered = current.filter((s) => s.id !== id);
      localStorage.setItem(STAFF_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("tajmahal_staff_updated"));
      return true;
    }
    return false;
  },

  // --------------------------------------------------------------------------
  // INQUIRIES
  // --------------------------------------------------------------------------
  getInquiries: async (): Promise<ClientInquiry[]> => {
    if (typeof window === "undefined") return [];

    try {
      const cached = localStorage.getItem(INQUIRIES_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading cached inquiries:", e);
    }
    return [];
  },

  createInquiry: async (
    inquiryData: Omit<ClientInquiry, "id" | "created_at" | "status">
  ): Promise<ClientInquiry> => {
    const inquiry: ClientInquiry = {
      ...inquiryData,
      id: `INQ-${Date.now().toString().slice(-6)}`,
      status: "new",
      created_at: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getInquiries();
      const updated = [inquiry, ...current];
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("tajmahal_inquiries_updated"));
    }

    return inquiry;
  },

  updateInquiryStatus: async (
    id: string,
    status: ClientInquiry["status"]
  ): Promise<boolean> => {
    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getInquiries();
      const idx = current.findIndex((i) => i.id === id);
      if (idx !== -1) {
        current[idx].status = status;
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));
        window.dispatchEvent(new Event("tajmahal_inquiries_updated"));
        return true;
      }
    }
    return false;
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    if (typeof window !== "undefined") {
      const current = await tajmahalDb.getInquiries();
      const filtered = current.filter((i) => i.id !== id);
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("tajmahal_inquiries_updated"));
      return true;
    }
    return false;
  },
};
