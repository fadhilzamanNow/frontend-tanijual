"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Map paths to readable names
const pathNameMap: Record<string, string> = {
  "": "Home",
  products: "Produk",
  sellers: "Penjual",
  users: "Pengguna",
  settings: "Pengaturan",
  "my-carts": "Keranjang Saya",
  login: "Masuk",
  register: "Daftar",
  dashboard: "Dashboard",
  profile: "Profil",
};

export default function CustomBreadcrumb() {
  const pathname = usePathname();

  // Split pathname into segments and filter out route groups (e.g., "(public)", "(auth)")
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("(") || !segment.endsWith(")"));

  // If we're on homepage, don't show breadcrumb
  if (segments.length === 0) {
    return null;
  }

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    // Check if segment is a UUID (product/user ID)
    const isId =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        segment,
      );

    // Get readable name
    let name = pathNameMap[segment] || segment;
    if (isId) {
      name = "Detail";
    }

    return {
      path,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      isLast,
    };
  });

  return (
    <div className="mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="font-semibold">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.map((item, index) => (
            <div key={item.path} className="flex items-center font-semibold">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className={item.isLast ? "text-green-600" : ""}>
                  {item.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
