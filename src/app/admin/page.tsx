"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  ExternalLink, 
  Terminal, 
  Database, 
  Sparkles, 
  ArrowRight,
  Layers,
  Cpu,
  CheckCircle2,
  Lock,
  Zap,
  Package
} from "lucide-react";

export default function AdminGatewayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden mb-8">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Management Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              BookMyDine QR Admin Portal
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              The Admin Panel is separated into its own autonomous application with isolated node modules, dedicated Vite build tooling, and high-performance OCR capabilities.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <Cpu className="h-72 w-72 text-white" />
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Dedicated Admin Panel */}
          <div className="bg-white p-7 rounded-3xl border-2 border-emerald-600 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Layers className="h-6 w-6 text-emerald-700" />
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Port 3001 • Standalone
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900">Dedicated Admin Panel</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Run the dedicated admin SPA for OCR menu parsing, live Canva inspector, Canva design system generation, and QR stand generation.
              </p>
              
              <div className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl text-xs font-mono space-y-1">
                <div className="text-slate-400 text-[10px]"># Terminal Launch Command:</div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-white">cd admin_panel && npm run dev</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 font-bold text-xs text-white shadow-md transition-all"
              >
                <span>Launch Admin App (http://localhost:3001)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Core SaaS APIs & Services */}
          <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Database className="h-6 w-6 text-slate-700" />
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  REST APIs
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900">Live Backend Services</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monitor live intake submissions, menu catalog endpoints, and Google Sheets webhook syncs.
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="font-mono text-slate-700">/api/leads</span>
                  <span className="text-[11px] font-bold text-emerald-700">Intake Form Lead Handler</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="font-mono text-slate-700">/api/menu</span>
                  <span className="text-[11px] font-bold text-emerald-700">Menu Data & Demo Fast-Path</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/onboard"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 font-bold text-xs text-slate-800 transition-colors"
              >
                <span>Test Customer Intake Form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* System Architecture Highlights */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Architecture Separation Benefits</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Faster Main SaaS</span>
              </span>
              <p className="leading-relaxed">Heavy OCR and admin workers are decoupled, keeping customer-facing load times under 1 second.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Package className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Isolated Dependencies</span>
              </span>
              <p className="leading-relaxed">Admin panel maintains its own isolated `node_modules` and package configurations.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Clean Security Perimeter</span>
              </span>
              <p className="leading-relaxed">Administrative tokens and editors operate independently from public SSR routes.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
