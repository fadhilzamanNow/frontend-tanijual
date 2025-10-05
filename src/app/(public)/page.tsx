"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HomeCarousel from "@/components/Carousel/HomeCarousel";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number | string;
  quantity: number;
  createdAt: string;
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
  const LIMIT = 6;

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

  useEffect(() => {
    if (role === "seller") return;

    const controller = new AbortController();

    async function loadInitialProducts() {
      try {
        setLoading(true);
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
          setLoading(false);
        }
      }
    }

    loadInitialProducts();
    return () => controller.abort();
  }, [role]);

  async function loadMoreProducts() {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
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
      setLoadingMore(false);
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Fresh From Our Sellers
          </h2>
          <span className="text-sm text-slate-500">
            {products.length} items
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
    <section className="">
      <header className="">
        <div className="">
          <HomeCarousel />
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Your bridge between farmers and buyers
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          Browse fresh horticulture products, keep track of your cart, or manage
          your seller dashboard. Use the navigation above to jump to the area
          that makes sense for you.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Getting Started
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>
            New here? Head to the login or register screens to create an account
            as a buyer or a seller.
          </li>
          <li>
            Buyers can access private routes such as{" "}
            <span className="font-semibold text-green-500">/my-carts</span> and{" "}
            <span className="font-semibold text-green-500">/settings</span> once
            authenticated.
          </li>
          <li>
            Sellers manage their shop from the dedicated{" "}
            <span className="font-semibold text-green-500">
              /seller/dashboard
            </span>{" "}
            area.
          </li>
        </ul>
      </div>

      {productGrid}
    </section>
  );
}
