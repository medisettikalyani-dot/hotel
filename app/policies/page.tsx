"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Clock,
  Sparkles,
  Users,
  FileCheck2,
  Volume2,
  Ban,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_PHONE, WHATSAPP_CONFIG } from "@/lib/constants";

interface PolicyCard {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  summary: string;
  details: string[];
}

const GUEST_POLICIES: PolicyCard[] = [
  {
    id: "advance-deposit",
    icon: CreditCard,
    title: "20% Advance Online Policy",
    badge: "Official Payment Term",
    summary:
      "Lock your flat dates with just a flat 20% online advance deposit. The remaining 80% balance is settled upon check-in.",
    details: [
      "Pay 20% deposit online via UPI, Credit/Debit cards, or Net Banking",
      "Instant automated digital booking voucher & confirmation receipt generated",
      "Remaining 80% balance settled directly at check-in via Cash or UPI QR Code",
      "Zero hidden reservation fees or platform surcharges",
    ],
  },
  {
    id: "free-cancellation",
    icon: ShieldCheck,
    title: "48-Hour Free Cancellation & 100% Refund",
    badge: "Flexible Terms",
    summary:
      "Full 100% refund of your advance deposit if cancelled 48 hours or more prior to your scheduled check-in window.",
    details: [
      "Cancel at least 48 hours before check-in (11:00 AM) for a 100% full refund",
      "Refund processed directly to original payment method within 3–5 banking days",
      "Cancellations within 48 hours forfeit the 20% deposit as reservation hold fee",
      "Date modifications allowed based on calendar availability with no penalty",
    ],
  },
  {
    id: "checkin-checkout",
    icon: Clock,
    title: "Check-In & Check-Out Timings",
    badge: "Daily Schedule",
    summary:
      "Check-in window is 11:00 AM – 1:00 PM. Check-out is strictly at 11:00 AM sharp to ensure clinical deep-sanitization.",
    details: [
      "Check-in window: 11:00 AM – 1:00 PM for key handover and welcome briefing",
      "Check-out time: 11:00 AM sharp for thorough deep-cleaning & linen sterilisation",
      "Early check-in or late check-out subject to availability upon advance notice",
      "Luggage holding facility available upon prior coordination with desk",
    ],
  },
  {
    id: "housekeeping",
    icon: Sparkles,
    title: "Complimentary Alternate-Day Housekeeping",
    badge: "In-Stay Service",
    summary:
      "Complimentary professional housekeeping is provided on alternate days across all short-term and extended stays.",
    details: [
      "Includes floor sweeping, mopping, wet sanitation, and trash evacuation",
      "Fresh sanitized hotel-grade bed linens and bath towels replenished on schedule",
      "Daily waste removal and kitchen maintenance support available upon request",
      "Optional daily deep housekeeping service available as an on-demand add-on",
    ],
  },
  {
    id: "extra-guests",
    icon: Users,
    title: "Children & Extra Guest Policy",
    badge: "Occupancy Guidelines",
    summary:
      "Children aged 0–12 stay completely free. Extra adult guests beyond base flat capacity are ₹500 per person per night.",
    details: [
      "Children (0–12 years): 100% FREE stay with complimentary baby cot on request",
      "Base occupancy: 1 BHK (2 Adults), 2 BHK (4 Adults), 3 BHK (6 Adults), 4 BHK (8 Adults)",
      "Extra person fee: ₹500 per adult per night beyond base capacity",
      "Extra plush floor mattress, sanitized pillow, and blanket provided for extra guests",
    ],
  },
  {
    id: "id-verification",
    icon: FileCheck2,
    title: "Mandatory Government Identification",
    badge: "Legal Compliance",
    summary:
      "By law, every adult guest must submit valid original government photo identification before access is granted.",
    details: [
      "Indian Nationals: Original Aadhaar Card, Driving License, Voter ID, or Passport",
      "International Travelers: Original valid Passport and valid Indian Visa are mandatory",
      "Digital verification / contactless pre-check-in available on request",
      "PAN card is not accepted as address proof per regulatory hotel guidelines",
    ],
  },
  {
    id: "quiet-hours",
    icon: Volume2,
    title: "Quiet Hours & Respectful Stays",
    badge: "Resident Comfort",
    summary:
      "Quiet hours are observed from 10:00 PM to 7:00 AM to ensure medical recovery and peaceful sleep for all families.",
    details: [
      "Keep volume on televisions and audio devices subdued during quiet hours",
      "Non-registered outside visitors permitted only between 9:00 AM and 8:00 PM",
      "Commercial parties, disruptive gatherings, and illicit activities strictly prohibited",
      "Building security guards and CCTV active 24/7 across public corridors",
    ],
  },
  {
    id: "non-smoking",
    icon: Ban,
    title: "100% Smoke-Free Living Spaces",
    badge: "Health & Safety",
    summary:
      "All apartment interiors are strictly non-smoking for patient health, allergen defense, and fire safety.",
    details: [
      "Smoking of cigarettes, vapes, and hookah is strictly prohibited inside the flats",
      "Designated outdoor balconies and building ground areas permitted for smoking",
      "Deep-cleaning and ozone sanitization fee of ₹2,500 applies for interior violations",
      "Kitchen gas stoves must be operated responsibly and switched off after cooking",
    ],
  },
];

export default function PoliciesPage() {
  const whatsappUrl = WHATSAPP_CONFIG.getUrl(
    "Hello Flatel Hospitality, I have a question regarding your stay policies."
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
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] -z-10"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181B28] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>FLATEL HOSPITALITY GUIDELINES</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Guest Policies &amp; <span className="text-[#D4AF37]">Stay Rules</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              Transparent, professional hospitality standards crafted to ensure peace of mind, pristine hygiene, and maximum comfort for medical attendants, tourists, and families.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* POLICIES GRID                                             */}
        {/* ========================================================= */}
        <section className="py-14 sm:py-18 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {GUEST_POLICIES.map((policy) => {
                const IconComponent = policy.icon;
                return (
                  <div
                    key={policy.id}
                    id={policy.id}
                    className="p-6 sm:p-7 rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#121316] border border-[#2E3038] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/60 group-hover:bg-[#181A22] transition-colors">
                          <IconComponent className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#121316] text-[#C5A880] border border-[#2E3038]">
                          {policy.badge}
                        </span>
                      </div>

                      <h2 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {policy.title}
                      </h2>

                      <p className="mt-2 text-xs sm:text-[13px] text-[#A1A1AA] leading-relaxed">
                        {policy.summary}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#2E3038]/70 space-y-2">
                        {policy.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D1D5DB]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Contact Box */}
            <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#181B26] border border-[#D4AF37]/40 text-center max-w-3xl mx-auto shadow-lg">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Have a specific question or policy inquiry?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] max-w-lg mx-auto">
                Our 24/7 guest concierge team is available to assist with custom medical check-in windows, long-stay agreements, and group bookings.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5B54F] text-[#121316] font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {CONTACT_PHONE}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold text-xs sm:text-sm transition-all"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
