"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { useLoading } from "@/contexts/LoadingContext";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Overlay from "@/components/Overlay/Overlay";

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

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const categoryId = searchParams.get("categoryId");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { startLoading, stopLoading } = useLoading();
  const LIMIT = 12;

  useEffect(() => {
    if (!searchQuery && !categoryId) return;

    const controller = new AbortController();

    async function loadSearchResults() {
      try {
        setLoading(true);
        startLoading();
        setError(null);
        const params = new URLSearchParams();
        params.set("limit", LIMIT.toString());
        params.set("offset", "0");
        if (searchQuery) params.set("search", searchQuery);
        if (categoryId) params.set("categoryId", categoryId);

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to load search results");
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

    loadSearchResults();
    return () => controller.abort();
  }, [searchQuery, categoryId]);

  async function loadMoreProducts() {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      startLoading();
      setError(null);
      const params = new URLSearchParams();
      params.set("limit", LIMIT.toString());
      params.set("offset", offset.toString());
      if (searchQuery) params.set("search", searchQuery);
      if (categoryId) params.set("categoryId", categoryId);

      const response = await fetch(`/api/products?${params.toString()}`);
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

  if (!searchQuery && !categoryId) {
    return (
      <section className="space-y-6 container mx-auto mt-8 px-4">
        <CustomBreadcrumb />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
          <FaSearch className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold text-amber-900 mb-2">
            No Search Query or Category
          </h2>
          <p className="text-amber-700 mb-4">
            Please enter a search term or select a category to find products.
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

      {/* Search Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors text-sm font-medium"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-xl">
            <FaSearch className="text-green-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Search Results
            </h1>
            <p className="text-slate-600">
              {searchQuery && (
                <>
                  Showing results for{" "}
                  <span className="font-semibold text-slate-900">
                    "{searchQuery}"
                  </span>
                </>
              )}
              {categoryId && !searchQuery && <>Filtered by category</>}
              {categoryId && searchQuery && <> in selected category</>}
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="mt-4 text-slate-600">Searching for products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
          <strong className="font-semibold text-rose-900">Error:</strong>
          <p className="mt-2 text-rose-700">{error}</p>
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
          <FaSearch className="mx-auto text-5xl text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No products found
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            We couldn't find any products matching "{searchQuery}". Try
            different keywords or browse our categories.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {/* Results Grid */}
      {!loading && products.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Found <span className="font-semibold">{products.length}</span>{" "}
              {products.length === 1 ? "product" : "products"}
              {hasMore && " (showing first results)"}
            </p>
          </div>

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
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Overlay />}>
      <SearchContent />
    </Suspense>
  );
}
