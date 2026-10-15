"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  Home, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Sparkles,
  Palette
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open to prevent awkward background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo (Clickable Home Link) */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 group"
              aria-label="BookMyDine QR Homepage"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-emerald-800 transition-colors">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span>
                BookMyDine<span className="font-light text-slate-500">QR</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <Home className="h-4 w-4 text-emerald-600" />
              <span>Home</span>
            </Link>
            <Link href="/#features" className="hover:text-emerald-700 transition-colors">
              Features
            </Link>
            <Link href="/#themes" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
              <Palette className="h-3.5 w-3.5 text-emerald-600" />
              <span>Themes</span>
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-700 transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="hover:text-emerald-700 transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="hover:text-emerald-700 transition-colors">
              FAQs
            </Link>
          </nav>

          {/* CTA & Contact (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+918005737183"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
              title="Call BookMyDine Support"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              <span>+91 8005737183</span>
            </a>
            <Link
              href="/onboard"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:shadow transition-all"
            >
              <span>Get Free Setup</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-Down Menu */}
      {isOpen && (
        <div className="relative z-50 md:hidden border-t border-stone-200/80 bg-white px-5 py-6 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-base font-bold text-slate-900 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              <Home className="h-4 w-4 text-emerald-600" />
              <span>Home</span>
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              Features & Benefits
            </Link>
            <Link
              href="/#themes"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              <Palette className="h-4 w-4 text-emerald-600" />
              <span>6 Theme Demos</span>
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              How It Works (Done-For-You)
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              Pricing (Starts ₹99/mo)
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              Frequently Asked Questions
            </Link>
          </div>

          {/* Quick City Navigation */}
          <div className="pt-2 border-t border-stone-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block px-3.5 mb-2">
              Popular Cities
            </span>
            <div className="flex flex-wrap gap-1.5 px-3">
              {[
                { name: "Mumbai", slug: "mumbai" },
                { name: "Delhi", slug: "delhi" },
                { name: "Bangalore", slug: "bangalore" },
                { name: "Hyderabad", slug: "hyderabad" },
                { name: "Pune", slug: "pune" },
                { name: "Jaipur", slug: "jaipur" },
              ].map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg text-slate-700 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-2 border-t border-stone-200 space-y-2">
            <Link
              href="/onboard"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get Free QR Menu Setup</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Clickable Mobile Contact Actions */}
          <div className="pt-2 border-t border-stone-200 space-y-2 text-xs">
            <a
              href="tel:+918005737183"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-slate-700 font-bold transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Call: +91 8005737183</span>
            </a>
            <a
              href="https://wa.me/918005737183?text=Hi,%20I%20am%20interested%20in%20BookMyDine%20QR%20for%20my%20restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="mailto:teambookmydine@gmail.com"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-slate-700 font-bold transition-colors"
            >
              <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>teambookmydine@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
