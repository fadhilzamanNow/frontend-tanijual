"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HomeCarousel from "@/components/Carousel/HomeCarousel";
import ProductCard from "@/components/ProductCard";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { FaLeaf, FaShoppingBasket, FaUsers, FaTruck } from "react-icons/fa";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItems } from "lib/accordionval";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number | string;
  quantity: number;
  createdAt: string;
  categoryId?: string | null;
  category?: Category | null;
  images?: Array<{
    id: string;
    imageUrl: string;
    productId: string;
  }>;
  seller: {
    id: string;
    username: string;
    email: string;
    profilePhotoUrl?: string | null;
  };
};

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<"guest" | "user" | "seller">("guest");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [stats, setStats] = useState({ products: 0, sellers: 0 });
  const [categories, setCategories] = useState<Category[]>([]);

  const { startLoading, stopLoading } = useLoading();
  const LIMIT = 6;

  const categoryEmojis: Record<string, string> = {
    Sayuran: "🥬",
    Buah: "🍎",
    Rempah: "🌶️",
    Umbi: "🥔",
    "Biji-bijian": "🌾",
    Lain: "📦",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedRole = window.localStorage.getItem("authRole");
    if (storedRole === "seller") {
      setRole("seller");
      router.replace("/seller/dashboard");
      return;
    }

    setRole(storedRole === "user" ? "user" : "guest");
  }, [router]);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (role === "seller") return;

    const controller = new AbortController();

    async function loadInitialProducts() {
      try {
        setLoading(true);
        startLoading();
        setError(null);
        const response = await fetch(`/api/products?limit=${LIMIT}&offset=0`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to load products");
        }
        const data = (await response.json()) as Product[];
        setProducts(data);
        setOffset(LIMIT);
        setHasMore(data.length === LIMIT);
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

    loadInitialProducts();
    return () => controller.abort();
  }, [role]);

  useEffect(() => {
    // Fetch stats
    async function loadStats() {
      try {
        const response = await fetch("/api/products?limit=1000");
        if (response.ok) {
          const data = await response.json();
          const uniqueSellers = new Set(data.map((p: Product) => p.seller.id));
          setStats({ products: data.length, sellers: uniqueSellers.size });
        }
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    }
    if (role !== "seller") {
      loadStats();
    }
  }, [role]);

  async function loadMoreProducts() {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      startLoading();
      setError(null);
      const response = await fetch(
        `/api/products?limit=${LIMIT}&offset=${offset}`,
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to load more products");
      }
      const data = (await response.json()) as Product[];
      setProducts((prev) => [...prev, ...data]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(data.length === LIMIT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setTimeout(() => {
        setLoadingMore(false);
        stopLoading();
      }, 300);
    }
  }

  const productGrid = useMemo(() => {
    if (role === "seller") return null;

    if (loading) {
      return <p className="text-sm text-slate-600">Loading fresh produce…</p>;
    }

    if (error) {
      return (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-6 text-sm text-sky-700">
          <h3 className="text-base font-semibold text-sky-900">
            No produce listed yet
          </h3>
          <p className="mt-2 text-sky-700">
            Check back soon—new harvests will appear here as sellers add them.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Segar dari Penjual Kami
          </h2>
          <span className="text-sm text-slate-500">
            {products.length} produk
          </span>
        </div>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              onClick={loadMoreProducts}
              disabled={loadingMore}
              className="rounded-full bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-300"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    );
  }, [error, loading, products, role, hasMore, loadingMore]);

  if (role === "seller") {
    return (
      <p className="text-sm text-slate-600">Redirecting to your dashboard…</p>
    );
  }

  return (
    <section className="space-y-8 container mx-auto mt-4 px-4 xs:px-0 mb-2">
      <CustomBreadcrumb />
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="relative px-6 py-12 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-white text-2xl" />
              <span className="text-white/90 font-medium">
                Platform Jual Beli Pertanian
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Hasil Panen Segar
              <br />
              Langsung dari Petani
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Hubungkan petani dan pembeli dalam satu platform. Dapatkan produk
              hortikultura segar dengan harga terbaik.
            </p>
            {role === "guest" && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/users/login")}
                  className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition shadow-lg"
                >
                  Mulai Belanja
                </button>
                <button
                  onClick={() => router.push("/sellers/login")}
                  className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition border-2 border-white/20"
                >
                  Jadi Penjual
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500 p-3 rounded-xl">
              <FaShoppingBasket className="text-white text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.products}+</p>
          <p className="text-sm text-slate-600">Produk Tersedia</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 p-3 rounded-xl">
              <FaUsers className="text-white text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.sellers}+</p>
          <p className="text-sm text-slate-600">Penjual Aktif</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500 p-3 rounded-xl">
              <FaTruck className="text-white text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">Fast</p>
          <p className="text-sm text-slate-600">Pengiriman Cepat</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-500 p-3 rounded-xl">
              <FaLeaf className="text-white text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">100%</p>
          <p className="text-sm text-slate-600">Produk Segar</p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Kategori Populer
        </h2>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-5 py-3 rounded-full border bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <span className="text-2xl">🌟</span>
            <span className="font-semibold text-slate-700">Semua</span>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 px-5 py-3 rounded-full border bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
            >
              <span className="text-2xl">
                {categoryEmojis[category.name] || "📦"}
              </span>
              <span className="font-semibold text-slate-700">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      {/*<div className="rounded-2xl overflow-hidden shadow-lg">
        <HomeCarousel />
      </div>*/}

      {productGrid}
      <h1 className="text-center font-bold text-2xl mt-4">FAQ</h1>
      <Accordion type="single" collapsible>
        {AccordionItems.map((item, i) => (
          <AccordionItem value={`${i + 1}`} key={i + 1}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
