"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useState, useEffect } from "react";
import { FaUser, FaBox } from "react-icons/fa";
import AccountSettings from "@/components/SellerDashboard/AccountSettings";
import ProductList from "@/components/SellerDashboard/ProductList";
import CreateProduct from "@/components/SellerDashboard/CreateProduct";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { useLoading } from "@/contexts/LoadingContext";

type TabType = "account" | "products" | "create-product";

export default function SellerDashboardPage() {
  const { authorized, checked } = useAuthGuard({ requiredRole: "seller" });
  const [activeTab, setActiveTab] = useState<TabType>("account");
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (checked) {
      stopLoading();
    } else {
      startLoading();
    }
  }, [checked, startLoading, stopLoading]);

  const handleTabChange = (tab: TabType) => {
    startLoading();
    setActiveTab(tab);
    setTimeout(() => {
      stopLoading();
    }, 300);
  };

  const handleAddProduct = () => {
    handleTabChange("create-product");
  };

  const handleBackToProducts = () => {
    handleTabChange("products");
  };

  const handleProductCreated = () => {
    // Reload products list
    handleTabChange("products");
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
          Dashboard Seller
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Kelola akun dan produk Anda
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => handleTabChange("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === "account"
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FaUser className="text-lg" />
              <span className="font-medium">Pengaturan Akun</span>
            </button>
            <button
              onClick={() => handleTabChange("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === "products" || activeTab === "create-product"
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FaBox className="text-lg" />
              <span className="font-medium">Daftar Produk</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "products" && (
              <ProductList onAddProduct={handleAddProduct} />
            )}
            {activeTab === "create-product" && (
              <CreateProduct
                onBack={handleBackToProducts}
                onSuccess={handleProductCreated}
              />
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
