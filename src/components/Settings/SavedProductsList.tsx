"use client";

import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";

type SavedItem = {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number | string;
    quantity: number;
    images?: Array<{
      id: string;
      imageUrl: string;
    }>;
    seller: {
      id: string;
      username: string;
    };
  };
};

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function SavedProductsList() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadSavedItems();
  }, []);

  async function loadSavedItems() {
    try {
      setLoading(true);
      setError(null);

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to view saved items");
        return;
      }

      const response = await fetch("/api/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load saved items");
      }

      const data = await response.json();
      setSavedItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveItem(itemId: string) {
    try {
      setDeleting(itemId);
      const token = window.localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`/api/saved/item/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSavedItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Memuat produk tersimpan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (savedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <CiImageOff size={64} className="mb-4 text-slate-300" />
        <h3 className="text-lg font-semibold mb-2">
          Belum ada produk tersimpan
        </h3>
        <p className="text-sm text-center max-w-md">
          Produk yang Anda simpan akan muncul di sini. Mulai jelajahi dan simpan
          produk favorit Anda!
        </p>
        <a
          href="/"
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Jelajahi Produk
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Produk Tersimpan
        </h2>
        <span className="text-sm text-slate-600">
          {savedItems.length} produk
        </span>
      </div>

      <div className="grid gap-4">
        {savedItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:shadow-md transition group"
          >
            <a href={`/products/${item.product.id}`} className="flex-shrink-0">
              {item.product.images && item.product.images.length > 0 ? (
                <img
                  src={item.product.images[0].imageUrl}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center">
                  <CiImageOff size={32} className="text-slate-400" />
                </div>
              )}
            </a>

            <div className="flex-1 min-w-0">
              <a href={`/products/${item.product.id}`}>
                <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-green-600 transition">
                  {item.product.name}
                </h3>
              </a>
              <p className="text-green-600 font-bold text-lg mb-2">
                {IDR.format(Number(item.product.price))}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Penjual:</span>
                <span className="font-medium">
                  {item.product.seller.username}
                </span>
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Stok: {item.product.quantity}
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => handleRemoveItem(item.id)}
                disabled={deleting === item.id}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
                title="Hapus dari tersimpan"
              >
                <FaTrash size={18} />
              </button>
              <a
                href={`/products/${item.product.id}`}
                className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Lihat Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
