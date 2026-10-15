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
  Store,
  ExternalLink,
  Phone,
  Scissors,
  HeartPulse,
  Car,
  Dumbbell,
  ShoppingBag,
  Hotel,
  X
} from "lucide-react";

export default function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState("minimal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet">("tablet");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [iframeScrollPercent, setIframeScrollPercent] = useState(0);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = desktopIframeRef;
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIframeMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "scrollPercent" && typeof e.data.percent === "number") {
        setIframeScrollPercent((prev) => {
          if (Math.abs(prev - e.data.percent) < 1.5) return prev;
          return e.data.percent;
        });
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const scrollIframe = (direction: "up" | "down") => {
    const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 1024;
    const targetWin = isMobileScreen
      ? (mobileIframeRef.current?.contentWindow || desktopIframeRef.current?.contentWindow)
      : (desktopIframeRef.current?.contentWindow || mobileIframeRef.current?.contentWindow);
    if (targetWin) {
      targetWin.postMessage({ type: "scroll", direction }, "*");
    }
  };

  const themesList = [
    { 
      id: "minimal", 
      slug: "cafe-cozy",
      name: "Minimalist Cafe", 
      description: "Clean typography & warm neutral tones designed for artisanal coffee shops and cozy bakeries.",
      badge: "Cafe & Bakery",
      colors: ["#FCFBF9", "#170F0B", "#CA7857"]
    },
    { 
      id: "luxury", 
      slug: "l-orangerie",
      name: "Executive Fine Dining", 
      description: "Deep obsidian theme with refined metallic gold accents for upscale fine dining establishments.",
      badge: "Fine Dining",
      colors: ["#131313", "#E5C276", "#D1C5B2"]
    },
    { 
      id: "traditional", 
      slug: "tandoori-palace",
      name: "Heritage Indian", 
      description: "Terracotta & warm amber aesthetic crafted for authentic Indian thali & tandoori restaurants.",
      badge: "Traditional",
      colors: ["#FFFBEB", "#5D181B", "#7C580A"]
    },
    { 
      id: "modern", 
      slug: "komorebi-bistro",
      name: "Modern Bistro", 
      description: "Sleek crisp white layout with forest green highlights for contemporary bistros and grills.",
      badge: "Modern Bistro",
      colors: ["#FFFFFF", "#1A1A1A", "#4B6549"]
    },
    { 
      id: "street", 
      slug: "street-express",
      name: "Street Food Express", 
      description: "Vibrant energetic design with bold red accents engineered for fast food outlets & food trucks.",
      badge: "Street & QSR",
      colors: ["#FEFCE8", "#AC2C23", "#FFCE5E"]
    },
    { 
      id: "dark", 
      slug: "neon-taproom",
      name: "Premium Dark Lounge", 
      description: "Futuristic dark mode with ambient WebGL shader motion for night bars, lounges & pubs.",
      badge: "Bar & Lounge",
      colors: ["#18181B", "#FFC574", "#46D9E8"]
    }
  ];

  const currentTheme = themesList.find((t) => t.id === selectedTheme) || themesList[0];
  const faqs = homepageFaqs;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white pb-16 md:pb-0">
      <Navbar />

      {/* Hero Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Hero Left Text & Mobile Visual */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Done-For-You Digital Menu</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                One Scan.<br />
                Their <span className="relative inline-block text-emerald-800">
                  Perfect Meal.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-600/70" viewBox="0 0 250 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M3 14C50 4 150 3 247 11C180 17 90 18 3 14Z" fill="currentColor"/>
                  </svg>
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Replace your paper menu with a beautiful <strong className="text-slate-900 font-bold">digital menu</strong>.<br />
                We design, host & manage everything for you.
              </p>

              {/* Mobile Hero Visual Showcase (Prominently Visible Above The Fold on Phones) */}
              <div className="lg:hidden my-3 relative max-w-sm mx-auto">
                <div className="relative rounded-3xl bg-linear-to-b from-stone-50 via-white to-emerald-50/40 p-2.5 sm:p-3 border border-stone-200/90 shadow-xl overflow-hidden">
                  {/* Top Left Floating Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-900">1s Instant Load</span>
                  </div>

                  {/* Top Right Floating Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-slate-900 text-white shadow-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span className="text-[10px] font-bold">Free Setup</span>
                  </div>

                  <Image
                    src="/hero_artistic_showcase.webp"
                    alt="BookMyDine QR Digital Menu Themes"
                    width={480}
                    height={480}
                    priority
                    className="w-full h-auto object-contain drop-shadow-md rounded-2xl"
                  />

                  <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-slate-600 font-bold px-1">
                    <span className="text-emerald-800 font-black">6 Curated Themes</span>
                    <span>•</span>
                    <span>Zero App Needed</span>
                    <span>•</span>
                    <span>Printable QR Stand</span>
                  </div>
                </div>
              </div>

              {/* 3 Differentiated Hero Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-2xl mx-auto lg:mx-0 text-left">
                {/* Card 1: Emerald (Guest Experience) */}
                <div className="bg-linear-to-br from-emerald-50/90 via-emerald-100/30 to-white border border-emerald-200/90 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-xs font-black text-slate-900 truncate">No App Needed</h4>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Diners</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Instant camera scan</p>
                  </div>
                </div>

                {/* Card 2: Amber (Live Updates) */}
                <div className="bg-linear-to-br from-amber-50/90 via-amber-100/30 to-white border border-amber-200/90 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-xs font-black text-slate-900 truncate">Always Updated</h4>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">Live</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Menu updates in mins</p>
                  </div>
                </div>

                {/* Card 3: Indigo (Fully Managed) */}
                <div className="bg-linear-to-br from-indigo-50/90 via-indigo-100/30 to-white border border-indigo-200/90 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-xs font-black text-slate-900 truncate">100% Managed</h4>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 shrink-0">VIP</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate">We design & format all</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link
                  href="/onboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f623f] hover:bg-[#0c4e32] px-7 py-3.5 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all"
                >
                  <span>Get My Free Custom Setup</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/918005737183?text=Hi,%20I%20am%20interested%20in%20your%20product%20BookMyDine%20QR.%20Can%20we%20talk%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-7 py-3.5 text-sm font-bold text-emerald-900 transition-all shadow-xs group"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Honest Service Guarantee */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Managed Service: Free Custom Setup • Pay Only After Approval</span>
                </div>
              </div>
            </div>

            {/* Desktop Hero Right Column */}
            <div className="hidden lg:flex lg:col-span-5 justify-center relative">
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
                  src="/hero_artistic_showcase.webp"
                  alt="BookMyDine QR Digital Menu Platform | 6 Premium Restaurant Menu Themes with QR Code Table Stands for Cafes, Fine Dining and Cloud Kitchens in India"
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
      <section className="py-16 sm:py-24 bg-linear-to-b from-[#f4f8f5] via-emerald-50/40 to-white border-b border-emerald-100">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Advantage 1: Emerald (ROI) */}
            <div className="bg-linear-to-br from-emerald-50/70 via-white to-white p-7 rounded-3xl border border-emerald-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Printer className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-200/80">
                  Cost Saver
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Save 100% on Printing Costs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Never pay thousands to reprint menus whenever prices change or dishes go out of stock. Update your menu online instantly without throwing away paper cards.
              </p>
            </div>

            {/* Advantage 2: Violet (Aesthetics) */}
            <div className="bg-linear-to-br from-purple-50/70 via-white to-white p-7 rounded-3xl border border-purple-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-100/90 px-2.5 py-0.5 rounded-md border border-purple-200/80">
                  6 Themes
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Beautiful Custom Designs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Choose from 6 professionally crafted themes matched to your brand identity: from cozy cafes and fine dining to traditional Indian thali and night lounges.
              </p>
            </div>

            {/* Advantage 3: Amber (Speed) */}
            <div className="bg-linear-to-br from-amber-50/70 via-white to-white p-7 rounded-3xl border border-amber-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                  WhatsApp Support
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Zero-Hassle Menu Updates</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                No complex software to learn! Simply send a photo of your new menu or text us price changes on WhatsApp, and our operations team updates your live menu.
              </p>
            </div>

            {/* Advantage 4: Teal (Turnaround) */}
            <div className="bg-linear-to-br from-teal-50/70 via-white to-white p-7 rounded-3xl border border-teal-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-900 bg-teal-100/90 px-2.5 py-0.5 rounded-md border border-teal-200/80">
                  24-48 Hours
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Live in 24 to 48 Hours</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Fast turn-around guarantee. Submit your menu items today, receive a live preview link to test on your own phone, and launch your QR code table stands within 2 days.
              </p>
            </div>

            {/* Advantage 5: Rose (Diners) */}
            <div className="bg-linear-to-br from-rose-50/70 via-white to-white p-7 rounded-3xl border border-rose-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Smartphone className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-100/90 px-2.5 py-0.5 rounded-md border border-rose-200/80">
                  Guest Delight
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Elevate Guest Experience</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Provide guests with touchless, instant-loading digital menus with crisp dish photos, allergen tags, veg/non-veg indicators, and category filtering.
              </p>
            </div>

            {/* Advantage 6: Blue (Hardware) */}
            <div className="bg-linear-to-br from-sky-50/70 via-white to-white p-7 rounded-3xl border border-sky-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-sky-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <QrCode className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-900 bg-sky-100/90 px-2.5 py-0.5 rounded-md border border-sky-200/80">
                  Print Ready
                </span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Amber (Speed) */}
            <div className="bg-linear-to-br from-amber-50/70 via-white to-white p-6 rounded-3xl border border-amber-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                  ~0.8s Load
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Instant Load & Lightning Fast</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                No app download or registration required. Pages load in under 1 second on any mobile connection.
              </p>
            </div>

            {/* Feature 2: Emerald (Managed Updates) */}
            <div className="bg-linear-to-br from-emerald-50/70 via-white to-white p-6 rounded-3xl border border-emerald-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-200/80">
                  WhatsApp Service
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Done-For-You Updates</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Changed prices or added seasonal dishes? Simply WhatsApp us and our team handles all menu updates for you.
              </p>
            </div>

            {/* Feature 3: Sky Blue (Print Graphic) */}
            <div className="bg-linear-to-br from-sky-50/70 via-white to-white p-6 rounded-3xl border border-sky-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-sky-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Printer className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-900 bg-sky-100/90 px-2.5 py-0.5 rounded-md border border-sky-200/80">
                  Print Vector PDF
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Custom Printable QR Stands</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Receive high-resolution table tent and banner QR graphics customized with your brand logo and table numbers.
              </p>
            </div>

            {/* Feature 4: Rose (Mobile UX) */}
            <div className="bg-linear-to-br from-rose-50/70 via-white to-white p-6 rounded-3xl border border-rose-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-100/90 px-2.5 py-0.5 rounded-md border border-rose-200/80">
                  iOS & Android
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">100% Mobile Optimized</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Responsive layout with smooth category filtering, search bar, and veg/non-veg indicator tags.
              </p>
            </div>

            {/* Feature 5: Purple (Themes) */}
            <div className="bg-linear-to-br from-purple-50/70 via-white to-white p-6 rounded-3xl border border-purple-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-100/90 px-2.5 py-0.5 rounded-md border border-purple-200/80">
                  Brand Aligned
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">6 Curated Design Themes</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                From Minimalist Cafe to Luxury Fine Dining & Street Food Express, pick a template matched to your vibe.
              </p>
            </div>

            {/* Feature 6: Teal (Risk-Free) */}
            <div className="bg-linear-to-br from-teal-50/70 via-white to-white p-6 rounded-3xl border border-teal-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3.5 group">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-teal-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-900 bg-teal-100/90 px-2.5 py-0.5 rounded-md border border-teal-200/80">
                  Pay On Approval
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Zero Lock-in & Free Setup</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Pay only after your menu is live and approved. No credit card required, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Enhanced Animated 3 Steps) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-linear-to-b from-[#fafaf8] to-white relative overflow-hidden">
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

          {/* ============================================================== */}
          {/* MOBILE VIEW (Exclusively for Mobile / Small Screens < lg)     */}
          {/* Real Interactive Phone Preview with 2-in-1-line Theme Switcher*/}
          {/* ============================================================== */}
          <div className="lg:hidden flex flex-col items-center gap-5">
            {/* Theme Switcher Nav Grid: 2 per line, 3 lines total. NO horizontal scroll! */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Tap Theme to Preview Live:
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentTheme.badge}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {themesList.map((t) => {
                  const isSelected = selectedTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTheme(t.id)}
                      className={`p-2.5 sm:p-3 rounded-2xl text-left border transition-all flex items-center justify-between gap-1.5 active:scale-[0.98] ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50"
                          : "bg-white text-slate-800 border-stone-200/90 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10 shadow-xs"
                          style={{ backgroundColor: t.colors[1] }}
                        />
                        <span className="text-xs font-black truncate">{t.name}</span>
                      </div>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real Interactive Phone Preview Frame */}
            <div className="w-full flex flex-col items-center gap-3.5 p-4 bg-[#fafaf8] border border-stone-200/80 rounded-3xl shadow-xs">
              {/* Toolbar: Scroll Up/Down & Fullscreen Link */}
              <div className="flex items-center justify-between w-full max-w-[320px]">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollIframe("up")}
                    className="p-2 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-95 shadow-2xs text-slate-700 flex items-center justify-center transition-all"
                    title="Scroll Up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollIframe("down")}
                    className="p-2 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-95 shadow-2xs text-slate-700 flex items-center justify-center transition-all"
                    title="Scroll Down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                    Live Phone Demo
                  </span>
                </div>

                <Link
                  href={`/menu/${currentTheme.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1.5 rounded-xl transition-all"
                >
                  <span>Open Full</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              {/* Phone Frame Mockup with Live Iframe */}
              <div className="relative w-full max-w-[320px] aspect-9/18.5 rounded-[40px] border-10 border-slate-900 bg-white shadow-2xl overflow-hidden shrink-0">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-1 bg-zinc-800 rounded-full mb-1" />
                </div>
                
                <iframe
                  ref={mobileIframeRef}
                  src={`/menu/${currentTheme.slug}`}
                  loading="lazy"
                  className="w-full h-full border-none pt-6"
                  title="Live Digital Menu Real Mobile Preview"
                />
              </div>

              {/* Action Button: Choose This Theme */}
              <div className="w-full max-w-[320px] pt-1">
                <Link
                  href={`/onboard?theme=${selectedTheme}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-98"
                >
                  <span>Select {currentTheme.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* Note: All other duplicate theme cards/lists are strictly omitted from mobile */}
          </div>

          {/* ============================================================== */}
          {/* DESKTOP STUDIO WORKBENCH (Exclusively for lg+ screens)         */}
          {/* ============================================================== */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 cols: Detailed Theme Selection Cards */}
            <div className="lg:col-span-5 space-y-3 w-full">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Select Theme to Preview</h3>
              {themesList.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 group relative cursor-pointer ${
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
                        <Check className="h-3.5 w-3.5 stroke-3" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-transparent group-hover:bg-emerald-500/50"></div>
                      )}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${selectedTheme === t.id ? "text-slate-300" : "text-slate-600"}`}>
                    {t.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100/10">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${selectedTheme === t.id ? "text-slate-400" : "text-slate-400"}`}>Palette:</span>
                      {t.colors.map((hex, cIdx) => (
                        <span 
                          key={cIdx} 
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>

                    <Link
                      href={`/menu/${t.slug}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                        selectedTheme === t.id
                          ? "text-emerald-300 hover:text-white bg-white/10 hover:bg-white/20"
                          : "text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      <span>Live Menu</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 7 cols: Sticky Display Mockup Workbench */}
            <div ref={previewRef} className="lg:col-span-7 flex flex-col items-center gap-4 p-4 sm:p-6 bg-[#fafaf8] border border-stone-200/80 rounded-3xl w-full lg:sticky lg:top-24">
              {/* View Switcher Controls (Desktop) */}
              <div className="flex flex-wrap items-center justify-center gap-2">
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

                <Link
                  href={`/menu/${currentTheme.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all shadow-2xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open {currentTheme.name} Demo</span>
                </Link>
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
                      ? "w-full max-w-[320px] aspect-9/18.5 rounded-[40px] border-10"
                      : "w-full max-w-170 min-h-110 sm:min-h-135 aspect-4/3 rounded-3xl border-12"
                  }`}
                >
                  {previewDevice === "mobile" && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                      <div className="w-10 h-1 bg-zinc-800 rounded-full mb-1"></div>
                    </div>
                  )}
                  
                  <iframe 
                    ref={desktopIframeRef}
                    src={`/menu/${currentTheme.slug}`}
                    loading="lazy"
                    className={`w-full h-full border-none ${previewDevice === "mobile" ? "pt-6" : "pt-0"}`}
                    title="Live Digital Menu Desktop Workbench Preview"
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

              {/* Direct Crawlable Links for All 6 Themes */}
              <div className="w-full pt-4 border-t border-stone-200/80 text-center space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Browse All Live Menu Theme Demos
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {themesList.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/menu/${t.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-stone-50 border border-stone-200/90 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.colors[1] }}></span>
                      <span>{t.name}</span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </Link>
                  ))}
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
                <span>Annual Offer Unlocked: Pay for 10 Months & Get 12 Months Access (2 Months FREE)!</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter Plan</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">Standard Theme</span>
                </div>
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
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Perfect for cafes, food stalls, juice bars & small local service shops.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Digital menu / service card hosting</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Printable custom QR stand graphic</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Up to 100 items & categories</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> 2 Menu updates per month via WhatsApp</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Fast mobile browser load (no app needed)</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-stone-100 hover:bg-emerald-600 hover:text-white font-bold text-xs text-slate-800 transition-colors">
                  Choose Starter ({billingCycle === "yearly" ? "2 Months Free" : "Monthly"})
                </span>
              </div>
            </Link>

            {/* Pro Plan */}
            <Link
              href={`/onboard?plan=pro&cycle=${billingCycle}`}
              className="bg-white border-2 border-emerald-600 p-8 rounded-3xl flex flex-col justify-between shadow-md relative text-left"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-xs">
                Most Popular
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Pro Plan</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">All Themes</span>
                </div>
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
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  For busy restaurants, salons, clinics & active service businesses.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                  <li className="flex items-center gap-2 font-bold text-slate-900"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Everything in Starter</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Unlimited items & categories</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> High-res dish & service photos</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Veg/non-veg, spice & bestseller badges</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Instant live search & category filtering</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Unlimited menu updates via WhatsApp</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Priority WhatsApp VIP support</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-sm transition-colors">
                  Choose Pro ({billingCycle === "yearly" ? "2 Months Free" : "Monthly"})
                </span>
              </div>
            </Link>

            {/* Enterprise Plan (Custom & Bespoke) */}
            <Link
              href="/onboard?plan=enterprise"
              className="bg-white border-2 border-slate-950 p-8 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all text-left relative"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-950 text-amber-300 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-400" /> 100% Bespoke Design
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Enterprise Plan</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">Custom Quote</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">Custom</span>
                    <span className="text-xs font-semibold text-slate-500">Quote</span>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-700">Volume & Multi-Branch Discount Available</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  For hotel chains, luxury salon & spa franchises, multi-branch hospitals & enterprises.
                </p>
                <div className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>100% Bespoke Custom Design & Tailored UI</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                  <li className="flex items-center gap-2 font-bold text-slate-900"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> 100% Tailored UI to your brand guide</li>
                  <li className="flex items-center gap-2 font-bold text-slate-900"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Custom Domain (menu.yourbrand.com)</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Multi-branch centralized management</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Multi-industry rate cards & service cards</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Acrylic table stand print deliverables</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> Dedicated Senior Account Manager</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> 24/7 VIP Phone Support & 99.99% SLA</li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="block w-full text-center py-3 rounded-xl bg-slate-950 hover:bg-slate-800 font-bold text-xs text-white shadow-sm transition-colors">
                  Get Enterprise Custom Quote
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SEO CONTENT SECTIONS ========== */}

      {/* What is BookMyDine QR? | GEO Optimized */}
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
              <strong className="text-slate-900">BookMyDine QR</strong> is a done-for-you digital menu platform built specifically for the Indian restaurant industry. Unlike self-serve tools that require you to learn complex dashboards, BookMyDine QR operates as a fully managed service: you send us your menu via WhatsApp, and our design team creates a beautiful, mobile-optimized QR code menu within 24 to 48 hours.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The platform is designed for restaurants, cafes, hotels, resorts, bars, pubs, cloud kitchens, bakeries, sweet shops, food courts, juice bars, ice cream parlours, fine dining establishments, fast food outlets, and food trucks. Each digital menu is hosted on our high-speed CDN, loads in under 1 second, and requires zero app downloads for your guests; they simply scan a QR code with their phone camera and view your menu instantly.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              BookMyDine QR includes 6 professionally designed themes, printable QR table stand graphics, veg and non-veg indicator badges, bestseller tags, search and category filtering, and WhatsApp-based menu update support. Plans start at ₹199 per month with free custom setup and no lock-in contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Industry Showcase: Menus & Service Cards for Different Companies & Industries */}
      <section id="industries" className="py-16 sm:py-24 bg-linear-to-b from-[#f4f8f5] via-emerald-50/40 to-white border-b border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Multi-Industry QR Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Digital Menus & Interactive Service Cards for Every Industry
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Not just for food! We craft mobile-optimized digital menus, interactive service rate cards, and product catalogs tailored to the exact workflow of your company or business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Industry 1: Restaurants & Cafes (Emerald Theme) */}
            <div className="bg-linear-to-br from-emerald-50/70 via-white to-white p-7 rounded-3xl border border-emerald-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200/80">
                    Food & Dining
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Restaurants, Cafes & Cloud Kitchens</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Interactive digital food & drink menus with dietary badges, ingredient notes, and live category filters.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                      Paneer Butter Masala
                    </span>
                    <span className="font-extrabold text-slate-900">₹320</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      Artisanal Cold Brew
                    </span>
                    <span className="font-extrabold text-slate-900">₹180</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-2 w-2 rounded-full bg-red-600"></span>
                      Dum Biryani Combo
                    </span>
                    <span className="font-extrabold text-slate-900">₹360</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Veg, Non-Veg, Spicy & Bestseller Tags</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Fast Search & Real-Time Price Changes</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Restaurant Menu →
                </Link>
              </div>
            </div>

            {/* Industry 2: Salons & Spas (Purple Theme) */}
            <div className="bg-linear-to-br from-purple-50/70 via-white to-white p-7 rounded-3xl border border-purple-200/90 shadow-2xs hover:shadow-xl hover:border-purple-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Scissors className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200/80">
                    Beauty & Spa
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Salons, Spas & Beauty Parlours</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Digital service rate cards displaying haircut packages, skin therapies, bridal tariffs, and treatment durations.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Advanced Keratin Treatment (60m)</span>
                    <span className="font-extrabold text-slate-900">₹3,499</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Hydra-Glow Facial (45m)</span>
                    <span className="font-extrabold text-slate-900">₹1,899</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Royal Bridal Package</span>
                    <span className="font-extrabold text-slate-900">₹8,999</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-purple-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-600 shrink-0" /> Service duration & procedure highlights</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-600 shrink-0" /> 1-Click WhatsApp appointment booking</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Salon Rate Card →
                </Link>
              </div>
            </div>

            {/* Industry 3: Hotels & Resorts (Amber Theme) */}
            <div className="bg-linear-to-br from-amber-50/70 via-white to-white p-7 rounded-3xl border border-amber-200/90 shadow-2xs hover:shadow-xl hover:border-amber-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Hotel className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-200/80">
                    Hospitality
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Hotels, Resorts & Homestays</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Bedside QR stands for in-room dining, room service amenities, spa appointments, and local excursion tariffs.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">In-Room Dining Gourmet Dinner</span>
                    <span className="font-extrabold text-slate-900">₹650</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Ayurvedic Full-Body Therapy (60m)</span>
                    <span className="font-extrabold text-slate-900">₹2,200</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Airport Transfer (Sedan)</span>
                    <span className="font-extrabold text-slate-900">₹1,200</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-amber-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-600 shrink-0" /> 24/7 Room service & laundry rate card</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-600 shrink-0" /> WiFi login & front-desk WhatsApp link</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Hotel Room Card →
                </Link>
              </div>
            </div>

            {/* Industry 4: Clinics & Healthcare (Blue Theme) */}
            <div className="bg-linear-to-br from-blue-50/70 via-white to-white p-7 rounded-3xl border border-blue-200/90 shadow-2xs hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200/80">
                    Healthcare
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Clinics, Dentists & Healthcare</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Transparent consultation rate cards, diagnostic checkup packages, dental procedures, and treatment costs.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Specialist Doctor Consultation</span>
                    <span className="font-extrabold text-slate-900">₹600</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Ultrasonic Teeth Cleaning & Polish</span>
                    <span className="font-extrabold text-slate-900">₹1,200</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Executive Full Body Health Package</span>
                    <span className="font-extrabold text-slate-900">₹2,499</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-blue-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600 shrink-0" /> Transparent pricing builds patient trust</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-600 shrink-0" /> WhatsApp slot booking & OPD hours</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Clinic Rate Card →
                </Link>
              </div>
            </div>

            {/* Industry 5: Car Detailing & Garages (Rose Theme) */}
            <div className="bg-linear-to-br from-rose-50/70 via-white to-white p-7 rounded-3xl border border-rose-200/90 shadow-2xs hover:shadow-xl hover:border-rose-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Car className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-200/80">
                    Automotive
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Car Detailing, Auto Care & Garages</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Wash menus, ceramic coating tiers, interior detailing packages, and periodic maintenance checklists.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Deep Snow Foam Wash & Wax</span>
                    <span className="font-extrabold text-slate-900">₹499</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">9H Ceramic Shield (3-Year Warranty)</span>
                    <span className="font-extrabold text-slate-900">₹12,999</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Complete AC Disinfection & Service</span>
                    <span className="font-extrabold text-slate-900">₹1,499</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-rose-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Hatchback/Sedan/SUV tier pricing</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Service package checklist inclusions</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Auto Service Menu →
                </Link>
              </div>
            </div>

            {/* Industry 6: Gyms, Fitness & Yoga (Teal Theme) */}
            <div className="bg-linear-to-br from-teal-50/70 via-white to-white p-7 rounded-3xl border border-teal-200/90 shadow-2xs hover:shadow-xl hover:border-teal-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200/80">
                    Fitness & Yoga
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Gyms, Fitness Studios & CrossFit</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Membership tier comparisons, personal trainer fees, Zumba/Yoga batch schedules, and seasonal gym offers.
                  </p>
                </div>
                {/* Sample items preview */}
                <div className="bg-teal-50/50 p-3.5 rounded-2xl border border-teal-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Monthly Unlimited Gym Access</span>
                    <span className="font-extrabold text-slate-900">₹1,800</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">1-on-1 Personal Trainer (12 Sessions)</span>
                    <span className="font-extrabold text-slate-900">₹6,000</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span className="font-bold">Weekend Ashtanga Yoga Batch</span>
                    <span className="font-extrabold text-slate-900">₹2,200</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-teal-100">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Plan duration comparison & benefits</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Free trial class booking link</li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/onboard?plan=pro"
                  className="block w-full text-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Create Gym Tariff Card →
                </Link>
              </div>
            </div>
          </div>

          {/* Custom Industry Callout Banner */}
          <div className="mt-12 bg-linear-to-r from-emerald-900 via-slate-900 to-emerald-950 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-300/30 px-3 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Custom Industry or Company?
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Need a Bespoke QR Card for Your Industry?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
                Whether you run an event management firm, jewellery boutique, pet grooming center, or healthcare chain, our team will custom design and host your interactive digital rate card within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/onboard?plan=enterprise"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-6 py-3.5 text-xs font-black text-slate-950 shadow-md transition-all"
              >
                <span>Get Bespoke Custom Setup</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/918005737183?text=Hi,%20I%20need%20a%20digital%20menu%20or%20service%20rate%20card%20for%20my%20company."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 text-xs font-bold text-white transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Talk to Designer</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BookMyDine QR Over Competitors? | Comparison */}
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
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Free custom setup (pay only after you approve)</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Starting at just ₹199/month (built for India)</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /> <span>Printable QR stand graphics with your branding</span></li>
              </ul>
            </div>

            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-500 flex items-center gap-2">
                Traditional Alternatives
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>Paper menus: expensive reprinting, outdated info, unhygienic</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>DIY QR tools: complex dashboards, you do all the work</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>PDF menus: slow to load, not mobile-optimized, no interactivity</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>Aggregator listings: limited menu control, competitor ads</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>International tools: expensive, not localized for India)</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>No veg/non-veg badges, no Indian pricing support</span></li>
                <li className="flex items-start gap-2"><X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> <span>Hidden fees, annual contracts, no WhatsApp support</span></li>
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
              <p className="text-xs text-slate-500 leading-relaxed">From menu submission to live digital menu and QR code: all done within 24-48 hours.</p>
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
              <h3 className="text-lg font-extrabold text-slate-900">Affordable Pricing for Every Business</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              BookMyDine QR plans start at just <strong className="text-slate-900">₹199 per month</strong> for the Starter plan (up to 100 items, standard themes, no custom design), <strong className="text-slate-900">₹499 per month</strong> for the Pro plan (unlimited items, photos, WhatsApp updates, standard themes, no custom design), and an Enterprise plan offering 100% bespoke custom design, custom domain mapping (menu.yourbrand.com), and multi-branch management. Annual billing saves you 2 months free. Every plan includes free custom setup with no credit card required upfront.
            </p>
          </div>
        </div>
      </section>

      {/* Cities We Serve | Internal Linking */}
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

      {/* FAQ Accordion | Expanded 25 FAQs */}
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

      {/* Floating Bottom Conversion Bar for Mobile Screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+918005737183"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold shrink-0 transition-colors"
          aria-label="Call Support"
        >
          <Phone className="h-4 w-4 text-emerald-700" />
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/918005737183?text=Hi,%20I%20am%20interested%20in%20your%20product%20BookMyDine%20QR.%20Can%20we%20talk%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold shrink-0 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/onboard"
          className="flex-1 flex items-center justify-center gap-1 py-2.5 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold shadow-sm transition-all text-center"
        >
          <span>Free Setup</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
