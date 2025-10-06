"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { Spinner } from "../ui/spinner";

export default function Overlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <Spinner className="size-12 text-green-500" />
        <p className="text-sm font-medium text-slate-700">Memuat...</p>
      </div>
    </div>
  );
}
