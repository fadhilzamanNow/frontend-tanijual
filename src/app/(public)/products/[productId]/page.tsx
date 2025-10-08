"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductImageCarousel from "@/components/Carousel/ProductImageCarousel";
import ProductSuggestionCard from "@/components/ProductSuggestionCard";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import { FaBookmark, FaRegBookmark, FaWhatsapp } from "react-icons/fa6";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { BadgeCheck, CirclePlus, Trash, X } from "lucide-react";

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type Product = {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  price: number | string;
  sellerId: string;
  categoryId?: string | null;
  category?: {
    id: string;
    name: string;
  } | null;
  seller?: {
    id: string;
    username: string;
    email: string;
    profilePhotoUrl?: string | null;
    motto?: string | null;
  };
  images?: Array<{
    id: string;
    imageUrl: string;
    order: number;
  }>;
};

type ProductParams = {
  productId: string;
};

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<ProductParams>;
}) {
  const { productId } = use(params);
  const router = useRouter();
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [number, setNumber] = useState<number>(1);
  const [section, setSection] = useState<number>(1);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [savedItemId, setSavedItemId] = useState<string | null>(null);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const role = window.localStorage.getItem("authRole");
    const isSeller = role === "seller";
    setBlocked(isSeller);
    setChecked(true);
    if (isSeller) {
      router.replace("/seller/dashboard");
    }
  }, [router]);

  useEffect(() => {
    if (!checked || blocked) return;

    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        startLoading();
        setError(null);
        const response = await fetch(`/api/products/${productId}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Unable to load product");
        }
        const data = (await response.json()) as Product;
        setProduct(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Unexpected error occurred",
        );
      } finally {
        if (!controller.signal.aborted) {
          setTimeout(() => {
            setLoading(false);
            stopLoading();
          }, 300);
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [blocked, checked, productId]);

  // Check if product is already saved
  useEffect(() => {
    if (!checked || blocked || !product) return;
    if (typeof window === "undefined") return;

    const token = window.localStorage.getItem("authToken");
    const role = window.localStorage.getItem("authRole");

    if (!token || role !== "user") return;

    async function checkSavedStatus() {
      try {
        const response = await fetch("/api/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const savedItems = await response.json();
          const savedItem = savedItems.find(
            (item: any) => item.productId === product?.id,
          );
          if (savedItem) {
            setIsSaved(true);
            setSavedItemId(savedItem.id);
          } else {
            setIsSaved(false);
            setSavedItemId(null);
          }
        }
      } catch (err) {
        // Silently fail - not critical
        console.error("Failed to check saved status:", err);
      }
    }

    checkSavedStatus();
  }, [checked, blocked, product]);

  // Fetch suggested products
  useEffect(() => {
    if (!product) return;

    const currentProductId = product.id;

    async function loadSuggestions() {
      try {
        const response = await fetch("/api/products?limit=4");
        if (response.ok) {
          const products = await response.json();
          // Filter out current product
          const filtered = products.filter(
            (p: Product) => p.id !== currentProductId,
          );
          setSuggestedProducts(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load suggestions:", err);
      }
    }

    loadSuggestions();
  }, [product]);

  async function handleSaveProduct() {
    try {
      if (!product) return;
      if (typeof window === "undefined") return;
      const token = window.localStorage.getItem("authToken");
      const role = window.localStorage.getItem("authRole");

      if (!token || role !== "user") {
        toast.info("Kamu harus login sebagai pembeli terlebih dahulu", {
          action: {
            label: "Tutup",
            onClick: () => {},
          },
          actionButtonStyle: { backgroundColor: "red" },
          icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
        });
        return;
      }

      setSubmitting(true);
      startLoading();

      if (isSaved && savedItemId) {
        // Unsave the product
        const response = await fetch(`/api/saved/item/${savedItemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to unsave product");
        }

        setIsSaved(false);
        setSavedItemId(null);
        toast.info("Product tidak disimpan!", {
          action: {
            label: <span className="bg-red-500">Tutup</span>,
            onClick: () => {},
          },
          icon: <Trash size={15} className="text-red-500" />,
          actionButtonStyle: { backgroundColor: "red" },
        });
      } else {
        // Save the product
        const response = await fetch("/api/saved/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product.id }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to save product");
        }

        const data = await response.json();
        setIsSaved(true);
        setSavedItemId(data.id);
        toast.info("Produk telah disimpan!", {
          action: {
            label: "Tutup",
            onClick: () => {},
          },
          actionButtonStyle: { backgroundColor: "oklch(72.3% 0.219 149.579)" },
          icon: <BadgeCheck className="text-green-500" size={15} />,
        });
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Unexpected error occurred";
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
    return <p className="text-sm text-slate-600">Loading product…</p>;
  }

  if (blocked) {
    return (
      <p className="text-sm text-slate-600">Redirecting to your dashboard…</p>
    );
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Loading product…</p>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        <strong className="font-semibold">Error:</strong> {error}
      </div>
    );
  }

  if (!product) {
    return <p className="text-sm text-slate-600">Product not found.</p>;
  }

  return (
    <div className="container mx-auto mt-4 px-4 xs:px-0 my-4">
      <CustomBreadcrumb />
      <section className="flex flex-col pb-24 md:pb-8 gap-2 min-h-[70vh]">
        <div className="flex justify-between gap-2 items-start">
          {/* Product Images Carousel */}
          <div className="w-full  sm:w-5/8 lg:w-3/8 sticky top-20 self-start">
            <ProductImageCarousel
              images={product.images || []}
              productName={product.name}
            />
          </div>
          <div className="flex-1 lg:flex flex-col mx-4 gap-4 hidden">
            {/* DESCRIPTION */}
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <h2 className="text-xl font-semibold">
              {IDR.format(Number(product.price))}
            </h2>
            <div className="flex gap-4 border-y py-2">
              <span
                onClick={() => section !== 1 && setSection(1)}
                className={`${section === 1 ? "text-green-500 font-bold" : "text-black font-medium"} cursor-pointer`}
              >
                Deskripsi
              </span>
              <span
                onClick={() => section !== 2 && setSection(2)}
                className={`${section === 2 ? "text-green-500 font-bold" : "text-black font-medium"} cursor-pointer`}
              >
                Detail Toko
              </span>
            </div>
            {section === 1 && (
              <span className="text-justify text-sm mt-2 leading-6">
                {product.description}
              </span>
            )}

            {section === 2 && product.seller && (
              <>
                <Link
                  href={`/sellers/${product.seller.id}`}
                  className="flex justify-start items-center gap-2 pb-2 hover:bg-green-50 p-2 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-green-200"
                >
                  <Avatar>
                    <AvatarImage
                      src={product.seller.profilePhotoUrl || undefined}
                    />
                    <AvatarFallback>
                      {product.seller.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-black text-sm font-medium">
                      {product.seller.username}
                    </span>
                    <span className="text-xs text-green-600">
                      Klik untuk lihat toko →
                    </span>
                  </div>
                </Link>
                {product.seller.motto ? (
                  <p className="text-justify leading-6 text-sm italic text-slate-700">
                    "{product.seller.motto}"
                  </p>
                ) : (
                  <span className="text-justify leading-6 text-sm">
                    Selamat datang di toko kami! Kami menyediakan produk
                    pertanian segar langsung dari petani. Kami berkomitmen untuk
                    memberikan kualitas terbaik dengan harga yang kompetitif.
                  </span>
                )}
              </>
            )}
          </div>
          {/* Desktop sidebar */}
          <aside className="hidden sm:flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm justify-between py-4  sticky top-20 gap-3">
            <div className="flex flex-col px-4 gap-4">
              <h1 className="font-semibold text-lg  text-wrap">Atur jumlah</h1>
              <div className="flex gap-2 items-center">
                <div className="flex w-25 border border-green-500 rounded-md px-2 py-0.5">
                  <span
                    onClick={() => number > 1 && setNumber(number - 1)}
                    className={`${number <= 1 ? "text-slate-200 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
                  >
                    -
                  </span>
                  <span className="flex-1 flex justify-center items-center">
                    {number}
                  </span>
                  <span
                    onClick={() => setNumber(number + 1)}
                    className={`${number >= product.quantity ? "text-slate-200 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
                  >
                    +
                  </span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <span>Stok:</span>
                  <span>{product.quantity}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm ">
                <span className="text-sm">Subtotal: </span>
                <span className="text-base font-semibold text-slate-900 ">
                  {IDR.format(Number(product.price) * number)}
                </span>
              </div>
            </div>
            <div className="flex flex-col px-4 gap-2">
              <button
                type="button"
                className="flex-2 flex justify-center items-center gap-2   bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 rounded-md"
              >
                <FaWhatsapp />
                <span>Order Lewat WA</span>
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                disabled={submitting}
                className=" text-green-500  px-4 py-2 text-sm font-semibold   transition  flex items-center justify-center gap-2 hover:bg-black/5 border border-green-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaved ? (
                  <FaBookmark className="text-white" />
                ) : (
                  <FaRegBookmark className="text-green-500" />
                )}
                {submitting ? "Memproses…" : isSaved ? "Tersimpan" : "Simpan"}
              </button>
            </div>
          </aside>
        </div>
        <div className="flex-1 flex flex-col mx-4 gap-4 lg:hidden mt-2">
          {/* DESCRIPTION MOBILE */}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <h2 className="text-xl font-semibold">
            {IDR.format(Number(product.price))}
          </h2>
          <div className="flex gap-4 border-y py-2">
            <span
              onClick={() => section !== 1 && setSection(1)}
              className={`${section === 1 ? "text-green-500 font-bold" : "text-black font-medium"} cursor-pointer`}
            >
              Deskripsi
            </span>
            <span
              onClick={() => section !== 2 && setSection(2)}
              className={`${section === 2 ? "text-green-500 font-bold" : "text-black font-medium"} cursor-pointer`}
            >
              Detail Toko
            </span>
          </div>
          {section === 1 && (
            <span className="text-justify text-sm mt-2 leading-6">
              {product.description}
            </span>
          )}

          {section === 2 && product.seller && (
            <>
              <Link
                href={`/sellers/${product.seller.id}`}
                className="flex justify-start items-center gap-2 pb-2 hover:bg-green-50 p-2 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-green-200"
              >
                <Avatar>
                  <AvatarImage
                    src={product.seller.profilePhotoUrl || undefined}
                  />
                  <AvatarFallback>
                    {product.seller.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-black text-sm font-medium">
                    {product.seller.username}
                  </span>
                  <span className="text-xs text-green-600">
                    Klik untuk lihat toko →
                  </span>
                </div>
              </Link>
              {product.seller.motto ? (
                <p className="text-justify leading-6 text-sm italic text-slate-700">
                  "{product.seller.motto}"
                </p>
              ) : (
                <span className="text-justify leading-6 text-sm">
                  Selamat datang di toko kami! Kami menyediakan produk pertanian
                  segar langsung dari petani. Kami berkomitmen untuk memberikan
                  kualitas terbaik dengan harga yang kompetitif.
                </span>
              )}
            </>
          )}
        </div>
      </section>

      {/* Fixed Mobile Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-slate-200 shadow-lg">
        <div className="flex p-2 items-center gap-2">
          {/*<div className="flex justify-center items-center w-25   px-2 py-0.5">
            <span
              onClick={() => number > 1 && setNumber(number - 1)}
              className={`${number <= 1 ? "text-slate-200 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
            >
              -
            </span>
            <span className="flex-1 flex justify-center items-center">
              {number}
            </span>
            <span
              onClick={() => setNumber(number + 1)}
              className={`${number >= product.quantity ? "text-slate-200 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
            >
              +
            </span>
          </div>*/}
          <button
            type="button"
            className="rounded-md w-1/2 flex items-center justify-center gap-2 bg-green-500 px-4 py-4 text-sm font-semibold text-white transition hover:bg-green-600 active:bg-green-700"
          >
            <span>Order Lewat WA</span>
            <FaWhatsapp className="text-xl" />
          </button>
          <button
            type="button"
            onClick={handleSaveProduct}
            disabled={submitting}
            className="w-1/2 gap-2 bg-white px-4 py-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-green-500 text-green-500"
          >
            {isSaved ? (
              <div className="flex justify-center gap-2">
                <span>Produk Tersimpan</span>
                <FaBookmark className="text-green-500 text-xl" />
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                <span>Simpan Produk</span>
                <FaRegBookmark className="text-xl" />
              </div>
            )}
          </button>
        </div>
      </div>
      {/* Product Suggestions */}
      {suggestedProducts.length > 0 && (
        <div className="mt-12 border-t pt-8 px-4">
          <h2 className="text-xl font-bold mb-6">Produk Lainnya</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedProducts.map((item) => (
              <ProductSuggestionCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.images?.[0]?.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
