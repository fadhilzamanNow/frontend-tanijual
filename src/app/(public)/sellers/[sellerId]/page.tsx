"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { useLoading } from "@/contexts/LoadingContext";
import {
  FaStore,
  FaArrowLeft,
  FaEnvelope,
  FaCalendar,
  FaQuoteLeft,
} from "react-icons/fa";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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

type Seller = {
  id: string;
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
  motto?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function SellerShopPage() {
  const params = useParams();
  const router = useRouter();
  const sellerId = params.sellerId as string;

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { startLoading, stopLoading } = useLoading();
  const LIMIT = 12;

  // Load seller info
  useEffect(() => {
    if (!sellerId) return;

    const controller = new AbortController();

    async function loadSellerInfo() {
      try {
        const response = await fetch(`/api/sellers/${sellerId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to load seller information");
        }

        const data = await response.json();
        setSeller(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Failed to load seller:", err);
      }
    }

    loadSellerInfo();
    return () => controller.abort();
  }, [sellerId]);

  // Load seller's products
  useEffect(() => {
    if (!sellerId) return;

    const controller = new AbortController();

    async function loadSellerProducts() {
      try {
        setLoading(true);
        startLoading();
        setError(null);
        const response = await fetch(
          `/api/products?limit=${LIMIT}&offset=0&sellerId=${sellerId}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to load products");
        }

        const data = (await response.json()) as Product[];
        setProducts(data);
        setAllProducts(data);
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

    loadSellerProducts();
    return () => controller.abort();
  }, [sellerId]);

  async function loadMoreProducts() {
    if (loadingMore || !hasMore || !sellerId) return;

    try {
      setLoadingMore(true);
      startLoading();
      setError(null);
      const response = await fetch(
        `/api/products?limit=${LIMIT}&offset=${offset}&sellerId=${sellerId}`,
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to load more products");
      }

      const data = (await response.json()) as Product[];
      const newProducts = [...allProducts, ...data];
      setProducts(newProducts);
      setAllProducts(newProducts);
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

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setProducts(filtered);
  }, [searchQuery, allProducts]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function clearSearch() {
    setSearchQuery("");
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (!sellerId) {
    return (
      <section className="space-y-6 container mx-auto mt-8 px-4">
        <CustomBreadcrumb />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
          <FaStore className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold text-amber-900 mb-2">
            Invalid Seller
          </h2>
          <p className="text-amber-700 mb-4">
            The seller information could not be loaded.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 container mx-auto mt-8 px-4">
      <CustomBreadcrumb />

      {/* Back to Previous Page */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* Seller Info Card */}
      {seller && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border border-green-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={seller.profilePhotoUrl || undefined} />
                <AvatarFallback className="text-2xl bg-green-500 text-white font-bold">
                  {seller.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Seller Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FaStore className="text-green-600 text-2xl" />
                  <h1 className="text-3xl font-bold text-slate-900">
                    {seller.username}
                  </h1>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaEnvelope className="text-green-600" />
                    <span className="text-sm">{seller.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaCalendar className="text-green-600" />
                    <span className="text-sm">
                      Bergabung sejak {formatDate(seller.createdAt)}
                    </span>
                  </div>
                </div>

                {seller.motto && (
                  <div className="mt-4 p-4 bg-white/60 rounded-lg border border-green-100">
                    <p className="text-sm text-slate-700 leading-relaxed italic flex items-start gap-2">
                      <FaQuoteLeft className="text-green-600 mt-1 flex-shrink-0" />
                      <span>{seller.motto}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Produk dari Toko Ini
            </h2>
          </div>

          {/* Search Bar */}
          {!loading && allProducts.length > 0 && (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Cari produk di toko ini..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Product Count and Search Results Info */}
          {!loading && allProducts.length > 0 && (
            <div className="text-sm text-slate-600">
              {searchQuery ? (
                products.length > 0 ? (
                  <span>
                    Menampilkan <strong>{products.length}</strong> dari{" "}
                    <strong>{allProducts.length}</strong> produk
                  </span>
                ) : (
                  <span className="text-amber-600">
                    Tidak ada produk yang cocok dengan pencarian "
                    <strong>{searchQuery}</strong>"
                  </span>
                )
              ) : (
                <span>
                  <strong>{allProducts.length}</strong> produk
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-slate-600">Memuat produk...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
            <strong className="font-semibold text-rose-900">Error:</strong>
            <p className="mt-2 text-rose-700">{error}</p>
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && allProducts.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
            <FaStore className="mx-auto text-5xl text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Belum Ada Produk
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Toko ini belum memiliki produk yang tersedia. Silakan cek kembali
              nanti.
            </p>
            <Link
              href="/"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
            >
              Jelajahi Toko Lain
            </Link>
          </div>
        )}

        {/* No Search Results State */}
        {!loading &&
          !error &&
          searchQuery &&
          products.length === 0 &&
          allProducts.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-12 text-center">
              <FaStore className="mx-auto text-5xl text-amber-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Tidak Ada Hasil
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Tidak ditemukan produk dengan kata kunci "
                <strong>{searchQuery}</strong>". Coba kata kunci lain atau hapus
                pencarian.
              </p>
              <button
                onClick={clearSearch}
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
              >
                Hapus Pencarian
              </button>
            </div>
          )}

        {/* Products Grid */}
        {!loading && products.length > 0 && allProducts.length > 0 && (
          <div className="space-y-6">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>

            {/* Load More Button - Only show if not searching */}
            {hasMore && !searchQuery && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={loadMoreProducts}
                  disabled={loadingMore}
                  className="rounded-full bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-300"
                >
                  {loadingMore ? "Memuat..." : "Muat Lebih Banyak"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
