"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  MessageCircle, 
  RefreshCw, 
  X,
  Lock,
  Clock
} from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"refund" | "privacy" | "terms" | null>(null);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-auto font-sans">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info (Col 4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                BookMyDine<span className="font-light text-slate-400">QR</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BookMyDine QR (by BookMySlot) is India&apos;s leading done-for-you digital menu platform. We design, host, and maintain high-speed mobile menus & printable QR stands for cafes, fine dining, cloud kitchens, and diners.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Done-For-You Digital Menu Service</span>
            </div>
          </div>

          {/* Quick Links (Col 2) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-emerald-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#themes" className="hover:text-emerald-400 transition-colors">
                  Themes Gallery
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/onboard" className="hover:text-emerald-400 transition-colors">
                  Restaurant Intake Form
                </Link>
              </li>

            </ul>
          </div>

          {/* Legal Policies (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Policies</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("refund")}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors text-left font-medium"
                >
                  <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Refund & Cancellation Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors text-left"
                >
                  <Lock className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Privacy Policy & Data Security</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-left"
                >
                  <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Terms of Service & Uptime SLA</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact Details</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Call / WhatsApp Support</span>
                  <a href="https://wa.me/918005737183" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                    +91 8005737183
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Email Address</span>
                  <a href="mailto:teambookmydine@gmail.com" className="hover:text-emerald-400 transition-colors">
                    teambookmydine@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Headquarters</span>
                  <span>BookMySlot Tech Services, Rajasthan / All India</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Ops Team Hours</span>
                  <span>Mon - Sun: 9:00 AM - 10:00 PM IST</span>
                </div>
              </li>
            </ul>
          </div>
        </div>



        {/* Divider & Copyright */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} BookMySlot & BookMyDine QR. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" onClick={() => setActiveModal("refund")} className="hover:text-slate-300 transition-colors">
              Refund Policy
            </button>
            <button type="button" onClick={() => setActiveModal("privacy")} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setActiveModal("terms")} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Refund Policy */}
            {activeModal === "refund" && (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
                  <ShieldAlert className="h-6 w-6" />
                  <span>Refund & Cancellation Policy</span>
                </div>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                  <p>
                    <strong>1. Strict No-Refund on Delivered Setup:</strong> BookMyDine QR operates as a managed service. Once our operations team initiates menu digitizing, layout styling, or custom QR graphic creation, subscription fees paid are non-refundable under any circumstances.
                  </p>
                  <p>
                    <strong>2. Free Setup Verification:</strong> We provide live previews of digital menus before any billing commitment. Customers pay only after approving their custom menu design.
                  </p>
                  <p>
                    <strong>3. Cancellation Terms:</strong> You may cancel your subscription at any time by messaging our support on WhatsApp at <strong>+91 8005737183</strong> or emailing <strong>teambookmydine@gmail.com</strong>. Cancellation takes effect at the end of your current monthly billing period.
                  </p>
                  <p>
                    <strong>4. Service Continuation:</strong> Upon cancellation, your digital QR menu link will remain active until the last paid date of your billing cycle.
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy */}
            {activeModal === "privacy" && (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-lg">
                  <Lock className="h-6 w-6" />
                  <span>Privacy Policy & Data Protection</span>
                </div>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                  <p>
                    <strong>1. Information Collection:</strong> We collect owner contact details (Name, Phone Number, WhatsApp Number, Restaurant Name) solely to design and host your restaurant menu and communicate updates.
                  </p>
                  <p>
                    <strong>2. Zero Data Selling:</strong> We strictly do not sell, trade, or rent your personal or restaurant data to third parties.
                  </p>
                  <p>
                    <strong>3. Menu Ownership:</strong> All menu images, branding assets, and dish lists remain 100% the intellectual property of your restaurant.
                  </p>
                </div>
              </div>
            )}

            {/* Terms of Service */}
            {activeModal === "terms" && (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-blue-400 font-extrabold text-lg">
                  <FileText className="h-6 w-6" />
                  <span>Terms of Service & Uptime Guarantee</span>
                </div>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                  <p>
                    <strong>1. Service Commitment:</strong> BookMyDine QR guarantees 99.9% uptime for hosted digital menus across our CDN infrastructure.
                  </p>
                  <p>
                    <strong>2. Menu Updates SLA:</strong> Menu updates submitted via WhatsApp are processed within 2 to 4 hours during operational hours.
                  </p>
                  <p>
                    <strong>3. Acceptance of Terms:</strong> By using BookMyDine QR services, you agree to these operational terms and our firm refund policy.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white transition-colors"
              >
                Close Policy Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
