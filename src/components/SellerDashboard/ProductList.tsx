"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number | string;
  createdAt: string;
  imageUrl?: string;
};

interface ProductListProps {
  onAddProduct: () => void;
  onEditProduct: (productId: string) => void;
}

export default function ProductList({
  onAddProduct,
  onEditProduct,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Unable to fetch products");
      }

      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      setDeleteLoading(productId);

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`/api/seller/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to delete product");
      }

      // Remove product from list
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-sm text-slate-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-medium text-rose-700">Error: {error}</p>
        </div>
        <button
          onClick={loadProducts}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Daftar Produk
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Kelola produk yang Anda jual
          </p>
        </div>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
        >
          <FaPlus />
          Tambah Produk
        </button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FaPlus className="text-2xl text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Belum ada produk
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
            Mulai tambahkan produk pertama Anda agar pembeli dapat menemukan
            hasil panen Anda.
          </p>
          <button
            onClick={onAddProduct}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <FaPlus />
            Tambah Produk Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-slate-500">
            {products.length} produk terdaftar
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const createdAt = new Date(product.createdAt);
              const isDeleting = deleteLoading === product.id;

              return (
                <article
                  key={product.id}
                  className={`flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md ${
                    isDeleting ? "opacity-50" : ""
                  }`}
                >
                  {/* Product Image */}
                  {product.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-slate-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4">
                    <header className="flex-1">
                      <h4 className="text-base font-semibold text-slate-900 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        Ditambahkan{" "}
                        {createdAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </header>

                    <dl className="mt-4 space-y-1 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <dt>Stok</dt>
                        <dd className="font-semibold text-slate-900">
                          {product.quantity} unit
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Harga</dt>
                        <dd className="font-semibold text-slate-900">
                          {IDR.format(Number(product.price))}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => onEditProduct(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        disabled={isDeleting}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="flex-1 flex items-center justify-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                            disabled={isDeleting}
                          >
                            <FaTrash />
                            {isDeleting ? "Menghapus..." : "Hapus"}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-slate-900">
                              Hapus Produk
                            </DialogTitle>
                            <DialogDescription className="text-slate-600">
                              Apakah Anda yakin ingin menghapus produk{" "}
                              <span className="font-semibold text-slate-900">
                                {product.name}
                              </span>
                              ? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2">
                            <DialogClose asChild>
                              <Button
                                type="button"
                                variant="outline"
                                disabled={isDeleting}
                              >
                                Tidak
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => handleDelete(product.id)}
                                disabled={isDeleting}
                                className="bg-rose-500 hover:bg-rose-600 text-white"
                              >
                                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
