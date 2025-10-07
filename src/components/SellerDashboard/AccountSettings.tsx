"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser, FaQuoteLeft, FaCamera, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

type SellerSettings = {
  id: string;
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
  motto?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function AccountSettings() {
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

  // Password fields
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Load seller settings
  useEffect(() => {
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
  }, []);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
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
      toast.success("Foto profil berhasil diperbarui!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
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

      // Update localStorage if username changed
      if (data.username) {
        window.localStorage.setItem("sellerName", data.username);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setTimeout(() => {
        setSubmitting(false);
        stopLoading();
      }, 300);
    }
  }

  async function handlePasswordChange() {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("Password baru dan konfirmasi password tidak cocok");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast.error("Password baru harus minimal 6 karakter");
        return;
      }

      setSavingPassword(true);
      startLoading();

      const token = window.localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch("/api/seller/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to change password");
      }

      setChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password berhasil diubah!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setTimeout(() => {
        setSavingPassword(false);
        stopLoading();
      }, 300);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="mt-4 text-slate-600">Memuat pengaturan...</p>
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <strong className="font-semibold text-rose-900">Error:</strong>
        <p className="mt-2 text-rose-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Pengaturan Akun
        </h2>
        <p className="text-slate-600 mt-1">
          Kelola informasi toko dan profil Anda
        </p>
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
              <h3 className="text-xl font-bold text-slate-900">
                {settings.username}
              </h3>
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
        <div className="space-y-6">
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
              <span className="text-xs text-slate-400">{motto.length}/500</span>
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

      {/* Change Password Section */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Ubah Password
          </h3>
          {!changingPassword && (
            <button
              onClick={() => setChangingPassword(true)}
              className="px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-lg transition"
            >
              Ubah Password
            </button>
          )}
        </div>

        {changingPassword && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FaLock className="inline mr-2" />
                Password Saat Ini
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg outline-none transition"
                placeholder="Masukkan password saat ini"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FaLock className="inline mr-2" />
                Password Baru
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg outline-none transition"
                placeholder="Masukkan password baru (min. 6 karakter)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FaLock className="inline mr-2" />
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg outline-none transition"
                placeholder="Konfirmasi password baru"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePasswordChange}
                disabled={savingPassword}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition"
              >
                {savingPassword ? "Menyimpan..." : "Simpan Password"}
              </button>
              <button
                onClick={() => {
                  setChangingPassword(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                disabled={savingPassword}
                className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>

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
  );
}
