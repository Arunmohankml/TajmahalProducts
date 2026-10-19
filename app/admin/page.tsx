"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Image as ImageIcon,
  UploadCloud,
  Link as LinkIcon,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { CarpetProduct, COLLECTIONS_DATA } from "@/lib/tajmahal_data";
import { tajmahalDb } from "@/lib/tajmahal_db";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CarpetProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Partial<CarpetProduct> | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string>("");
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProducts();
    const handleUpdate = () => loadProducts();
    window.addEventListener("tajmahal_db_updated", handleUpdate);
    return () => window.removeEventListener("tajmahal_db_updated", handleUpdate);
  }, []);

  const loadProducts = async () => {
    const list = await tajmahalDb.getProducts();
    setProducts(list);
    setLoading(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.order_code.toLowerCase().includes(search.toLowerCase()) ||
        p.color.toLowerCase().includes(search.toLowerCase()) ||
        p.collection_name.toLowerCase().includes(search.toLowerCase());

      const matchesCollection =
        selectedCollection === "all" || p.collection_id === selectedCollection;

      return matchesSearch && matchesCollection;
    });
  }, [products, search, selectedCollection]);

  const processUploadedFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    setIsUploading(true);
    try {
      let processedDataUrl = "";
      try {
        const imageCompression = (await import("browser-image-compression")).default;
        const options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1280,
          useWebWorker: false,
        };
        const compressed = await imageCompression(file, options);
        processedDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(compressed);
        });
      } catch (e) {
        // Fallback direct read
        processedDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      setEditingProduct((prev) => (prev ? { ...prev, image_url: processedDataUrl } : null));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Unable to process image from device.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct({
      id: "",
      title: "",
      collection_id: "kazzak",
      collection_name: "Kazzak",
      order_code: `TM-BESPOKE-${Date.now().toString().slice(-4)}`,
      color: "Ruby red & cream",
      size: "8x10 ft (Customizable)",
      material: "100% Hand-Spun Wool",
      weave: "Hand-Knotted",
      finish: "Hand-Washed, Natural Sheen",
      style: "Caucasian Tribal Geometric",
      description: "Handcrafted master weave made by skilled artisans in Bhadohi, India.",
      image_url: "/images/kazzak/kazzak_01.jpg",
      is_featured: false,
      stock_status: "Available to Order",
    });
    setImageInputMode("upload");
    setIsEditing(true);
  };

  const handleOpenEdit = (prod: CarpetProduct) => {
    setEditingProduct({ ...prod });
    setImageInputMode(prod.image_url?.startsWith("data:") ? "upload" : "upload");
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;

    const collMeta = COLLECTIONS_DATA[editingProduct.collection_id || "kazzak"];
    const collName = collMeta ? collMeta.name : "Custom";

    if (editingProduct.id) {
      // Update existing
      await tajmahalDb.updateProduct(editingProduct.id, {
        ...editingProduct,
        collection_name: collName,
      });
      setSaveSuccess(`Updated "${editingProduct.title}" successfully.`);
    } else {
      // Add new
      await tajmahalDb.addProduct({
        title: editingProduct.title,
        collection_id: editingProduct.collection_id || "kazzak",
        collection_name: collName,
        order_code: editingProduct.order_code || `TM-${Date.now().toString().slice(-6)}`,
        color: editingProduct.color || "Multi-tone",
        size: editingProduct.size || "Bespoke dimensions",
        material: editingProduct.material || "100% Wool",
        weave: editingProduct.weave || "Hand-Knotted",
        finish: editingProduct.finish || "Hand-Washed",
        style: editingProduct.style || "Traditional",
        description: editingProduct.description || "",
        image_url: editingProduct.image_url || "/images/kazzak/kazzak_01.jpg",
        is_featured: Boolean(editingProduct.is_featured),
        stock_status: editingProduct.stock_status || "Available to Order",
      });
      setSaveSuccess(`Added "${editingProduct.title}" to catalogue.`);
    }

    setIsEditing(false);
    setEditingProduct(null);
    setTimeout(() => setSaveSuccess(""), 4000);
    await loadProducts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the catalogue?`)) {
      await tajmahalDb.deleteProduct(id);
      await loadProducts();
    }
  };

  const handleResetCatalog = async () => {
    if (confirm("Reset catalogue to default 56 authentic factory pieces? Any custom pieces will be replaced.")) {
      await tajmahalDb.resetProductsToDefault();
      await loadProducts();
      setSaveSuccess("Catalogue restored to factory default.");
      setTimeout(() => setSaveSuccess(""), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#C6A25E]/20 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1713]">
            Catalogue & Product Management
          </h1>
          <p className="text-xs text-[#6B6152] mt-1">
            Manage hand-knotted and hand-tufted carpet pieces ({products.length} total pieces in portfolio)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetCatalog}
            className="px-3.5 py-2 rounded-xl bg-[#F7F1E1] hover:bg-[#EFE3C9] text-xs text-[#201C15] font-medium border border-[#C6A25E]/30 transition-colors flex items-center space-x-1.5"
            title="Restore original pieces"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C6A25E]" />
            <span>Restore Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#1F4E3D] hover:bg-[#0C2A20] text-xs text-[#F7F1E1] font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C6A25E]" />
            <span>Add New Carpet</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccess}</span>
          </div>
          <button onClick={() => setSaveSuccess("")} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-[#C6A25E]/20">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B6152]" />
          <input
            type="text"
            placeholder="Search by carpet title, code (TM-KZK-01), color, or collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F7F1E1]/50 border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
          />
        </div>

        <div>
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#F7F1E1]/50 border border-[#C6A25E]/30 text-xs text-[#201C15] focus:outline-none focus:border-[#C6A25E]"
          >
            <option value="all">All Collections ({products.length})</option>
            {Object.values(COLLECTIONS_DATA).map((col) => (
              <option key={col.id} value={col.id}>
                {col.name} ({products.filter((p) => p.collection_id === col.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-[#C6A25E]/20 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#6B6152]">Loading catalogue pieces...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B6152]">
            No carpets match the search or filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#182620] text-[#E8D39D] font-medium border-b border-[#C6A25E]/30">
                <tr>
                  <th className="py-3 px-3 sm:px-4">Preview</th>
                  <th className="py-3 px-3 sm:px-4">
                    <span className="sm:hidden">Carpet</span>
                    <span className="hidden sm:inline">Carpet Title & Code</span>
                  </th>
                  <th className="py-3 px-4 hidden md:table-cell">Collection</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Colorway & Specs</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Size / Dimensions</th>
                  <th className="py-3 px-3 sm:px-4">Status</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C6A25E]/15">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F1E1]/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-16 relative rounded overflow-hidden border border-[#C6A25E]/30 bg-zinc-100 flex-shrink-0">
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0F1713] text-sm">{p.title}</div>
                      <div className="font-mono text-[11px] text-[#C6A25E] mt-0.5">{p.order_code}</div>
                      {p.is_featured && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#C6A25E]/15 text-[#9E7E3C] mt-1 uppercase">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="px-2.5 py-1 rounded-full bg-[#1F4E3D]/10 text-[#1F4E3D] font-medium text-[11px]">
                        {p.collection_name}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-[#6B6152]">
                      <div className="text-[#201C15] font-medium">{p.color}</div>
                      <div className="text-[11px] text-[#6B6152]">{p.weave} · {p.material}</div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-[#6B6152] text-[11px]">
                      {p.size}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-700">
                        {p.stock_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-[#F7F1E1] text-[#1F4E3D] border border-transparent hover:border-[#C6A25E]/30 transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Delete Carpet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal — Full Screen on mobile, completely hidden scrollbar */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 md:p-6 overflow-hidden">
          <div className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-2xl lg:max-w-3xl sm:rounded-2xl border-0 sm:border border-zinc-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Sticky Header */}
            <div className="flex items-center justify-between px-5 py-3.5 sm:py-4 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-[#1C1C1C] truncate">
                    {editingProduct.id ? "Edit Carpet Piece" : "Add Handcrafted Carpet"}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-[#767676] truncate font-mono">
                    {editingProduct.order_code || "Tajmahal Heritage Loom"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-[#1C1C1C] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Scrollable Body with NO SCROLLBAR */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Carpet Piece Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.title || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                      placeholder="e.g. Gabbeh — Denim Blue & Tan Tribal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Order Code / SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.order_code || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, order_code: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400 font-mono"
                      placeholder="e.g. TM-GBH-01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Collection *
                    </label>
                    <select
                      value={editingProduct.collection_id || "kazzak"}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          collection_id: e.target.value,
                          collection_name: COLLECTIONS_DATA[e.target.value]?.name || e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all"
                    >
                      {Object.values(COLLECTIONS_DATA).map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name} ({col.weave})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Colorway *
                    </label>
                    <input
                      type="text"
                      value={editingProduct.color || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                      placeholder="e.g. Denim Blue, Tan & Natural Ochre"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Weave Technique
                    </label>
                    <input
                      type="text"
                      value={editingProduct.weave || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, weave: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                      placeholder="Hand-Knotted / Hand-Woven"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Material
                    </label>
                    <input
                      type="text"
                      value={editingProduct.material || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                      placeholder="100% Hand-Spun Wool"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Standard Sizes
                    </label>
                    <input
                      type="text"
                      value={editingProduct.size || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400"
                      placeholder="Bespoke / Standard (6x9, 8x10, 9x12 ft)"
                    />
                  </div>
                </div>

                {/* IMAGE ATTACHABLE FROM DEVICE WITH COOL SWITCH TOGGLE */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C]">
                      Carpet Imagery *
                    </label>

                    {/* Cool Animated Segmented Toggle Switch */}
                    <div className="relative inline-flex p-1 bg-zinc-100 rounded-full border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => setImageInputMode("upload")}
                        className={`relative z-10 px-3.5 py-1 text-[11px] font-semibold rounded-full transition-colors duration-200 flex items-center space-x-1.5 ${
                          imageInputMode === "upload" ? "text-white" : "text-zinc-600 hover:text-zinc-900"
                        }`}
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Device</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageInputMode("url")}
                        className={`relative z-10 px-3.5 py-1 text-[11px] font-semibold rounded-full transition-colors duration-200 flex items-center space-x-1.5 ${
                          imageInputMode === "url" ? "text-white" : "text-zinc-600 hover:text-zinc-900"
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>Image URL</span>
                      </button>

                      {/* Cool Animated Sliding Pill */}
                      <motion.div
                        layoutId="imageSourcePill"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className={`absolute top-1 bottom-1 rounded-full bg-[#0F2C59] shadow-sm ${
                          imageInputMode === "upload" ? "left-1 right-[50%]" : "left-[50%] right-1"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Mode 1: Upload from Device */}
                  <AnimatePresence mode="wait">
                    {imageInputMode === "upload" ? (
                      <motion.div
                        key="upload-section"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />

                        {/* Interactive Dropzone */}
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (e.dataTransfer.files?.[0]) {
                              processUploadedFile(e.dataTransfer.files[0]);
                            }
                          }}
                          className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-200 group ${
                            editingProduct.image_url && editingProduct.image_url.startsWith("data:")
                              ? "border-emerald-400 bg-emerald-50/20"
                              : "border-zinc-300 hover:border-[#0F2C59] bg-[#F8F9FA] hover:bg-zinc-50"
                          }`}
                        >
                          {isUploading ? (
                            <div className="py-4 flex flex-col items-center space-y-2">
                              <div className="w-8 h-8 border-2 border-[#0F2C59] border-t-transparent rounded-full animate-spin" />
                              <span className="text-xs text-[#767676]">Optimizing image for device storage...</span>
                            </div>
                          ) : editingProduct.image_url ? (
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <div className="w-24 h-28 relative rounded-lg overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100 flex-shrink-0">
                                <img
                                  src={editingProduct.image_url}
                                  alt="Attached Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-left space-y-1.5 flex-1 min-w-0">
                                <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                  <Check className="w-3 h-3" />
                                  <span>Image Ready</span>
                                </div>
                                <p className="text-xs text-[#1C1C1C] font-semibold truncate">
                                  Attached from device storage / camera
                                </p>
                                <p className="text-[11px] text-[#767676]">
                                  Click below to replace with a different photo or take a new picture.
                                </p>
                                <div className="pt-1 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      fileInputRef.current?.click();
                                    }}
                                    className="px-3 py-1.5 text-xs rounded-md bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100 font-medium transition-colors shadow-xs"
                                  >
                                    Change Photo
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingProduct({ ...editingProduct, image_url: "" });
                                    }}
                                    className="px-3 py-1.5 text-xs rounded-md bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 font-medium transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4 flex flex-col items-center space-y-2">
                              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-xs flex items-center justify-center text-[#0F2C59] group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs sm:text-sm font-semibold text-[#1C1C1C]">
                                  Tap to choose photo or drag & drop image here
                                </p>
                                <p className="text-[11px] text-[#767676]">
                                  Supports camera capture, photo library, JPG, PNG & WEBP
                                </p>
                              </div>
                              <span className="inline-block mt-2 px-3.5 py-1.5 rounded-md text-[11px] font-semibold bg-[#0F2C59] text-white shadow-xs">
                                Choose from Device
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="url-section"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={editingProduct.image_url || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400 font-mono"
                            placeholder="e.g. /images/kazzak/kazzak_01.jpg or https://..."
                          />
                          {editingProduct.image_url && (
                            <div className="w-11 h-11 rounded-lg border border-zinc-200 overflow-hidden flex-shrink-0 bg-zinc-100">
                              <img src={editingProduct.image_url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-[#767676]">
                          Enter a relative image path (/hmc_assets/...) or an external HTTPS URL.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Description & Craft Notes
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50/80 border border-zinc-300 text-xs text-[#1C1C1C] focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-all placeholder-zinc-400 leading-relaxed"
                    placeholder="Artisanal description, provenance, and weaving notes..."
                  />
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <label className="flex items-center space-x-2.5 text-xs text-[#1C1C1C] cursor-pointer font-medium select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProduct.is_featured)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0F2C59] focus:ring-[#0F2C59] border-zinc-300"
                    />
                    <span>Mark as Featured in public storefront</span>
                  </label>
                </div>
              </div>

              {/* Sticky Footer Action Bar */}
              <div className="px-5 py-3.5 border-t border-zinc-200 bg-[#F8F9FA] flex items-center justify-end space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 sm:px-5 py-2.5 rounded-lg border border-zinc-300 hover:bg-white text-xs font-semibold uppercase tracking-wider text-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 rounded-lg bg-[#0F2C59] hover:bg-[#0A1C38] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Carpet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
