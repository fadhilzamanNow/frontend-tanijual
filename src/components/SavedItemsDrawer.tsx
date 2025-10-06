"use client";

import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaTrash } from "react-icons/fa6";

type SavedItem = {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number | string;
    images?: Array<{
      id: string;
      imageUrl: string;
    }>;
  };
};

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

interface SavedItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedItemsDrawer({
  isOpen,
  onClose,
}: SavedItemsDrawerProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSavedItems();
    }
  }, [isOpen]);

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
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed w-1/8 h-screen bg-black/50 z-[998]"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[999] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Produk Tersimpan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <RxCross1 size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && <p className="text-center text-slate-600">Loading...</p>}

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          {!loading && !error && savedItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <CiImageOff size={64} className="mb-4" />
              <p>Belum ada produk tersimpan</p>
            </div>
          )}

          {!loading && !error && savedItems.length > 0 && (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border rounded-lg hover:shadow-md transition"
                >
                  <a
                    href={`/products/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0].imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                        <CiImageOff size={32} className="text-slate-400" />
                      </div>
                    )}
                  </a>

                  <div className="flex-1 min-w-0">
                    <a href={`/products/${item.product.id}`}>
                      <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:text-green-500">
                        {item.product.name}
                      </h3>
                    </a>
                    <p className="text-green-600 font-semibold text-sm">
                      {IDR.format(Number(item.product.price))}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex-shrink-0 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
