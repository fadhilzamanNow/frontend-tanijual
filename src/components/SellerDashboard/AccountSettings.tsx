"use client";

import { useState, useEffect } from "react";

export default function AccountSettings() {
  const [sellerName, setSellerName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = window.localStorage.getItem("sellerName") || "";
    const sellerId = window.localStorage.getItem("sellerId") || "";
    setSellerName(storedName);

    // TODO: Fetch seller email from API using sellerId
    setEmail("seller@example.com"); // Placeholder
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // TODO: Implement API call to update seller profile
      // const response = await fetch("/api/seller/profile", {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ username: sellerName, email }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      });

      // Update localStorage
      if (sellerName) {
        window.localStorage.setItem("sellerName", sellerName);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Pengaturan Akun
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Kelola informasi akun seller Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="sellerName"
              className="block text-sm font-medium text-slate-700"
            >
              Nama Seller
            </label>
            <input
              id="sellerName"
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Masukkan nama seller"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="email@example.com"
              disabled
            />
            <p className="text-xs text-slate-500">
              Email tidak dapat diubah. Hubungi support jika perlu mengubah
              email.
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`rounded-lg border p-4 text-sm ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-900">Informasi Akun</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Status Akun</dt>
            <dd className="font-medium text-slate-900">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                Aktif
              </span>
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Tipe Akun</dt>
            <dd className="font-medium text-slate-900">Seller</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
