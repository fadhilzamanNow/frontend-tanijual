"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser, FaStore, FaQuoteLeft, FaCamera } from "react-icons/fa";
import { toast } from "sonner";
import { BadgeCheck, CirclePlus } from "lucide-react";
import Link from "next/link";

type SellerSettings = {
  id: string;
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
  motto?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function SellerSettingsPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [settings, setSettings] = useState<SellerSettings | null>(null);
  const { startLoading, stopLoading } = useLoading();

  // Form fields
  const [username, setUsername] = useState("");
  const [motto, setMotto] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Check authentication
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("authToken");
    const role = window.localStorage.getItem("authRole");

    if (!token || role !== "seller") {
      router.replace("/sellers/login");
      return;
    }

    setChecked(true);
  }, [router]);

  // Load seller settings
  useEffect(() => {
    if (!checked) return;

    const controller = new AbortController();

    async function loadSettings() {
      try {
        setLoading(true);
        startLoading();
        setError(null);

        const token = window.localStorage.getItem("authToken");
        const response = await fetch("/api/seller/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to load settings");
        }

        const data = await response.json();
        setSettings(data);
        setUsername(data.username || "");
        setMotto(data.motto || "");
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        if (!controller.signal.aborted) {
          setTimeout(() => {
            setLoading(false);
            stopLoading();
          }, 300);
        }
      }
    }

    loadSettings();
    return () => controller.abort();
  }, [checked]);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.info("File harus berupa gambar", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "red" },
        icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.info("Ukuran file maksimal 5MB", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "red" },
        icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
      });
      return;
    }

    try {
      setUploadingPhoto(true);
      startLoading();

      const token = window.localStorage.getItem("authToken");
      if (!token) return;

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("/api/seller/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to upload photo");
      }

      const updated = await response.json();
      setSettings(updated);
      toast.info("Foto profil berhasil diperbarui!", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "oklch(72.3% 0.219 149.579)" },
        icon: <BadgeCheck className="text-green-500" size={15} />,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "red" },
        icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
      });
    } finally {
      setTimeout(() => {
        setUploadingPhoto(false);
        stopLoading();
      }, 300);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    startLoading();
    setError(null);
    setSuccess(null);

    try {
      const token = window.localStorage.getItem("authToken");
      const response = await fetch("/api/seller/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username.trim(),
          motto: motto.trim(),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to update settings");
      }

      const data = await response.json();
      setSettings(data);
      setSuccess("Pengaturan berhasil diperbarui!");
      toast.info("Pengaturan berhasil diperbarui!", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "oklch(72.3% 0.219 149.579)" },
        icon: <BadgeCheck className="text-green-500" size={15} />,
      });

      // Update localStorage if username changed
      if (data.username) {
        window.localStorage.setItem("sellerName", data.username);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unexpected error";
      setError(errorMsg);
      toast.error(errorMsg, {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "red" },
        icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
      });
    } finally {
      setTimeout(() => {
        setSubmitting(false);
        stopLoading();
      }, 300);
    }
  }

  if (!checked) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <p className="text-sm text-slate-600">Memeriksa autentikasi...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="mt-4 text-slate-600">Memuat pengaturan...</p>
        </div>
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
          <strong className="font-semibold text-rose-900">Error:</strong>
          <p className="mt-2 text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Pengaturan Akun
            </h1>
            <p className="text-slate-600 mt-1">
              Kelola informasi toko dan profil Anda
            </p>
          </div>
          <Link
            href="/seller/dashboard"
            className="text-sm text-green-600 hover:text-green-700 font-semibold"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        {/* Profile Preview Card */}
        {settings && (
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={settings.profilePhotoUrl || undefined} />
                  <AvatarFallback className="text-xl bg-green-500 text-white font-bold">
                    {settings.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-photo-input"
                  className="absolute bottom-0 right-0 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-lg cursor-pointer"
                >
                  <FaCamera size={14} />
                  <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {settings.username}
                </h2>
                <p className="text-sm text-slate-600">{settings.email}</p>
                {uploadingPhoto && (
                  <p className="text-xs text-green-600 mt-1">
                    Mengupload foto...
                  </p>
                )}
                {settings.motto && (
                  <p className="text-sm text-green-700 italic mt-1 flex items-center gap-2">
                    <FaQuoteLeft className="text-xs" />
                    {settings.motto}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FaUser className="text-green-600" />
                Nama Toko
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan nama toko Anda"
                required
                className="w-full"
              />
              <p className="text-xs text-slate-500">
                Nama toko yang akan ditampilkan kepada pembeli
              </p>
            </div>

            {/* Motto Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FaQuoteLeft className="text-green-600" />
                Motto Toko
              </label>
              <textarea
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                placeholder="Contoh: Produk segar langsung dari kebun kami"
                maxLength={500}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  Motto atau tagline toko Anda (maksimal 500 karakter)
                </p>
                <span className="text-xs text-slate-400">
                  {motto.length}/500
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setUsername(settings?.username || "");
                setMotto(settings?.motto || "");
                setError(null);
                setSuccess(null);
              }}
              variant="outline"
              className="px-8 border-slate-300 hover:bg-slate-50"
            >
              Reset
            </Button>
          </div>
        </form>

        {/* Account Info */}
        {settings && (
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
            <p>
              <strong>Email:</strong> {settings.email} (tidak dapat diubah)
            </p>
            <p className="mt-1">
              <strong>Bergabung sejak:</strong>{" "}
              {new Date(settings.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
