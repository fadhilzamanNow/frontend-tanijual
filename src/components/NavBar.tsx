"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { FaMagnifyingGlass, FaRegUser } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TbFilter } from "react-icons/tb";
import { Search, Funnel, User, UserRound, Check, Bookmark } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SavedProductsList from "./Settings/SavedProductsList";

type Category = {
  id: string;
  name: string;
};
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
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<AuthRole>("guest");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const isSmallScreen = useMediaQuery("(min-width: 640px)");

  // Check if we're on an auth page (login or register)
  const isAuthPage =
    pathname?.includes("/login") || pathname?.includes("/register");

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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const menu: MenuItem[] = useMemo(() => {
    if (role === "user") {
      return [
        { href: "/", label: "Home" },
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

    // Reload if already on home, otherwise navigate
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
    }
    router.push(`/search?${params.toString()}`);
  }

  function handleSearchClick() {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
    }
    router.push(`/search?${params.toString()}`);
  }

  function handleCategoryChange(value: string) {
    setSelectedCategory(value);

    // Only navigate if there's a search query or a category selected
    // When "Semua Kategori" is selected (value=""), still navigate if there's a search query
    if (!searchQuery.trim() && !value) {
      // If no search and no category, just update state without navigating
      return;
    }

    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (value) {
      params.set("categoryId", value);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <nav className="sticky z-99 top-0 border-b border-slate-200 bg-white backdrop-blur">
      <div
        className={`mx-auto flex w-full container items-center gap-4 px-4 py-4 sm:px-0 ${isAuthPage ? "justify-center xs:justify-start" : "justify-between"}`}
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-green-500"
        >
          TaniJual
        </Link>

        {/* Only show search and other UI elements if NOT on auth pages */}
        {!isAuthPage && (
          <>
            <form onSubmit={handleSearch} className="relative flex-1">
              <InputGroup>
                <InputGroupInput
                  placeholder={isSmallScreen ? "Cari Barang...." : ""}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputGroupAddon align="inline-end" className="text-xs">
                  <Search onClick={handleSearchClick} size={15} />
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {!selectedCategory ? (
                        // FILTER OFF
                        <Funnel size={15} />
                      ) : (
                        // FILTER ON
                        <div className="relative">
                          <Funnel size={15} className="text-green-500" />
                          <Check
                            size={6}
                            className="absolute bottom-0 -right-0.5 bg-green-500 text-white rounded-full"
                          />
                        </div>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-999 w-56">
                      <DropdownMenuLabel>Kategori Produk</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={selectedCategory}
                        onValueChange={handleCategoryChange}
                      >
                        <DropdownMenuRadioItem value="">
                          Semua Kategori
                        </DropdownMenuRadioItem>
                        {categories.map((category) => (
                          <DropdownMenuRadioItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>
              {/*<Input
                placeholder={isSmallScreen ? "Cari Barang...." : ""}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearchClick}
                className="absolute top-1/2 -translate-y-1/2 right-2 text-stone-400 hover:text-green-500 transition-colors cursor-pointer"
              >
                <FaMagnifyingGlass />
              </button>*/}
            </form>
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
                  <Link href="/users/login">
                    <Button className="bg-green-500 hover:bg-green-500/80">
                      Masuk
                    </Button>
                  </Link>
                </div>
              )}
              {role !== "guest" && (
                <div className="flex text-xl justify-center items-center gap-4">
                  <Sheet>
                    <SheetTrigger>
                      <Bookmark strokeWidth={1.25} size={15} />
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Produk Tersimpan</SheetTitle>
                        <SheetDescription>
                          Produk tersimpan favoritmu
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-2 px-4">
                        <SavedProductsList />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <UserRound size={16} />
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
          </>
        )}
      </div>
    </nav>
  );
}
