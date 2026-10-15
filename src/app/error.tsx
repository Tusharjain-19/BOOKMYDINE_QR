"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, RotateCcw, Home, Phone } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-6 bg-white border border-rose-200 p-8 sm:p-12 rounded-3xl shadow-xl">
          <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Something went wrong
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              An unexpected error occurred while loading this page. Our technical team has been notified.
            </p>
          </div>

          {error?.message && (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs text-stone-600 font-mono break-words max-h-32 overflow-y-auto">
              {error.message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 hover:bg-stone-200 px-6 py-3.5 text-sm font-bold text-slate-700 transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-stone-100 text-xs text-slate-500">
            Need urgent assistance?{" "}
            <a href="tel:+918005737183" className="font-bold text-emerald-700 hover:underline">
              Call Support: +91 8005737183
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
