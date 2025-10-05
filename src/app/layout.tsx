import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "../index.css";

export const metadata: Metadata = {
  title: "TaniJual",
  description: "Aplikasi Jual Beli Pertanian Holtikultura",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <NavBar />
        <main className="mt-4 sm:container mx-auto px-4 sm:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
