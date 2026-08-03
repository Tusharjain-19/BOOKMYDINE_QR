"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { homepageFaqs } from "@/components/JsonLd";
import { 
  QrCode, 
  Check, 
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  Clock,
  Smartphone,
  Tablet,
  Zap,
  RefreshCw,
  Printer,
  Sparkles,
  ChevronUp,
  Upload,
  Utensils,
  Globe,
  TrendingUp,
  IndianRupee,
  Coffee,
  UtensilsCrossed,
  Building2,
  Truck,
  IceCreamCone,
  Wine,
  Store
} from "lucide-react";

export default function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState("minimal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet">("tablet");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [iframeScrollPercent, setIframeScrollPercent] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIframeMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "scrollPercent") {
        setIframeScrollPercent(e.data.percent);
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollIframe = (direction: "up" | "down") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "scroll", direction }, "*");
    }
  };

  const themesList = [
    { 
      id: "minimal", 
      name: "Minimalist Cafe", 
      description: "Clean typography & warm neutral tones designed for artisanal coffee shops and cozy bakeries.",
      badge: "Cafe & Bakery",
      colors: ["#FCFBF9", "#170F0B", "#CA7857"]
    },
    { 
      id: "luxury", 
      name: "Executive Fine Dining", 
      description: "Deep obsidian theme with refined metallic gold accents for upscale fine dining establishments.",
      badge: "Fine Dining",
      colors: ["#131313", "#E5C276", "#D1C5B2"]
    },
    { 
      id: "traditional", 
      name: "Heritage Indian", 
      description: "Terracotta & warm amber aesthetic crafted for authentic Indian thali & tandoori restaurants.",
      badge: "Traditional",
      colors: ["#FFFBEB", "#5D181B", "#7C580A"]
    },
    { 
      id: "modern", 
      name: "Modern Bistro", 
      description: "Sleek crisp white layout with forest green highlights for contemporary bistros and grills.",
      badge: "Modern Bistro",
      colors: ["#FFFFFF", "#1A1A1A", "#4B6549"]
    },
    { 
      id: "street", 
      name: "Street Food Express", 
      description: "Vibrant energetic design with bold red accents engineered for fast food outlets & food trucks.",
      badge: "Street & QSR",
      colors: ["#FEFCE8", "#AC2C23", "#FFCE5E"]
    },
    { 
      id: "dark", 
      name: "Premium Dark Lounge", 
      description: "Futuristic dark mode with ambient WebGL shader motion for night bars, lounges & pubs.",
      badge: "Bar & Lounge",
      colors: ["#18181B", "#FFC574", "#46D9E8"]
    }
  ];

  const faqs = homepageFaqs;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Done-For-You Digital Menu</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                One Scan.<br />
                Their <span className="relative inline-block text-emerald-800">
                  Perfect Meal.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-600/70" viewBox="0 0 250 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M3 14C50 4 150 3 247 11C180 17 90 18 3 14Z" fill="currentColor"/>
                  </svg>
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Replace your paper menu with a beautiful <strong className="text-slate-900 font-bold">digital menu</strong>.<br />
                We design, host & manage everything for you.
              </p>

              {/* 3 Hero Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl mx-auto lg:mx-0 text-left">
                <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">No App Needed</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Just scan & view</p>
                  </div>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Always Updated</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Live menu in real time</p>
                  </div>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">100% Managed</h4>
                    <p className="text-[10px] text-slate-500 font-medium">We handle everything</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link
                  href="/onboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f623f] hover:bg-[#0c4e32] px-7 py-4 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all"
                >
                  <span>Get My Free Custom Setup</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/918005737183?text=Hi,%20I%20am%20interested%20in%20your%20product%20BookMyDine%20QR.%20Can%20we%20talk%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-7 py-4 text-sm font-bold text-emerald-900 transition-all shadow-xs group"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Honest Service Guarantee */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Managed Service: Free Custom Setup • Pay Only After Approval</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column (Seamlessly Merged with Background) */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute -top-4 right-0 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-md rounded-2xl px-4 py-2.5 flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-extrabold text-slate-900">Done-For-You Service</span>
                  <span className="block text-[10px] text-slate-500 font-medium">Free Custom Menu Setup Included</span>
                </div>
              </div>

              <div className="relative w-full max-w-lg overflow-hidden flex justify-center items-center">
                <Image
                  src="/hero_artistic_showcase.png"
                  alt="BookMyDine QR Digital Menu Platform — 6 Premium Restaurant Menu Themes with QR Code Table Stands for Cafes, Fine Dining and Cloud Kitchens in India"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded & Detailed Section: Why Restaurants Choose BookMyDineQR */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#f4f8f5] via-emerald-50/40 to-white border-b border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Key Owner Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Restaurants Choose BookMyDineQR
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We eliminate traditional paper menu headaches and handle all technical setup so your staff can focus purely on hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <Printer className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Save 100% on Printing Costs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Never pay thousands to reprint menus whenever prices change or dishes go out of stock. Update your menu online instantly without throwing away paper cards.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Beautiful Custom Designs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Choose from 6 professionally crafted themes matched to your brand identity — from cozy cafes and fine dining to traditional Indian thali and night lounges.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Zero-Hassle Menu Updates</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                No complex software to learn! Simply send a photo of your new menu or text us price changes on WhatsApp, and our operations team updates your live menu.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Live in 24 to 48 Hours</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Fast turn-around guarantee. Submit your menu items today, receive a live preview link to test on your own phone, and launch your QR code table stands within 2 days.
              </p>
            </div>

            {/* Advantage 5 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Elevate Guest Experience</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Provide guests with touchless, instant-loading digital menus with crisp dish photos, allergen tags, veg/non-veg indicators, and category filtering.
              </p>
            </div>

            {/* Advantage 6 */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Printable QR Stand Graphics</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Receive high-resolution, print-ready table tent and standee designs customized with your logo, table numbers, and scannable QR codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Why Restaurant Owners Choose Us</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Powerful Features, Zero Complexity</h2>
            <p className="text-slate-600 text-sm">Everything you need to deliver an effortless digital menu experience to your guests.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <Zap className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant Load & Lightning Fast</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                No app download or registration required. Pages load in under 1 second on any mobile connection.
              </p>
            </div>

            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <RefreshCw className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Done-For-You Updates</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Changed prices or added seasonal dishes? Simply WhatsApp us and our team handles all menu updates for you.
              </p>
            </div>

            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <Printer className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Custom Printable QR Stands</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Receive high-resolution table tent and banner QR graphics customized with your brand logo and table numbers.
              </p>
            </div>

            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <Smartphone className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Mobile Optimized</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Responsive layout with smooth category filtering, search bar, and veg/non-veg indicator tags.
              </p>
            </div>

            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <Sparkles className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">6 Curated Design Themes</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                From Minimalist Cafe to Luxury Fine Dining & Street Food Express, pick a template matched to your vibe.
              </p>
            </div>

            <div className="bg-[#fafaf8] p-6 rounded-2xl border border-stone-200/80 space-y-3 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Lock-in & Free Setup</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pay only after your menu is live and approved. No credit card required, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Enhanced Animated 3 Steps) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-[#fafaf8] to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How It Works in 3 Easy Steps</h2>
            <p className="text-slate-600 text-sm sm:text-base">We handle 100% of the technical setup so you can focus on serving great food.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group relative">
              <div className="flex justify-between items-center">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <Upload className="h-6 w-6 text-emerald-600 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">1. Send Your Menu</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Upload your existing paper menu PDF or snap photos of your menu items and send them over WhatsApp.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group relative">
              <div className="flex justify-between items-center">
                <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <Sparkles className="h-6 w-6 text-blue-600 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">2. We Design & Format</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our design team formats your items into a mobile layout matched to your restaurant brand colors & theme.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 group relative">
              <div className="flex justify-between items-center">
                <div className="h-12 w-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <QrCode className="h-6 w-6 text-amber-600 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">3. Scan & Dine</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Receive ready-to-print custom QR stand graphics for your tables. Guests scan with camera & view instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Themes Gallery */}
      <section id="themes" className="py-16 sm:py-20 bg-white border-y border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Clean Aesthetic Options</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Choose a Theme for Your Restaurant</h2>
            <p className="text-slate-600 text-sm">Every template is designed for maximum legibility and smartphone speed.</p>
          </div>

          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Detailed Theme Selection Cards (Desktop & Mobile List) */}
            <div className="lg:col-span-5 space-y-3 w-full">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 lg:hidden">All 6 Available Themes</h3>
              {themesList.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 group relative ${
                    selectedTheme === t.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl ring-4 ring-slate-900/10"
                      : "bg-white text-slate-800 border-stone-200/90 hover:border-emerald-500/60 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                          selectedTheme === t.id ? "bg-emerald-500 text-slate-950 font-black" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}>
                          {t.badge}
                        </span>
                      </div>
                      <h4 className={`font-black text-sm sm:text-base ${selectedTheme === t.id ? "text-white" : "text-slate-900"}`}>{t.name}</h4>
                    </div>

                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                      selectedTheme === t.id
                        ? "bg-emerald-500 border-emerald-500 text-slate-950"
                        : "border-slate-300 bg-stone-50 group-hover:border-emerald-500"
                    }`}>
                      {selectedTheme === t.id ? (
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-transparent group-hover:bg-emerald-500/50"></div>
                      )}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${selectedTheme === t.id ? "text-slate-300" : "text-slate-600"}`}>
                    {t.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100/10">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${selectedTheme === t.id ? "text-slate-400" : "text-slate-400"}`}>Palette:</span>
                    <div className="flex items-center gap-1.5">
                      {t.colors.map((hex, cIdx) => (
                        <span 
                          key={cIdx} 
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Display Mockup Frame (With Quick Mobile Selector Bar) */}
            <div ref={previewRef} className="lg:col-span-7 flex flex-col items-center gap-4 p-4 sm:p-6 bg-[#fafaf8] border border-stone-200/80 rounded-3xl w-full lg:sticky lg:top-24">
              
              {/* Quick Horizontal Mobile Theme Picker Bar */}
              <div className="w-full lg:hidden space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block text-center">Tap Theme to Preview Live</span>
                <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar scroll-smooth">
                  {themesList.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTheme(t.id)}
                      className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 border ${
                        selectedTheme === t.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-white text-slate-700 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.colors[1] }}></span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Switcher Controls */}
              <div className="flex gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    previewDevice === "mobile"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    previewDevice === "tablet"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Tablet className="h-4 w-4" />
                  <span>Tablet View</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollIframe("up")}
                    className="p-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-95 shadow-sm text-slate-700 transition-all flex items-center justify-center"
                    title="Scroll Up"
                  >
                    <ChevronUp className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollIframe("down")}
                    className="p-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-95 shadow-sm text-slate-700 transition-all flex items-center justify-center"
                    title="Scroll Down"
                  >
                    <ChevronDown className="h-5 w-5 text-slate-700" />
                  </button>
                </div>

                <div 
                  className={`relative transition-all duration-500 bg-white flex flex-col shadow-2xl border-slate-900 overflow-hidden shrink-0 ${
                    previewDevice === "mobile"
                      ? "w-full max-w-[320px] aspect-[9/18.5] rounded-[40px] border-[10px]"
                      : "w-full max-w-[680px] min-h-[440px] sm:min-h-[540px] aspect-[4/3] rounded-[24px] border-[12px]"
                  }`}
                >
                  {previewDevice === "mobile" && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                      <div className="w-10 h-1 bg-zinc-800 rounded-full mb-1"></div>
                    </div>
                  )}
                  
                  <iframe 
                    ref={iframeRef}
                    src={`/menu/${
                      selectedTheme === "minimal" ? "cafe-cozy" :
                      selectedTheme === "luxury" ? "l-orangerie" :
                      selectedTheme === "traditional" ? "tandoori-palace" :
                      selectedTheme === "modern" ? "komorebi-bistro" :
                      selectedTheme === "street" ? "street-express" :
                      "neon-taproom"
                    }`}
                    className={`w-full h-full border-none ${previewDevice === "mobile" ? "pt-6" : "pt-0"}`}
                    title="Live Digital Menu Preview"
                  />
                </div>

                <div className="h-3 sm:h-48 w-48 sm:w-1.5 bg-stone-200 rounded-full relative overflow-hidden shrink-0" title="Scroll Position">
                  <div 
                    className="h-full sm:w-full bg-emerald-700 absolute left-0 top-0 transition-transform duration-75 rounded-full"
                    style={{ 
                      width: previewDevice === "mobile" ? `${iframeScrollPercent}%` : "100%",
                      height: previewDevice === "mobile" ? "100%" : "32px",
                      transform: previewDevice === "mobile" ? "none" : `translateY(${(iframeScrollPercent / 100) * 160}px)`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Monthly vs Yearly Billing Toggle */}
      <section id="pricing" className="py-16 sm:py-24 bg-[#fafaf8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Honest Pricing</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Simple, Transparent Plans</h2>
            <p className="text-slate-600 text-sm sm:text-base">No setup fees. No hidden charges. Free custom design setup included.</p>
          </div>

          {/* Billing Cycle Toggle Switch & Notification */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-stone-200/70 p-1.5 rounded-2xl border border-stone-300/80 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  billingCycle === "yearly"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-amber-300 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  2 Months FREE
                </span>
              </button>
            </div>

            {/* Dynamic Notification Banner when Yearly Selected */}
            {billingCycle === "yearly" && (
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-950 bg-emerald-100 border border-emerald-300/90 px-4 py-2 rounded-full shadow-xs animate-fadeIn">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>🎉 Annual Offer Unlocked: Pay for 10 Months & Get 12 Months Access (2 Months FREE)!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Link
              href={`/onboard?plan=starter&cycle=${billingCycle}`}
              className="bg-white border border-stone-200 hover:border-emerald-500 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter</span>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {billingCycle === "monthly" ? "₹99" : "₹990"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {billingCycle === "monthly" ? "/month" : "/year"}
                    </span>
                  </div>
                  {billingCycle === "yearly" ? (
                    <p className="text-[11px] font-bold text-emerald-700">
                      Equivalent to ~₹82/month • <span className="underline">Save ₹198/year</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400">Billed monthly • Cancel anytime</p>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">Perfect for small cafes, juice centers, and food stalls.</p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-stone-100">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Digital menu hosting</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Printable custom QR code</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 1 Menu update per month</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-stone-100 hover:bg-emerald-600 hover:text-white font-bold text-xs text-slate-800 transition-colors">
                  Choose Starter ({billingCycle === "yearly" ? "2 Months Free" : "Monthly"})
                </span>
              </div>
            </Link>

            {/* Growth Plan */}
            <Link
              href={`/onboard?plan=growth&cycle=${billingCycle}`}
              className="bg-white border-2 border-emerald-600 p-8 rounded-3xl flex flex-col justify-between shadow-md relative text-left"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                Most Popular
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Growth</span>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {billingCycle === "monthly" ? "₹199" : "₹1,990"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {billingCycle === "monthly" ? "/month" : "/year"}
                    </span>
                  </div>
                  {billingCycle === "yearly" ? (
                    <p className="text-[11px] font-bold text-emerald-700">
                      Equivalent to ~₹165/month • <span className="underline">Save ₹398/year</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400">Billed monthly • Cancel anytime</p>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">For active restaurants and busy diners.</p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-stone-100">
                  <li className="flex items-center gap-2 font-bold text-slate-900"><Check className="h-4 w-4 text-emerald-600" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Up to 5 updates per month</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Dish photos & veg/non-veg tags</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Priority WhatsApp support</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-sm transition-colors">
                  Choose Growth ({billingCycle === "yearly" ? "2 Months Free" : "Monthly"})
                </span>
              </div>
            </Link>

            {/* Premium Plan */}
            <Link
              href={`/onboard?plan=premium&cycle=${billingCycle}`}
              className="bg-white border-2 border-slate-900 p-8 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-lg transition-all text-left relative"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 text-amber-300 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-400" /> VIP All-Inclusive
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Premium</span>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {billingCycle === "monthly" ? "₹499" : "₹4,990"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {billingCycle === "monthly" ? "/month" : "/year"}
                    </span>
                  </div>
                  {billingCycle === "yearly" ? (
                    <p className="text-[11px] font-bold text-emerald-700">
                      Equivalent to ~₹415/month • <span className="underline">Save ₹998/year</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400">Billed monthly • Cancel anytime</p>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">For fine dining brands needing bespoke layouts.</p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-stone-100">
                  <li className="flex items-center gap-2 font-bold text-slate-900"><Check className="h-4 w-4 text-emerald-600" /> Everything in Growth</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Unlimited menu updates</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 100% custom theme design</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Dedicated account manager</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white shadow-sm transition-colors">
                  Choose Premium ({billingCycle === "yearly" ? "2 Months Free" : "Monthly"})
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SEO CONTENT SECTIONS ========== */}

      {/* What is BookMyDine QR? — GEO Optimized */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              <Globe className="h-3.5 w-3.5 text-emerald-600" /> About Our Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What is BookMyDine QR?</h2>
          </div>

          <div className="bg-[#fafaf8] p-6 sm:p-8 rounded-3xl border border-stone-200/80 space-y-4">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900">BookMyDine QR</strong> is a done-for-you digital menu platform built specifically for the Indian restaurant industry. Unlike self-serve tools that require you to learn complex dashboards, BookMyDine QR operates as a fully managed service — you send us your menu via WhatsApp, and our design team creates a beautiful, mobile-optimized QR code menu within 24 to 48 hours.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The platform is designed for restaurants, cafes, hotels, resorts, bars, pubs, cloud kitchens, bakeries, sweet shops, food courts, juice bars, ice cream parlours, fine dining establishments, fast food outlets, and food trucks. Each digital menu is hosted on our high-speed CDN, loads in under 1 second, and requires zero app downloads for your guests — they simply scan a QR code with their phone camera and view your menu instantly.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              BookMyDine QR includes 6 professionally designed themes, printable QR table stand graphics, veg and non-veg indicator badges, bestseller tags, search and category filtering, and WhatsApp-based menu update support. Plans start at ₹99 per month with free custom setup and no lock-in contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Use BookMyDine QR? — Industry Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#f4f8f5] via-emerald-50/40 to-white border-b border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              <Utensils className="h-3.5 w-3.5 text-emerald-600" /> Industries We Serve
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Who Should Use BookMyDine QR?</h2>
            <p className="text-slate-600 text-sm">Our platform serves every type of food establishment in India</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Restaurants", desc: "Family, casual, and multi-cuisine dining", icon: UtensilsCrossed },
              { name: "Cafes & Bakeries", desc: "Coffee shops, patisseries, and tea lounges", icon: Coffee },
              { name: "Hotels & Resorts", desc: "In-room dining, poolside, and lobby menus", icon: Building2 },
              { name: "Bars & Pubs", desc: "Cocktail menus, drinks lists, and night lounges", icon: Wine },
              { name: "Cloud Kitchens", desc: "Virtual restaurants and delivery-only brands", icon: Store },
              { name: "Fine Dining", desc: "Upscale tasting menus and wine pairings", icon: Sparkles },
              { name: "Fast Food & QSR", desc: "Quick service, burgers, pizza, and wraps", icon: Zap },
              { name: "Food Trucks", desc: "Mobile vendors, pop-ups, and street food", icon: Truck },
              { name: "Sweet Shops", desc: "Mithai, desserts, and bakery outlets", icon: IceCreamCone },
              { name: "Food Courts", desc: "Multi-vendor spaces and mall food zones", icon: Utensils },
            ].map((industry) => (
              <div key={industry.name} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 text-center hover:border-emerald-500 transition-all hover:shadow-md hover:-translate-y-1 space-y-2">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mx-auto">
                  <industry.icon className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">{industry.name}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BookMyDine QR Over Competitors? — Comparison */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Why We&apos;re Different</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How BookMyDine QR Compares to Other Options</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 space-y-4">
              <h3 className="text-base font-extrabold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                BookMyDine QR (Managed Service)
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Done-for-you: we handle all design, hosting, and updates</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>No dashboard to learn, no technical skills needed</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>WhatsApp-based support and menu updates</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>6 professionally designed themes to match your brand</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Free custom setup — pay only after you approve</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Starting at just ₹99/month — built for India</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Printable QR stand graphics with your branding</span></li>
              </ul>
            </div>

            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-500 flex items-center gap-2">
                Traditional Alternatives
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>Paper menus: expensive reprinting, outdated info, unhygienic</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>DIY QR tools: complex dashboards, you do all the work</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>PDF menus: slow to load, not mobile-optimized, no interactivity</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>Aggregator listings: limited menu control, competitor ads</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>International tools: expensive, not localized for India</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>No veg/non-veg badges, no Indian pricing support</span></li>
                <li className="flex items-start gap-2"><span className="h-4 w-4 text-red-400 mt-0.5 shrink-0">✗</span> <span>Hidden fees, annual contracts, no WhatsApp support</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Deep-Dive with Real Numbers */}
      <section className="py-16 sm:py-20 bg-[#fafaf8] border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> Real Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How BookMyDine QR Helps Your Restaurant</h2>
            <p className="text-slate-600 text-sm">Measurable benefits that directly impact your bottom line and guest experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center space-y-2 hover:shadow-md transition-all">
              <div className="text-3xl font-black text-emerald-700">100%</div>
              <h3 className="text-sm font-bold text-slate-900">Printing Cost Saved</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Never spend on reprinting paper menus again. Update prices and dishes instantly without waste.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center space-y-2 hover:shadow-md transition-all">
              <div className="text-3xl font-black text-emerald-700">&lt;1s</div>
              <h3 className="text-sm font-bold text-slate-900">Page Load Time</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Menus load in under 1 second on any mobile connection. No app download or registration needed.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center space-y-2 hover:shadow-md transition-all">
              <div className="text-3xl font-black text-emerald-700">24hr</div>
              <h3 className="text-sm font-bold text-slate-900">Setup Time</h3>
              <p className="text-xs text-slate-500 leading-relaxed">From menu submission to live digital menu and QR code — all done within 24-48 hours.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center space-y-2 hover:shadow-md transition-all">
              <div className="text-3xl font-black text-emerald-700">99.9%</div>
              <h3 className="text-sm font-bold text-slate-900">Uptime Guarantee</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Your digital menu is always available. Hosted on enterprise-grade CDN infrastructure across India.</p>
            </div>
          </div>

          {/* Pricing Highlight for SEO */}
          <div className="mt-10 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <IndianRupee className="h-6 w-6 text-emerald-700" />
              <h3 className="text-lg font-extrabold text-slate-900">Affordable Pricing for Every Restaurant</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              BookMyDine QR plans start at just <strong className="text-slate-900">₹99 per month</strong> for the Starter plan (digital menu + QR code), <strong className="text-slate-900">₹199 per month</strong> for the Growth plan (dish photos, tags, 5 updates), and <strong className="text-slate-900">₹499 per month</strong> for Premium (unlimited updates, custom theme, dedicated manager). Annual billing saves you 2 months free. Every plan includes free custom setup with no credit card required upfront.
            </p>
          </div>
        </div>
      </section>

      {/* Cities We Serve — Internal Linking */}
      <section className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Available Across India</h2>
            <p className="text-slate-600 text-sm">BookMyDine QR serves restaurants in major cities and beyond</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Mumbai", slug: "mumbai" },
              { name: "Delhi", slug: "delhi" },
              { name: "Bangalore", slug: "bangalore" },
              { name: "Jaipur", slug: "jaipur" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Pune", slug: "pune" },
              { name: "Chennai", slug: "chennai" },
              { name: "Kolkata", slug: "kolkata" },
              { name: "Ahmedabad", slug: "ahmedabad" },
              { name: "Lucknow", slug: "lucknow" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 px-4 py-2 rounded-full text-xs font-bold text-emerald-900 transition-all"
              >
                <span>QR Menu in {c.name}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion — Expanded 25 FAQs */}
      <section id="faq" className="py-16 sm:py-20 bg-[#fafaf8] border-t border-stone-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Questions Answered</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions About QR Menus</h2>
            <p className="text-slate-600 text-sm">Everything restaurant owners need to know about digital QR code menus</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200/80 rounded-xl overflow-hidden text-left bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? "rotate-180 text-emerald-700" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-stone-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
