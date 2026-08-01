"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight, Layers, Home } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
              <div className="h-8 w-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-sm">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span>
                BookMyDine<span className="font-light text-slate-500">QR</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav (Includes Home Button) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <Home className="h-4 w-4 text-emerald-600" />
              <span>Home</span>
            </Link>
            <Link href="/#features" className="hover:text-emerald-700 transition-colors">
              Features
            </Link>
            <Link href="/#themes" className="hover:text-emerald-700 transition-colors">
              Themes
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-700 transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="hover:text-emerald-700 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/onboard"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all"
            >
              <span>Get My QR Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-stone-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-white px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-base font-bold text-slate-900 hover:bg-stone-100"
          >
            <Home className="h-4 w-4 text-emerald-600" />
            <span>Home</span>
          </Link>
          <Link
            href="/#features"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-stone-100"
          >
            Features
          </Link>
          <Link
            href="/#themes"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-stone-100"
          >
            Themes
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-stone-100"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-stone-100"
          >
            Pricing
          </Link>

          <div className="pt-2">
            <Link
              href="/onboard"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-3 text-base font-bold text-white shadow-sm hover:bg-emerald-800"
            >
              <span>Get My QR Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
