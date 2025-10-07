import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Overlay from "@/components/Overlay/Overlay";
import { LoadingProvider } from "@/contexts/LoadingContext";
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
      <body className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
        <LoadingProvider>
          <Overlay />
          <NavBar />
          <main className="flex-1">{children}</main>
        </LoadingProvider>
      </body>
    </html>
  );
}
