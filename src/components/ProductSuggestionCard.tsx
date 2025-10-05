"use client";

import { CiImageOff } from "react-icons/ci";
import { useState } from "react";

type ProductSuggestionCardProps = {
  id: string;
  name: string;
  price: number | string;
  imageUrl?: string;
};

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function ProductSuggestionCard({
  id,
  name,
  price,
  imageUrl,
}: ProductSuggestionCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={`/products/${id}`}
      className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition"
    >
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain group-hover:scale-105 transition"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
            <CiImageOff className="text-4xl" />
            <span className="text-xs">Gambar tidak dapat dimuat</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{name}</h3>
        <p className="text-green-600 font-bold text-sm">
          {IDR.format(Number(price))}
        </p>
      </div>
    </a>
  );
}
