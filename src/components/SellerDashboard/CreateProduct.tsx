"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCreateSchema, type ProductCreateInput } from "@/lib/validators";
import ImageUpload from "@/components/ImageUpload";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";

// Create form schema without sellerId
const createProductFormSchema = productCreateSchema.omit({ sellerId: true });
type CreateProductFormInput = z.infer<typeof createProductFormSchema>;

interface CreateProductProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export default function CreateProduct({
  onBack,
  onSuccess,
}: CreateProductProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<CreateProductFormInput>({
    resolver: zodResolver(createProductFormSchema) as any,
    mode: "onChange",
  });

  const name = watch("name");
  const quantity = watch("quantity");
  const price = watch("price");
  const isFormEmpty = !name || quantity === undefined || !price;

  const onSubmit = async (data: CreateProductFormInput) => {
    setMessage(null);

    try {
      const token = window.localStorage.getItem("authToken");
      const sellerId = window.localStorage.getItem("sellerId");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      if (!sellerId) {
        throw new Error("Seller ID not found");
      }

      const productData = {
        ...data,
        sellerId,
        imageUrl: imageUrl || undefined,
        imageKey: imageKey || undefined,
      };

      const response = await fetch("/api/seller/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to create product");
      }

      setMessage({
        type: "success",
        text: "Produk berhasil ditambahkan!",
      });

      // Reset form
      reset();
      setImageUrl("");
      setImageKey("");

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        onBack();
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to create product",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4 transition"
        >
          <FaArrowLeft />
          Kembali ke Daftar Produk
        </button>
        <h2 className="text-2xl font-semibold text-slate-900">
          Tambah Produk Baru
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Lengkapi informasi produk yang ingin Anda jual
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Foto Produk
          </label>
          <ImageUpload
            folder="products"
            onUploadSuccess={(url, key) => {
              setImageUrl(url);
              setImageKey(key);
            }}
            maxSizeMB={5}
          />
          <p className="text-xs text-slate-500">
            Upload foto produk dengan kualitas terbaik. Format: JPG, PNG, WebP
            (Max 5MB)
          </p>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Nama Produk <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Contoh: Tomat Segar Premium"
          />
          {errors.name && (
            <p className="text-sm text-rose-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Deskripsi Produk
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Jelaskan produk Anda secara detail..."
          />
          {errors.description && (
            <p className="text-sm text-rose-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Quantity and Price */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Quantity */}
          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-slate-700"
            >
              Stok (Unit) <span className="text-rose-500">*</span>
            </label>
            <input
              id="quantity"
              type="number"
              min="0"
              {...register("quantity", { valueAsNumber: true })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="0"
            />
            {errors.quantity && (
              <p className="text-sm text-rose-600">{errors.quantity.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-slate-700"
            >
              Harga (Rp) <span className="text-rose-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="100"
              {...register("price", { valueAsNumber: true })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="0"
            />
            {errors.price && (
              <p className="text-sm text-rose-600">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`rounded-lg border p-4 text-sm animate-in slide-in-from-bottom-2 fade-in duration-300 ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isFormEmpty}
            className="rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {isSubmitting ? "Menyimpan..." : "Tambah Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
