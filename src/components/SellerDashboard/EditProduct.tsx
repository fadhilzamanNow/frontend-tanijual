"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCreateSchema, type ProductCreateInput } from "@/lib/validators";
import ImageUpload from "@/components/ImageUpload";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";
import { toast } from "react-toastify";
import { useLoading } from "@/contexts/LoadingContext";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  price: number | string;
  categoryId?: string | null;
  imageUrl?: string | null;
  imageKey?: string | null;
};

// Create form schema without sellerId
const editProductFormSchema = productCreateSchema.omit({ sellerId: true });
type EditProductFormInput = z.infer<typeof editProductFormSchema>;

interface EditProductProps {
  productId: string;
  onBack: () => void;
  onSuccess?: () => void;
}

export default function EditProduct({
  productId,
  onBack,
  onSuccess,
}: EditProductProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const { startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<EditProductFormInput>({
    resolver: zodResolver(editProductFormSchema) as any,
    mode: "onChange",
  });

  const name = watch("name");
  const quantity = watch("quantity");
  const price = watch("price");
  const isFormEmpty = !name || quantity === undefined || !price;

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [productId]);

  async function loadCategories() {
    try {
      setLoadingCategories(true);
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to load categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Gagal memuat kategori");
    } finally {
      setLoadingCategories(false);
    }
  }

  async function loadProduct() {
    try {
      setLoadingProduct(true);
      startLoading();

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`/api/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to load product");
      }

      const product: Product = await response.json();

      // Set form values
      setValue("name", product.name);
      setValue("description", product.description || "");
      setValue("quantity", product.quantity);
      setValue("price", Number(product.price));
      setValue("categoryId", product.categoryId || "");

      // Set image
      if (product.imageUrl) {
        setImageUrl(product.imageUrl);
      }
      if (product.imageKey) {
        setImageKey(product.imageKey);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load product"
      );
      onBack();
    } finally {
      setTimeout(() => {
        setLoadingProduct(false);
        stopLoading();
      }, 300);
    }
  }

  const onSubmit = async (data: EditProductFormInput) => {
    try {
      startLoading();

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const productData = {
        ...data,
        imageUrl: imageUrl || undefined,
        imageKey: imageKey || undefined,
      };

      const response = await fetch(`/api/seller/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to update product");
      }

      toast.success("Produk berhasil diperbarui!");

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        onBack();
      }, 1000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update product"
      );
    } finally {
      setTimeout(() => {
        stopLoading();
      }, 300);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-sm text-slate-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-semibold text-slate-900">Edit Produk</h2>
        <p className="mt-1 text-sm text-slate-600">
          Perbarui informasi produk Anda
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
            initialImageUrl={imageUrl}
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

        {/* Category */}
        <div className="space-y-2">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-slate-700"
          >
            Kategori Produk
          </label>
          <select
            id="categoryId"
            {...register("categoryId")}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            disabled={loadingCategories}
          >
            <option value="">Pilih Kategori (Opsional)</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {loadingCategories && (
            <p className="text-xs text-slate-500">Memuat kategori...</p>
          )}
          {errors.categoryId && (
            <p className="text-sm text-rose-600">{errors.categoryId.message}</p>
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
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
