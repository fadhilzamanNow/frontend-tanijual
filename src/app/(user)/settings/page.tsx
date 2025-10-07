"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useState, useEffect } from "react";
import { FaUser, FaBookmark } from "react-icons/fa6";
import AccountProfile from "@/components/Settings/AccountProfile";
import SavedProductsList from "@/components/Settings/SavedProductsList";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { useLoading } from "@/contexts/LoadingContext";

export default function UserSettingsPage() {
  const { authorized, checked } = useAuthGuard({ requiredRole: "user" });
  const [activeTab, setActiveTab] = useState<"profile" | "saved">("profile");
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (checked) {
      stopLoading();
    } else {
      startLoading();
    }
  }, [checked, startLoading, stopLoading]);

  const handleTabChange = (tab: "profile" | "saved") => {
    startLoading();
    setActiveTab(tab);
    setTimeout(() => {
      stopLoading();
    }, 300);
  };

  if (!checked) {
    return <p className="text-sm text-slate-600">Checking permissions…</p>;
  }

  if (!authorized) {
    return <p className="text-sm text-slate-600">Redirecting…</p>;
  }

  return (
    <section className="space-y-6 container mx-auto mt-4">
      <CustomBreadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">
          Pengaturan Akun
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Kelola profil dan produk tersimpan Anda
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => handleTabChange("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === "profile"
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FaUser className="text-lg" />
              <span className="font-medium">Profil Saya</span>
            </button>
            <button
              onClick={() => handleTabChange("saved")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === "saved"
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FaBookmark className="text-lg" />
              <span className="font-medium">Produk Tersimpan</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            {activeTab === "profile" && <AccountProfile />}
            {activeTab === "saved" && <SavedProductsList />}
          </div>
        </main>
      </div>
    </section>
  );
}
