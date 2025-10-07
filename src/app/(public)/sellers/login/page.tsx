"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerLoginSchema, type SellerLoginInput } from "@/lib/validators";

export default function SellerLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<SellerLoginInput>({
    resolver: zodResolver(sellerLoginSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const isFormEmpty = !email || !password;

  useEffect(() => {
    // Check if user is already authenticated
    if (typeof window === "undefined") return;

    const authToken = window.localStorage.getItem("authToken");
    const authRole = window.localStorage.getItem("authRole");

    if (authToken && authRole === "seller") {
      router.replace("/seller/dashboard");
      return;
    }

    if (authToken && authRole === "user") {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <section className="mx-auto w-full max-w-md space-y-6">
        <p className="text-center text-sm text-slate-600">
          Checking authentication...
        </p>
      </section>
    );
  }

  async function onSubmit(data: SellerLoginInput) {
    setMessage(null);

    try {
      const response = await fetch("/api/sellers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Unable to login");
      }

      const body = await response.json();
      if (typeof window !== "undefined") {
        window.localStorage.setItem("authToken", body.authToken);
        window.localStorage.setItem("authRole", "seller");
        window.localStorage.setItem("sellerId", body.seller?.id ?? "");
        window.localStorage.setItem("sellerName", body.seller?.username ?? "");
        window.dispatchEvent(new Event("auth-change"));
      }

      setMessage("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  return (
    <section className="bg-white mx-auto w-full space-y-6 flex flex-col justify-center items-center min-h-[calc(100vh-73px)] py-8 xs:bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-md border-0 xs:border border-slate-200 bg-white p-6 shadow-none xs:max-w-md xs:shadow-sm xs:w-111 animate-in slide-in-from-bottom-2 fade-in duration-500"
      >
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Masuk sebagai Penjual
          </h1>
          <p className="text-sm text-slate-600">
            Akses dashboard penjualanmu produk pertanianmu disini
          </p>
        </header>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          {errors.email && (
            <p className="text-sm text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          {errors.password && (
            <p className="text-sm text-rose-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isFormEmpty}
          className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {isSubmitting ? "Signing in…" : "Sign in as seller"}
        </button>
        <div className="flex gap-2 justify-center text-sm text-slate-600">
          <span>Belum punya akun seller?</span>
          <Link
            href="/sellers/register"
            className="text-green-500 hover:text-emerald-600 font-medium"
          >
            Daftar Sekarang
          </Link>
        </div>
      </form>

      {message ? (
        <div
          className={`rounded-lg border p-4 text-sm animate-in slide-in-from-bottom-2 fade-in duration-300 ${
            message.includes("successful")
              ? "border-orange-200 bg-orange-50 text-orange-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </section>
  );
}
