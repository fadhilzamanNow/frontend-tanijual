"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SellerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/sellers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Seller Login</h1>
        <p className="text-sm text-slate-600">
          Access your farm dashboard and manage your products.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {loading ? "Signing in…" : "Sign in as seller"}
        </button>
      </form>

      {message ? (
        <div
          className={`rounded-lg border p-4 text-sm ${
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
