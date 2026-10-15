import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, Sparkles, Phone, MapPin, Search } from "lucide-react";

export const metadata = {
  title: "404: Page Not Found — BookMyDine QR",
  description: "The page or restaurant menu you are looking for does not exist or may have been moved. Explore our live QR menus and city guides.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-8 bg-white border border-stone-200/90 p-8 sm:p-12 rounded-3xl shadow-xl">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
            <span>Error 404 · Page Not Found</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Lost Your Way to the Menu?
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We couldn&apos;t locate the page or digital menu URL you requested. It might have been updated or moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/onboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 px-6 py-3.5 text-sm font-bold text-slate-800 hover:text-emerald-900 transition-all"
            >
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Get Free QR Menu</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-stone-100 space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-center sm:text-left">
              Popular Pages to Explore:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <Link href="/mumbai" className="p-2.5 rounded-lg bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>QR Menu Mumbai</span>
              </Link>
              <Link href="/delhi" className="p-2.5 rounded-lg bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>QR Menu Delhi</span>
              </Link>
              <Link href="/bangalore" className="p-2.5 rounded-lg bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>QR Menu Bangalore</span>
              </Link>
              <Link href="/menu/cafe-cozy" className="p-2.5 rounded-lg bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors">
                <Search className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Cafe Menu Demo</span>
              </Link>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500">
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
