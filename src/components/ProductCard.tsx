"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoNavigate } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type ProductCardProps = {
  data: {
    id: string;
    name: string;
    price: number | string;
    quantity: number;
    createdAt: string;
    images?: Array<{
      id: string;
      imageUrl: string;
      productId: string;
    }>;
    seller: {
      id: string;
      username: string;
      email: string;
      profilePhotoUrl?: string | null;
    };
  };
};

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ data }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const createdAt = new Date(data.createdAt);
  const [hover, setHover] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Get the first image or use placeholder
  const imageUrl = imageError
    ? "https://via.placeholder.com/400x170?text=No+Image"
    : data?.images?.[0]?.imageUrl ||
      "https://via.placeholder.com/400x170?text=No+Image";

  return (
    <Link
      href={`/products/${data.id}`}
      className={`group flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-in-out hover:border-slate-300 hover:shadow-md hover:-translate-y-1 overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Image Container */}
      <div
        className="relative w-full h-[170px] bg-gray-100"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={imageUrl}
          alt={data?.name || "Product"}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageError}
        />
        <div
          className={`absolute inset-0 flex justify-center gap-2 items-center text-white font-semibold bg-black/50 transition-all duration-300 ease-in-out ${hover ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <span>Cek sekarang</span>
          <IoNavigate />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-4 gap-y-2">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-green-500 line-clamp-2 transition-colors duration-300">
          {data.name}
        </h3>

        {/* Date Added */}
        {/*<p className="text-xs text-slate-500">
          {createdAt.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>*/}
        <div className="flex justify-start items-center gap-2">
          <Avatar>
            <AvatarImage src={data.seller.profilePhotoUrl || undefined} />
            <AvatarFallback>{data.seller.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p>{data.seller.username}</p>
        </div>
        {/* Price and Stock - Push to bottom */}
        <div className="mt-auto pt-2 space-y-1 text-sm text-slate-600 border-t border-slate-100 flex flex-col">
          <span>{IDR.format(Number(data.price))}</span>
          <span className="text-red-500">sisa {data.quantity}</span>
        </div>
      </div>
    </Link>
  );
}
