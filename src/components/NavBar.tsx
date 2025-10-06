"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import {
  FaMagnifyingGlass,
  FaRegBookmark,
  FaRegUser,
  FaUser,
} from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SavedItemsDrawer from "./SavedItemsDrawer";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

type AuthRole = "guest" | "user" | "seller";

type MenuItem = {
  href: string;
  label: string;
};

function readRole(): AuthRole {
  if (typeof window === "undefined") return "guest";
  const stored = window.localStorage.getItem("authRole");
  return stored === "user" || stored === "seller" ? stored : "guest";
}

export default function NavBar() {
  const [role, setRole] = useState<AuthRole>("guest");
  const isSmallScreen = useMediaQuery("(min-width: 640px)");
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);

  useEffect(() => {
    setRole(readRole());

    function handleAuthChange() {
      setRole(readRole());
    }

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const menu: MenuItem[] = useMemo(() => {
    if (role === "user") {
      return [
        { href: "/", label: "Home" },
        { href: "/my-carts", label: "Saved" },
        { href: "/settings", label: "Settings" },
      ];
    }

    if (role === "seller") {
      return [
        { href: "/", label: "Home" },
        { href: "/seller/dashboard", label: "Dashboard" },
      ];
    }

    return [
      { href: "/", label: "Home" },
      { href: "/users/login", label: "User Login" },
      { href: "/users/register", label: "User Register" },
      { href: "/sellers/login", label: "Seller Login" },
      { href: "/sellers/register", label: "Seller Register" },
    ];
  }, [role]);

  function handleLogout() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authRole");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("sellerId");
    window.localStorage.removeItem("sellerName");
    window.dispatchEvent(new Event("auth-change"));
    setRole("guest");
  }

  return (
    <nav className="sticky z-99 top-0 border-b border-slate-200 bg-white backdrop-blur">
      <div className="mx-auto flex w-full container items-center justify-between gap-4 px-4  py-4 sm:px-0">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-green-500"
        >
          TaniJual
        </Link>
        <div className="relative flex-1">
          <Input placeholder={isSmallScreen ? "Cari Barang...." : ""} />
          <FaMagnifyingGlass className="absolute top-1/2 -translate-y-1/2 right-2 text-stone-400" />
        </div>
        <div className="flex  items-center justify-end gap-2 sm:gap-4">
          {/*<div className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>*/}

          {/*<div className="flex flex-col items-end gap-2 md:hidden">
            <select
              className="w-40 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
              value=""
              onChange={(event) => {
                const target = event.target.value;
                if (!target) return;
                if (target === "logout") {
                  handleLogout();
                  return;
                }
                window.location.href = target;
              }}
            >
              <option value="" disabled>
                Navigate
              </option>
              {menu.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
              {role !== "guest" ? <option value="logout">Logout</option> : null}
            </select>
          </div>*/}
          {role == "guest" && (
            <div className="flex justify-center items-center gap-2">
              <Link href="/users/register">
                <Button className="text-green-500 bg-white border border-green-500 hover:bg-black/5">
                  Daftar
                </Button>
              </Link>

              <Button className="bg-green-500 hover:bg-green-500/80">
                Masuk
              </Button>
            </div>
          )}

          {role !== "guest" && (
            <div className="flex text-xl justify-center items-center gap-4">
              <button
                onClick={() => setSavedDrawerOpen(true)}
                className="hover:text-green-500 transition"
              >
                <FaRegBookmark />
              </button>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FaRegUser />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-999">
                    <DropdownMenuLabel>Quick Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Akun saya</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>

      <SavedItemsDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
      />
    </nav>
  );
}
