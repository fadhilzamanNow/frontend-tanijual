"use client";

import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaCamera, FaLock } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoading } from "@/contexts/LoadingContext";
import { toast } from "sonner";
import { BadgeCheck, CirclePlus } from "lucide-react";

type UserProfile = {
  id: string;
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
};

export default function AccountProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      startLoading();
      setError(null);

      const token = window.localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to view profile");
        return;
      }

      const response = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setTimeout(() => {
        setLoading(false);
        stopLoading();
      }, 300);
    }
  }

  async function handlePasswordChange() {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.info("Password baru dan konfirmasi password tidak cocok", {
          action: {
            label: "Tutup",
            onClick: () => {},
          },
          actionButtonStyle: { backgroundColor: "red" },
          icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
        });
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast.info("Password baru harus minimal 6 karakter", {
          action: {
            label: "Tutup",
            onClick: () => {},
          },
          actionButtonStyle: { backgroundColor: "red" },
          icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
        });
        return;
      }

      setSaving(true);
      startLoading();

      const token = window.localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch("/api/me/password", {
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
      toast.info("Password berhasil diubah!", {
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
        setSaving(false);
        stopLoading();
      }, 300);
    }
  }

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

      const response = await fetch("/api/me/photo", {
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
      setUser(updated);
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

  if (loading) {
    return <p className="text-slate-600">Memuat profil...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!user) {
    return <p className="text-slate-600">Profil tidak ditemukan</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Informasi Profil
        </h2>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.profilePhotoUrl || undefined} />
            <AvatarFallback className="text-2xl">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-lg cursor-pointer"
          >
            <FaCamera size={14} />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploadingPhoto}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{user.username}</h3>
          <p className="text-sm text-slate-600">{user.email}</p>
          {uploadingPhoto && (
            <p className="text-xs text-green-600 mt-1">Mengupload foto...</p>
          )}
        </div>
      </div>

      {/* Read-only Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <FaUser className="inline mr-2" />
            Nama Pengguna
          </label>
          <input
            type="text"
            value={user.username}
            disabled
            className="w-full px-4 py-2 border bg-slate-50 border-slate-200 cursor-not-allowed rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <FaEnvelope className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border bg-slate-50 border-slate-200 cursor-not-allowed rounded-lg outline-none"
          />
        </div>
      </div>

      {/* Change Password Section */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-end mb-4">
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
                disabled={saving}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition"
              >
                {saving ? "Menyimpan..." : "Simpan Password"}
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
                disabled={saving}
                className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
