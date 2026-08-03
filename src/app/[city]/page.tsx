import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Utensils,
  Zap,
} from "lucide-react";

const SITE_URL = "https://bookmydineqr.vercel.app";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return { title: "City Not Found" };
  }

  return {
    title: `Restaurant QR Menu in ${city.name} — Digital Menu Software for ${city.name} Restaurants`,
    description: `Get a professional QR code menu for your restaurant in ${city.name}, ${city.state}. BookMyDine QR designs, hosts & manages beautiful digital menus for cafes, hotels, bars and cloud kitchens in ${city.name}. Free setup, live in 24 hours.`,
    alternates: {
      canonical: `${SITE_URL}/${city.slug}`,
    },
    openGraph: {
      title: `Restaurant QR Menu in ${city.name} | BookMyDine QR`,
      description: `Done-for-you digital menu platform for restaurants in ${city.name}. 6 premium themes, free setup, starting at ₹99/month. Join hundreds of ${city.name} restaurants using BookMyDine QR.`,
      url: `${SITE_URL}/${city.slug}`,
      siteName: "BookMyDine QR",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  // City-specific JSON-LD
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `BookMyDine QR — Restaurant QR Menu in ${city.name}`,
    description: `Professional QR code digital menu service for restaurants, cafes, and hotels in ${city.name}, ${city.state}. Done-for-you menu design, hosting, and updates.`,
    provider: {
      "@type": "Organization",
      name: "BookMyDine QR",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `QR Menu Plans for ${city.name} Restaurants`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "99",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          name: "Growth Plan",
          price: "199",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          name: "Premium Plan",
          price: "499",
          priceCurrency: "INR",
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: `QR Menu in ${city.name}`, url: `${SITE_URL}/${city.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              <span>{city.name}, {city.state}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Restaurant QR Menu in{" "}
              <span className="relative inline-block text-emerald-800">
                {city.name}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-emerald-600/70"
                  viewBox="0 0 250 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 14C50 4 150 3 247 11C180 17 90 18 3 14Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Replace paper menus with beautiful{" "}
              <strong className="text-slate-900 font-bold">digital QR menus</strong>{" "}
              for your {city.name} restaurant. We design, host &amp; manage everything for you.
              Free setup, live in 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
              <Link
                href="/onboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f623f] hover:bg-[#0c4e32] px-7 py-4 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all"
              >
                <span>Get My Free QR Menu Setup</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/918005737183?text=Hi,%20I%20am%20interested%20in%20BookMyDine%20QR%20for%20my%20restaurant%20in%20" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 px-7 py-4 text-sm font-bold text-emerald-900 transition-all shadow-xs"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Dining in This City */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#f4f8f5] via-emerald-50/40 to-white border-b border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
                <Utensils className="h-3.5 w-3.5 text-emerald-600" /> Dining in {city.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Why {city.name} Restaurants Are Going Digital
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {city.description}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {city.diningCulture}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurant Types */}
      <section className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              We Serve All Types
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Popular Restaurant Types in {city.name}
            </h2>
            <p className="text-slate-600 text-sm">
              BookMyDine QR works for every food establishment in {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {city.popularTypes.map((type) => (
              <div
                key={type}
                className="bg-[#fafaf8] p-4 rounded-2xl border border-stone-200/80 text-center hover:border-emerald-500 transition-all hover:shadow-md"
              >
                <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm mx-auto mb-2">
                  <Utensils className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BookMyDine QR */}
      <section className="py-12 sm:py-16 bg-[#fafaf8] border-b border-stone-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why {city.name} Restaurant Owners Choose BookMyDine QR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Live in 24 Hours</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Submit your menu today and get a live preview within 24-48 hours. No technical skills required — we handle everything from design to hosting.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Custom QR Stands</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Receive print-ready QR table tent designs customized with your {city.name} restaurant&apos;s logo, brand colors, and table numbers.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Starting at ₹99/month</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Affordable plans for every budget. Free setup, no lock-in contracts, cancel anytime. Pay only after you approve your digital menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* City-Specific FAQs */}
      <section className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Questions Answered
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              FAQs About QR Menus in {city.name}
            </h2>
          </div>

          <div className="space-y-3">
            {city.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="border border-stone-200/80 rounded-xl overflow-hidden bg-[#fafaf8] group"
                open={idx === 0}
              >
                <summary className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180 group-open:text-emerald-700" />
                </summary>
                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-stone-200/60 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-xl">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Free Custom Setup Included</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to Get Your QR Menu in {city.name}?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Join hundreds of {city.name} restaurants already using BookMyDine QR.
            Free setup, no credit card required, live in 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/onboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f623f] hover:bg-[#0c4e32] px-7 py-4 text-sm font-extrabold text-white shadow-md hover:shadow-lg transition-all"
            >
              <span>Start Free Setup Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Free Setup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              No Credit Card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Cancel Anytime
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
