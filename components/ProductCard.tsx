"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Check, ArrowRight, Sparkles } from "lucide-react";
import { StoreProduct } from "@/lib/catalog";
import { resolveImageAsset } from "@/lib/assets";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: StoreProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  return (
    <div className="bg-[#f4f4f6] rounded-[28px] p-5 border border-zinc-200/60 hover:border-zinc-300/90 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-xs">
      
      {/* Top Image Container */}
      <div>
        <div className="aspect-square rounded-2xl overflow-hidden relative bg-white border border-zinc-200/50 mb-4 group-hover:scale-[1.01] transition-transform duration-300">
          <Link href={`/shop/${product.id}`} className="block w-full h-full relative">
            <Image
              src={resolveImageAsset(product.image_url)}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {product.is_limited && (
              <span className="px-2.5 py-1 rounded-md bg-[#18181b]/90 backdrop-blur-md text-white text-[10px] font-bold font-mono tracking-wider shadow-xs">
                STUDIO BUILD
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-zinc-800 text-[10px] font-bold font-mono uppercase border border-zinc-200/50">
              {product.care_level} Care
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2.5 rounded-xl transition-all shadow-xs cursor-pointer ${
              isSaved
                ? "bg-white text-[#f87171]"
                : "bg-white/90 backdrop-blur-md text-zinc-500 hover:text-zinc-900"
            }`}
            title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>{product.series}</span>
            <span>{product.size}</span>
          </div>

          <Link href={`/shop/${product.id}`}>
            <h3 className="text-base font-bold text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Price & Action */}
      <div className="pt-5 mt-3 border-t border-zinc-200/60 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">Studio Price</span>
          <p className="text-xl font-bold font-mono text-zinc-950">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer ${
            justAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#18181b] hover:bg-zinc-800 text-white"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
