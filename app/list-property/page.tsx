"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Phone,
  ArrowRight,
  CheckCircle2,
  Send,
  MapPin,
  Clock,
  Key,
  BadgeCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_PHONE, WHATSAPP_CONFIG } from "@/lib/constants";

export default function ListPropertyPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    flatType: "2bhk",
    furnishingStatus: "fully-furnished",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp message
    const inquiryText = `Hello Flatel Acquisitions Team, I would like to list my property with Flatel:
- Name: ${formData.fullName}
- Phone: ${formData.phone}
- Email: ${formData.email || "N/A"}
- Location: ${formData.location}
- Flat Type: ${formData.flatType.toUpperCase()}
- Furnishing: ${formData.furnishingStatus}
- Details: ${formData.message || "Ready for inspection"}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open WhatsApp inquiry in new tab
      const whatsappUrl = WHATSAPP_CONFIG.getUrl(inquiryText);
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  const partnerWhatsappUrl = WHATSAPP_CONFIG.getUrl(
    "Hello Flatel Hospitality, I want to discuss partnering with you to list my property."
  );

  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <SiteHeader />

      <main className="flex-1 w-full">
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 border-b border-[#2E3038] bg-[#0E1017] overflow-hidden">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09),transparent_70%)] -z-10"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181B28] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>PROPERTY OWNER PARTNERSHIP</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              List Your Property with <span className="text-[#D4AF37]">Flatel</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              Transform your apartment into a high-earning serviced residence. Enjoy consistent rental yields, zero tenant headaches, and professional round-the-clock maintenance.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* VALUE PILLARS & OWNER BENEFITS                            */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-[#2E3038]/60 bg-[#14161E]">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#2E3038] text-[#D4AF37] flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">
                  Higher Net Yields
                </h3>
                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                  Earn up to 35% higher returns compared to traditional long-term tenancies through our serviced hospitality model.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#2E3038] text-[#D4AF37] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">
                  Commercial Upkeep
                </h3>
                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                  Our professional teams perform ongoing housekeeping, sanitization, and maintenance so your asset remains pristine.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#2E3038] text-[#D4AF37] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">
                  Verified Guests Only
                </h3>
                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                  Strict mandatory ID verification and background checks for medical families, visiting doctors, and corporate executives.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#2E3038] text-[#D4AF37] flex items-center justify-center mb-4">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">
                  Zero Stress Management
                </h3>
                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                  We handle 100% of guest check-ins, key handovers, billing, and customer service. You receive guaranteed on-time payouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SUBMISSION FORM & DIRECT CONTACT                          */}
        {/* ========================================================= */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#1C1E24] border border-[#2E3038] p-6 sm:p-10 shadow-2xl">
              <div className="max-w-xl mx-auto text-center mb-8">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                  FREE PROPERTY EVALUATION
                </span>
                <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-white">
                  Submit Property Details
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA]">
                  Fill out the form below. Our property acquisition team will review your apartment and reach out within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#181B28] border border-[#D4AF37] text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/50">
                    <BadgeCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Thank You! Your Inquiry Has Been Received.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto">
                    We have received your listing request and opened your WhatsApp concierge connection. Our team is reviewing your property specifications.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Mohammed Farhan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 93464 13282"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="owner@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Property Location in Hyderabad *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. Barkas / Moghal Pura / Chandrayangutta"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Apartment Size / Configuration *
                      </label>
                      <select
                        value={formData.flatType}
                        onChange={(e) =>
                          setFormData({ ...formData, flatType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="1bhk">1 BHK Furnished Flat</option>
                        <option value="2bhk">2 BHK Furnished Flat</option>
                        <option value="3bhk">3 BHK Furnished Flat</option>
                        <option value="4bhk">4 BHK Furnished Flat</option>
                        <option value="building">Full Apartment Building / Multiple Units</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                        Furnishing Status *
                      </label>
                      <select
                        value={formData.furnishingStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            furnishingStatus: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="fully-furnished">Fully Furnished (AC, Beds, Kitchen)</option>
                        <option value="semi-furnished">Semi-Furnished</option>
                        <option value="unfurnished">Unfurnished (Fit-out needed)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                      Additional Details / Expected Rental Terms
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Floor number, parking availability, elevator, expected rental range, etc."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-white text-xs sm:text-sm placeholder-[#6B7280] focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5B54F] text-[#121316] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Submitting..." : "Submit Property & Connect on WhatsApp"}</span>
                    </button>

                    <a
                      href={partnerWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span>Direct WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
