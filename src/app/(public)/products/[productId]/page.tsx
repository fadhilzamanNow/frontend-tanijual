"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageCarousel from "@/components/Carousel/ProductImageCarousel";
import ProductSuggestionCard from "@/components/ProductSuggestionCard";
import { FaBookmark, FaRegBookmark, FaWhatsapp } from "react-icons/fa6";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          setLoading(false);
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
        const response = await fetch("/api/saved/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const savedItems = await response.json();
          const isProductSaved = savedItems.some(
            (item: any) => item.productId === product?.id,
          );
          setIsSaved(isProductSaved);
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

    async function loadSuggestions() {
      try {
        const response = await fetch("/api/products?limit=4");
        if (response.ok) {
          const products = await response.json();
          // Filter out current product
          const filtered = products.filter((p: Product) => p.id !== product.id);
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
        setFeedback(
          "You must be logged in as a buyer to save items for later.",
        );
        return;
      }

      setSubmitting(true);
      setFeedback(null);

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

      setIsSaved(true);
      setFeedback("Product saved for later!");
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Unexpected error occurred",
      );
    } finally {
      setSubmitting(false);
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
    <>
      <section className="flex flex-col pb-24 md:pb-8 gap-2 min-h-[70vh]">
        <div className="flex justify-between gap-2">
          {/* Product Images Carousel */}
          <div className="w-full  xs:w-5/8 lg:w-3/8 sticky top-20 self-start">
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

            {section === 2 && (
              <>
                <div className="flex justify-start items-center gap-2 pb-2 ">
                  <Avatar>
                    <AvatarImage src={product.seller.profilePhotoUrl} />
                    <AvatarFallback>
                      {product.seller.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-black text-sm font-medium ">
                    {product.seller.username}
                  </span>
                </div>
                <span className="text-justify leading-6 text-sm">
                  loreamdaosdas dasda hsduiahdiuah sidhai hdasihdauihdauih
                  duiahsd uiahsudih asuid haiuhd aidhahduiash duahdi ahsduiahsu
                  iahsdiha idhasduia shduashdasuidhas hasidha
                  siduhasuidhasudhasuidhahi
                </span>
              </>
            )}
          </div>
          {/* Desktop sidebar */}
          <aside className="flex flex-col  w-70 rounded-2xl border border-slate-200 bg-white shadow-sm justify-between py-4  sticky top-20 h-100">
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
                disabled={submitting || isSaved}
                className=" text-green-500  px-4 py-2 text-sm font-semibold   transition  flex items-center justify-center gap-2 hover:bg-black/5 border border-green-500 rounded-md"
              >
                {isSaved ? (
                  <FaBookmark className="text-white" />
                ) : (
                  <FaRegBookmark className="text-green-500" />
                )}
                {submitting ? "Saving…" : isSaved ? "Saved" : "Simpan"}
              </button>
            </div>

            {feedback ? (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  feedback.includes("saved")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {feedback}
              </div>
            ) : null}
          </aside>
        </div>
        <div className="flex-1 flex flex-col mx-4 gap-4 lg:hidden">
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

          {section === 2 && (
            <>
              <div className="flex justify-start items-center gap-2 pb-2 ">
                <Avatar>
                  <AvatarImage src={product.seller.profilePhotoUrl} />
                  <AvatarFallback>
                    {product.seller.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-black text-sm font-medium ">
                  {product.seller.username}
                </span>
              </div>
              <span className="text-justify leading-6 text-sm">
                loreamdaosdas dasda hsduiahdiuah sidhai hdasihdauihdauih duiahsd
                uiahsudih asuid haiuhd aidhahduiash duahdi ahsduiahsu iahsdiha
                idhasduia shduashdasuidhas hasidha siduhasuidhasudhasuidhahi
              </span>
            </>
          )}
        </div>
      </section>

      {/* Fixed Mobile Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 xs:hidden bg-white border-t border-slate-200 shadow-lg">
        <div className="flex">
          <div className="flex justify-center items-center w-25   px-2 py-0.5">
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
          <button
            type="button"
            className="flex-1 flex items-center justify-center bg-green-500 px-4 py-4 text-sm font-semibold text-white transition hover:bg-green-600 active:bg-green-700"
          >
            Order Lewat WA
          </button>
          <button
            type="button"
            onClick={handleSaveProduct}
            disabled={submitting || isSaved}
            className="flex items-center justify-center gap-2 bg-white px-4 py-4 text-sm font-semibold transition border-r border-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaved ? (
              <FaBookmark className="text-green-500 text-xl" />
            ) : (
              <FaRegBookmark className="text-slate-400 text-xl" />
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
    </>
  );
}
