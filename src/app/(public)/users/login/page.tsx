"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { toast } from "sonner";
import { BadgeCheck, CirclePlus } from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
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

    if (authToken && authRole === "user") {
      router.replace("/");
      return;
    }

    if (authToken && authRole === "seller") {
      router.replace("/seller/dashboard");
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

  async function onSubmit(data: LoginInput) {
    try {
      const response = await fetch("/api/users/login", {
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
        window.localStorage.setItem("authRole", "user");
        window.localStorage.setItem("userId", body.user?.id ?? "");
        window.localStorage.setItem("userName", body.user?.username ?? "");
        window.dispatchEvent(new Event("auth-change"));
      }

      toast.info("Login successful! Redirecting...", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "oklch(72.3% 0.219 149.579)" },
        icon: <BadgeCheck className="text-green-500" size={15} />,
      });
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", {
        action: {
          label: "Tutup",
          onClick: () => {},
        },
        actionButtonStyle: { backgroundColor: "red" },
        icon: <CirclePlus size={15} className="text-red-500 rotate-45" />,
      });
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
            Masuk sebagai Pembeli
          </h1>
          <p className="text-sm text-slate-600">
            Jelajahi produk produk pertanian
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
            type="text"
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
          className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
        <div className="flex gap-2 justify-center text-sm text-slate-600">
          <span>Belum punya akun?</span>
          <Link
            href="/users/register"
            className="text-green-500 hover:text-emerald-600 font-medium"
          >
            Daftar Sekarang
          </Link>
        </div>
      </form>
    </section>
  );
}
