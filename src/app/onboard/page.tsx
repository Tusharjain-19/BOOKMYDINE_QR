"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  User, 
  Palette, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2,
  Sparkles
} from "lucide-react";

function IntakeFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assignedMenuSlug, setAssignedMenuSlug] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    restaurantName: "",
    restaurantType: "Cafe",
    address: "",
    mapsLink: "",
    instagramLink: "",
    plan: "growth",
    billingCycle: "monthly",
    planPrice: "₹199/month",
    offerApplied: "Standard Monthly",
    theme: "minimal",
    brandColor: "#5d181b",
    accentColor: "#7c580a",
    logoName: "",
    logoBase64: "",
    pdfName: "",
    pdfBase64: "",
    foodImages: [] as { name: string; base64: string }[]
  });

  useEffect(() => {
    const plan = searchParams.get("plan");
    const cycle = searchParams.get("cycle");
    
    const activeCycle: "monthly" | "yearly" = cycle === "yearly" ? "yearly" : "monthly";
    setBillingCycle(activeCycle);

    if (plan) {
      const cleanPlan = plan.replace("_yearly", "");
      setFormData(prev => ({ 
        ...prev, 
        plan: cleanPlan,
        billingCycle: activeCycle,
        planPrice: getPlanPrice(cleanPlan, activeCycle),
        offerApplied: activeCycle === "yearly" ? "2 Months FREE Offer Applied" : "Standard Monthly"
      }));
    }
  }, [searchParams]);

  const getPlanPrice = (planName: string, cycle: string) => {
    if (cycle === "yearly") {
      if (planName === "starter") return "₹990/year (2 Months FREE - Save ₹198)";
      if (planName === "growth") return "₹1,990/year (2 Months FREE - Save ₹398)";
      if (planName === "premium") return "₹4,990/year (2 Months FREE - Save ₹998)";
    } else {
      if (planName === "starter") return "₹99/month";
      if (planName === "growth") return "₹199/month";
      if (planName === "premium") return "₹499/month";
    }
    return "₹199/month";
  };

  const handleCycleChange = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    setFormData(prev => ({
      ...prev,
      billingCycle: cycle,
      planPrice: getPlanPrice(prev.plan, cycle),
      offerApplied: cycle === "yearly" ? "2 Months FREE Offer Applied" : "Standard Monthly"
    }));
  };

  const handlePlanSelect = (planName: string) => {
    setFormData(prev => ({
      ...prev,
      plan: planName,
      planPrice: getPlanPrice(planName, billingCycle)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "logoBase64" | "pdfBase64" | "foodImages") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fieldName === "foodImages") {
      const imagesArray: { name: string; base64: string }[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagesArray.push({
            name: file.name,
            base64: reader.result as string
          });
          if (imagesArray.length === files.length) {
            setFormData(prev => ({ ...prev, foodImages: [...prev.foodImages, ...imagesArray] }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      const nameField = fieldName === "logoBase64" ? "logoName" : "pdfName";
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: reader.result as string,
          [nameField]: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.ownerName || !formData.phone || !formData.email) {
        alert("Please fill in all owner contact fields.");
        return;
      }
    } else if (step === 2) {
      if (!formData.restaurantName || !formData.address) {
        alert("Please fill in your restaurant name and physical address.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdfBase64 && !formData.logoBase64) {
      alert("Please upload at least your menu document or logo.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setAssignedMenuSlug(data.assignedMenuSlug || "cafe-cozy");
      } else {
        alert("Submission error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit intake. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 sm:py-12">
        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="h-20 w-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Intake Form Submitted Successfully!</h1>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.ownerName}</strong>! Our design team is currently reviewing <strong>{formData.restaurantName}</strong> and building your custom digital menu.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl max-w-md mx-auto space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Next Steps (Within 24 Hours)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                  <span>Live menu preview link sent to <strong>{formData.phone}</strong> via WhatsApp.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                  <span>Plan Chosen: <strong>{formData.plan.toUpperCase()}</strong> ({formData.planPrice})</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                  <span>Print-ready high-resolution QR table stand graphics generated.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-emerald-800 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
            {/* Form Header Banner (Emerald SaaS Theme) */}
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 p-8 text-white">
              <h1 className="text-2xl font-extrabold">Restaurant Intake Form</h1>
              <p className="text-emerald-100 text-sm mt-1">Let&apos;s build your premium digital menu together</p>

              {/* Progress Stepper */}
              <div className="flex items-center justify-between mt-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-emerald-950 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-400 z-0 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-colors ${step >= 1 ? "bg-emerald-400 text-slate-950 font-black shadow-md" : "bg-emerald-900 text-emerald-200"}`}>1</div>
                  <span className="text-[10px] font-bold mt-1 text-white">Contact</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-colors ${step >= 2 ? "bg-emerald-400 text-slate-950 font-black shadow-md" : "bg-emerald-900 text-emerald-200"}`}>2</div>
                  <span className="text-[10px] font-bold mt-1 text-white">Restaurant</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-colors ${step >= 3 ? "bg-emerald-400 text-slate-950 font-black shadow-md" : "bg-emerald-900 text-emerald-200"}`}>3</div>
                  <span className="text-[10px] font-bold mt-1 text-white">Menu & Theme</span>
                </div>
              </div>
            </div>

            {/* Plan Info Pill Bar */}
            <div className="bg-slate-950 text-white px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Chosen Plan:</span>
                <span className="bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-[11px] shadow-sm">
                  {formData.plan.toUpperCase()} PLAN — {formData.planPrice}
                </span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Setup & Design Fee: FREE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                    <User className="h-5 w-5 text-emerald-700" />
                    <span>Step 1: Owner Contact & Plan Selection</span>
                  </h2>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Owner Full Name *</label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp / Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                          placeholder="e.g. ramesh@cafecozy.com"
                        />
                      </div>
                    </div>

                    {/* Billing Cycle Toggle (Monthly vs 12 Months Annual Offer) */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-slate-700">Billing Cycle Preference *</label>
                        {billingCycle === "yearly" && (
                          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                            2 Months FREE Applied!
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
                        <button
                          type="button"
                          onClick={() => handleCycleChange("monthly")}
                          className={`py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all ${
                            billingCycle === "monthly"
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Monthly Billing
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCycleChange("yearly")}
                          className={`py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                            billingCycle === "yearly"
                              ? "bg-emerald-700 text-white shadow-md"
                              : "text-slate-700 hover:text-slate-900"
                          }`}
                        >
                          <span>Annual (12 Months)</span>
                          <span className="bg-amber-300 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded">
                            2 MONTHS FREE
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Your Plan Choice *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Starter Card */}
                        <button
                          type="button"
                          onClick={() => handlePlanSelect("starter")}
                          className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                            formData.plan === "starter"
                              ? "bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20 text-slate-900 shadow-sm"
                              : "bg-white border-stone-200 text-slate-600 hover:border-stone-300"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-sm">Starter</span>
                              {formData.plan === "starter" && <CheckCircle2 className="h-4 w-4 text-emerald-700" />}
                            </div>
                            <span className="text-xl font-black text-slate-900">
                              {billingCycle === "monthly" ? "₹99" : "₹990"}
                              <span className="text-xs font-semibold text-slate-400">
                                {billingCycle === "monthly" ? "/mo" : "/yr"}
                              </span>
                            </span>
                            {billingCycle === "yearly" ? (
                              <p className="text-[10px] font-bold text-emerald-700 mt-1">2 Months FREE (Save ₹198)</p>
                            ) : (
                              <p className="text-[11px] text-slate-500 mt-2 leading-tight">Digital menu + standard QR code.</p>
                            )}
                          </div>
                        </button>

                        {/* Growth Card */}
                        <button
                          type="button"
                          onClick={() => handlePlanSelect("growth")}
                          className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                            formData.plan === "growth"
                              ? "bg-emerald-700 border-emerald-700 text-white shadow-md ring-2 ring-emerald-600/30"
                              : "bg-white border-stone-200 text-slate-600 hover:border-stone-300"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-sm">Growth</span>
                              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${formData.plan === "growth" ? "bg-white text-emerald-900" : "bg-emerald-100 text-emerald-800"}`}>Popular</span>
                            </div>
                            <span className={`text-xl font-black ${formData.plan === "growth" ? "text-white" : "text-slate-900"}`}>
                              {billingCycle === "monthly" ? "₹199" : "₹1,990"}
                              <span className={`text-xs font-semibold ${formData.plan === "growth" ? "text-emerald-100" : "text-slate-400"}`}>
                                {billingCycle === "monthly" ? "/mo" : "/yr"}
                              </span>
                            </span>
                            {billingCycle === "yearly" ? (
                              <p className={`text-[10px] font-bold mt-1 ${formData.plan === "growth" ? "text-amber-300" : "text-emerald-700"}`}>2 Months FREE (Save ₹398)</p>
                            ) : (
                              <p className={`text-[11px] mt-2 leading-tight ${formData.plan === "growth" ? "text-emerald-100" : "text-slate-500"}`}>Branded QR + up to 5 updates + photos.</p>
                            )}
                          </div>
                        </button>

                        {/* Premium Card */}
                        <button
                          type="button"
                          onClick={() => handlePlanSelect("premium")}
                          className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                            formData.plan === "premium"
                              ? "bg-slate-950 border-slate-900 text-white shadow-md ring-2 ring-slate-900/30"
                              : "bg-white border-stone-200 text-slate-600 hover:border-stone-300"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-sm">Premium</span>
                              {formData.plan === "premium" && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
                            </div>
                            <span className={`text-xl font-black ${formData.plan === "premium" ? "text-white" : "text-slate-900"}`}>
                              {billingCycle === "monthly" ? "₹499" : "₹4,990"}
                              <span className={`text-xs font-semibold ${formData.plan === "premium" ? "text-slate-400" : "text-slate-400"}`}>
                                {billingCycle === "monthly" ? "/mo" : "/yr"}
                              </span>
                            </span>
                            {billingCycle === "yearly" ? (
                              <p className="text-[10px] font-bold text-amber-400 mt-1">2 Months FREE (Save ₹998)</p>
                            ) : (
                              <p className={`text-[11px] mt-2 leading-tight ${formData.plan === "premium" ? "text-slate-300" : "text-slate-500"}`}>Unlimited updates + custom theme + manager.</p>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                    <Building2 className="h-5 w-5 text-emerald-700" />
                    <span>Step 2: Restaurant Identity</span>
                  </h2>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Name *</label>
                        <input
                          type="text"
                          name="restaurantName"
                          required
                          value={formData.restaurantName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                          placeholder="e.g. Cafe Cozy"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Type *</label>
                        <select
                          name="restaurantType"
                          value={formData.restaurantType}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 focus:border-emerald-600 focus:outline-none transition-colors bg-white text-sm"
                        >
                          <option value="Cafe">Cafe & Bakery</option>
                          <option value="QSR">Quick Service Restaurant (QSR)</option>
                          <option value="Fine Dining">Fine Dining Restaurant</option>
                          <option value="Street Food">Street Food / Stall</option>
                          <option value="Cloud Kitchen">Cloud Kitchen</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Physical Address *</label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                        placeholder="e.g. Shop 12, Rosewood Lane, Indiranagar, Bangalore"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Google Maps Link</label>
                        <input
                          type="url"
                          name="mapsLink"
                          value={formData.mapsLink}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                          placeholder="https://maps.google.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram Profile Link</label>
                        <input
                          type="url"
                          name="instagramLink"
                          value={formData.instagramLink}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none transition-colors"
                          placeholder="https://instagram.com/yourhandle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                    <Palette className="h-5 w-5 text-emerald-700" />
                    <span>Step 3: Menu details & Branding</span>
                  </h2>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Menu Theme *</label>
                        <select
                          name="theme"
                          value={formData.theme}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-slate-800 focus:border-emerald-600 focus:outline-none transition-colors bg-white text-sm"
                        >
                          <option value="minimal">Minimal Cafe</option>
                          <option value="luxury">Luxury Fine Dining</option>
                          <option value="traditional">Traditional Indian</option>
                          <option value="modern">Modern Restaurant</option>
                          <option value="street">Street Food</option>
                          <option value="dark">Premium Dark Theme</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Brand Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="brandColor"
                            value={formData.brandColor}
                            onChange={handleChange}
                            className="h-12 w-12 rounded border border-stone-200 p-1 cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            name="brandColor"
                            value={formData.brandColor}
                            onChange={handleChange}
                            className="flex-1 rounded-xl border border-stone-200 px-3 py-3 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Accent Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="accentColor"
                            value={formData.accentColor}
                            onChange={handleChange}
                            className="h-12 w-12 rounded border border-stone-200 p-1 cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            name="accentColor"
                            value={formData.accentColor}
                            onChange={handleChange}
                            className="flex-1 rounded-xl border border-stone-200 px-3 py-3 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Restaurant Logo</label>
                        <div className="relative border-2 border-dashed border-stone-200 hover:border-emerald-600 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "logoBase64")}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="h-6 w-6 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">
                              {formData.logoName ? formData.logoName : "Upload Logo Image"}
                            </span>
                            <span className="text-[10px] text-slate-400">PNG, JPG up to 2MB</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Menu File (PDF or Text) *</label>
                        <div className="relative border-2 border-dashed border-stone-200 hover:border-emerald-600 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50">
                          <input
                            type="file"
                            accept=".pdf,image/*,text/plain"
                            required={!formData.pdfBase64}
                            onChange={(e) => handleFileChange(e, "pdfBase64")}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <div className="flex flex-col items-center gap-1">
                            <FileText className="h-6 w-6 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">
                              {formData.pdfName ? formData.pdfName : "Upload Menu Document"}
                            </span>
                            <span className="text-[10px] text-slate-400">PDF, JPG, TXT up to 4MB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.plan !== "starter" && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Food Photos (Optional)</label>
                        <div className="relative border-2 border-dashed border-stone-200 hover:border-emerald-600 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "foodImages")}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="h-6 w-6 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">
                              {formData.foodImages.length > 0 
                                ? `${formData.foodImages.length} photos selected` 
                                : "Upload Dishes/Food Images"}
                            </span>
                            <span className="text-[10px] text-slate-400">Select multiple JPG/PNG images</span>
                          </div>
                        </div>
                        {formData.foodImages.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.foodImages.map((img, i) => (
                              <div key={i} className="text-[9px] bg-stone-100 border border-stone-200 px-2 py-1 rounded-md text-slate-600 max-w-[120px] truncate">
                                {img.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-stone-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-stone-100 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-800 disabled:bg-emerald-400 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit My Intake</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function IntakeForm() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"></div>
      </div>
    }>
      <IntakeFormContent />
    </Suspense>
  );
}
